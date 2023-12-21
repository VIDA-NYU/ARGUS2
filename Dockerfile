FROM node:16-slim AS build

WORKDIR /src
COPY ./ARGUS2/dist/urban-panoptes/* ./

# production env
FROM nginx:stable-alpine
COPY --from=build /src/* /usr/share/nginx/html
##COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
