import express from "express";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import cors from "cors";

const users = [
  { id: 1, username: "Alice", email: "alice@example.com" },
  { id: 2, username: "Bob", email: "bob@example.com" },
  { id: 3, username: "Charlie", email: "charlie@example.com" },
  { id: 4, username: "Diana", email: "diana@example.com" },
  { id: 5, username: "Evan", email: "evan@example.com" },
];

const app = express();
app.use(cors());

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    id: ID
    username: String
    email: String
  }

  type Post {
    id: ID
    title: String
    content: String
  }

  input UserInput {
    username: String!
    email: String!
  }

  type Query {
    hello: String
    users: [User]
    userById(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User   
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
  users: () => {
    return users;
  },
  userById: ({ id }) => {
    return users.find((user) => user.id === parseInt(id));
  },
  createUser: ({ input }) => {
    const newUser = {
      id: new Date().getTime(),
      ...input,
    };
    users.push(newUser);
    return newUser;
  },
};

// Create and use the GraphQL handler.
app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
