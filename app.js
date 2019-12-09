const express = require('express');

const app = express();

// 포트 번호
let PORT = process.env.PORT || 3000;

// Router 사용
const router = require('./router');

// body-parser 사용(요청 본문 해석)
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// 절대 경로 public 설정
app.use(express.static('public'));

// 뷰 엔진 설정(ejs 사용)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// 라우팅은 모두 router.js에서 처리한다.
app.use('/', router);

app.listen(PORT, () => {
  console.log(`노드 서버 시작됨. 포트번호 : ${PORT}`);
});
