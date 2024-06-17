import { mutCalc } from "./basket.js"; 
export { selectData };
// 우클릭 방지
window.addEventListener('contextmenu', (e)=>{
    e.preventDefault();
});

// header 불러오기
$(function(){
    $('header').load('./header/header.html');
});

// footer 불러오기
$(function(){
    $('footer').load('./footer/footer.html');
});

// detail.html 문서의 제품에 따른 selectBox 생성
function selectData ( selectColorData, selectColorCode ){

    // selectColorCode 코드가 1이면 : 의류제품들이면
    if( selectColorCode == 1 ){
        // selectBox를 불러와서
        let selectColor = document.querySelector('#selColor');
        // 전달받은 selectColorData의 길이만큼
        for(let i = 0; i < selectColorData.length; i++){
            let options = document.createElement('option');
            // selectColorData안의 color 데이터를 option의 value값과 innerText로 반영
            options.innerHTML = `<option value="${selectColorData[i]}">${selectColorData[i]}</option>`;
            selectColor.append(options);
        };
        // 의류제품은 색상, 사이즈 선택할 수 있는 div => 보이게
        let selContainer = document.getElementById('selContainer');
        selContainer.style.display = 'flex';
        selContainer.style.justifyContent = 'space-around';
        selContainer.style.alignItems = 'center';
        selContainer.style.flexDirection = 'column';
        selContainer.style.width = '100%';

    }else{ // 의류 제품 이외 물품들이면 
        // 사이즈, 컬러 선택 div 사라지게
        let selContainer = document.getElementById('selContainer');
        selContainer.style.display = 'none';

        // 수량 설정 , 금액 보이는 div => 보이게
        let totalProducts = document.getElementById('totalProducts');
        totalProducts.style.display = 'flex';
        totalProducts.style.justifyContent = 'space-between';
        totalProducts.style.alignItems = 'center';
        totalProducts.style.flexDirection = 'row';
        totalProducts.style.width = '100%';
        totalProducts.style.borderTop = '1px solid #f1f1f1';
    };
};

// selectColor가 선택되면 사이즈 선택 활성화
document.querySelector('#selColor').addEventListener('change', ()=>{
    $('#selSize').prop('disabled', false);
    let prodtColor = document.querySelector('#selColor').value;
    let pTagCol = document.getElementById('pTagCol');
    pTagCol.innerHTML = `색상 : ${prodtColor}`
});

// 사이즈 선택시 하단 div 보여주기
document.querySelector('#selSize').addEventListener('change', ()=>{
    // let colValue = document.querySelector('#selColor > option:checked').value;
    let sizValue = document.querySelector('#selSize > option:checked').value;
    // var productQty = document.getElementById('productQty');
    if( sizValue ){
        let selectList = document.getElementById('selectList');
        let totalProducts = document.getElementById('totalProducts');
        let productQty = document.getElementById('productQty');
        let num = 1;
        // 사이즈까지 선택되면 수량 값에 1 
        productQty.innerText = 1;
        // 숨겨진 div 에 속성 넣기
        selectList.style.display = 'flex';
        selectList.style.justifyContent = 'space-around';
        totalProducts.style.display = 'flex';
        totalProducts.style.justifyContent = 'space-between';
        // basket.js의 함수 mutCalc() 에 1 넣어주기
        mutCalc(num);
        // 화면에 반영하는 함수
        selectCheckd();
    }else{
        let selectList = document.getElementById('selectList');
        selectList.style.display = 'none';
    };
});

// 화면에 반영하는 함수 
function selectCheckd (){
    let prodtColor = document.querySelector('#selColor').value;
    let prodtSize = document.querySelector('#selSize').value;
    // let prodtQty = document.getElementById('productQty');
    // console.log('prodtQty',prodtQty.innerText);
    // 선택된 색상
    let pTagCol = document.getElementById('pTagCol');
    // 선택된 사이즈
    let pTagSiz = document.getElementById('pTagSiz');
    // let pTagQty = document.getElementById('pTagQty');
    pTagCol.innerHTML = `색상 : ${prodtColor}`
    pTagSiz.innerHTML = `사이즈 : ${prodtSize}`

    // 수량은 - + 버튼으로 
    // pTagQty.innerHTML = `수량 : ${num}`
};

