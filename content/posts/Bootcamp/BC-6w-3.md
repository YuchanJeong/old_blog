---
title: "BC-6w-3 / HA-JavaScript"
date: 2021-09-29
categories:
  - <Bootcamp>
tags:
  - JavaScript
---

## Today I learned

- HA-JavaScript

<!-- 1. 중복 요소 개수

   ```js
   function test1(str) {
     const result = {};
     arr = str.toLowerCase().split(" ");
     arr.forEach((item) => {
       if (item) {
         result[item] = (result[item] || 0) + 1;
       }
     });
     return result;
   }
   ```

2. 각 자릿수 더하기

   ```js
   function test2(num) {
     const strArr = String(num).split("");
     if (strArr[0] === "-") {
       strArr.shift();
       strArr[0] = `-${strArr[0]}`;
     }
     const numArr = strArr.map((item) => Number(item));
     return numArr.reduce((acc, cur) => acc + cur);
   }
   ```

3. 각 자릿수 곱하기 + 조건

   ```js
   function test3(num) {
     let result = num;
     while (result > 10) {
       let strArr = String(result).split("");
       let numArr = strArr.map((str) => Number(str));
       result = numArr.reduce((acc, cur) => acc * cur);
     }
     return result;
   }
   ```

4. DOM

   ```js
   function test4(arr) {
     for (let item of arr) {
       let liEl = document.createElement("li");
       document.querySelector("#container").appendChild(liEl);

       let aEl = document.createElement("a");
       aEl.classList.add("name");
       aEl.textContent = `${item.firstName} ${item.lastName}`;
       // eventHandler 안에는 함수 자체가 와야 함(함수 실행 x)
       aEl.addEventListener("click", () => printRole(item));
       liEl.appendChild(aEl);

       let divEl = document.createElement("div");
       divEl.classList.add("age");
       divEl.textContent = item.age;
       liEl.appendChild(divEl);
     }
   }
   ```

5. [key, value] 배열
   ```js
   function test5(arr) {
     const objArr = arr.map((item) => {
       return Object.fromEntries(item);
     });
     objArr.sort((a, b) => a.age - b.age);
     return objArr.map((item) => {
       if (item.firstName && item.lastName) {
         return `${item.firstName} ${item.lastName}`;
       } else if (item.firstName) {
         return item.firstName;
       } else {
         return item.lastName;
       }
     });
   }
   ``` -->

## Today's takeaway

- section1 HA로 알고리즘 테스트(JavaScript)를 진행했다.
- 문제는 전부 이전에 풀어본 양식이어서 어렵지 않았다.
- 리액트 부분을 아직 완전히 정리하지 못해서 추가로 정리했다.

## Tomorrow I'll learn

- 내일부터 다음 주 화요일 section2 시작 전까지 스스로 복습하는 기간이다. 리액트를 배운 부분까지 완벽히 정리하고, WIL 자바스크립트 부분도 다시 한번 정리할 것이다.
