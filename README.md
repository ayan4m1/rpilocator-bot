# rpilocator-bot

Notify yourself via email when a Raspberry Pi is available.

Uses [rpilocator.com](https://rpilocator.com/) - support them if you use this!

## Prerequisites

- Node.js >=16.x

## Setup

Use your favorite package manager to install dependencies:

> npm install

## Configuration

Create a configuration file from the default:

> cp .env.default .env

Now edit `.env` with your favorite text editor.

## Usage

Run the application locally with:

> node src/index.js

## Docker

To run the application using Docker, follow the Configuration section and then run:

> docker compose up -d
