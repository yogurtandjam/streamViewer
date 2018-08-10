
# Python support can be specified down to the minor or micro version
# (e.g. 3.6 or 3.6.3).
# OS Support also exists for jessie & stretch (slim and full).
# See https://hub.docker.com/r/library/python/ for all supported Python
# tags from Docker Hub.
FROM node:9-alpine

WORKDIR /app
COPY package.json requirements.txt /app/
# RUN apk --no-cache add --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers make python && \
#   npm install --quiet node-gyp -g &&\
#   npm install --quiet && \
#   pip install -r requirements.txt 
#ran this one already
# RUN apk update && \
#     apk --no-cache --virtual build-dependencies add \
#         python \
#         make \
#         g++ \
#         python-dev \
#         python-pip \
#         python-setuptools \
#         groff \
#         less \
RUN apk add --no-cache --virtual .build-deps g++ python3-dev libffi-dev postgresql-dev \
    && apk del libressl-dev \
    && apk add openssl-dev \
    && apk add --no-cache --update python3 \
    && pip3 install -r requirements.txt \
    && apk del openssl-dev \
    && apk add libressl-dev \
    && apk del .build-deps

COPY . /app

EXPOSE 5000
CMD [ "npm", "start" ]