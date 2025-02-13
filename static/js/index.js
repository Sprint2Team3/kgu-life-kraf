let isEmailAvailable = false;
let isAuth = false;

//회원가입 이메일 중복확인 및 인증번호 발송
window.sendEmail = function () {
  // 이메일 유효성 검사 및 인증번호 발송
  const emailInput = document.getElementById("email-input");
  const emailError = document.getElementById("email-error");
  const verificationSection = document.getElementById("verification-section");
  const emailValue = emailInput.value.trim();

  // 이메일 유효성 검사
  if (!emailValue || emailValue.includes("@") || emailValue.includes(" ")) {
    emailInput.classList.add("is-invalid"); // 빨간 테두리
    emailError.classList.remove("d-none"); // 오류 메시지 표시
  } else {
    emailInput.classList.remove("is-invalid"); // 빨간 테두리 제거
    emailError.classList.add("d-none"); // 오류 메시지 숨김

    // AJAX로 이메일 중복 확인 요청
    $.ajax({
      url: "/check-duplication",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email: emailValue }),
      success: function (response) {
        if (response.success) {
          isEmailAvailable = true;

          // 인증번호 발송 로직
          alert(`인증번호가 ${emailValue}@kyonggi.ac.kr 로 발송되었습니다.`);

          // 인증번호 입력 섹션 표시
          verificationSection.classList.remove("d-none");

          $.ajax({
            url: "/send-email",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email: emailValue }),
            success: function (response) {},
            error: function () {
              alert("중복 확인 중 문제가 발생했습니다.");
              isEmailAvailable = false;
            },
          });
        } else {
          alert("이미 가입된 이메일입니다.");
        }
      },
      error: function () {
        alert("중복 확인 중 문제가 발생했습니다.");
        isEmailAvailable = false;
      },
    });
  }
};
// 인증번호 확인
window.checkAuth = function() {
    const verificationCode = document.getElementById('verification-code').value.trim();
    const verificationError = document.getElementById('verification-error');
    const verificationCheckIcon = document.getElementById('verification-check-icon');
    const signupBtn = document.getElementById('signup-btn');
    email = $('#email-input').val();


    $.ajax({
        url: '/check-auth',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email: email, authCode: verificationCode }),
        success: function (response) {
            if(response.success) {
                alert("인증번호가 확인되었습니다.")
                verificationError.classList.add('d-none'); // 오류 메시지 숨김
                verificationCheckIcon.classList.remove('d-none'); // 체크 아이콘 표시
                isAuth = true;
                signupBtn.disabled = false;
                $('#email-input').prop("disabled", true);
                $('#send-code-btn').prop("disabled", true);
                $('#verification-code').prop("disabled", true);
                $('#verify-code-btn').prop("disabled", true);
            } else {
                verificationError.classList.remove('d-none'); // 오류 메시지 표시
                verificationCheckIcon.classList.add('d-none'); // 체크 아이콘 숨김
                isAuth = false;
                signupBtn.disabled = true;
            }
        },
        error: function () {
            alert("인증과정에서 오류가 발생하였습니다.")
        }
    });
}

//회원가입
window.checkSignup = function () {
  //유효성 검사
  const email = $("#email-input").val();
  const PW = $("#password").val();
  if (!email) {
    alert("이메일을 입력해주세요.");
    return;
  } else if (!isEmailAvailable || !isAuth) {
    alert("이메일 인증을 완료해주세요.");
    alert(isEmailAvailable);
    alert(isAuth);
    return;
  } else if (!PW) {
    alert("패스워드를 입력해주세요.");
    return;
  }

  //회원가입 프로세스
  $.ajax({
    url: "/signup-process",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email: email, PW: PW }),
    success: function (response) {
      if (response.success) {
        alert("성공적으로 가입되었습니다!");
        window.location.href = "/";
      } else {
        alert("회원가입에 실패했습니다.");
        return false;
      }
    },
  });
};

