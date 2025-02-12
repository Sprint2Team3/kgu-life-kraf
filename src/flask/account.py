import bcrypt

# 비밀번호 해시
def hash_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed

# 비밀번호 확인
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)