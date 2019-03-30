1. create project directory
2. yarn/npm init
3. isntall packages:
      - body-parser
      - concurrently
      - express
      - mongoose
4. create server file in root directory
5. create basic routes
      - C: (create)
      - R: (read)
      - U: (update) // can add later
      - D: (delete)
6. connect to DB
7. create mongoose Schema
8. create model using Schema
9. test connection with POSTMAN
10. create client (front end) inside a sub-directory (here I call it 'client')
11. must add proxy setup to React package.json
       - below scripts: "proxy": "http://localhost:5000",
12. create a script that will run the client folder from the root directory package.json
       - add script: "client": "npm start --prefix client"
13. create a script in root package.json that will run both client and server concurrently
       - add script: "dev": "concurrently \"npm run server\" \"npm run client\""
14. create a script that will allow the installation of the client node_modules from the root level
       - add script: "client-install": "npm install --prefix client"

### NOTE

NOTE: --prefix is instruction for telling node to run that from the specified directory
TEST: by going to both localhost:3000 and localhost:5000/api/items (or whatever route you have to access your DB)

## Build/deploy to Heroku

1. Problem is that in dev, we've been able to run 2 servers. Our backend server and our front end CRA server. We used concurrently to run both servers with one command. We will not have access to the dev server in heroku.
2. We have to make sure that if the route hits /api/items, then we can access the api we need and manipulate the DB on mLab, but anything else, we want to load the index.html found in the public folder.
3. We have to use our server.js to tell heroku to load the client folder via index.html if the process.env.NODE_ENV === 'production'

```
// import path (a provided Node module)
const path = require('path');

// give build instructions for heroku deployment
// Serve static assets 'build' folder if in production
if (process.env.NODE_ENV === 'production') {
        // set static folder
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
}
```

4. Now we have to add the postbuild script, placed in package.json of the server (located in the root directory of the entire project)

```
        "scripts": {
                "client-install": "npm install --prefix client",
                "start": "node server.js",
                "server": "nodemon server.js",
                "client": "npm start --prefix client",
                "dev": "concurrently \"npm run server\" \"npm run client\"",
                "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
        }
```

NOTE: we initially set production to false in order to flag this and have it run the npm commands, then we install the client package, the build the client package.

5. make sure you have heroku cli installed
6. from command line >>> heroku create <app-name-here>
7. make sure to commit all changes, push to github
8. then use git push heroku master
