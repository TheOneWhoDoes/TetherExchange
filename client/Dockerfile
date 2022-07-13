# Use a lighter version of Node as a parent image
FROM node:alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# add app dependencies
COPY package.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]

