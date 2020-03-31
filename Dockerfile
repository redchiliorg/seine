FROM node:12-alpine

# Add sources to container path and set as working directory
ADD . /app
WORKDIR /app

# Set packages cache dirs
RUN yarn config set cache-folder /app/.yarn

# Build app for production
RUN yarn --prod --frozen-lockfile

# Clean packages cache dirs
RUN rm -rf /app/.yarn

# Expose public port which is 5000 by default in zeit/serve
EXPOSE 5000

# Pass all commands through yarn
ENTRYPOINT ["yarn"]

#  See https://bit.ly/2KAt3ZF for CLI options
CMD ["start"]
