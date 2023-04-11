# Dongrami

Dongrami is a web application that allows you to sign transactions with your keystore, formatted as [Web3 Secret Storage](https://ethereum.org/en/developers/docs/data-structures-and-encoding/web3-secret-storage/)

> **Warning**  
> This application is still in development, and is not ready for production use. Use at your own risk.

## How to run

### Run in development mode

```shell
yarn install
yarn dev
```

### Run in production mode

```shell
yarn install
yarn build
yarn preview
```

### Run in docker

```shell
docker build -t dongrami .
docker run -p 3000:4173 dongrami
```

## How to use

Visit Application URL with your browser.

> **Application URL**  
> Development mode: http://localhost:5173  
> Production mode: http://localhost:4173  
> Docker: http://localhost:(Port you set)
