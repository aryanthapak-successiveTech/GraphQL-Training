import { createApolloServer } from "./src/server/express.js";

const httpServer = await createApolloServer(4000);

httpServer.listen(4000, () => {
  console.log(`🚀 Query/Mutation endpoint: http://localhost:4000/graphql`);
  console.log(`🚀 Subscription endpoint: ws://localhost:4000/graphql`);
});
