# Transaction Commission Fee Calculation

Basic Cash In, Cash Out transaction commission fee calculation application using Node.

## Overview

Getting configurations for cash in, cash out from live mock APIs. Calculating commission fee is kept generic depending on the configuration from APIs for both cash in and cash out.

## Requirements

1. node (>=16 recommended)

## Installation

1. Clone or download the project.
2. Inside the project directory install dependencies

   ```bash
   npm install
   ```

3. Database configs are in `.env`. If you want to use another database see [dialect specific documentation for Sequelize](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/). Database related codes are under `src/db` directory. Change according to your development environment.

    ```bash
    DB_HOST='localhost'
    DB_NAME='bank'
    DB_USER=''
    DB_STORAGE=':memory:'
    DB_PASSWORD=''
    DB_DIALECT='sqlite'
    PORT=
    ```

    For unit testing, configs for database are in `.env.test`

## Test

   ```bash
   npm run test
   ```

## Run

1. Inside the root project directory. `.` refers to `index.js` in root project directory. `data/input.json` is the input file path. Change file path according to need.

   ```bash
   node . data/input.json
   ```

## Build

1. `parcel` is used to build the application.

   ```bash
   npm run build
   ```

## Known limitations

1. Exception handling in all edge cases
2. More test cases for edge cases
