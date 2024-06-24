# XML TEI Editor for Scribes app

## Usage

TODO

## Develop

This project rely on the following tools:

- Docker [https://www.docker.com/]()
- Docker Compose [https://docs.docker.com/compose/]()
- Make [https://www.gnu.org/software/make/]()

### Install

- Copy `.docker/.env.example` to `.docker/.env` and adjust the values to your needs
- Run `make up` (once installed you can use `make start` to start the docker compose)
- Run `make install`

### Start the development

- Run `make dev`

### Build the project

- Run `make build`

### Start or stop docker compose services

- Run `make (start|stop)`

### Uninstall

- Run `make down`