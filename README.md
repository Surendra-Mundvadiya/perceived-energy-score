# Perceived Energy Score API

## Overview

The Perceived Energy Score API is a back-end service that allows users to track and analyze various aspects of their daily lives, such as sleep, mood, and activities. Built with Node.js and MongoDB, this RESTful API is designed to be both flexible and user-friendly.

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [Sleep Data](#sleep-data)
  - [Mood Data](#mood-data)
  - [Activity Data](#activity-data)
- [Data Fetching](#data-fetching)
- [License](#license)

## Installation

### Prerequisites

- Node.js installed on your system. If not, download and install it from [here](https://nodejs.org/).
- MongoDB connection string

### Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/Surendra-Mundvadiya/perceived-energy-score.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd perceived-energy-score
    ```

3. **Install the Required Dependencies**

    ```bash
    npm install
    ```

4. **Create .env File**

    Create a `.env` file in the root directory of the project. Inside this file, specify your MongoDB connection string as follows:

    ```env
    DB_URI=[Your MongoDB Connection String]
    ```

5. **Build the Project**

    ```bash
    npm run build
    ```

6. **Start the Server**

    ```bash
    npm run serve
    ```

    The server will now be running at `http://localhost:3000`.

## API Endpoints

### User Registration

- **Endpoint:** `/users/register`
  
    This will automatically add two default users into the MongoDB database.

### Sleep Data

- **Endpoint:** `/sleep/addSleepData`

    This will add default sleep data to the database. Ensure you update the user ID to match the user you have created.

### Mood Data

- **Endpoint:** `/mood/addMoodData`
  
    This will add default mood data for the specified user.

### Activity Data

- **Endpoint:** `/activity/addActivityData`
  
    This endpoint adds default activity data from a CSV file.

## Data Fetching

### Using Aggregation Pipeline

- **Endpoint:** `/users/:userId?date=:date`

    Fetches user data using MongoDB's aggregation pipeline. Make sure to replace `:userId` with the user's MongoDB `_id` and `:date` with the desired date in the format `YYYY-MM-DD`.

### Without Using Aggregation Pipeline

- **Endpoint:** `/users/v2/:userId?date=:date`

    Fetches user data without using MongoDB's aggregation pipeline. Same replacement rules as above apply.

## Notes

- `:userId` refers to `User._id` from MongoDB.
- `:date` must be in `YYYY-MM-DD` format.

## License

This project is licensed under the MIT License.
