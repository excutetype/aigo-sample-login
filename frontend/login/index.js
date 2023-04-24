const loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginData = { email, password };

  if (!email || !password) {
    alert("아이디 혹은 비밀번호를 작성해 주십시오");
    return;
  }

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginData }),
  })
    .then((res) => res.json())
    .then((res) => {
      const { status } = res.status;

      if (res.status === 200) {
        window.location.href = "/";
      } else if (res.status === 500) {
        alert("예기치 못한 오류가 발생하였습니다.");
      } else {
        switch (res.reason) {
          case "not exist email":
            alert("존제하지 않는 이메일입니다.");
            break;
          case "wrong password":
            alert("잘못된 비밀번호입니다.");
            break;
        }
      }
    })
    .catch((err) => {
      alert(err);
    });
});
