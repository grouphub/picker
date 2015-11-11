FROM node:4-wheezy

ENV APP_HOME /sequoia-app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install dependencies.
ONBUILD RUN npm install

# Seed the database.
ONBUILD RUN SOURCE ./bashrc
ONBUILD RUN gulp seed

# Open in the browser.
#open 'http://localhost:9292'

# Re-fetch zipcode data
#
ONBUILD RUN gulp fetch-zips


ONBUILD COPY package.json $APP_HOME
ONBUILD RUN npm install
ONBUILD COPY . $APP_HOME

CMD [ "npm", "start" ]

