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
