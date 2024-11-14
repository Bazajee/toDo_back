# ToDo back-end 
Back-end of ToDo application made with MariaDB, Nest Js, Prisma and Docker.

## Nest structure

The application is structured into 2 main parts. The API part and the Core part. The aim is to separate application logic and database queries to improve maintainability.
### API: 
This folder contains all parts of the application who handle a url endpoint. There must be the only folder with controller file. Api module contains the logical application and handles http requests.  
### Core:
The folder contains all prisma queries and core functionality. The module created inside must correspond to the model or nitialize a library.

The .env file must be at the same folder level as docker-compose.

## Docker 
There is a folder for each useful container (db, nginx, nest). 
 - db -> Contain database. Init a volume call "data" with the datafile using by MariaDB server.
 - nest -> Contains nest application.
 - nginx -> Contains the web server configuration to be defined.

## Memo

docker-compose logs -tf nest  

docker-compose exec -it nest /bin/bash  -> npx prisma studio (localhost:5555) / npm install 

check db/ and data/ right (must be 775)

run npm install on your local machine for dev

add sanitize and test


