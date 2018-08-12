<h1 align="center"><strong>NestJS - Prisma - Apollo 2</strong></h1>

<br />

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="220" alt="Nest Logo" /></a>
  <a href="http://tinypic.com?ref=2istvfk" target="_blank"><img width="220" src="http://i68.tinypic.com/2istvfk.png" border="0" alt="Prisma Logo"></a>
  <a href="http://tinypic.com?ref=ojmu13" target="_blank"><img width="190" height="120" src="http://i64.tinypic.com/ojmu13.png" border="0" alt="Apollo Logo"></a>
</p>

<div align="center"><strong>Bootstrap your Nestjs Prisma app within seconds</strong></div>
<div align="center">Comes with prisma api code completion, making writing prisma db queries fun doing</div>

<br />

### Prisma

* For using Prisma as an end point you should signup to [prisma](https://app.prisma.io/) and deploy your server. If you want to read more about deploying (check out the prisma [docs](https://www.prisma.io/docs/reference/cli-command-reference/database-service/prisma-deploy-kee1iedaov/))
```
PRISMA_URL="PRISMA_URL="https://eu1.prisma.sh/your-workspace/yourendpoint/dev"
PORT=3000
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
        default: http://localhost:3000
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

#### NestJS Framework is not compatible with Apollo Server 2 as of now, so this was major win for us:)
 
 Thanks to [issue](https://github.com/nestjs/graphql/issues/32) that helped us to build the boilerplate the right way :)


## Installation

```bash
$ npm install
```

## Setting up prisma

```bash
# install prisma cli
$ npm i prisma -g

# login to prisma cloud
$ prisma login

# deploy prisma database
₦ prisma deploy
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

