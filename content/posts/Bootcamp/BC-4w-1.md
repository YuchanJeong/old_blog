---
title: "BC-4w-1 / [JS/브라우저] DOM(2) + <FC> TypeScript"
date: 2021-09-13
categories:
  - "'Bootcamp'"
tags:
  - DOM
  - TypeScript
---

## Today I learned

### DOM API 정리

- childrenNodes는 텍스트와 태그가 섞여 있을 때 사용
- dataset
  - \<tag data-user|role|user-id="">\</tag>  
    // tagEl.dataset.user|role|userId
- 좌표 정보:
  - offsetTop, offsetLeft
  - scrollTop, scrollLeft
  - clientTop, clientLeft
- 위치 정보:
  - offsetWidth, offsetHeight
  - scrollWidth, scrollHeight
  - clientWidth, clientHeight
- event.target은 해당 이벤트의 대상 요소를 선택

### + TypeScript with FastCampus

- JavaScript는 Dynamic Types, TypeScript는 Static Types  
  즉, JS는 실행하기 전까지 에러를 알 수가 없음
- 타입은 해당 변수가 할 수 있는 일을 결정
- TypeScript는 structural type system(구조가 같으면 같은 타입)
- 데이터의 타입이 같거나 서브 타입인 경우, 할당 가능 -> 공변  
  함수의 매개변수 타입이 같거나 슈퍼 타입인 경우, 할당 가능 -> 반병

\*[WIL](https://github.com/YuchanJeong/WIL)에 정리

## Today's takeaway

- 주말에 이전 기수들의 프로젝트를 보았을 때, 잘 만든 팀들은 전부 타입 스크립트를 사용하였길래 무엇인지 알아보니 코딩의 안정성을 높여주는 매력적인 언어라 공부해야겠다고 마음먹었었다. 마침 오늘 코드 스테이츠 일정이 여유로워서 빨리 끝내고, 혼자서 타입 스크립트를 공부하였다.
- 기본적으로 자바 스크립트와 크게 다르지 않아서 어렵지 않게 배울 수 있었다. 하지만 아직 실전에서 사용해 보거나, 문제를 풀어본 적이 없어서 체화의 기회는 없었다.
- 원래 코딩을 할 때도 edge case를 찾으려고 애쓰면서 하는데, 오류를 최대한 줄일 수 있는 타입 스크립트는 나에게 정말 매력적인 언어였다. 코드를 작성하는 와중에 오류가 계속 보이니 코드의 흐름을 좀 더 쉽게 이해하면서 작성할 수 있었다.
- 영어 공부도 열심히 해야 하는데 코딩 공부가 너무 재미있어서 진도가 거의 나가지 않았다. 듣기 조금과 단어 조금 외운 것이 전부다. 밸런스를 찾을 수 있게 신경 써야겠다.

## Tomorrow I'll learn

- 내일은 JS 고차 함수를 배운다. 이름만 보고 겁먹었는데, 내용을 보니 이미 사용해보았던 콜백 함수나 배열의 메소드들 이여서 어렵지 않게 진행할 수 있을 거 같다.
- 혹시 빠르게 끝낸다면 혼자서 SCSS를 공부할 예정이다. 모래 react를 배우는데, 그전에 SCSS까지는 혼자 공부를 끝내고 싶다.
