# NestJS - Prisma - Apollo 2

### Using Prisma

* For using Prisma you should signup to https://app.prisma.io/ and deploy your server on it and the replace the end point in .env file

```
PRISMA_URL="PRISMA_URL="https://eu1.prisma.sh/your-workspace/yourendpoint/dev"
PORT=3000

```

## Description

### Motivation to use NestJS

* We already have the GraphQLModule in NestJS that is nothing more than a wrapper around the Apollo server. We don't reinvent the wheel but provide a ready to use a module instead, that brings a clean way to play with the GraphQL and Nest together.

#### NestJS Framework is not compatible with Apollo Server 2 as of now, so this was major win for us:)
 
 Thanks to [issue](https://github.com/nestjs/graphql/issues/32) that helped us to build the boilerplate the right way :)


## Installation

```bash
$ npm install
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

