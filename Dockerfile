
# Python support can be specified down to the minor or micro version
# (e.g. 3.6 or 3.6.3).
# OS Support also exists for jessie & stretch (slim and full).
# See https://hub.docker.com/r/library/python/ for all supported Python
# tags from Docker Hub.
# FROM node:9-alpine

# WORKDIR /app
# COPY package.json requirements.txt /app/

# RUN apk add --no-cache --virtual .build-deps g++ python3-dev libffi-dev postgresql-dev linux-headers make python \
#     && apk add --update python3 \
#     && pip3 install -r requirements.txt 

# COPY . /app

# EXPOSE 5000

FROM ubuntu:14.04
RUN apt-get update -y
RUN apt-get install --yes nodejs
# RUN sudo apt-get install npm
RUN apt-get install -y python-pip python-dev build-essential curl 

WORKDIR /app
COPY package.json requirements.txt /app/
RUN pip install -r requirements.txt \
    && npm install
COPY . /app

CMD [ "npm", "start" ]
