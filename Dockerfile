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
    curl git make openssh-client
RUN mkdir -p -m 0600 /root/.ssh
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN apt-get install --no-install-recommends -y \
    gnupg ca-certificates \
    libmariadb-dev libmariadb-dev-compat \
    libssl-dev build-essential libmagic1

RUN apt-get update && apt-get install --no-install-recommends -y nodejs npm
RUN set -ex && node -v && npm -v

COPY . $projdir

WORKDIR $projdir

RUN --mount=type=ssh --mount=type=secret,id=npmrc,dst=/root/.npmrc \
    make install

RUN --mount=type=ssh --mount=type=secret,id=npmrc,dst=/root/.npmrc \
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
