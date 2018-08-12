<h1 align="center"><strong>NestJS - Prisma - Apollo 2</strong></h1>

<br />

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="220" alt="Nest Logo" /></a>
  <a href="http://prismagraphql.com/" target="blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAAB6CAMAAAAF6AYEAAAAflBMVEX///+k5a0nrmCE1Jeo57AApkqPz6bd7+P1+/f6/fs7s2wApkwApUcAqFAgrVzr9u9lv4e94sp5x5Zcu3+f5Kjj8ugRqlbD5M4ysWYAo0Gv3L+e1bFRunkAoTtyxZHk9+fM6Naw6LjI7810z4q97MTY89yEy50AnS/P8dWV1qjngAn6AAADKElEQVR4nO3Y7XKjIBgFYKUVERX8JH6ga7Zd273/G1zAmNak+y+tM855fmRIJTOcgi+o5wEAAAAAAAAAAAAAAAAAAAAAAAA8Ett7AN9l+nvQaJF++bP3GL5Hr56qQ06a5OLJf917FN+hUOTp+fnX3sN4vLolJln1Gu09kIcbhU3mV4crIp0iLplf7T2SB2NarMne9x7LY/UpuSTzn+Xeg3kkadfiJVn1ReXvyqwcaWibppUVnU0fZZn97Mx0j7kpPFlWus5RX461a/W8+KkE/zN/SuZX95WfBrrkrchNMxFaq0SbaJES5nsfNPOYarPFC9W67JKk3DU8nrY7L4BJkE/J/PNdB5qcTK+Em/EHpfmY294kI8RcChrzndmzC9HNbDvnqV6SnUTR9D8a5I5Wm2T3ld8l85pAXpKFw7gmG/TaScyZnUqPF1njks1pnfFd98dTQDbJ/PPt8XFJlqo1WT7QNZkO6KWTKLrYdGNttySTnHtUTT+Z5IZsyE2y6vdNFxp0dVgks5mAWOd5H3O5JpNlEsyuYIjMG8xy7Iks3WrM33JPXnPvoVe3yfzbMz9VIm2Hwq61VA1DULra6JJ5rNNtY6dUZNEoWFSW3pJMp7WMON+vhtRE3Ce7qfw0pl0eulsmKMOQu7vnksxmixtpk7HpbQrTfEnGEtGQRtgFupPsOmUfyXx/W/lpMq1Ne591sV1j12Tm0DnULpnkWdd6S7JejZTSWWlvJ1NMvkhWnTc1bakgjqsgXIWXZMxVQR0syczGaDdnm4yV3N59UZnstBxZKb5KdnN8pMM1WWs35TAhl51avjVj0aTU/COUSXZS8WSCmtp4SkfXv0t2qiHdx1rcJNsWka6c1mZG7YW+PHnRaDe1OeM66+wMj+ZKVMxmimhRe/nlJ+FI99nS5vh/yT7faRG7js4dN8wf1pOHx6RkH1euHxHb/ODnyUKIL5JVzwd4mMl1erdTV78P8SgTdWJ7IvbPh3nPwyhRH89n50O9CpmyYElWVe9He5s6cSGefP/1aLkM1jcvr4e5wbbqX8d7jQoAAAAAAAAAAAAAAAAAAAAAAAAH8Q/dUiuxOmE3dgAAAABJRU5ErkJggg==" width="220" alt="Nest Logo" /></a>
  <a href="http://apollographql.com/" target="blank"><img src="data:image/png;base64,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" width="220" alt="Apollo Logo" /></a>
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

