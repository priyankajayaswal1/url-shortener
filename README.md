# url-shortener node application

The repo contains the client and server code for a url-shortener application. The client is built in vanilla Js and works as a website. The backend code is in NodeJS.

The website can be accessed here:


## To run the code locally:

1. Clone the git repository

2. npm install

3. nodemon main.js [this would start the node service]

4. cd client/ [open the index.html code and access the website locally]

5. npm test [for testing]

## To run the code using docker

After having docker and relevant files installed use the following commands.

*   docker build -t url_shortener_name . # on the folder
*   docker run -it  url_shortener_name
*   docker exec -it [container-id] bash  # to get container id, we may use () docker ps  (get the container-id corresponding to our docker name)) // this command is used to gi to host if needed
*   docker run -it  -p "3001:3000" -p "27017:27017" -v [local path of this folder]:/app url_shortener_name


## Tech components

* NodeJs
* MongoDb
* Vanilla JS & HTML for client

Note: You may test it in Windows and Linux. Can use docker if want to check it out.