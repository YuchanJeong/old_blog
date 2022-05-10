---
title: "BC-3w-1 / [JS/Node] 객체"
date: 2021-09-06
categories:
  - <Bootcamp>
tags:
  - JavaScript
---

## Today I learned

### 객체 문제

- 15

  ```js
  function func(arr, obj) {
    let result = {}
    for (let key in obj) {
      for (let item of arr) {
        if (key === item) {
          // result안에 key가 없으면,
          // key를 만들며 obj[key] 할당
          result[key] = obj[key]
        }
      }
    }
    return result
  }​
  ```

- 21-continue

  ```js
  function func(str) {
    let arr = str.split(" ");
    let newStr = arr.join("");
    // 빈 객체에 정보 저장(result + count)
    let obj = { mostLetter: "", maxCount: 0 };

    for (let i = 0; i < newStr.length; i++) {
      //    if (str[i] === ' ') {
      //        continue 	// 특정 조건일 때, 반복문을 넘길 수 있음!!!
      //    }		          // newStr 쓸 필요 없음

      obj[newStr[i]] = (obj[newStr[i]] || 0) + 1;
      // or은 먼저 걸리면 그거 사용
      // key가 없으면 생성 하면서, newStr[i]에 value 할당
      //  if (obj[newStr[i]] === undefined) {
      //      obj[newStr[i]] = 1
      //  } else {
      //      obj[newStr[i]]++
      //  }

      if (obj[newStr[i]] > obj.mostCount) {
        obj.maxNum = obj[newStr[i]];
        obj.mostLetter = newStr[i];
      }
    }

    return obj.mostLetter;
  }
  ```

## Today's takeaway

- obj.key와 obj\["key"\] 구분 중요
- 대부분의 문제가 obj1\[key\] = obj2\[key\]를 활용
- 빈 객체에 필요한 정보만 저장하는 형태로 사용 가능
- 배열은 인덱스, 객체는 이름으로 정보를 저장하고 불러올 수 있음
- 오늘은 책(개발자의 글쓰기)에서 릴리스 문서와 장애 보고서 쓰기 부분을 읽었다. 개발자의 주 업무는 개발과 보고서 작성이다. 개발만큼이나 보고서 작성도 잘하도록 공부하자.

## Tomorrow I'll learn

### CSS 레이아웃, Selector

- 웹 앱 화면 설계하기
  - 앞서 배운 HTML/CSS를 활용한 화면 설계
- Twittler 목업 만들기
  - 화면 설계 방법을 실전에 적용
