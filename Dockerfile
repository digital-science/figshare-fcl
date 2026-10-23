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

# The nginx image runs as www-data (non-root, so it listens on 8081, not 80); switch to
# root only to replace its config, then back at the end.
USER root
COPY --from=development /app/build /app

RUN rm -f /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
RUN echo "" > /etc/nginx/modules-enabled/modules.conf
RUN cat <<EOF > /etc/nginx/sites-enabled/default.conf
server {
    listen 8081 default_server;
    server_name _;

    error_log /dev/stdout info;

    location / {
        root /app;
        index index.html;
    }
}
EOF

# nginx -t runs as root here (access.log is a symlink to /dev/stdout, which www-data cannot
# open during a build) and may create /var/lib/nginx temp dirs, so hand them back.
RUN nginx -t && chown -R www-data:www-data /var/lib/nginx

USER www-data
