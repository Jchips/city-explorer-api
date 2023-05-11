# City Explorer API

**Author**: Jelani R.
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

This is the server for the city explorer to get the weather data

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

To use API, use a GET request

GET: <http://localhost:3001/weather?searchQuery=[input a city name]>

Query parameters:

lat: Latitude of the city searched
lon: Longitude of the city searched
searchQuery: City Name searched

Example Response:

[
  {
    "description": "Low of 17.1, high of 23.6 with broken clouds",
    "date": "2021-03-31"
  },
  {
    "description": "Low of 17.5, high of 29.9 with few clouds",
    "date": "2021-04-01"
  },
  ...
]

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

Uses Node.js environment, express, cors and dotenv

![Server data flow example](/imgs/server-data-flow.png)

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->

05-06-2023 3:11pm - Application now has a fully-functional express server, with a GET route for the weather resource.

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

## Features

### Name of feature: Weather (placeholder)

Estimate of time needed to complete: At least 1 hour

Start time: 3:11p

Finish time: 5:45p

Actual time needed to complete: Like 2 and a half hours

### Name of feature: Weather (live)

Estimate of time needed to complete: at least 1 hour

Start time: 1:22a

Finish time: _____

Actual time needed to complete: _____
