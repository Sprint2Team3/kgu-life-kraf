from flask import Flask, render_template, request

app = Flask(__name__, template_folder='../../templates')

# 기존 라우트
@app.route('/')
def home():
    return render_template('index.html', current_path=request.path)

@app.route('/map')
def map_page():
    return render_template('map.html', current_path=request.path)

@app.route('/school')
def school_page():
    return render_template('school.html', current_path=request.path)

# 로그인 페이지 라우트
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # 로그인 처리 로직 (예: 사용자 인증)
        username = request.form['username']
        password = request.form['password']
        # 여기서 사용자 인증 로직 추가 가능
        if username == "admin" and password == "password":  # 간단한 예제
            return "로그인 성공!"
        else:
            return "로그인 실패!"
    return render_template('login.html', current_path=request.path)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    return render_template('signup.html', current_path=request.path)


if __name__ == '__main__':
    app.run(debug=True)
