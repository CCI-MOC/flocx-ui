# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
