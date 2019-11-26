/* 
 * notice Controller
 * View - 'Controller' - Model
 * 사용자 요청 시 응답을 model의 data를 받아 처리
 */

const axios = require('axios');
const Notice = require('../models/Notice');

exports.home = async function(req, res) {
  let notice = new Notice();
  let noticeData = await notice.getNotice();
  let scholarData = await notice.getScholar();
  let employData = await notice.getEmploy();
  
  res.render('index', {
    notices: noticeData,
    scholars: scholarData,
    employs: employData,
  });  
};