//로그인
window.login = function () {
  const email = $("#username").val();
  const PW = $("#password").val();
  var emailTest =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  //유효성 검사
  if (!email) {
    alert("이메일을 입력해주세요.");
    return;
  } else if (!emailTest.test(email)) {
    alert("아이디를 이메일 형식으로 입력해주세요.");
    return;
  } else if (!PW) {
    alert("패스워드를 입력해주세요.");
    return;
  }

  //로그인 프로세스
  $.ajax({
    url: "/login-process",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email: email, PW: PW }),
    success: function (response) {
      if (response.success) {
        alert("성공적으로 로그인 되었습니다!");
        window.location.href = "/";
      } else {
        alert("로그인에 실패했습니다.");
        return false;
      }
    },
    error: function () {
      alert("로그인 도중 오류가 발생했습니다.");
    },
  });
};

//로그아웃
window.logout = function () {
  //회원가입 프로세스
  $.ajax({
    url: "/logout",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function (response) {
      if (response.success) {
        alert("성공적으로 로그아웃 되었습니다!");
        window.location.href = "/";
      } else {
        alert("로그아웃에 실패했습니다.");
        return false;
      }
    },
  });
};

//캘린더
function convertToISO(dateStr) {
  let date = new Date(dateStr);
  return date.toISOString();
}

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev today",
      center: "title",
      right: "next",
    },
    events: function (info, successCallback, failureCallback) {
      // fullcalendar 형식으로 변환
      $.ajax({
        type: "GET",
        url: "/calendar",
        success: function (response) {
          let events = [
            ...response.academic_calendar,
            ...response.user_calendar,
          ].map(function (item) {
            return {
              title: item.title,
              start: convertToISO(item.start),
              end: convertToISO(item.end),
            };
          });
          successCallback(events);
        },
        error: function () {
          failureCallback();
        },
      });
    },
    datesSet: function () {
      updateEventColors(); // 월 변경될 때 실행
    },

    eventDidMount: function (info) {
      //tooltip
      tippy(info.el, {
        content: `${
          info.event.end &&
          info.event.start.toLocaleDateString() !==
            info.event.end.toLocaleDateString()
            ? `${info.event.start.toLocaleDateString()} - ${info.event.end.toLocaleDateString()}`
            : info.event.title // 단기 일정은 이벤트 이름 출력
        }`,
        placement: "bottom",
        offset: [0, 0],
        interactive: true,
      });
    },
  });
  calendar.render();

  document.querySelectorAll(".fc-button-primary").forEach((button) => {
    button.addEventListener("click", updateEventColors);
  });
  updateEventColors(); // 초기실행

  // 일정 추가
  function postUser() {
    var title = $("#title").val();
    var start = $("#start").val();
    var end = $("#end").val();

    $.ajax({
      type: "POST",
      url: "/calendar",
      data: {
        title_give: title,
        start_give: start,
        end_give: end,
      },
      success: function (response) {
        alert(response.message);
        calendar.refetchEvents(); // 일정추가 후 달력 새로고침
      },
      error: function () {
        alert("일정을 추가하는데 실패했습니다");
      },
    });
  }

  // 일정 추가 버튼 이벤트
  $("#addEventButton").on("click", function () {
    postUser();
  });
});

const colors = ["#cdf3de", "#d3d6ee", "#faead4", "#fbd6df"]; //색상 배열

// 색상을 순차적으로 변경
function updateEventColors() {
  $.ajax({
    type: "GET",
    url: "/calendar",
    data: {},
    success: function (response) {
      let calendar_list = response["academic_calendar"];
      let events_length = calendar_list.length;

      // 일정 개수만큼 루프 실행
      $(".fc-event-title-container").each(function (index) {
        let colorIndex = index % colors.length; // 순환 색상 적용
        $(this).css("background-color", colors[colorIndex]);
      });
    },
    error: function () {
      console.error("일정 데이터를 불러오는 데 실패했습니다.");
    },
  });
}

// 캘린더 로딩 완료 후 색상 변경 실행
document.addEventListener("DOMContentLoaded", function () {
  updateEventColors();
});
