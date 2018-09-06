<h1 align="center"><strong>NestJS - Prisma - Apollo 2</strong></h1>

<br />



<div align="center"><strong>Bootstrap your Nestjs Prisma app within seconds</strong></div>
<div align="center">Comes with prisma api code completion, making writing prisma db queries fun doing</div>

<br />

### Prisma

* For using Prisma as an end point you should signup to [prisma](https://app.prisma.io/) and deploy your server. If you want to read more about deploying (check out the prisma [docs](https://www.prisma.io/docs/reference/cli-command-reference/database-service/prisma-deploy-kee1iedaov/))
```
PRISMA_URL="PRISMA_URL="https://eu1.prisma.sh/your-workspace/yourendpoint/dev"
PORT=4000
```
Here is the example of a .graphqlconfig.yml file that specifies that:

* Prisma GraphQL schema should be stored in a file called generated/prisma.graphql
* Also the corresponding TypeScript type definitions should be written to a file called generated/prisma.ts

.graphqlconfig.yml should have the below code to generate prisma.ts file:

```
projects:
  app:
    schemaPath: src/schema.graphql
    extensions:
      endpoints:
        default: http://localhost:4000
  prisma:
    schemaPath: src/generated/prisma.graphql
    extensions:
      prisma: database/prisma.yml
      prepare-binding:
        output: src/generated/prisma.ts
        generator: prisma-ts
        
```

## Description

### Motivation to use NestJS

* Nest is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). NestJS reduces the process involved in setting up a nodejs server.

* We already have the GraphQLModule in NestJS that is nothing more than a wrapper around the Apollo server. We don't reinvent the wheel but provide a ready to use a module instead, that brings a clean way to play with the GraphQL and Nest together.

NestJS Framework has inbuilt support of Apollo Server 2 which is awesome :)
 
 Thanks to [issue](https://github.com/nestjs/graphql/issues/32) that helped us to build the boilerplate the right way :)


## Installation

```bash
$ npm install
```

## Setting up prisma

```bash
# login to prisma
$ npm run prisma login

# deploy prisma database
$ npm run prisma deploy

# generate prisma
$ npm run prisma generate

# generate graphql resolvers from schema.graphql
$ npm run resolver-codegen

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Endpoints

```bash
# nestjs rest endpoint 
localhost:3000

# graphql and playground endpoint 
localhost:3000/graphql
```
Deploying server on now.sh

* Below is the server endpoint deployed on now

```
https://graphql-boilerplate-server-wqrtiyktjn.now.sh/graphql

```

# Roadmap
+ [x] Authentication (JWT)
+ [O] Authentication (Passport)
+ [O] Authentication (Session)
+ [x] Prisma Graphql
+ [x] Apollo Server 2
+ [x] Realtime subscription
+ [x] Prisma Graphql
+ [O] File upload via rest
+ [O] File upload via graphql
+ [O] Redis support
