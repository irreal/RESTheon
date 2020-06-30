# RESTheon

## Description

RESTheon is a started project to expose Pantheon (or other databases) as a REST service with basic authentication

## Authentication

Authentication is done via username and password.
To create a user, add it to the list in users.service.ts
You must generate a hash of the user's password. The hash gets stored in the user info.
**Do not store the user's plaintext password anywhere**

To generate a hash for a given plain text password, use

```bash
npm run hash:create my-plain-text-password
```

this will generate the hash. Store the hash in users.service.ts, send the plain text password (securely!) to the api client.

In order to authenticate, the client has to pass a "username" and a "password" field **with every request**
The fields should be query parameters for GET requests and inside the body for POST/PUT/DELETE requests.

_Warning: The authentication is not mandatory or ON by default._
Apply the authentication as needed using

```bash
@UseGuards(AuthGuard("local"))
```

either on a specific endpoint or on the entire controller

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
