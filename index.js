console.log('---------------Start /nugu/index.js---------------');

const uuid = require('uuid').v4;
console.log('---------------/nugu/index.js 1---------------');

const _ = require('lodash');
console.log('---------------/nugu/index.js 2---------------');

const {DOMAIN} = require('../config');
console.log('---------------/nugu/index.js 3---------------');


function parse(){
  //파일 경로
  var filePath = "/file.csv";
  
  var parseName = "";
  var parse = 0;

  for(var i = 0; i <)
}
function getNumber(name) {
  console.log(`---------------function getNumber(name)---------------`);
  console.log(`************${name}************`);
  let number = '0000';
  switch (name) {
    case '강현석 교수님':
      number = '삼 칠 일 팔 ';
      break;
    case '김건우 교수님':
      number = '삼 칠 일 칠 ';
      break;
    case '김동혁 교수님':
      number = '삼 육 오 팔 ';
      break;
    case '김상호 교수님':
      number = '삼 육 삼 팔 ';
      break;
    case '김재길 교수님':
      number = '삼 육 구 이 ';
      break;
    case '김희삼 교수님':
      number = '삼 육 오 사 ';
      break;
    case '송정민 교수님':
      number = '삼 육 삼 이 ';
      break;
    case '원치욱 교수님':
      number = '삼 육 구 오 ';
      break;
    case '이수정 교수님':
      number = '삼 육 구 공 ';
      break;
    case '이시연 교수님':
      number = '삼 육 이 오 ';
      break;
    case '이용주 교수님':
      number = '삼 육 이 육 ';
      break;
    case '장진호 교수님':
      number = '삼 육 이 일 ';
      break;
    case '진규호 교수님':
      number = '삼 육 삼 육 ';
      break;
    case '차미령 교수님':
      number = '삼 육 삼 삼 ';
      break;
    case '최서윤 교수님':
      number = '삼 육 오 칠 ';
      break;
    case '최정옥 교수님':
      number = '삼 육 삼 칠 ';
      break;
    case '하대청 교수님':
      number = '삼 육 오 구 ';
      break;
    case '황치옥 교수님':
      number = '삼 육 이 칠 ';
      break;
  }
  return {number};
}

class NPKRequest {
  constructor(httpReq) {
    console.log(`---------------NPKRequest constructor---------------`);
    this.context = httpReq.body.context;
    this.action = httpReq.body.action;
    console.log(`NPKRequest: ${JSON.stringify(this.context)}, ${JSON.stringify(this.action)}`);
  }

  do(npkResponse) {
    console.log(`---------------do(npkResponse)---------------`);
    this.actionRequest(npkResponse);
  }

  actionRequest(npkResponse) {
    console.log(`---------------actionRequest(nkpResponse)---------------`);
    // console.log('actionRequest')
    console.dir(this.action);

    const actionName = this.action.actionName;
    const parameters = this.action.parameters;
    // let aa = '나는윤재';

    let name = '';
    switch (actionName) {
      case 'answer.phonenumber':
        console.log(`---------------case answer.phonenumber---------------`);
        if (!!parameters) {
          const nameSlot = parameters.name;
          if (parameters.length !== 0 && nameSlot) {
            console.log(`************if1************`);
            name = nameSlot.value;
            console.log(`************${name}************`);
          }
          // if(isNaN(name)) {
          //   console.log(`************if2************`);
          //   name = '';
          // }
        }
        console.log(1);
        console.log(`************${name}************`);
        const numResult = getNumber(name);
        console.log(2);
        npkResponse.setOutputParameters(numResult);
        break;
    }
  }
}

class NPKResponse {
  constructor() {
    console.log(`---------------NPKResponse constructor---------------`);
    // console.log('NPKResponse constructor')

    this.version = '2.0';
    this.resultCode = 'OK';
    this.output = {};
    this.directives = [];
  }

  setOutputParameters(numResult) {
    console.log(`---------------setOutputParameters---------------`);
    this.output = {
      phonenumber: '공 육 이 -' + ' 칠 일 오 - ' + numResult.number,
    };
  }
}

const nuguReq = function (httpReq, httpRes, next) {
  console.log(`---------------nuguReq---------------`);
  npkResponse = new NPKResponse();
  npkRequest = new NPKRequest(httpReq);
  npkRequest.do(npkResponse);
  console.log(`NPKResponse: ${JSON.stringify(npkResponse)}`);
  return httpRes.send(npkResponse);
};

module.exports = nuguReq;