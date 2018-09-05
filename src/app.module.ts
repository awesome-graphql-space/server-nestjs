import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Prisma } from './generated/prisma';
import { resolvers } from './resolvers-orm';
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
  endpoint: 'https://eu1.prisma.sh/nest/prisma-test2/dev', // the endpoint of the Prisma API (value set in `.env`)
  debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
});

@Module({
  imports: [
    AuthModule,
    TweetsModule,
    UsersModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {

  constructor() {}

}