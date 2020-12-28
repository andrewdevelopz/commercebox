# Commerce Box
A handy seller toolbox which helps businesses maintain inventory, daily to dos, get analytic reports and more. The application consists of 3 main directories. `server` for the backend api, `client` for the front end and `mobile` for the mobile version.

## Getting Started

These instructions will get you up and running for development on your local machine.

### Installing

First clone the repo in your chosen directory.

```
git clone https://github.com/akeon-lee/commercebox
```

Then cd into the directory

```
cd commercebox/client && cd commercebox/server
```

Install all the dependencies in both directories

```
npm install
```

Done.

### Running the application

**Server**

From the main directory cd into the server directory

```
cd /server
```

If you are using nodemon (which is suggested) simply run nodemon with the experimental flag

```
npm run servermon
```

Otherwise use the node command with the experimental flag

```
npm run server
```

You should now see the server running.

**Client**

From the main directory cd into the client directory

```
cd /client
```

Then run the npm start command

```
npm start
```

**PORT not getting terminated**

For this issue run `taskkill -F -IM node.exe` to kill all node tasks

### Running the React native application

Navigate into the mobile folder. 

```
expo start
```

The bundler will run and open a tab in your browser with the expo server. Your terminal will also show the running server. 

Download and install the 'Expo' app on your iOS or android phone. Scan the QR code using the inbuilt expo scanner (android) or the camera app (iOS). 

The app will compile and open. 

### Updating the README.md

View this link here for info: https://help.github.com/articles/basic-writing-and-formatting-syntax/