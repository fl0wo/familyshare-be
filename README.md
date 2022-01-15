## Family Share Back End


Version 1.1.

Documentation : TODO

Instructions for booting:
    - docker-compose up -d
    - npm i
    - npm run dev

1) Start the mongo db with docker
2) Install dependencies
3) start the server in dev mode.
4) To start a children's movement simulator: ===> node bot_simulator.js -u {bimboId}

The application has been deployed on a server: ===> http://vps-487579d2.vps.ovh.net:5002/
Back-end comand: ===> docker run -dit -p 5001:3000 --restart unless-stopped floflo49/familyshare:latest

Back-end features: 
   - child registration via parent profile
   - tracking the movement of children by longitude and latitude ---> simulation via bot
   - creation of events / activities for children to do 
   - code to verify the valid e-mail: ===> now doesn't work because we don't pay Gmail and we have run out all the test mails
