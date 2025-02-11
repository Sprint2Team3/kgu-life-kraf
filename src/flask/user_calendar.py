from datetime import datetime

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
