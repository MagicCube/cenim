FROM node:boron

MAINTAINER Henry Li <henry1943@163.com>

# Use Alibaba's NPM mirror
RUN npm set registry https://registry.npm.taobao.org/

# creat workdir
RUN mkdir -p /usr/projects/ocn
WORKDIR /usr/projects/ocn

# Install dependencies
COPY package.json /usr/projects/ocn
RUN npm install --production

# copy other codes and resources
COPY . /usr/projects/ocn

EXPOSE 3000
# ENTRYPOINT diff CMD CDM can be overrided
CMD [ "npm", "start" ]
