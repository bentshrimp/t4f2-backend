const setCookie = (key, value, expiredDays) => {
  // 자동 삭제 날짜를 지정하는 코드
  let today = new Date();
  today.setDate(today.getDate() + expiredDays);
  // 쿠키에 값을 저장
  document.cookie =
    key +
    '=' +
    JSON.stringify(value) +
    '; path=/; expires=' +
    today.toGMTString() +
    ';';
};

module.exports = setCookie;
