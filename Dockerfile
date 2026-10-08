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

RUN --mount=type=secret,id=npmrc,dst=/root/.npmrc \
    make build

FROM ${registry}/figshare/nginx:1.18 AS deployment

COPY --from=development /app/build /app

RUN rm -f /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
RUN echo "" > /etc/nginx/modules-enabled/modules.conf
RUN cat <<EOF > /etc/nginx/sites-enabled/default.conf
server {
    listen 80 default_server;
    server_name _;

    error_log /dev/stdout info;

    location / {
        root /app;
        index index.html;
    }
}
EOF

RUN nginx -t
