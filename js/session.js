import { selectData } from "./detail.js"; // detail.js 의 selectData함수 호출
// 페이지를 실행했을 때 이벤트 발생
// sessionStorage 에 담긴 값 가져오기 위한 코드
window.addEventListener('DOMContentLoaded', ()=>{
    // sessionStorage에 저장된 json 파일 불러오기
    let data = JSON.parse(window.sessionStorage.getItem('data'));
    // ㄴ sessionStorage.getItem으로 가져온 data를 JSON.parse()를 이용해 string으로 변환하여 data변수에 저장
    
    // sessionStorage 를 이용해 넘어온 데이터를 적용하기 위해 index.html의 요소를 찾아 변수에 할당
    let imgContainer = document.getElementById('imgContainer');
    let productName = document.getElementById('productName');
    let strPrice = document.getElementById('strPrice');
    let intPrice = document.getElementById('intPrice');
    
    // json데이터 -> 배열로 교체
    let getData = data[0];
    
    // 데이터의 키값으로 변수에 할당하는 파트
    let getImg = getData.img;
    let getName = getData.name;
    
    // 데이터 키값으로 변수에 할당하기위해 가공하는 곳
    // "00,000원" string 값
    let getPrise = getData.price;
    // "00,000원" => 원 자르기
    let splPrice = getPrise.split('원');
    
    // ["00,000", ""] => 나눠진 텍스트 붙이기  => strPrice 에 들어갈 값 "00,000" 
    let joinPrice1 = splPrice.join('');// 결과: 00,000 => #price에 들어갈 값
    // ["00,000", ""] <=  , 콤마 기준으로 나누기
    let splPrice2 = splPrice[0].split(','); // 결과 : ['00', '000']
    
    // intPrice 에서 int형식으로 쓸 "00000" 형태의 값 만들기
    // ['00', '000'] => "00000" 
    let joinPrice2 = splPrice2.join(''); // 결과 : "00000"
    

    // 가공된 데이터 html에 적용
    imgContainer.innerHTML = `<img id="imgId" src=${getImg} alt="img">`
    strPrice.innerText = `${joinPrice1}`;
    intPrice.innerText = `${joinPrice2}`;
    productName.innerText = `${getName}`;

    // json 파일 불러오기
    function readJSON(file, callback){
        let rawFile = new XMLHttpRequest(); // 객체 생성
        rawFile.overrideMimeType('application/json'); // overrideMimeType 텍스트/xml 로 보고하지 않아도 그렇게 처리하고 구문 분석하도록 하는 데  사용 - send() 이전 호출해야함
        rawFile.open('GET', file, true);
        // ㄴ .open( '전달 방식', 서버URL , 동기여부 ) - true : 비동기 / false : 동기 
        rawFile.onreadystatechange = function(){ // onreadystatechange 이벤트 헨들러
            if(rawFile.readyState === 4 && rawFile.status == "200"){ 
            // 200 : 서버로부터 응답상태가 성공했다는 의미 - 403, 404, 500 등 있음
            // 4 : 데이터 전부 받은 상태 - 0~4 등
                callback(rawFile.responseText); // responseText 응답으로 받은 데이터를 문자열로 저장
            };
        };
        rawFile.send(null); // send() : GET 방식  / send(문자열) : POST 방식
    };

    // 리턴받은 데이터 string형태로 변환후 matchData()로 전달
    readJSON("./js/prdtData.json", function(text){
        var prdtData = JSON.parse(text);
        // 매칭함수
        matchData(prdtData);
    });

    // 제휴판매.html 에서 넘어온 정보와 JSON파일 데이터를 서로 비교하여 원하는 데이터 추출하는 함수
    function matchData(prdtData){
        let prdtName = document.getElementById('productName'); // 페이지이동때 html에 반영된 제품 이름 가져오기

        //매개변수로 전달된 prdtData => 필터 filter()를 사용하여 JSON 데이터와 비교
        var filterData = prdtData.filter(function (prdtD) {

            // 페이지 전환때 전달받은 제품명과 일치하는 데이터 리턴
            return prdtD.name == prdtName.innerText
        });
        
        let info = document.getElementById('info');
        let bottContainer = document.getElementById('bottContainer');
        let productNameCode = document.getElementById('productNameCode');
        
        info.innerText = filterData[0].info; // 제품 - 상세설명
        
        bottContainer.innerHTML = `<img src=${filterData[0].src} />` // 제품 상세 사진
        
        let selectColorData = filterData[0].color; // 불러온 제품과 일치하는 컬러 데이터를 변수에 할당
        let selectColorCode = filterData[0].code; // 불러온 제품과 일치하는 제품 유형 코드를 변수에 할당
        
        // detail.js 의 selectData함수에 제품코드와 컬러 데이터를 전달
        selectData(selectColorData, selectColorCode);
        
        //만약 가지고 오는 데이터의 코드가 1이 아니라면 (용품-수량만 필요)
        if( filterData[0].code == 1 ){
            productNameCode.innerText = filterData[0].code;
        };
    };   
    
    // 사용자가 세션이 더이상 필요로 하지 않을 경우 -> 함수 실행 -> 그 때 clear 
    // 여기다가 두면 
    sessionStorage.clear();// sessionStorage 에 저장된 데이터 지우기

});