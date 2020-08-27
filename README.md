# Learncove API

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)*  (if you prefer to use it locally)

# Getting started
- Clone the repository
```
git clone <url to project>
```
- Install dependencies
```
cd <project_name>
npm i
```
- For development purpose and watch run next command
```
npm run watch
```
- Build and run the project
```
npm run build
```
Finally, navigate to `http://localhost:3003` and you should see the template being served and rendered locally!

The full folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **public**               | Static assets that will be used client side                                                   |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | Passport authentication strategies and login middleware. Add other complex config code here   |
| **src/controllers**      | Controllers define functions that respond to various http requests                            |
| **src/models**           | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/types**            | Holds files that describe types of entities                                                   |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains your tests. Seperate from source because there is a different build process.         |
| **views**                | Views define how your app renders on the client. In this case we're using pug                 |
| **i18n**                 | Translations that is using for .ejs pages rendered for auth part                              |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| jest.config.js           | Used to configure Jest                                                                        |
| package.json             | File that contains npm dependencies                                                           |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tslint.json              | Config settings for TSLint code style checking                                                |
