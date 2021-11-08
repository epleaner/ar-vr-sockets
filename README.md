# To start

First, `yarn install`

Then, start then server in one terminal window: `node server/app.js`
Start client in another terminal window: `yarn start`

Ensure you have your env file (.env) populated with REACT_APP_ENDPOINT, PORT, and CORSLOCAL.

Note: right now there is a bug where the server crashes when the client is restarted. It is best to stop the server when making changes and to restart it.
