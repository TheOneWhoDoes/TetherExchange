FROM node:16
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# add app dependencies
COPY package.json ./

RUN npm install

COPY . ./

#ENTRYPOINT ["tail"]
#CMD ["-f","/dev/null"]
CMD ["node", "index.js"]
