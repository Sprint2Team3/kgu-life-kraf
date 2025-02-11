import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from dotenv import load_dotenv
from flask import Flask, render_template, jsonify, request
from datetime import datetime

# .env 파일 로드
load_dotenv()

app = Flask(__name__)

# MongoDB 연결
uri = "mongodb+srv://e0sunee882:ceteWzMVQ0NCofGS@cluster0.or2ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, 27017)
db = client.kraf

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

@app.route('/')
def home():
    return render_template('calendar.html')

# 날짜 포맷 변환 함수
def convert_date_format(date_str):
    # 날짜 앞부분에 불필요한 문자가 있을 수 있음, 제거
    date_str = date_str.split('(')[0].strip()  # 괄호 제거
    try:
        return datetime.strptime(date_str, "%Y.%m.%d").strftime("%Y-%m-%d")
    except ValueError:
        return date_str  # 형식이 맞지 않으면 원래의 날짜를 그대로 반환   
    
##########
#형식 변환 함수
def convert_event_format(date_range, event_name):
    if '~' in date_range:
        start_date, end_date = date_range.split('~')
        start_date = convert_date_format(start_date.strip())
        end_date = convert_date_format(end_date.strip())
    else:
        start_date = convert_date_format(date_range.strip())
        end_date = start_date  # 시작일과 종료일이 같은 경우

    return {
        "title": event_name,
        "start": start_date,
        "end": end_date
    }

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
        academic_events.append(convert_event_format(date_range, event_name))

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


# 학사일정 데이터 삽입
def insert_academic_calendar():
    data = requests.get('https://www.kyonggi.ac.kr/www/selectTnSchafsSchdulListUS.do?key=5695&sc1=10', headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    # 전체 학사일정 데이터 가져오기
    calendars = soup.select('.schedule_content__group .academic_info_box ul.info_box__list li.info_box__item')

    for calendar in calendars:
        date = calendar.select_one('div.info_box__date').get_text(strip=True)
        event = calendar.select_one('div.info_box__text p').get_text(strip=True)
        
        # 이미 동일한 데이터가 있는지 확인
        existing_event = db.academic_calendar.find_one({'date': date, 'event': event})

        # 데이터가 존재하지 않으면 삽입
        if not existing_event:
            doc = {'date': date, 'event': event}
            db.academic_calendar.insert_one(doc)

if __name__ == '__main__':
    # 학사일정 데이터 초기화 및 삽입
    db.academic_calendar.drop()  # 기존 데이터 삭제
    insert_academic_calendar()    # 학사일정 데이터 삽입
    app.run(debug=True)