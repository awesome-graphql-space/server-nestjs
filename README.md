<h1 align="center"><strong>NestJS - TypeORM -MySQL -Graphiql -Prisma/graphql-playground - Subscriptions</strong></h1>

<br />

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="220" alt="Nest Logo" /></a>
  <a href="http://tinypic.com?ref=2istvfk" target="_blank"><img width="220" src="http://i68.tinypic.com/2istvfk.png" border="0" alt="Prisma Logo"></a>
  <a href="http://tinypic.com?ref=ojmu13" target="_blank"><img width="190" height="120" src="http://i64.tinypic.com/ojmu13.png" border="0" alt="Apollo Logo"></a>
</p>

<div align="center"><strong>Bootstrap your Nestjs Prisma app within seconds</strong></div>
<div align="center">Comes with prisma api code completion, subscriptions , nest auth , jwt  fun doing</div>

<br />

### MYSQL DB Settings

* For using Mysql Database 
```
#clone repo
git clone https://github.com/nelsonBlack/server-nestjs.git

#change to projects dir
cd server-nestjs

#install node module packages
npm install

```
Configure Database connection , in this case mySql and create an empty database in your mysql server
Dont worry about tables , we will create them using typeORM Migrations

* Edit ormconfig.json file  found at /server-nestjs/ormconfig.json


ormconfig.json should have the below code to generate prisma.ts file:

```
{
   "type": "mysql", 
   "host": "localhost",
   "port": 3306,
   "username": "root",  //mysql server username
   "password": "2313", //mysql server password
   "database": "tweet", //database name
   "synchronize": false, //
   "logging": true,
   "entities": [
    "src/**/**.entity{.ts,.js}"
   ],
   "migrations": [
      "migration/**/*.ts"
   ],
  
   "cli": {
     
      "migrationsDir": "migration" //where migrations will be stored 
      
   }
}
        
```

## Description

### Motivation to use NestJS

* Nest is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). NestJS reduces the process involved in setting up a nodejs server.




## Installation , Make sure you have done the MYSQL DB Settings step by edditing ormconfig.json file and created empty db and set credentials in ormconfig.json

```bash
$ npm install
```

## Setting up database 

```bash
# create migrations from the already defined entites 
$ yarn migration:generate --name firstmigration

# run the created migrations to create db tables 
$ yarn migration:run

# run the application 
$ yarn migration:run

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
# nestjs graphql playground endpoint 
http://localhost:3000/graphiql


```


* Credits

```
Initial project was cloned from https://github.com/manjula91/server-nestjs then added mysql, changed folder structure , and files added etc  

```


