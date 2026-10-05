ARG registry=942286566325.dkr.ecr.eu-west-1.amazonaws.com
FROM ${registry}/figshare/debian:11 AS development
LABEL org.opencontainers.image.source https://github.com/digital-science/figshare-fcl

ENV ENV=production
ENV TERM=xterm
ENV ELASTIC_APM_LOG_LEVEL=fatal

ARG projdir=/app
ARG CI=true

# Base
RUN apt-get update
RUN apt-get install --no-install-recommends -y \
    curl git make

RUN apt-get install --no-install-recommends -y \
    gnupg ca-certificates \
    libmariadb-dev libmariadb-dev-compat \
    libssl-dev build-essential libmagic1

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install --no-install-recommends -y nodejs
RUN set -ex && node -v && npm -v

COPY . $projdir

WORKDIR $projdir

# Only the private npm registry (@digital-science on npm.pkg.github.com,
# via .npmrc) is needed - no git+ssh private deps here, so no SSH-agent
# forwarding to keep supporting once Jenkins no longer builds this repo.
RUN --mount=type=secret,id=npmrc,dst=/root/.npmrc \
    make install

# No production build/nginx stage - this is a dev-environment documentation
# site only, not a performance-critical production asset. Running the
# Storybook dev server directly sidesteps Storybook 10.5/Vite 8's new
# Rolldown/Oxc production bundler entirely, which is far stricter about
# JSX-in-.js files (see packages/ui/icons/spinner/spinner.js) than the
# esbuild-based dev-server path every frontend dev already uses locally -
# chasing that through increasingly fragile, still-shifting Rolldown config
# (hit a real regression testing an esbuild loader override; even the
# config itself is already deprecated within this same Vite 8 release) was
# a worse trade than just running the thing everyone already knows works.
EXPOSE 9001
CMD ["make", "server"]
