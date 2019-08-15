FROM node:8-alpine

# Add sources to container path and set as working directory
ADD . /app
WORKDIR /app

# Build app for production
RUN yarn config set cache-folder /app/.yarn
RUN yarn install
RUN yarn build

# Clean packages cache dirs
RUN rm -rf /app/.yarn

# Pass all commands through yarn
ENTRYPOINT ["yarn"]

#  See https://bit.ly/2KAt3ZF for CLI options
CMD ["start"]
