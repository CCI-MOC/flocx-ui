# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Controller to handle tab-based navigation

### Removed

- Unnecessary page header html template

## [1.1.0] - 2019-08-08

### Added

- Project id's to generated Ironic nodes in the Ironic mock
- An endpoint to the Ironic mock to make it work with the flocx provider API
- Schema validation for provider offer objects

### Changed

- Ironic mock now uses the same id for every node-list request
- The flocx.py service into two separate services for each of the flocx API's
- The "Create offer" modal to reflect the flocx service API changes
- The "Create offer" modal so that the start and end dates and times are on the same line

## [1.0.2] - 2019-08-07

### Added

- Ironic service and REST API endpoints
- Additional comments where necessary
- "Displaying X items" text at the bottom of data tables
- A modal to create offers from existing nodes
- A date filter to make using dates in the UI and throughout the application much simpler
- Constants for certain values to allow easy customization
- A detailed node list controller that merges data from Ironic with data from the flocx-market

### Changed

- Flocx service to handle incoming data in the form of bytes instead of as already decoded JSON
- Now uses a node list merged with existing offers instead of using a separate offer list
- Test coverage thresholds to be 30% from 50%
- Certain API paths to have a final '/' at the end where there was not one previously

### Fixed

- The offer schema validation to accomodate changes in the flocx API

## [1.0.1] - 2019-08-01

### Added

- Contract endpoint to service API
- Contract list user interface

### Changed

- Docker config to use a different horizon image tag

### Removed

- "Create an offer" button from the navbar

## [1.0.0] - 2019-07-25

### Added

- VSCode files to `.gitignore`
- `api/schema.py` to validate the schema in a request to create an offer
- REST API endpoints to create an offer and get an offer's details

### Changed

- The API to work with the flocx-market directly. This meant adding an `X-Auth-Token` header along with all API calls
- Developer documentation to reflect the API changes from a mock backend to using the flocx-market directly

### Removed

- `handle_error` decorator from the flocx.py API service since it is already handled in the flocx_rest_api.py `@rest_utils.ajax` decorator
- keystone service from `docker-compose.yml` since the flocx-ui plugin will now talk directly with the flocx-market API

## [0.1.0] - 2019-07-25

### Added

- eslint for JavaScript linting
- .travis.yml to lint JavaScript
- Basic flocx service and REST API
- Flocx JavaScript service client
- Offer list page
- pylint linting
- JavaScript testing using karma
- Registration unit tests
- API unit tests
- Scaffold for integration tests (not yet in use)
- docker-compose config along with accompanying scripts and Dockerfile
- A section in the CONTRIBUTING.md on how to setup the development environment using docker-compose
- Test scripts to the package.json for tests and linters in both python and JavaScript
- Documentation to the CONTRIBUTING.md on running the tests and linters
- Docker containers can now access the flocx-market server when it is running on the host

### Changed

- Updated .gitignore to include node.js
- Page header to be an angular page instead of a horizon header
- The environment variable names to customize the host and port of the flocx market server from `DEFAULT_API_HOST` and `DEFAULT_API_PORT` to `FLOCX_API_HOST` and `FLOCX_API_PORT`

### Fixed

- A bug where angular would not be able to locate the openstack-service-api.nova module when a file named `flocx.service.js` existed

### Removed

- Unnecessary requirements

## [0.0.2] - 2019-07-08

### Added

- CONTRIBUTING.md file to document the contributing procedure

### Changed

- README.rst to README.md (at least until sphinx is used later to generate docs)

## [0.0.1] - 2019-07-01

### Added

- Initial directory structure
