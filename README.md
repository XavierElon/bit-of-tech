## AVAX NFT IAM System

This is an NFT IAM System built for the Avalanche Network

## Prerequisites

### Local Go Environment

- Download and install Go
- Configure $GOPATH and build directory
  - `export GOPATH=$HOME/go`
  - go version go1.17.6

### Node Version

- Windows: 16.14.0
- Mac/Linux: 17.0.1

### Project Dependencies

- Metamask Wallet Chrome Extension

### Node Version

- Windows: 16.14.0
- Mac/Linux: 17.1.0

## Building The Project

### Building the UI

- From the root project directory, run `yarn install`, then `yarn build`.
- Copy the contents of the `.env.example` file into a new file called `.env`.
- Create a free [Moralis account](https://moralis.io/) and grab the environment variables according to the `.env.example` file.
- Once you have your API keys, deploy the application by running `yarn start`.
- Navigate to (http://localhost:3000)

### Building the contracts

- Navigate to the frontend folder, run `yarn install`.
- Compile the contracts by running `yarn compile`.

## Local Development using Avalanche Network Simulator

### AVA-Sim Local Avax Simulator

- This is used for local development
- Navigate to the ava-sim folder
- Build the project binaries using `./scripts/build.sh`
- Run the local network using `./scripts/run.sh`

## Deploying The Contracts

- Deploy the contracts by running `yarn deploy --network fuji scripts/deploy.ts`

## Running the Frontend

- Run the program by running `yarn start` from the root directory
