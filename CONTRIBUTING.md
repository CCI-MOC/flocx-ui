# Contributing to Flocx-ui

Every developer should be able to contribute to flocx-ui while ensuring that the master branch is always in a pristine state.

To adhere to this idea please follow the procedure given below when contributing to flocx-ui.

* Create an issue at <https://github.com/CCI-MOC/flocx-ui/issues> to propose new features, report bugs, and seek clarifications.
* Keep your master branch in sync with the upstream master: <https://github.com/CCI-MOC/flocx-ui>
* To contribute any changes to flocx-ui, first checkout a new branch from the master branch of your local fork of FLOCX.
* Once the patch is ready, create a Pull Request on the upstream repository.
* When the tests pass and review comments are addressed it will be merged with the master.

## Project Structure

This project follows the Horizon plugin structure outlined in the [Horizon docs](https://docs.openstack.org/horizon/latest/contributor/tutorials/plugin.html#file-structure).

## Setting up the development environment

### Prerequisites

* [docker](https://www.docker.com/) — as well as docker-compose
* [flocx-market](https://github.com/CCI-MOC/flocx-market) — Flocx-market should be running on port `8080`.

> You can also specify a host and a port for the flocx-market using the `FLOCX_API_HOST` and `FLOCX_API_PORT`.
>
> The defaults are `http://localhost` and `8080` respectively.

### Using docker

Flocx-ui comes with a docker-compose file to automatically setup a keystone instance, configure a horizon dashboard at `http://localhost:8080`, and install the flocx-ui plugin on that instance:

Startup the docker-compose setup

```sh
$ docker-compose up
```
