import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { Prisma } from 'prisma-binding';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// tslint:disable-next-line:no-var-requires
const { ApolloServer } = require('apollo-server-express');
// tslint:disable-next-line:no-var-requires
const { importSchema } = require('graphql-import');

// tslint:disable-next-line:no-var-requires
const path = require('path');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
  endpoint: 'https://eu1.prisma.sh/nest/prisma-test2/dev', // the endpoint of the Prisma API (value set in `.env`)
  debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
});

@Module({
  imports: [
    GraphQLModule,
    AuthModule,
    TweetsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
  /**
   * @description Construct the app module with graphql enabled
   * @param graphQLFactory takes the nestjs graphql service service
   */
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
  ) {}

   configureGraphQL(app: any, httpServer: any) {

    // Same as nestjs docs - graphql guide
    const typeDefs = importSchema(path.resolve('src/schema.graphql'));
    // const typeDefs = this.graphQLFactory.mergeTypesByPaths('./schema/**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    const server = new ApolloServer({
      schema,
      playground: true,
      context: async ({ req, connection }) => {
        return {
          ...req,
          db,
        };
      },
    });

    server.applyMiddleware({ app });
    server.installSubscriptionHandlers(httpServer);
  }

}