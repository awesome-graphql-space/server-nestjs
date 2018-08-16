import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';
import { Module, MiddlewareConsumer,NestModule } from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import graphqlPlayground from 'graphql-playground-middleware-express';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
@Module({
  imports: [TypeOrmModule.forRoot(),
    SubscriptionsModule.forRoot(), GraphQLModule,
    TweetsModule
   ]
})
export class ApplicationModule implements NestModule {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly graphQLFactory: GraphQLFactory,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const schema = this.createSchema();
    this.subscriptionsService.createSubscriptionServer(schema);

    consumer
      .apply(
        //graphiqlExpress({
          graphqlPlayground({
          //server
         // endpointURL: '/graphql',
         endpoint: '/graphql',
         // subscriptionsEndpoint: `ws://api.saharasoft.co.ke:8080/subscriptions`,
          //localhost
          subscriptionEndpoint: `ws://localhost:3001/subscriptions`,
        // subscriptionsEndpoint: `ws://localhost:3001/subscriptions`,
      }),
      ()=>{}
      )
      .forRoutes('/graphiql')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }

  createSchema() {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    return this.graphQLFactory.createSchema({ typeDefs });
  }
}
