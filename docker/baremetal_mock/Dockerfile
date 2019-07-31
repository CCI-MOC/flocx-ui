FROM node:alpine

# Create app directory
WORKDIR /usr/src/app
COPY . .

# Install dependencies
RUN yarn

EXPOSE 80
CMD [ "yarn", "start" ]
