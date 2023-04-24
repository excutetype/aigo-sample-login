const registerBtn = document.getElementById("register");
registerBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const nickname = document.getElementById("nickname").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const registerData = { email, nickname, password, confirmPassword };

  if (!email || !nickname || !password || !confirmPassword) {
    alert("빈칸 없이 채워주십시오");
    return;
  }

  if (password !== confirmPassword) {
    alert("패스워드가 서로 일치하지 않습니다");
    return;
  }

  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ registerData }),
  })
    .then((res) => res.json())
    .then((res) => {
      const status = res.status;

      if (status === 200) {
        window.location.href = "/login";
      } else if (status === 500) {
        alert("예기치 못한 오류가 발생하였습니다.");
      } else {
        switch (res.reason) {
          case "exist email":
            alert("이미 존제하는 이메일입니다.");
            break;
        }
      }
    })
    .catch((err) => {
      alert(err);
    });
});
