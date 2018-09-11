import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { importSchema } from 'graphql-import';
import { Prisma } from './generated/prisma';
import { resolvers } from './resolvers';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const db = new Prisma({
  endpoint: 'https://eu1.prisma.sh/nest/prisma-test2/dev', // the endpoint of the Prisma API (value set in `.env`)
  debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
});

const typeDefs = importSchema(path.resolve('src/schema.graphql'));

@Module({
  imports: [
    GraphQLModule.forRoot({
        typeDefs,
        installSubscriptionHandlers: true,
        resolvers,
        context: async ({ req, connection }) => {
          return {
            ...req,
            db,
          };
        },
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