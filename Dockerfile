FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
COPY docker_commands.sh ./
EXPOSE 3000
CMD ["sh","docker_commands.sh"]
# CMD [ "npm", "start" ]
# CMD ["npx", "knex", "migrate:latest", "&&", "npm", "start"]
