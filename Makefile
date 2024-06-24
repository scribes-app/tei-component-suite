MAKEFLAGS += --silent

up:
	$(eval export $(shell cat .docker/.env | xargs))
	docker compose -f .docker/docker-compose.yml up -d

down:
	$(eval export $(shell cat .docker/.env | xargs))
	docker compose -f .docker/docker-compose.yml down

start:
	$(eval export $(shell cat .docker/.env | xargs))
	docker compose -f .docker/docker-compose.yml start

stop:
	$(eval export $(shell cat .docker/.env | xargs))
	docker compose -f .docker/docker-compose.yml stop -t 3

install:
	$(eval export $(shell cat .docker/.env | xargs))
	bash .docker/commands/npm ci
	bash .docker/commands/icons

build-icons:
	$(eval export $(shell cat .docker/.env | xargs))
	bash .docker/commands/icons

shell:
	$(eval export $(shell cat .docker/.env | xargs))
	bash .docker/commands/bash

logs:
	$(eval export $(shell cat .docker/.env | xargs))
	docker compose -f .docker/docker-compose.yml logs -f

dev:
	$(eval export $(shell cat .docker/.env | xargs))
	bash .docker/commands/stencil build --dev --watch --serve

build:
	$(eval export $(shell cat .docker/.env | xargs))
	bash .docker/commands/icons
	bash .docker/commands/stencil build

npm:
	$(eval export $(shell cat .docker/.env | xargs))
	read -p "Enter the npm command: " command; \
	bash .docker/commands/npm $$command

stencil:
	$(eval export $(shell cat .docker/.env | xargs))
	read -p "Enter the Stencil CLI command: " command; \
	bash .docker/commands/stencil $$command

