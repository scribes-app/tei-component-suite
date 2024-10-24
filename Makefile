include .docker/.env
MAKEFLAGS += --silent

up:
	docker compose -f .docker/docker-compose.yml up -d

down:
	docker compose -f .docker/docker-compose.yml down

start:
	docker compose -f .docker/docker-compose.yml start

stop:
	docker compose -f .docker/docker-compose.yml stop -t 3

install:
	bash .docker/commands/npm ci
	bash .docker/commands/icons

build-icons:
	bash .docker/commands/icons

shell:
	bash .docker/commands/bash

logs:
	docker compose -f .docker/docker-compose.yml logs -f

dev:
	bash .docker/commands/stencil build --dev --watch --serve

build:
	rm -rf dist loader
	bash .docker/commands/icons
	bash .docker/commands/stencil build

npm:
	read -p "Enter the npm command: " command; \
	bash .docker/commands/npm $$command

stencil:
	read -p "Enter the Stencil CLI command: " command; \
	bash .docker/commands/stencil $$command

publish:
	rm -rf dist loader
	bash .docker/commands/icons
	bash .docker/commands/stencil build
	read -p "Which kind of version would you like to publish (major | minor | patch): " version; \
	npm version $$version
	bash .docker/commands/publish

