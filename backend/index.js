const express = require("express");
const app = express();

const path = require("path");

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend"));

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, "../frontend")));

// 라우터
const routes = require("./routes");
app.use("/", routes);

app.listen(3000, () => {
  console.log("listing to 3000");
});
