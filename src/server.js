const express = require('express');
const ExpressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        subscription(id: Int!): Subscription
        user(id: Int!): User
        subscriptionsByUser(ownerId: Int!): [Subscription]
        allSubscriptions(last: Int): [Subscription]
    }
    type Mutation {
      updateSubscriptionFrequency(id: Int!, frequency: String!): Subscription
    }    
    type Subscription {
      id: Int
      name: String
      startDate: String
      expiryMonth: Int
      frequency: String
      onGoing: Boolean
      owner: User!
  }

    type User {
      id: Int
      email: String
      name: String
    }
`);

// in memory fake Data to be used as a source
const subscriptionsData = [
  {
    id: 1,
    name: 'TV License',
    startDate: '31/08/2019',
    expiryMonth: 8,
    frequency: 'annual',
    onGoing: true,
    owner: {
      id: 2,
      email: 'theresa@test.com',
      name: 'Theresa',
    }
  },
  {
    id: 2,
    name: 'Spotify',
    startDate: '10/02/2017',
    expiryMonth: 8,
    frequency: 'monthly',
    onGoing: true,
    owner: {
      id: 1,
      email: 'guil@test.com',
      name: 'Guilherme',
    }
  },
  {
    id: 3,
    name: 'Youtube Premium',
    startDate: '08/06/2019',
    expiryMonth: 6,
    frequency: 'monthly',
    onGoing: true,
    owner: {
      id: 1,
      email: 'guil@test.com',
      name: 'Guilherme',
    }
  },
  {
    id: 4,
    name: 'Vodafone',
    startDate: '10/01/2016',
    expiryMonth: 1,
    frequency: 'monthly',
    onGoing: true,
    owner: {
      id: 2,
      email: 'theresa@test.com',
      name: 'Theresa',
    }
  },
  {
    id: 5,
    name: 'Gym',
    startDate: '01/09/2014',
    expiryMonth: 9,
    frequency: 'monthly',
    onGoing: true,
    owner: {
      id: 1,
      email: 'guil@test.com',
      name: 'Guilherme',
    }
  },
]

const usersData = [
  {
    id: 1,
    email: 'guil@test.com',
    name: 'Guilherme',
  },
  {
    id: 2,
    email: 'theresa@test.com',
    name: 'Theresa',
  },
];

// Resolver functions for each operation
const getUserById = (args) => { 
  const { id } = args;

  return usersData.filter(user => user.id === id)[0];
};

const getSubscriptionById = (args) => { 
  const { id } = args;

  return subscriptionsData
    .filter(subscription => subscription.id === id)[0];
};

const getSubscriptionsByUser = (args) => {
  const { ownerId } = args;
  return subscriptionsData.filter(subscription => subscription.ownerId === ownerId);
};

const getAllSubscriptions = (args) => {
  if (!args.last) {
    return subscriptionsData;
  }
  const last = Math.abs(args.last) * -1;
  return subscriptionsData.slice(last);
};

const updateSubscriptionFrequency = ({id, frequency}) => {
  return subscriptionsData
    .map(subscription => {
      if (subscription.id === id) {
          subscription.frequency = frequency;
          return subscription;
      }
    })
    .filter(subscription => subscription && 
      subscription.id === id)[0];
};

// Root resolver
const root = {
  subscription: getSubscriptionById,
  user: getUserById,
  subscriptionsByUser: getSubscriptionsByUser,
  allSubscriptions: getAllSubscriptions,
  updateSubscriptionFrequency: updateSubscriptionFrequency
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', ExpressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));