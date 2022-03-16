---
title: "BC-1w-3 / [JS/Node] 조건문, 문자열"
date: 2021-08-25
categories:
  - "'Bootcamp'"
tags:
  - JavaScript
---

# Today I learned

### 조건문 문제

- 03
- ```js
  function func(num) {
    //ref return num === 10
    if (num === 10) {
      return true;
    } else {
      return false;
    }
  }
  ```

- 11
- ```js
  function func(num1, num2) {
    if (num1 < 10 && num2 < 10 && (num1 % 2 !== 0 || num2 % 2 !== 0)) {
      return true;
    } else {
      return false;
    }
  }

  function ref(num1, num2) {
    // if 안의 if
    if (num1 < 10 && num2 < 10) {
      if (num1 % 2 !== 0 || num2 % 2 !== 0) {
        return true;
      }
    }
    return false;
  }
  ```

- 13
- ```js
  function func(score) {
    let onesDigit = score % 10;
    let grade = "";
    let sign = "";

    // 가장 예외부터 걸러냄
    if (score > 100 || score < 0) {
      return "불가능한 점수입니다.";
    }
    if (score === 100) {
      return "수+";
    }

    if (score >= 90) {
      grade = "수";
    } else if (score >= 80) {
      grade = "우";
    } else if (score >= 70) {
      grade = "미";
    } else if (score >= 60) {
      grade = "양";
    } else if (score < 60) {
      return "가";
    }

    if (onesDigit <= 2) {
      sign = "-";
    } else if (onesDigit >= 8) {
      sign = "+";
    }

    return grade + sign;
  }
  ```

- 14-제곱을 구하는 3가지 방법

  1. x \* x
  2. x \*\* 2
  3. Math.pow(x, 2)

- 16

  ```js
  function func(hh, mm, ss) {
    if (hh === 23 && mm === 59 && ss === 59) {
      return "1초 뒤에 0시 0분 0초 입니다";
    } else if (mm === 59 && ss === 59) {
      return `1초 뒤에 ${hh + 1}시 0분 0초 입니다`;
    } else if (ss === 59) {
      return `1초 뒤에 ${hh}시 ${mm + 1}분 0초 입니다`;
    } else {
      return `1초 뒤에 ${hh}시 ${mm}분 ${ss + 1}초 입니다`;
    }
  }

  /* 좀 더 보편적인 조건
    if (ss === 59) {
      mm += 1;
      ss = 0;
    } else {
      ss += 1;
    }
    if (mm === 60) {
      hh += 1;
      mm = 0;
    }
    if (hh === 24) {
      hh = 0;
    }
    return "1초 뒤에 " + hh + "시 " + mm + "분 " + ss + "초 입니다";
  }
  */
  ```

### 문자열

- str\[n\]은 char
  - 문자열은 string(str), 문자 하나는 character(char)
  - index로 접근은 가능하지만 쓸 수는 없음(read-only)
- +를 이용해서 문자열을 합칠 수 있음
  - string을 다른 타입과 같이 +를 쓰면, string 형식으로 변환
- .length로 문자열의 길이를 알 수 있음
- .indexOf(searchValue)나. lastIndexOf(searchValue)로 원하는 문자의 index를 찾을 수 있음
- .includes(searchValue)로 문자 포함 여부를 알 수 있음, 구형 브라우저(IE)에서는 작동 안 함
- .split(separator)는 separator을 기준으로 분리된 문자열이 포함된 배열을 반환
  - Ex. 'Hello from the other side'. split(' ')은 \['Hello', 'from', the', 'other', 'side'\]
  - csv형식을 처리할 때 유용
    - Ex. let csv =  
      \`연도,제조사,모델,설명,가격  
      1997,Ford,E350,"ac, abs, moon",3000.00  
      1999,Chevy,"Venture ""Extended Edition""","",4900.00  
      1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00  
      1996,Jeep,Grand Cherokee,"MUST SELL!  
      air, moon roof, loaded",4799.00\`  
      let lines = csv.split('\\n')  
      lines\[0\].split(',')은 \['연도', '제조사', '모델', '설명', '가격'\]  
      \*줄바꿈은 '\\n'으로 찾을 수 있음
- .slice(start, end)로 문자열을 원하는 만큼 선택 가능(~이상~미만)
- .toUpperCase()와 .toLowerCade()로 대소문자 변경 가능
- 모든 string타입 메소드는 원본을 변형시키지 않음
- 추가 사항(스스로 공부)
  - .trim(), .replace(), 정규표현식
  - 이스케이프 시퀀스
    - \\n: enter, \\t: tap, \\b: backspace

### 문자열 문제

- 17

  ```js
  function func(name, period) {
    if (period < 60) {
      return `${name}: ${period}분 전에 접속함`;
    } else if (period >= 60 && period < 1440) {
      period = Math.floor(period / 60);
      return `${name}: ${period}시간 전에 접속함`;
    } else if (period >= 1440) {
      period = Math.floor(period / 1440);
      return `${name}: ${period}일 전에 접속함`;
    }
  }
  // 나누기를 이용한 단위의 구분​
  ```

# Today's takeaway

- 아는 내용이었지만, 직접 문제들을 풀어보니 알기만 하는 것과 직접 코드를 써보는 것은 차이가 매우 컸다.
- if 문을 사용할 때는 순서가 매우 중요하고, return을 하면 그 즉시 함수가 종료된다.
- 페어 프로그래밍도 페어와의 커뮤니케이션을 통해 점점 더 좋아지고 있다. 첫날은 문제를 푸는 것에만 집중을 했다면, 오늘은 문제를 푸는 과정을 설명하는 것에도 집중하였다.

# Tomorrow I'll learn

- 반복문
  - for() 반복문의 활용
  - 간단한 기능을 반복하여 수행시킬 수 있음
