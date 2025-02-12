from flask import Flask, render_template, request, session, jsonify
import smtp
import user_calendar
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

#TMAP API Key 가져오기
TMAP_API_key = os.getenv('TMAP_API_KEY')
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
    return render_template('map.html', current_path=request.path, TMAP_API_key = TMAP_API_key)

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
    if authCode == session.get('authCode') :
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
    if checkPW and PW == checkPW['PW'] :
        session['logined_email'] = id
        return jsonify({'success': True}), 200
    return jsonify({'success': False}), 200

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logined_email', None)
    return jsonify({'success': True}), 200

@app.route('/calendar', methods=['GET'])
def get_calendar():
    # 학사일정과 사용자 일정 데이터 가져오기
    calendar_data = list(db.academic_calendar.find({}, {'_id': 0}))

    academic_events = []
    user_events = list(db.user_calendar.find({}, {'_id': 0})) 

    # 학사일정 처리
    for item in calendar_data:
        date_range = item["date"]
        event_name = item["event"]
        academic_events.append(user_calendar.convert_event_format(date_range, event_name))

    # 결과를 각 변수에 담아서 리턴
    return jsonify({
        'result': 'success', 
        'academic_calendar': academic_events,
        'user_calendar': user_events
    })

# 사용자 일정 입력 > db 삽입
@app.route('/calendar', methods=['POST'])
def add_event():
    title_receive = request.form['title_give']
    start_receive = request.form['start_give']
    end_receive = request.form['end_give']

    if not title_receive or not start_receive or not end_receive:
        return jsonify({'error': '모든 필드를 입력하세요'}), 400


    existing_event = db.user_calendar.find_one({'title': title_receive, 'start': start_receive, 'end': end_receive})

        # 데이터가 존재하지 않으면 삽입
    if not existing_event:
        doc = {'title': title_receive, 'start': start_receive, 'end': end_receive}
        db.user_calendar.insert_one(doc)
        
    return jsonify({'result':'success','message': '일정이 추가되었습니다'}), 201

@app.route('/test5')
def test5():
    return render_template('calendar.html')

@app.route('/test')
def test():
    return render_template('test.html', current_path=request.path)

@app.route('/test3')
def test3():
    return render_template('test3.html', current_path=request.path)


if __name__ == '__main__':
    app.run(debug=True)
