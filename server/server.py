# server.py
from flask import Flask, render_template, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://postgres:NEWT1MES@streamviewer.c19qyuez4kgp.us-west-1.rds.amazonaws.com:5432/streamViewer'

db = SQLAlchemy(app)
Base = declarative_base()

class User(db.Model):
    __tablename__= 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True, nullable=True)

    def __init__(self, username):
        self.username = username
    
class Message(db.Model):
    __tablename__= 'messages'
    id = db.Column(db.Integer, db.ForeignKey("users.id"))
    roomid = db.Column(db.String())
    messageid = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(), unique=False)

    user = db.relationship('User', backref=db.backref('messages', lazy=True))

    def __init__(self, id, roomid, message):
        self.id = id
        self.roomid = roomid
        self.message = message

    def row2dict(row):
        d = []
        for message in row:
            d.append(message.message)
        return d

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/users/messages/<name>/<room>')
def user_detail(name, room):
    print(name)
    user = User.query.filter_by(username=name).first()
    if user:
        userid = user.id
        messages = Message.row2dict(Message.query.filter_by(roomid=room).join(User).filter_by(id=userid).all())
        return jsonify(messages)
    return jsonify({ 'error': 'user not found '})

@app.route('/messages/<name>', methods=['POST'])
def save_message(name):
    data = request.get_json()['message']
    room = request.get_json()['room']
    userExists = User.query.filter_by(username=name).first()
    if not userExists:
        saveUser = User(username=name)
        db.session.add(saveUser)
        userExists = User.query.filter_by(username=name).first()
    print(userExists.id)
    saveMessage = Message(id=userExists.id, roomid=room, message=data)
    db.session.add(saveMessage)
    db.session.commit()
    return jsonify({ 'message': data })

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
if __name__ == "__main__":
  app.run()