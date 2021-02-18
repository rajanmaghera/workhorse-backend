import { graphql, buildSchema } from "graphql";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from './schema.js'
const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Now listening on port 4000");
});
