---
title: "BC-2w-5 / [JS/Node] 배열, 객체"
date: 2021-09-03
categories:
  - "'Bootcamp'"
tags:
  - JavaScript
---

# Today I learned

### 배열

- 대소문자 구분 잘하자
- console.table()
  - 테이블로 콘솔에 출력
- arr.shift()
  - 배열 첫 번째 요소 삭제
- arr.pop()
  - 배열 마지막 요소 삭제
- .join(\[separator\])
  - 요소를 구분자로 구분한 문자열
- Array.isArray(variable)
  - 배열 요소인지 여부 판단  
    \*null은 variable === null로 판단
- for...of for...in
  - for (let item of array) { 반복내용 }
- for...in
  - for (let key in object) { 반복내용 }
- \[\] === \[\]은 false, 주소가 다른 두 개의 빈 배열

### 배열 문제

- 24

  ```js
  function mine(arr) {
    let str;
    if (arr.length === 8) {
      arr.splice(4, 0, "-");
      str = arr.join("");
      return "(010)" + str;
    } else {
      arr.splice(0, 0, "(");
      arr.splice(4, 0, ")");
      arr.splice(9, 0, "-");
      str = arr.join("");
      return str;
    }
  }

  function ref(arr) {
    const len = arr.length;
    let first = "(010)";
    const middle = arr.slice(len - 8, len - 4).join("");
    const last = arr.slice(len - 4, len).join("");
    if (len === 11) {
      first = `(${arr.slice(0, 3).join("")})`;
    }
    return `${first}${middle}-${last}`;
  }
  ```

### 객체

- delete 키워드로 key-value 삭제 가능
  - Ex. delete object.key
- in 연산자로 key 존재 여부 확인 가능

  - Ex. 'key' in object // --> boolean

  ```js
  let yuchan = {};
  // A~C 중 하나를 여기에 넣으면, 아래의 결과가 나와야 함.
  question(yuchan, "isKorean", true);
  console.log(yuchan.isKorean); // true

  // A.
  function question(obj, property, value) {
    obj["property"] = value;
  }

  // B.
  function question(obj, property, value) {
    obj[property] = value;
  }

  // C.
  function question(obj, property, value) {
    obj.property = value;
  }

  // A와 C는 property라는 key을 만들고 그 key에 value를 담음.
  // B가 되는 이유는 property가 문자열 타입의 파라미터기 때문.
  ```

# Today's takeaway

- 배열은 반복문과 자주 쓰인다.
- 배열은 원본이 변하는 메소드가 많다.
- 오늘 처음으로 사전 지식이 없는 페어와 페어 프로그래밍을 진행하였다. 페어가 "진행이 빠르다", "이해 속도가 차이 나니 한번 혼자 생각할 시간을 달라", "이미 알고 있는 내용이라 설명 안 해도 되고, 물어보는 거만 답해주면 된다" 등 적극적으로 피드백을 주셨고, 그 덕에 빠르게 나의 문제점들을 고쳐나가며 페어 프로그래밍을 진행할 수 있었다.
- 리스닝 진단 평가를 완료하였다. 코딩 공부가 주기 때문에 영어 공부는 미리 계획을 다 잡아두기보단 하루에 할 최소 분량만 정해두고, 유동적으로 진행하기로 하였다.

# Weekend I'll learn

- 맥 기본 계산기를 처음부터 만들어 볼 것이다. 이미 형태는 완료하였고, 기능만 구현하면 된다.
- 블로그 글들을 전체적으로 다듬을 것이다.
- WIL에 정리한 내용들을 다시 한번 확인하고 다듬을 것이다.
