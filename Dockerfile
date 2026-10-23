ARG registry=942286566325.dkr.ecr.eu-west-1.amazonaws.com
FROM ${registry}/figshare/ubuntu24.04:3.12-node22 AS development
LABEL org.opencontainers.image.source https://github.com/digital-science/figshare-fcl

ENV ENV=production
ENV TERM=xterm
ENV ELASTIC_APM_LOG_LEVEL=fatal

ARG projdir=/app
ARG CI=true

# curl, git, make, build tools, libmariadb, libssl, libmagic and Node 22 all come from
# the base image (figshare/ubuntu24.04:3.12-node22).
RUN node -v && npm -v

COPY . $projdir

WORKDIR $projdir

# Only the private npm registry (@digital-science on npm.pkg.github.com,
# via .npmrc) is needed - no git+ssh private deps here, so no SSH-agent
# forwarding to keep supporting once Jenkins no longer builds this repo.
RUN --mount=type=secret,id=npmrc,dst=/root/.npmrc \
    make install

RUN --mount=type=secret,id=npmrc,dst=/root/.npmrc \
    make build

FROM ${registry}/figshare/ubuntu24.04:nginx AS deployment

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
