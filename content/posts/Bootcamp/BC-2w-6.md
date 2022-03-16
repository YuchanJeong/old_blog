---
title: "BC-2w-6 / 맥 계산기 만들기"
date: 2021-09-05
categories:
  - "'Bootcamp'"
tags:
  - Retrospect
---

![macCalculator](https://user-images.githubusercontent.com/84524514/132117283-92b29171-0d03-4f92-9325-d58a94a95539.gif)

### HTML과 CSS

- 크게 display(출력)와 buttonWrap(입력) 부분으로 구분
- background를 flex로 설정하고, justify-content와 align-items에 center 값을 줘서 계산기를 가운데 배치
- 맥 계산기는 커서 모양이 변하지 않아서 cursor: default;로 커서가 변하지 않게 함
- user-select: none;을 이용해서 계산기의 contents들이 선택되지 않게 함  
  (-webkit-user-select: none; -ms-user-select: none; -moz-user-select: none;)
- display의 윗부분과 0 버튼, = 버튼의 아래 부분을 각각 border-radius로 둥글게 만듦
- text-align으로 글자 가로 정렬, line-height으로 글자 세로 정렬
- buttonWrap을 flex로 설정하고, flex-wrap: wrap;을 이용해서 버튼 배치
- 가상 선택자(:active)를 이용해서 클릭 시 색상 변경
- operator가 isPressed 클래스를 지니고 있을 경우, border를 두껍게 해서 현재 선택된 연산자를 알 수 있게 함

### JavaScript

![img](https://user-images.githubusercontent.com/84524514/134358486-527b1b74-0871-4df9-b4c9-c61fbb73866a.gif)

#### 1. 우선 맥 계산기에 여러 숫자들을 넣어보며 어떻게 작동하는지 파악

#### 2. 수도 코드 작성

- 아래 글로 적은 것들이 작성한 수도 코드

#### 3. 수도 코드를 코드로 작성

- clearButton은 target이 아닐 때도, 사용되어야 해서 전역 변수로 선언

  ```js
  const displayEl = document.querySelector('.calculator .display')
  const buttonWrapEl = document.querySelector('.calculator .buttonWrap')
  const clearButtonEl = document.querySelector('.calculator .button.clear')
  const operatorButtonEls = document.querySelectorAll('.calculator .button.operator')

  let displayNum = '0', previousNum = '0', previousOperator, previousKey

  buttonWrapEl.addEventListener('click', function(event) {
    const target = event.target
    const action = target.classList[1]
    const buttonContent = target.textContent

    function cancelPress() {
      for(let i = 0; i <= 3; i++) {
      operatorButtonEls[i].classList.remove('isPressed')
      }
    }

    ...

    changeToIEEE()
    changeFontSize()
  })
  ```

- 연산

  - JS에서 나타나는 계산 오류를 줄이기 위해, 「x 1 e12 ÷ 1 e12」를 해줌.
  - Ex. 0.3 + 0.6 = 0.8999999999999999(JS 기본 연산 시)

  ```js
  function calculate(num1, operator, num2) {
    let result;

    if (operator === "＋") {
      result = Math.round((Number(num1) + Number(num2)) * 1e12) / 1e12;
    } else if (operator === "－") {
      result = Math.round((Number(num1) - Number(num2)) * 1e12) / 1e12;
    } else if (operator === "×") {
      result = Math.round(Number(num1) * Number(num2) * 1e12) / 1e12;
    } else if (operator === "÷") {
      result = Math.round((Number(num1) / Number(num2)) * 1e12) / 1e12;
    }

    return String(result);
  }
  ```

- display

  - 디스플레이의 수가 20자리 이상이면 소수점이 16자리인 부동 소수점 e로 표현
  - 맥 계산기는 부동 소수점 e를 표현할 때, 소수점 맨 뒤의 0들은 생략하기 때문에, 소수 부분만 따로 떼어서 숫자화로 소수점 맨 뒤의 0들을 없애 주고, 다시 문자 화하여 나머지 부분과 합쳐줌
  - 디스플레이에 보이는 수와 계산에 사용하는 디스플레이의 수를 분리(부동 소수점 e는 문자화와 숫자화를 자유롭게 할 수 없기 때문)
  - 디스플레이의 수가 10자리 이상이면 폰트가 점점 작아짐
  - 숫자 버튼 이외의 버튼을 클릭하면 디스플레이가 깜박임

  ```js
  function changeToIEEE() {
    if (displayNum.length >= 20) {
      let exponentialNum, intPart, decimalPart, exponentialPart;

      exponentialNum = Number.parseFloat(displayNum).toExponential(16);
      intPart = exponentialNum.slice(0, 1);
      decimalPart = String(parseFloat(`0.${exponentialNum.slice(2, 18)}`)).slice(1);
      exponentialPart = exponentialNum.slice(18);

      displayEl.textContent = `${intPart}${decimalPart}${exponentialPart}`;
    } else {
      displayEl.textContent = displayNum;
    }
  }

  function changeFontSize() {
    const displayLength = displayEl.textContent.length;
    let displayFontSize;

    if (displayLength <= 10) {
      displayFontSize = 40;
    } else if (displayLength <= 15) {
      displayFontSize = 40 * Math.pow(0.915, displayLength - 10);
    } else if (displayLength <= 20) {
      displayFontSize = 25.65 * Math.pow(0.93, displayLength - 15);
    } else {
      displayFontSize = 17.84;
    }

    displayEl.style.fontSize = `${displayFontSize}px`;
  }

  function blink() {
    displayEl.style.color = "rgb(90, 90, 90)";
    setTimeout(function () {
      displayEl.style.color = "aliceblue";
    }, 100);
  }
  ```

- number

  - 디스플레이 수가 0이거나 연산자 혹은 계산 다음일 때, 디스플레이에 입력이 그대로 할당. 나머지 경우는 디스플레이의 수에 입력 할당 연산

  ```js
  if (action === "number") {
    if (displayNum === "0" || previousKey === "operator" || previousKey === "calculate") {
      displayNum = buttonContent;
    } else {
      displayNum += buttonContent;
    }

    clearButtonEl.textContent = "C";
    previousKey = "number";
  }
  ```

- decimal

  - 디스플레이의 수에 소수점이 없으면서 연산자 다음이 아닐 때, 소수점을 입력 할당 연산. 연산자 다음 일 때는 '0.' 할당
  - 숫자 버튼과 같은 취급

  ```js
  if (action === "decimal") {
    if (!displayNum.includes(".") && previousKey !== "operator") {
      displayNum += ".";
    } else if (previousKey === "operator") {
      displayNum = "0.";
    }

    clearButtonEl.textContent = "C";
    previousKey = "number";
  }
  ```

- operator

  - 기존의 isPressed 초기화 후 타깃에 isPressed 클래스 부여
  - 숫자 다음이며 이미 기억하고 있는 연산자가 있을 때, 연산(previousNum, previousOperator, displayNum)
  - 연산 여부와 상관없이, 디스플레이의 수와 연산자 기억
  - 초기화 다음에는 디스플레이의 수를 기억하지 않는데, 0이 되어버린 디스플레이의 수로 이전의 수를 덮지 않게 하기 위함

  ```js
  if (action === "operator") {
    cancelPress();
    target.classList.add("isPressed");

    if (previousKey === "number" && previousOperator !== undefined) {
      displayNum = calculate(previousNum, previousOperator, displayNum);
    }

    if (previousKey !== "clear") {
      previousNum = displayNum;
    }

    previousOperator = buttonContent;
    previousKey = "operator";
    blink();
  }
  ```

- calculate

  - isPressed 초기화
  - 이미 기억하고 있는 연산자가 있을 때 연속 계산이 아니면, 디스플레이의 수를 임의의 변수에 할당하고(연속 계산시, 기호 다음의 숫자를 기억하고 있기 위해), 연산(previousNum, previousOperator, displayNum) 후 이전 디스플레이의 수 기억
  - 초기화 다음일 때, 다른 방식으로 연산(previousNum, previousOperator, previousNum)
  - 연속으로 계산할 때, 또 다른 방식으로 연산(displayNum, previousOperator, previousNum)
  - 코드로 작성 할때는 내가 작성한 수도코드와 반대로 예외부터 걸러줘야함!

  ```js
  if (action === "calculate") {
    cancelPress();

    let pseudoNum;

    if (previousOperator !== undefined) {
      if (previousKey === "calculate") {
        displayNum = calculate(displayNum, previousOperator, previousNum);
      } else if (previousKey === "clear") {
        displayNum = calculate(previousNum, previousOperator, previousNum);
      } else {
        pseudoNum = displayNum;
        displayNum = calculate(previousNum, previousOperator, displayNum);
        previousNum = pseudoNum;
        pseudoNum = undefined;
      }

      previousKey = "calculate";
    }

    blink();
  }
  ```

- clear

  - 수나 소수점을 누르면 C로 변환. clear를 누르면 다시 AC로 변환
  - 숫자 다음일 때, 디스플레이의 수를 초기화
  - 연산자 다음일 때, 연산자와 isPressed 초기화
  - 계산 다음일 때, 디스플레이의 수를 기억하고 나서 초기화
  - 초기화 다음일 때, 모두 초기화(처음에 이걸 젤 마지막에 둬서 항상 모두 초기화되어 버렸음)

  ```js
  if (action === "clear") {
    clearButtonEl.textContent = "AC";

    if (previousKey === "clear") {
      displayNum = "0";
      previousNum = "0";
      previousOperator = undefined;
      cancelPress();
      previousKey = undefined;
    }

    if (previousKey === "number") {
      displayNum = "0";
      previousKey = "clear";
    }

    if (previousKey === "operator") {
      previousOperator = undefined;
      cancelPress();
      previousKey = "clear";
    }

    if (previousKey === "calculate") {
      previousNum = displayNum;
      displayNum = "0";
      previousKey = "clear";
    }

    blink();
  }
  ```

- sign & percent

  - 디스플레이의 수가 0이 아닐 때, sing은 -1을 곱해주고, percent는 0.01을 곱해줌

  ```js
  if (action === "sign" && displayNum !== "0") {
    displayNum *= -1;
    blink();
  }

  if (action === "percent" && displayNum !== "0") {
    displayNum *= 0.01;
    blink();
  }
  ```

- undefined is not an object error를 만났다. 한참을 해결하지 못하였고, 새벽이라 너무 피곤해서 일단 잠을 잤다. 일어나자말자 기능별로 하나씩 때서 콘솔을 통해 확인하였다. 생각보다 쉽게 error의 이유와 해결 방안을 찾을 수 있었다. 함수의 return 부분이 한 줄 밀려서 if문의 괄호 안으로 들어간 것이었다. 처음 만나는 error에 error 메시지가 말해주는 부분만 계속 고치며 확인한 것이 시간이 오래 걸린 이유였다. 좀 더 구조를 잘 이해하고 유기적으로 생각하는 법을 길러야겠다. 여담으로 error가 발생했을 때, 화가 나기보다는 어디가 잘못되었을까 찾고 더 보완하고 싶은 마음에 기뻐하는 나를 보며 개발자가 천직이 아닐까 하고 생각하였다.

- 기능을 만들어 가는 와중에 치명적인 문제점을 발견하였다. 이전까지 맥 계산기는 숫자 다음에 오는 두 번째 이후 연산자일 때, 디스플레이에 연산이 바로바로 반영되었기에, 곱셈/나눗셈이 먼저 진행되어야 하는 사칙연산의 기본 규칙을 적용하지 않아도 된다고 생각하고 있었다. 기능을 쉽게 파악하기 위해 덧셈/뺄셈 위주로 기능을 확인했던 것이 문제점을 늦게 발견하게 된 이유이다. 우선은 기존에 구상한 데로 순서대로 계산하는 계산기를 먼저 만들고, 추가로 사칙 연산 규칙을 따르게 만들 것이다.

### 사칙 연산 규칙 적용하기-advenced

- 사칙 연산 규칙 적용 안됨  
  ![img-2](https://user-images.githubusercontent.com/84524514/134363680-919b52be-25b2-48b9-8825-a64d03cdae7b.gif)
- 사칙 연산 규칙 적용됨  
  ![img-3](https://user-images.githubusercontent.com/84524514/134363727-c8d62637-82c8-40a6-812a-022810ce71aa.gif)
- 현재는 연산자가 있을 때, 숫자 다음 연산자를 누르면 즉시 연산(previousNum, previousOperator, displayNum) 후 previousNum = displayNum, previousOperator = buttonContent
- 사칙연산 규칙을 적용하면, 덧셈/뺄셈 다음에 곱셈/나눗셈이 나오면 덧셈/뺄셈이 나오거나 계산을 누를 때까지 제일 앞의 숫자 하나와 연산자 하나를 보류해두고 뒤에는 계속 연산
- 즉, previousOperator가 +/-이면서 buttonContent가 ×/÷일 때, 연산 전에 스택으로 previousNum과 previousOperator 이동(previousOperator가 없어서 연산은 일어나지 않고, previousNum = displayNum, previousOperator = buttonContent)
- stack !== undefined면서 buttonContent가 +/-일 때, 연산(previousNum, previousOperator, displayNum) 후 스택을 불러와서 추가 연산(stack\[0\], stack\[1\], 앞의 연산 결과) 후 스택 초기화
- 계산은 스택이 있을 때, 추가연산만 해주면 기존과 같음
- 연산자 다음 초기화하면, 스택은 연산 안 하고 사라짐
- 조건을 만족할 때, 스택을 쌓는 부분과 스택을 포함해서 계산해 주는 부분 추가

  ```js
  if (action === "operator") {
    cancelPress();
    target.classList.add("isPressed");

    if (previousKey === "number") {
      if (previousOperator === "＋" || previousOperator === "－") {
        if (buttonContent === "×" || buttonContent === "÷") {
          stackCalculate = [];
          stackCalculate.push(previousNum, previousOperator);
          previousOperator = undefined;
        }
      }

      if (previousOperator !== undefined) {
        displayNum = calculate(previousNum, previousOperator, displayNum);
      }
    }

    if (stackCalculate !== undefined) {
      if (buttonContent === "＋" || buttonContent === "－") {
        displayNum = calculate(stackCalculate[0], stackCalculate[1], displayNum);
        stackCalculate = undefined;
      }
    }

    if (previousKey !== "clear") {
      previousNum = displayNum;
    }

    previousOperator = buttonContent;
    previousKey = "operator";
    blink();
  }
  ```

- 기존 코드에 스택이 있을 때, 스택을 포함해서 계산 해주는 부분 추가

  ```js
  if (action === "calculate") {
    cancelPress();

    let pseudoNum;

    if (previousOperator !== undefined) {
      if (previousKey === "calculate") {
        displayNum = calculate(displayNum, previousOperator, previousNum);
      } else if (previousKey === "clear") {
        displayNum = calculate(previousNum, previousOperator, previousNum);
      } else {
        pseudoNum = displayNum;
        displayNum = calculate(previousNum, previousOperator, displayNum);
        previousNum = pseudoNum;
        pseudoNum = undefined;
      }

      if (stackCalculate !== undefined) {
        displayNum = calculate(stackCalculate[0], stackCalculate[1], displayNum);
        stackCalculate = undefined;
      }

      previousKey = "calculate";
    }

    blink();
  }
  ```
