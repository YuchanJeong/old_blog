---
title: "[Debate-Ducks] WebSocket - Canvas"
date: 2022-05-22
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## 개요

## 문제 및 문제 해결

### 문제 1 - useRef에 할당 불가능

캔버스에 사용자의 미디어와 공유 화면을 각각 그리기 위해 `useInterval Hook` 작성 중 `Cannot assign to 'current' because it is a read-only property.` 에러가 발생하였다. 이유는 초깃값으로 null을 지닐 때 제네릭에 null을 포함하지 않으면 변경할 수 없는 객체를 생성하기 때문이다.

Ref. [(useRef) Cannot assign to 'current' because it is read-only property](https://bobbyhadz.com/blog/react-cannot-assign-to-current-because-read-only-property)
