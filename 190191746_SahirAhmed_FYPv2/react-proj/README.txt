To try and run the application yourself

First we navigate to the server folder, and run npm install to install all the necessary dependencies and packages

cd server
npm install
(Go to the mysql.js file and put in the necessary username and password for your own SQL server)
(Go on mySQL workbench and create a schema called charity, import the table schema to the connected server given by the additional SQL file in the project folder)
npm run devStart OR nodemon server.js OR node index.js

-This should start up the server 

Then we also in another terminal, navigate to the client folder, and run

cd client
npm install
npm start

-this should run the client/frontend