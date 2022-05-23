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

### 문제 1 - PR의 커밋 중첩

\# 문제

PR이 쌓이게 되면 커밋과 변경된 파일이 중첩되는 문제가 있었다. 바로바로 리뷰 후 Merge를 하면 문제가 발생하지 않지만 현실적으로는 쉽지 않다. (bcs 주말, 새벽 PR 등) 또 중첩이 될 경우 앞의 PR은 반려하고 뒤의 PR만 Merge 하는 방법도 있지만, PR은 변경 사항을 쉽게 파악할 수 있어야 하기 때문에 너무 많아지거나 다양한 기능이 있는 건 지양해야 한다.

<img width="800" alt="PR1" src="https://user-images.githubusercontent.com/84524514/169761520-8fd9e5ca-c01c-4969-8740-ef430427fe5e.png">
<img width="800" alt="PR2" src="https://user-images.githubusercontent.com/84524514/169761498-ffc5d25c-af69-49a6-9ccc-a45db6ae82f9.png">

\# 해결

앞의 PR을 Merge 한 뒤 다음 PR을 Merge 하기 전에 Edit을 통해 브랜치를 재설정 해주면 PR이 중첩되지 않고 해당 PR의 변경 사항만 기록된다.

<img width="800" alt="PR3" src="https://user-images.githubusercontent.com/84524514/169777664-3d19858d-7d0d-48d8-bec9-5aa80f085bb3.png">
<img width="576" alt="PR4" src="https://user-images.githubusercontent.com/84524514/169777698-8d8e8245-f2f7-4886-b1e5-fd3c01762fa0.png">

### 문제 2 - useRef에 할당 불가능

캔버스에 사용자의 미디어와 공유 화면을 각각 그리기 위해 `useInterval Hook` 작성 중 `Cannot assign to 'current' because it is a read-only property.` 에러가 발생하였다. 이유는 초깃값으로 null을 지닐 때 제네릭에 null을 포함하지 않으면 변경할 수 없는 객체를 생성하기 때문이다.

Ref. [(useRef) Cannot assign to 'current' because it is read-only property](https://bobbyhadz.com/blog/react-cannot-assign-to-current-because-read-only-property)
