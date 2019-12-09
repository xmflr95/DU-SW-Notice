const axios = require('axios');
const cheerio = require('cheerio');

let Notice = function() {
  // 확인할 페이지 번호 == 1 (최신)
  this.page = 1;
  this.errors = [];
};

// date
const newCheckNum = 10;  

// 학사정보 데이터 가져오기
Notice.prototype.getNotice = function() {
  let major = "sw";
  // 학사정보 url번호
  let notice = 30;
  // 게시판 Url
  let url = `https://${major}.daegu.ac.kr/hakgwa_home/${major}/sub.php`;
  let fullUrl = `${url}?page=${this.page}&menu=page&menu_id=${notice}`;
  // https://sw.daegu.ac.kr/hakgwa_home/sw/sub.php?menu=page&menu_id=30

  // return new Promise((resolve, reject) => {
  // }); 프로미스 이용. but axios자체가 프로미스를 반환해서 굳이 사용 할 필요 없음.

  return axios.get(fullUrl).then(res => {
    if (res.status == 200) {
      let tableList = [];
      const $ = cheerio.load(res.data);
      const $contentsList = $("table.board_list").children("tbody").children("tr");

      $contentsList.each(function (i) {
        let children = $(this).children();

        tableList[i] = {
          number: $(children[0]).text().trim() != '' ? $(children[0]).text().trim() : '공지',
          title: $(children[1]).text().trim(),
          link: url.concat($(children[1]).children('a').attr('href')),
          writer: $(children[2]).text().trim(),
          date: $(children[3]).text().trim(),
          file: $(children[5]).children('img').attr('src') != undefined ? $(children[5]).children('img').attr('src') : '',
        };
      });

      let data = tableList.filter(n => n.title);
      // console.log(data);
      return data;
    } else { // status code가 200 이 외
      this.errors.push("학사정보를 찾을 수 없습니다.");
      console.log('네트워크 에러!');
    }
  }).then(data => {
    let realDate = new Date();   

    for (let i = 0; i < data.length; i++) {
      // console.log("dataDate: " + data[i].date);

      let date = data[i].date;
      let yy = '20' + date.substr(0, 2);
      let mm = date.substr(3, 2);
      let dd = date.substr(6, 2);
      let cdate = new Date(yy, mm - 1, dd);

      if ((realDate.getTime() - cdate.getTime()) /1000/60/60/24 <= newCheckNum) {
        data[i].current = 'New';
      } else {
        data[i].current = '';
      }      
    }
    // data.newCheck = calc();
    // console.log("data date : " + data[0].date);
    // console.log(data);    
    return data;

  }, (error) => console.log(error));
};

// 장학정보 가져오기
Notice.prototype.getScholar = function () {
  let major = "sw";
  // 장학정보 url번호
  let scholarship = 1022;
  // 게시판 Url
  let url = `https://${major}.daegu.ac.kr/hakgwa_home/${major}/sub.php`;
  let fullUrl = `${url}?page=${this.page}&menu=page&menu_id=${scholarship}`;

  return axios.get(fullUrl).then(res => {
    if (res.status == 200) {
      let tableList = [];
      const $ = cheerio.load(res.data);
      const $contentsList = $("table.board_list").children("tbody").children("tr");

      $contentsList.each(function (i) {
        let children = $(this).children();

        tableList[i] = {
          number: $(children[0]).text().trim() != '' ? $(children[0]).text().trim() : '공지',
          title: $(children[1]).text().trim(),
          link: url.concat($(children[1]).children('a').attr('href')),
          writer: $(children[2]).text().trim(),
          date: $(children[3]).text().trim(),
          file: $(children[5]).children('img').attr('src') != undefined ? $(children[5]).children('img').attr('src') : ''
        };
      });

      let data = tableList.filter(n => n.title);
      return data;
    } else { // status code가 200 이 외
      this.errors.push("장학정보를 찾을 수 없습니다.");
      console.log('네트워크 에러!');
    }
  }).then(data => {
    let realDate = new Date();

    for (let i = 0; i < data.length; i++) {

      let date = data[i].date;
      let yy = '20' + date.substr(0, 2);
      let mm = date.substr(3, 2);
      let dd = date.substr(6, 2);
      let cdate = new Date(yy, mm - 1, dd);

      if ((realDate.getTime() - cdate.getTime()) /1000/60/60/24 <= newCheckNum) {
        data[i].current = 'New';
      } else {
        data[i].current = '';
      }
    }

    return data;
  }, (error) => console.log(error));
};

// 취업정보 데이터 가져오기
Notice.prototype.getEmploy = function () {
  let major = "sw";
  // 취업정보 url번호
  let employment = 25;
  // 게시판 Url
  let url = `https://${major}.daegu.ac.kr/hakgwa_home/${major}/sub.php`;
  let fullUrl = `${url}?page=${this.page}&menu=page&menu_id=${employment}`;

  return axios.get(fullUrl).then(res => {
    if (res.status == 200) {
      let tableList = [];
      const $ = cheerio.load(res.data);
      const $contentsList = $("table.board_list").children("tbody").children("tr");

      $contentsList.each(function (i) {
        let children = $(this).children();

        tableList[i] = {
          number: $(children[0]).text().trim() != '' ? $(children[0]).text().trim() : '공지',
          title: $(children[1]).text().trim(),
          link: url.concat($(children[1]).children('a').attr('href')),
          writer: $(children[2]).text().trim(),
          date: $(children[3]).text().trim(),
          file: $(children[5]).children('img').attr('src') != undefined ? $(children[5]).children('img').attr('src') : ''
        };
      });

      let data = tableList.filter(n => n.title);
      return data;
    } else { // status code가 200 이 외
      this.errors.push("취업정보를 찾을 수 없습니다.");
      console.log('네트워크 에러!');
    }
  }).then(data => {
    let realDate = new Date();

    for (let i = 0; i < data.length; i++) {

      let date = data[i].date;
      let yy = '20' + date.substr(0, 2);
      let mm = date.substr(3, 2);
      let dd = date.substr(6, 2);
      let cdate = new Date(yy, mm - 1, dd);

      if ((realDate.getTime() - cdate.getTime()) /1000/60/60/24 <= newCheckNum) {
        data[i].current = 'New';
      } else {
        data[i].current = '';
      }
    }  

    return data;
  }, (error) => console.log(error));
};

module.exports = Notice;