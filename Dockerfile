FROM node:18-bookworm

#create /var/app dir
RUN mkdir -p /var/app

# change to appdir
WORKDIR /var/app

# copy package.json
ADD ./package.json ./

# install dependencies
RUN npm install

# copy code
ADD . .

# build code
RUN npm run build

# remove devDependencies
RUN npm prune --production

# Install wget and dependencies to fetch Temporal CLI
RUN apt-get update && apt-get install -y wget tar && \
    wget https://github.com/temporalio/cli/releases/download/v1.1.2/temporal_cli_1.1.2_linux_arm64.tar.gz && \
    tar -xvzf temporal_cli_1.1.2_linux_arm64.tar.gz && \
    mv temporal /usr/local/bin/

# Make sure the script is executable
RUN chmod +x /var/app/startup.sh

# Initialize Temporal CLI
ENTRYPOINT [ "/var/app/startup.sh" ]

# start command
CMD [ "npm", "run", "start:prod" ]