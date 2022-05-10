---
title: "BC-1w-2 / [JS/Node] 변수, 타입, 함수"
date: 2021-08-24
categories:
  - <Bootcamp>
tags:
  - JavaScript
---

## Today I learned

### 변수

- 변수 기초
  - 변수란 이름이 붙은 값
  - 메모리에 저장된 변수(데이터)를 불러내서 활용 가능
  - 카멜 케이스로 작성
- 선언과 할당
  - 선언
    - let
      - 재할당 가능
    - const
      - 재할당 불가능
  - 할당
    - (여기에) = (여기를 할당)
  - Ex.  
    선언: let myName  
    할당: myName = 'Yuchan'  
    선언 + 할당: let myName = 'Yuchan'

### 타입

- 원시형 데이터
  - string, number, boolean, null, undefined
- 참조형 데이터
  - array, object, function

### 함수

- 함수 기초
  - 논리적인 일련의 작업을 하는 하나의 단위
  - 코드들이 하나의 블록에 모인 것
  - 반복적인 일처리 가능
  - 입력(parameter)과 출력(return)의 매핑
    - 리턴이 없을 때, undefined
  - 선언(매개변수, parameter)과 호출(전달 인자, argument)
- 함수 선언
  - 함수 선언식(기명 함수)  
    function getFullName(firstName, lastName) {  
     return console.log(\`\${firstName} \${fullName}\`)  
    }
  - 함수 표현식(익명 함수)  
    const getFullName = function(firstName, lastName) {  
     return console.log(\`\${firstName} \${fullName}\`)  
    }
  - 화살표 함수  
    const getFullName = (firstName, lastName) =>  
     console.log(\`\${firstName} \${fullName}\`)  
    \*{return} 생략 가능  
    but 한 줄의 단순한 형태일 때만 생략하자(bcs 직관성 해침)

### 코드 학습법

- 구글링도 중요한 능력
  - mdn, how to 를 적극 활용 하자
- 개발자 도구 활용(크롬은 F12, 사파리는 cmd+opt+i)
- 코플릿(코드 스테이츠 학습 플랫폼)에서 테스트 진행
- 모르는 내용은 고민 후 [아고라](https://github.com/codestates/agora-states/discussions)(코드 스테이츠 버전 Stack Overflow)에 질문

### 조건문

- 원할 때만 기능이 작동하도록 할때, 조건문이 필요함
- 비교 연산자
  | 연산자 | 설명 |
  | ------ | ----------------- |
  | \> | 초과 |
  | < | 미만 |
  | \>= | 이상 |
  | <= | 이하 |
  | \=== | 같다(타입 까지) |
  | !== | 다르다(타입 까지) |
  | \== | 값만 같다 |
  | != | 값만 다르다 |
- if 조건문  
  if (조건 1) {  
  // 조건 1이 통과할 경우  
  } else if (조건 2) {  
  // 조건2가 통과할 경우  
  } else {  
  // 모든 조건이 통과하지 않을 경우  
  }  
  \*조건에는 boolean 데이터
- 논리 연산자
  | 연산자 | 설명 |
  | ------ | ----------------- |
  | \|\| | or |
  | && | and |
  | ! | truthy와 falsy(false, null, undefined, '', 0, NaN)를 반전 |

### ps. 에러 메시지 알아보기

- 엣지 케이스(극단적인 상황)에서도 에러가 나지 않아야 함
- 디버그 과정
  1. 문제의 요구사항 파악
  2. 테스트 케이스 확인
  3. 테스트 실패 이유 확인 from 에러 메시지

### ps. 알고리즘

- 문제를 해결하기 위한 일련의 절차나 방법을 의미
- 너무나 당연한 과정을 기계가 이해할 수 있도록 세분화해서 논리적으로 접근
- 하지만 처음부터 세분화해서 접근하기는 어렵기 때문에, 수도 코드(자연어로 작성된 절차)를 먼저 작성
- 알고리즘 작성 과정
  1. 전제 문제를 작은 문제로 분해
  2. 수도코드(pseudo code) 작성
  3. 코드 작성

\*반복된 코드를 작성하고 있다면, 좀 더 보편화(하나의 코드로 처리)되게 만드는 게 좋음  
\*하나의 코드가 하나의 기능만 해야지 여러 기능을 하는건 좋지 않음

## Today's takeaway

- 본격적인 공부 시작! 아직은 기초를 다지는 부분인데다 이미 혼자서 공부했던 부분이라 쉽게 따라가고 있다.
- 처음으로 페어 프로그래밍 진행! 파트너가 전공자+전직 개발자라 첫 번째 과제는 아주 쉽고 빠르게 통과하였다.
- 난이도가 더 올라가기 전에 내실을 튼튼히 다져 놓아야겠다.

## Tomorrow I'll learn

- 조건문
  - 아침에 바로 페어 프로그래밍으로 문제풀이 진행
- 문자열
  - String.prototype.method()와 정규표현식을 사용한 문자열 다루기
