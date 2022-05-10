---
title: "BC-3w-5 / [JS/브라우저] DOM(1)"
date: 2021-09-10
categories:
  - <Bootcamp>
tags:
  - DOM
---

## Today I learned

### DOM 이해하기

> Document Object Model의 약자로, HTML 요소를 Object처럼 조작할 수 있는 Model

- \<script>\</script>는 등장과 함께 실행 즉 순서상의 문제 발생
  - defer를 DOM 전체가 필요한 스크립트나 실행 순서가 중요한 경우에 적용
  - async는 방문자 수 카운터나 광고 관련 스크립트같이 독립적인 스크립트에 혹은 실행 순서가 중요하지 않은 경우에 적용
- DOM은 document 객체에 구현되어 있음
- console.dir은 DOM을 객체의 모습으로 출력
- node.children은 자식 요소 조회
- node.parentElement은 부모 요소 조회

### DOM으로 HTML 조작하기

- CREATE - createElement
- READ - querySelector, querySelectorAll
- UPDATE - textContent, id, classList, setAttribute
- DELETE - remove, removeChild, innerHTML = "" , textContent = ""
- APPEND - append, appendChild

  ```js
  parentEl = document.querySelector(".parent");
  childrenEls = document.querySelectorAll(".parent .children");

  while (parentEl.firstElementChild) {
    parentsEl.removeChild(parentsEl.firstElementChild);
  }

  while (parentsEl.children.length > 0) {
    parentsEl.removeChild(parentsEl.lastElementChild);
  }

  childrenEls.forEach(function (children) {
    children.remove();
  });

  for (let item of childrenEls) {
    item.remove();
  }
  ```

### 유효성 검사(Form validation)

- .onkeyup = function() {}
- .onclick = function() {}
- 이벤트 속성(onclick)에 이벤트 핸들러를 등록할 때에는 함수 그 자체로 등록해야 함. 함수 실행을 등록하는 것이 아님
  - function handler() {}  
    btn.onclick = handler ---(O)  
    btn.onclick = handler() ---(X)
- /^(?=.\*\[A-Z\])(?=.\*\[a-z\])(?=.\*\\d)(?=.\*\[@$!%\*#?&\])\[A-Za-z\\d@$!%\*#?&\]{8,}/.test(str)
  - 8글자 이상이면서, 소문자와 대문자, 숫자 및 특수문자(!@#$%&\*?) 하나 이상 포함

## Today's takeaway

- 이미 배웠던 내용이지만 실습을 통해 한 번 더 복기할 수 있었다.
- 정규 표현식을 활용하여 유효 검사를 하는 법을 배웠다. 이미 알던 내용이지만 직접 사용하는 것을 보고 어떻게 활용할 수 있는지를 알았다.
- 오늘 페어 프로그래밍 직전에 페어가 갑자기 중도 포기를 하였다. 갑작스러웠지만 혼자서 잘 해낼 수 있었다.

## Weekend I'll learn

- CSS를 좀 더 다뤄보기 위해서 간단한 방응형 웹사이트를 만들며 연습할 것이다.
- 부트 캠프의 마지막 단계인 프로젝트를 대비하기 위해서 자료를 찾아보다가 코드 스테이츠 유튜브에 이전 기수들의 프로젝트가 있는 것을 보았다. 일단 영상들을 확인해 보고 어떤 느낌으로 진행되는지를 파악한 다음 적절한 프로젝트 아이디어를 미리 생각해 볼 것이다.
