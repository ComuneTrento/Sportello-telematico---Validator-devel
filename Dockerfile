FROM node:10.15.0-alpine as frontend_builder

RUN npm install -g yarn
COPY ./frontend /src

RUN cd /src && \
    yarn install && \
    yarn build

FROM python:3.7.2

# Save git commit hash.
ARG GIT_COMMIT_SHA='no_release'
ENV GIT_COMMIT_SHA $GIT_COMMIT_SHA

ENV PYTHONUNBUFFERED 1

COPY ./server /code
COPY --from=frontend_builder /src/build /code/validator_devel/static
COPY ./build/docker/settings.yaml /code/validator_devel/config/settings_template.yaml

WORKDIR /code

RUN pip --no-cache-dir install .

EXPOSE 8080

ENTRYPOINT ["validator-devel"]
