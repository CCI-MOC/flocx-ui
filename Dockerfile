FROM jdtzmn/horizon-docker:tox-stein

VOLUME /flocx-ui
COPY . /flocx-ui
RUN sh -x /flocx-ui/docker/install_flocx_ui.sh
