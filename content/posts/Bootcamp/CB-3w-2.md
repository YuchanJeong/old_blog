---
title: "BC-3w-2 / [CSS] 레이아웃, Selector"
date: 2021-09-07
categories:
  - "'Bootcamp'"
tags:
  - CSS
---

# Today I learned

### CSS 중급

- CSS Selector
  - selector1 + selector2는 selector1의 형제 요소 중 다음 selector2
  - selector1 ~ selector2는 selector1의 형제 요소 중 모든 selector2
  - selector:last-child는 자식 요소인 selector 중 마지막 요소
  - selector1 > selector2:lastChild는 selector1의 자식 요소인 selector2 중 마지막 요소
  - selector:last-child(n)은 자식 요소인 selector 중 마지막에서 n번째요소
  - selector1 > selector2:nth-last-child(2n+1)은 selector1의 자식 요소인 selector2 중 마지막에서 홀수 번째 요소
  - selector:first-of-type은 자식요소인 selector 중 첫 등장 요소
  - selector:last-of-type은 자식요소인 selector 중 마지막 등장 요소
  - selector:nth-of-type(n)은 n번째자식 요소인 selector(selector 중에서 n번째)
  - selector1:not(selector2)는 selector2가 아닌 selector1
- 기본 스타일링을 제거하는 CSS 코드
  - body { margin: 0; padding: 0; }
- Flex box
  - flex: 1 0 0;을 이용한 1:1 비율 배치
- 와이어프레임 설계 및 목업 구현
  ![R1280x0](https://user-images.githubusercontent.com/84524514/134382303-b195e687-aab1-42c6-88cc-8c67677ba674.png)
- 참조 사이트
  - [https://material-ui.com](https://material-ui.com)
  - [https://ant.design](https://ant.design)
  - [https://getbootstrap.com](https://getbootstrap.com)

### Twitter 목업 만들기

- 아직은 하드코딩으로 정보를 일일히 입력했다.
- 조금 더 배워서 정보를 불러오는 방식으로 만들고 싶다.
- vw와 vh를 활용해서 반응형으로 만들었다.
- 아직 class 이름 만들기가 많이 어려웠다.

![R1280x0-2](https://user-images.githubusercontent.com/84524514/134382325-a6719e3f-c46f-4fc1-aa17-1dfbf351aa28.png)
![R1280x0-3](https://user-images.githubusercontent.com/84524514/134382370-2d597b14-be29-4aa9-b87f-546630bf53b1.png)
![R1280x0-4](https://user-images.githubusercontent.com/84524514/134382378-ade610f7-8a9d-4dd4-ab29-9335268b392a.png)
![R1280x0-5](https://user-images.githubusercontent.com/84524514/134382390-06d90cf2-3e24-41b2-ad85-a005f56c4d1f.png)

# Today's takeaway

- 오늘은 CSS를 활용해서 직접 웹 화면을 구성해 보았다.
- 이론적으로는 잘 알고 있었지만, 직접 화면을 만들어보니 어려웠다. 내가 원하는데로 자연스럽게 구성하고 작동 시키는데 어려움이 있었다.
- 특히 HTML 구조를 만들 때, 어떻게 효율적으로 묶어서 만들지 고민이 많이 되었다.
- CSS에서도 선택자를 어떻게 활용하는 것이 효율적일지 아직은 잘 모르겠다.
- 이번 주말에는 CSS로 여러 레이아웃들을 만들어보면서 연습해야겠다.

# Tomorrow I'll learn

- 원시 자료형과 참조 자료형
  - 원시 자료형은 같은 형태는 같은 메모리에 저장
  - 참조 자료형은 같은 형태도 다른 메모리에 저장
- 스코프
  - const와 let은 block level scope 이다.
- 클로저
  - 함수를 리턴하고, 리턴하는 함수가 클로저를 형성한다.
  - 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.
  - 이 환경은 클로저가 생성된 시점의 유효 범위 내에 있는 모든 지역 변수로 구성된다.
