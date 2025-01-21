# fpbooks

## Introduction

Book API - one App to read them all

## Main Features

- Production and dev environment clearly distinguished
- User management and Authorization
- Full Github pipeline with build, unit tests, docker deploy, integration tests for deployment readiness
- Rate limiting to limit API calls
- Advanced search with pagination, filtering and sorting

## Project Structure

```shell
src/
 ├── controllers/     # API Controllers
 ├── routes/          # API Routes
 ├── services/        # Business Logic
 ├── models/          # Database Models
 ├── middlewares/     # Auth, Logging
 ├── config/          # Configuration
 ├── tests/           # Unit & Integration Tests
 ├── app.ts           # Express App
 ├── server.ts        # Server Entry
```

## Getting started

### Pre-requisites

Node and NPM installed

### Project setup

Install the dependencies
```shell
npm install
```


### Tests