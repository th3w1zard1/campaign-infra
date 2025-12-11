#!/bin/bash

# Ensure required environment variables are set
if [ -z "$CAMPAIGN_DOMAIN" ]; then
    echo "Error: CAMPAIGN_DOMAIN must be set"
    exit 1
fi

if [ -z "$BASIC_AUTH_USERS" ]; then
    echo "Warning: BASIC_AUTH_USERS not set - staging environment will not be password protected"
fi

docker network create --attachable \
    --subnet ${DOCKER_SUBNET:-10.24.0.0/16} \
    --ip-range ${DOCKER_IP_RANGE:-10.24.0.0/16} \
    --gateway ${DOCKER_GATEWAY:-10.24.0.1} \
    campaignnet

docker run -d --net campaignnet --name campaign -h campaign \
    -e TZ=${TZ:-America/Chicago} \
    -e PUID=${PUID:-1001} \
    -e PGID=${PGID:-989} \
    -e UMASK=${UMASK:-002} \
    --expose 3000 \
    -l traefik.enable=true \
    -l "traefik.http.routers.campaign.rule=Host(\`campaign.${CAMPAIGN_DOMAIN}\`)" \
    -l traefik.http.routers.campaign.entrypoints=web,websecure \
    -l traefik.http.routers.campaign.tls=true \
    -l traefik.http.routers.campaign.tls.certresolver=campaign_letsencrypt \
    -l traefik.http.routers.campaign.middlewares=campaign-auth \
    -l "traefik.http.middlewares.campaign-auth.basicauth.users=${BASIC_AUTH_USERS}" \
    -l traefik.http.routers.campaign.service=campaign \
    -l traefik.http.services.campaign.loadbalancer.server.port=3000 \
    --restart always \
    campaign-website:latest

docker run -d --net campaignnet --name code-campaign -h code-campaign \
    -v ${CONFIG_PATH:-./configs}/code-server/campaign/config:/config \
    -v ${SRC_DIR:-./src}/web:/workspace \
    --env-file ${CONFIG_PATH:-./configs}/code-server/host_config/.env_campaign_website \
    -e TZ=${TZ:-America/Chicago} \
    -e PUID=${PUID:-1001} \
    -e PGID=${PGID:-989} \
    -e UMASK=${UMASK:-002} \
    -l traefik.enable=true \
    -l "traefik.http.routers.code-campaign.entrypoints=web,websecure" \
    -l "traefik.http.routers.code-campaign.rule=Host(\`code.${CAMPAIGN_DOMAIN}\`)" \
    -l traefik.http.routers.code-campaign.tls=true \
    -l traefik.http.routers.code-campaign.tls.certresolver=campaign_letsencrypt \
    -l traefik.http.routers.code-campaign.middlewares=code-campaign-auth \
    -l "traefik.http.middlewares.code-campaign-auth.basicauth.users=${BASIC_AUTH_USERS}" \
    -l traefik.http.routers.code-campaign.service=code-campaign \
    -l traefik.http.services.code-campaign.loadbalancer.server.port=8443 \
    --restart always \
    linuxserver/code-server:latest

docker run -d --net campaignnet --name traefik -h traefik \
    -p 80:80 -p 443:443 \
    --cap-add NET_ADMIN \
    --sysctl net.ipv6.conf.all.disable_ipv6=${DISABLE_IPV6:-1} \
    -v ${CERTS_PATH:-./certs}:/certs \
    -v ${CONFIG_PATH:-./configs}/traefik/config:/config \
    -v ${CONFIG_PATH:-./configs}/traefik/etc/traefik:/etc/traefik \
    -v ${CONFIG_PATH:-./configs}/traefik/plugins-local:/plugins-local \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -e TZ=${TZ:-America/Chicago} \
    -e PUID=${PUID:-1001} \
    -e PGID=${PGID:-989} \
    -e UMASK=${UMASK:-002} \
    -e LETS_ENCRYPT_EMAIL=${LETS_ENCRYPT_EMAIL} \
    -e LEGO_DISABLE_CNAME_SUPPORT=${LEGO_DISABLE_CNAME_SUPPORT:-false} \
    -e DUCKDNS_TOKEN=${DUCKDNS_TOKEN} \
    -l traefik.enable=true \
    -l traefik.http.routers.traefik.entrypoints=web,websecure \
    -l "traefik.http.routers.traefik.rule=Host(\`traefik.${CAMPAIGN_DOMAIN}\`)" \
    -l traefik.http.routers.traefik.tls=true \
    -l traefik.http.routers.traefik.tls.certresolver=campaign_letsencrypt \
    -l traefik.http.routers.traefik.middlewares=traefik-auth \
    -l "traefik.http.middlewares.traefik-auth.basicauth.users=${BASIC_AUTH_USERS}" \
    -l traefik.http.routers.traefik.service=traefik \
    -l traefik.http.services.traefik.loadbalancer.server.port=8080 \
    --restart always \
    traefik:latest \
    --configFile=/config/traefik.yaml