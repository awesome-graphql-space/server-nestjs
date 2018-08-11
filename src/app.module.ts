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

@Module({
  imports: [
    GraphQLModule,
    // AuthModule,
    // TweetsModule,
    // UsersModule,
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
    });
    server.applyMiddleware({ app });
    server.installSubscriptionHandlers(httpServer);
  }

}