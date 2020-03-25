This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `node ./src/server.js`

Runs the app in the development mode.<br>
Open [localhost:4000/graphql](localhost:4000/graphql) to view the in-browser GraphiQL IDE and run your queries.

The page will reload if you make edits.<br>

### Queries example used during the demo:

Query 1:
```javascript
{
  user(id: 1) {
    name
    email
  }
}
```

Query 2:
```javascript
{
  subscription(id: 1) {
    name
    startDate
    frequency
    owner {
      id
    }
  }
}
```

Query 3:
```javascript
{
  subscriptionsByUser(ownerId: 2) {
    name
  }
}
```

Query 4:
```javascript
{
  allSubscriptions {
    id
    name
    startDate
    frequency
  }
}
```

### Mutation (update) example used during the demo:
```javascript
mutation {
  updateSubscriptionFrequency(id: 5, frequency: "annual") {
    id
    name
    owner {
      id
      name
    }
  }
}
```
