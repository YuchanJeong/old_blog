---
title: "BC-3w-4 / [JS/Node] JavaScript Koans"
date: 2021-09-09
categories:
  - "'Bootcamp'"
tags:
  - JavaScript
---

## Toady I learned

##### JavaScriptKoans

- chai_expect
  - expect(value).to.be.true
  - expect(value).to.be.false
  - expect(value).to.equal(expectedValue)
- type-1
  - 123 - '1' // -> 122
  - 1 + true // -> 2
- let/const
- scope
- arrow function
- type-2
  - 함수의 인수가 원시형 자료 변수일 때, 값만 복사해옴(변수에 변화 X)
  - Object.keys(obj).length로 object 요소의 수 확인
  - 참조형 자료를 할당하면 같은 주소를 저장하고, 이때 한쪽에서 수정하면 주소지의 내용을 수정하는 거라 양쪽 다 바뀌는 것과 같은 결과
- array
  - 함수의 인수가 배열 변수일 때, 주소가 전달(주소지의 변화 적용)
- object
  - const currentYear = new Date().getFullYear() // 현재 년도 구하기
  - Object.values(obj)
- spread syntax
  - arguments는 모든 함수의 실행 시 자동으로 생성되는 객체
  - 함수의 인수를 다룰 때, spread syntax는 배열, arguments는 객체
  - Array.from()은 반복 가능한 객체를 얕게 복사해 새로운 array객체를 만듦
  - function(a1, a2, ...as) {return \[a1, a2, ...as\]}  
    function(1) // -> \[1, undefined, \[\]\]
- destructuring

## Today's takeaway

- 이때까지 공부했던 내용들을 50개의 문제를 통해 확인해 보는 날이었다.
- 이번에도 코딩은 처음인 페어와 함께 해서, 설명하는 연습을 많이 할 수 있었다. 설명하는 능력이 많이 늘고 있다.
- 혼자서 헷갈리던 부분을 페어가 물어봤을 때, 설명하다가 더 완벽하게 이해하게 되었다.
- 문제에서 헷갈리거나 모르는 내용은 없었고, 다시 한번 정리한다는 마음가짐으로 차근차근 풀었다.
- 오늘은 책(개발자의 글쓰기)에서 제안서 쓰기 부분과 마지막 장인 기술 블로그 쓰기 부분을 읽었다.  
  제안서 쓰기 부분에서는 특히 상황에 따라 나눠서 제안서를 준비하는 방식이 흥미로웠다. 마케팅 수업에서 배웠던 SWOT 분석 형태의 분석을 여러 분야에 적용할 수 있구나 싶었다.  
  기술 블로그 쓰기 부분은 주로 회사 차원에서 운용하는 기술 블로그에 관한 내용이었다. 취업 후 회사의 기술 블로그에 기여를 할 수 있게 지금 블로깅을 통해 미리 연습한다고 생각한다.

## Tomorrow I'll learn

- 드디어 DOM API이다. 혼자 공부할 때 이 부분에서 멈춰서 어느 정도 기본은 알고 있지만 자세히는 알지 못하는 부분이라 빨리 공부하고 WIL에 정리하고 싶다.
- DOM API를 잘 다루면 HTML/CSS와 JS를 유기적으로 사용할 수 있게 된다.
- 오늘을 끝으로 혼자서 공부했던 진도를 코드 스테이츠의 진도가 따라잡았다. 이제 새로운 내용들을 배우니 더욱 기대가 된다.
