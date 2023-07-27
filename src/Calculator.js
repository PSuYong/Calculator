
let expression = '';
let inputType = 'DEC';
Disable();

function Disable(){
    document.getElementById('button-a').disabled = true;
    document.getElementById('button-b').disabled = true;
    document.getElementById('button-c').disabled = true;
    document.getElementById('button-d').disabled = true;
    document.getElementById('button-e').disabled = true;
    document.getElementById('button-f').disabled = true;
}
function Enable(){
    document.getElementById('button-a').disabled = false;
    document.getElementById('button-b').disabled = false;
    document.getElementById('button-c').disabled = false;
    document.getElementById('button-d').disabled = false;
    document.getElementById('button-e').disabled = false;
    document.getElementById('button-f').disabled = false;
}

function appendToDisplay(value) {
    expression += value;
    document.getElementById('result').value = expression;
}

function removeToDisplay(value) {
    expression = expression.slice(0, -1);
    document.getElementById('result').value = expression;
}

function clearDisplay() {
    expression = '';
    document.getElementById('result').value = '';
}

function toggleButton(button) {
    button.classList.toggle("active");
  }
function settingType(value){
    if (value === 'DEC'){
        inputType = value;
        //button.classList.toggle("decActive");
        Disable();
    }
    else if (value === 'HEX'){
        inputType = value;
        //button.classList.toggle("hexActive");
        
        Enable();
    }
}

function decToHex(value){
    return value.toString(16).toUpperCase();
}
function HexTodec(value){
    return parseInt(value,16);
}



function calculate() {
    try {
        //간단한 수식 검증
        const regex = /[^0-9+\-*/.a-f]/g;
        //위의 표현은 정규표현식
        //[^ ]의 의미는 안의 표현을 제외한 나머지. /g는 전역변수 취급  
        if (expression.match(regex)) {
            throw new Error('잘못된 수식');
        }

        // 연속된 연산자 방지 (예: "++", "--", "**" 등)
        const invalidOperators = /([+/.\-*])\1+/g;
        //\1+: \1은 첫 번째 그룹을 참조하며, 앞에서 매치된 연산자와 동일한 연산자와 매치
        if (expression.match(invalidOperators)) {
            throw new Error('잘못된 수식');
        }

        // 연산자로 끝나거나 숫자가 없을 경우 방지 (예: "2+", "8*", "/" 등)
        const endsWithOperator = /[+\-*/.]$/;
        //$는 앞의 표현식들이 없을때...
        if (expression === '' || expression.match(endsWithOperator)) {
            throw new Error('잘못된 수식');
        }


        
        if (inputType === 'HEX') {
            Enable();
            // 16진수 계산
            //result = HexTodec(expression);
            //const ABC = /[A-F]/
            HexNum = expression.replace(/[a-f]/g,(match)=>HexTodec(match))
            result = eval(HexNum);
            result = decToHex(result);
          } else {
            // 10진수 계산
            Disable();
            result = eval(expression);
          }
        document.getElementById('result').value = result;
        expression = String(result);
        expression = '';
        
        

    } catch (error) {
        document.getElementById('result').value = 'Error';
        expression = '';
    }

    
}