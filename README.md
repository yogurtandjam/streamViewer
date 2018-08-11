# streamViewer
View Popular YouTube Live Streams
--------------------------------------
//Tech Stack - React.js, Python/Flask, MongoDB
This app utilizes Google Auth to allow users to view live gaming streams pulled from YouTube
The user can access and interact with the YouTube Livechat associate with the stream
The user can also check the stream stats: users, messages, messagecount, concurrent viewers, and time started


#notes on local dev environment
app start () action in server can have parameters removed (app.run(host="0.0.0.0", port=80) for production ec2 deployment)
npm start script is sudo python server/server.py (won't work for all OS's)
in order for dev purposes, those changes are not reflected in this hosted version

#dependencies
high level dependencies - JS, Node + NPM, Python 3+

#how to install
npm install
pip install -r requirements.txt
(this was developed on windows, you may have to add pypiwin32==220 to requirements.txt if you are also using windows. it was removed to not throw errors on non-windows machines)


#how to run (commands are from root directory)
production: npm start

#how to edit
nodemon server/server.py
npm run react-dev (starts webpack babel compiler)


#comfort level with backend framework
First time using python, flask, sqlalchemy, or flask-sqlalchemy
First time implementing Google Auth + Auth Tokens

#assumptions
I assumed that it was not necessary to store all user messages in a persistent storage
  - mesages would have only been saved if user was present in the chatroom for those messages
    - would grant skewed results based on amount of time a user was present in a chatroom, not properly demonstrating which rooms or which users were most active recently
  - thus I combined Kevin and Alex's User stories for what I felt was a sensible UI

Table is sortable by username only
  - Sorting did not seem like a key tool for UI, so I just wanted to show my ability to implement sorting

Stats Page contains stats separate from Table
  - Did not make sense for a livestream's stats to be recorded and indexed all by Users
    - Some stats are specific to the livestream, not to user messages
