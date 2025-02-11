from flask import Flask, render_template, request, session, jsonify
import smtp
import requests
from datetime import timedelta
from pymongo import MongoClient
from dotenv import load_dotenv
import os

#.env파일 로드
load_dotenv()
sessionKey = os.getenv('SESSION_SECRET_KEY')

#app 설정
app = Flask(__name__, template_folder='../../templates', static_folder='../../static')
app.secret_key = sessionKey
app.permanent_session_lifetime = timedelta(minutes=10)

#db 설정
db_uri = os.getenv('DB_URI')
client = MongoClient(db_uri)
db = client.kraf
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

@app.context_processor
def inject_logined_email():
    return {'logined_email': session.get('logined_email')}

# 기존 라우트
@app.route('/')
def home():
    noticeList = db.department_notice.find({}, {'_id': 0})
    return render_template('index.html', current_path=request.path, noticeList = noticeList)

@app.route('/map')
def map_page():
    return render_template('map.html', current_path=request.path)

@app.route('/school')
def school_page():
    return render_template('school.html', current_path=request.path)

# 로그인 페이지 라우트
@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html', current_path=request.path)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    return render_template('signup.html', current_path=request.path)

@app.route('/signup-process', methods=['POST'])
def signup_process():
    json_data = request.get_json()
    email = json_data.get('email')
    PW = json_data.get('PW')
    doc = {
        'email' : email,
        'PW' : PW
    }
    db.user.insert_one(doc)

    session['logined_email'] = email

    return jsonify({'success': True}), 200

@app.route('/send-email', methods=['POST'])
def sendEmail():
    json_data = request.get_json()
    email = json_data.get('email')
    smtp.send_email(email)
    return jsonify({'success': True}), 200

@app.route('/check-auth', methods=['POST'])
def checkAuth():
    json_data = request.get_json()
    authCode = json_data.get('authCode')
    if authCode == session.get('authcode') :
        return jsonify({'success': True}), 200
    return jsonify({'success': False}), 200

@app.route('/check-duplication', methods=['POST'])
def checkDuplication():
    json_data = request.get_json()
    email = json_data.get('email')
    user = db.user.find_one({'email': email})
    if user :
        return jsonify({'success': False}), 200
    return jsonify({'success': True}), 200

@app.route('/login-process', methods=['POST'])
def login_process():
    json_data = request.get_json()
    email = json_data.get('email')
    id = email.split('@')[0]
    checkPW = db.user.find_one({'email': id}, {'PW': 1, '_id': 0})
    PW = json_data.get('PW')
    print(email, id, checkPW, PW)
    if PW == checkPW['PW'] :
        session['logined_email'] = id
        return jsonify({'success': True}), 200
    return jsonify({'success': False}), 200

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logined_email', None)
    return jsonify({'success': True}), 200

@app.route('/test')
def test():
    return render_template('test.html', current_path=request.path)


if __name__ == '__main__':
    app.run(debug=True)
