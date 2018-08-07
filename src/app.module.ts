import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { Prisma } from 'prisma-binding';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// tslint:disable-next-line:no-var-requires
const { ApolloServer } = require('apollo-server');

@Module({
  imports: [
    AuthModule,
    GraphQLModule,
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
   * @param subscriptionsService takes the subscription service
   * @param graphQLFactory takes the nestjs graphql service service
   */
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const schema = this.createSchema();
    // this.initSubscriptionServer(schema);=
    // schema._directives.push.apply(schema._directives, directives);
    // applySchemaCustomDirectives(schema);

    // this.subscriptionsService.createSubscriptionServer(schema);

    consumer
      .apply(
        new ApolloServer({
        typeDefs: schema,
        context: req => ({
          ...req,
          prisma: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: process.env.PRISMA_URL
          })
        })}))
      .forRoutes('/');
  }

  createSchema() {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./schema.graphql');
    return this.graphQLFactory.createSchema({ typeDefs });
  }
}