// 이메일 유효성 검사 및 인증번호 발송(테스트용)
document.getElementById('send-code-btn').addEventListener('click', function() {
  const emailInput = document.getElementById('email-input');
  const emailError = document.getElementById('email-error');
  const verificationSection = document.getElementById('verification-section');
  const emailValue = emailInput.value.trim();

  // 이메일 유효성 검사
  if (!emailValue || emailValue.includes('@') || emailValue.includes(' ')) {
    emailInput.classList.add('is-invalid'); // 빨간 테두리
    emailError.classList.remove('d-none'); // 오류 메시지 표시
  } else {
    emailInput.classList.remove('is-invalid'); // 빨간 테두리 제거
    emailError.classList.add('d-none'); // 오류 메시지 숨김

    // 인증번호 발송 로직 (백엔드 연동 필요)
    alert(`인증번호가 ${emailValue}@kyonggi.ac.kr 로 발송되었습니다.`);

    // 인증번호 입력 섹션 표시
    verificationSection.classList.remove('d-none');
  }
});

// 인증번호 확인
document.getElementById('verify-code-btn').addEventListener('click', function() {
  const verificationCode = document.getElementById('verification-code').value.trim();
  const verificationError = document.getElementById('verification-error');
  const verificationCheckIcon = document.getElementById('verification-check-icon');
  const signupBtn = document.getElementById('signup-btn');

  // 백엔드에서 받은 인증번호와 비교 (여기서는 테스트용으로 "1")
  if (verificationCode === "1") {
    verificationError.classList.add('d-none'); // 오류 메시지 숨김
    verificationCheckIcon.classList.remove('d-none'); // 체크 아이콘 표시
    signupBtn.disabled = false; // 회원가입 버튼 활성화
  } else {
    verificationError.classList.remove('d-none'); // 오류 메시지 표시
    verificationCheckIcon.classList.add('d-none'); // 체크 아이콘 숨김
  }
});
