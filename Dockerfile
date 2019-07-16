FROM jdtzmn/horizon-docker:stein-tox

VOLUME /flocx-ui
COPY . /flocx-ui
RUN sh -x /flocx-ui/docker/install_flocx_ui.sh
