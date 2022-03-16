---
title: "BC-8w-3 / [JS/Node] 비동기, 모듈"
date: 2021-10-14
categories:
  - "'Bootcamp'"
tags:
  - JavaScript
---

# Today I learned

## 비동기

#### 비동기 호출

- Node.js(런타임)
  - non-blocking, asynchronous, single-thread
- blocking vs non-blocking
  - blocking은 전화
    - 하던일을 멈추고 받아야함(blocking)
    - 요청에 대한 결과가 동시에 일어남(synchronous)
  - non-blocking은 문자
    - 확인 후, 나중에 답잘 가능(non-blocking)
    - 요청에 대한 결과가 동시에 일어나지 않음(asynchronous)
- 비동기 주요 사례
  - DOM 이벤트 핸들러
  - 타이머 API
  - 에니매이션 API
  - fetch API
  - AJAX (XHR)

#### JS 작동 원리

1. Heap에는 데이터 저장되고, 「Call Stack」에는 함수가 들어옴
2. 블로킹을 일으키는 함수는 「Web API」로 이동해서 대기(보통 함수는 바로 실행 후 나감)
3. 대기시간이 지나면 「Callback Queue」로 이동
4. 「Event Loop」가 Call Stack이 비었을 때, Callback Queue의 함수를 Call Stack에 다시 넣어줌
5. 함수 실행 후 나감

#### Callback

```js
const printString = (string, cb) => {
  setTimeout(() => {
    console.log(string);
    cb(); // callback 함수 실행
  }, Math.floor(Math.random() * 1000));
};

// 실행 위치를 보장하기 위해 Callback 함수를 중첩해서 사용
// Callback Hell 발생, 이를 해결하기 위해 Promise 사용
const printAll = () => {
  printString("A", () => {
    printString("B", () => {
      printString("C", () => {});
    });
  });
};

printAll();
```

```js
/* Error Handling */
const somethingGonnaHAppen = (cb) => {
  waitingUntilSomethingHappens();
  if (isSomethingGood) {
    cb(null, something);
  }
  if (isSomethingBad) {
    cb(something, null);
  }
};

somethingGonnaHAppen((err, data) => {
  if (err) {
    console.log("Err");
    return;
  }
  return data;
});
```

#### Promise

```js
/* Promise 사용법 */
new Promise((resolve, reject) => {
  resolve(); // Promise 이행, with (data)
  reject(); // Promise 거부, with (err)
});

.then() // Promise 이행 시 할 일, with (data) & then의 return 값
.catch() // Promise 거부 시 할 일, with (err)
```

```js
// Promise를 반환하는 함수
const printString = (string) => {
  // Promise(로 감싼 함수)를 반환
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(string);
      // Promise 이행, with (data)
      resolve();
    }, Math.floor(Math.random() * 1000));
  });
};

const printAll = () => {
  printString("A")
    .then(() => {
      return printString("B");
    })
    .then(() => {
      return printString("C");
    });
};

printAll();
```

```js
const gotoDesk = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("study");
    }, 1000);
  });
};
const eatLunch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("eat");
    }, 1000);
  });
};
const gotoBed = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("sleep");
    }, 1000);
  });
};

/* .then() & .catch() */
gotoDesk()
  .then((data) => {
    console.log(data);
    return eatLunch();
  })
  .then((data) => {
    console.log(data);
    return gotoBed();
  })
  .then((data) => {
    console.log(data);
  });

/* async & await */
const result = async () => {
  const one = await gotoDesk();
  console.log(one);

  const two = await eatLunch();
  console.log(two);

  const three = await gotoBed();
  console.log(three);
};
result();
```

- async를 추가하면 함수가 Promise를 반환
- await
  - async function 안에서만 사용 가능
  - 반환된 결과를 변수에 할당

## Node.js 모듈 사용법

#### Node.js 모듈 사용법

- [Node.js 내장 모듈 목록](https://nodejs.org/dist/latest-v14.x/docs/api/)

  ```js
  // 파일 시스템 모듈을 불러옵니다
  const fs = require("fs");
  import fs from "fs";
  // DNS 모듈을 불러옵니다
  const dns = require("dns");
  import dns from "dns";
  ```

  \*require()은 선언 위치가 상관없고, import는 최상단에 위치해야 함

#### [fs.readFile](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readfile_path_options_callback)(path[, options], callback)

- 비동기적으로 파일 내용 전체를 읽음

## Sprint - 비동기 예제 (2) 파일 읽기

#### 01_CallBack

```js
const fs = require("fs");

const getDataFromFile = (filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

getDataFromFile("README.md", (err, data) => console.log(data));
```

#### 02_Promise

```js
const fs = require("fs");

// Promise를 반환하는 함수
const getDataFromFilePromise = (filePath) => {
  // Promise(로 감싼 함수)를 반환
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

getDataFromFilePromise("README.md").then((data) => console.log(data));
```

#### 03_PromiseChancing

```js
const path = require("path");
const { getDataFromFilePromise } = require("./02_promiseConstructor");

// __dirname은 ./와 같은 일
const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

const readAllUsersChaining = () => {
  /* 1 */
  return getDataFromFilePromise(user1Path).then((user1Data) => {
    return (
      getDataFromFilePromise(user2Path)
        // `[${JSON.parse(user1Data)}, ${JSON.parse(user2Data)}]`
        // 는 "[[object Object], [object Object]]"
        .then((user2Data) => `[${user1Data}, ${user2Data}]`)
        .then((text) => JSON.parse(text))
    );
  });

  /* 2 */
  return getDataFromFilePromise(user1Path)
    .then((user1Data) => {
      const user1Object = JSON.parse(user1Data);
      return user1Object;
    })
    .then((user1Object) => {
      const resultArr = [];
      resultArr.push(user1Object);
      return getDataFromFilePromise(user2Path).then((user2Data) => {
        const user2Object = JSON.parse(user2Data);
        resultArr.push(user2Object);
        return resultArr;
      });
    });
};

readAllUsersChaining();
```

#### 04_Promise.all

```js
const path = require("path");
const { getDataFromFilePromise } = require("./02_promiseConstructor");

const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

const readAllUsers = () => {
  let promise1 = getDataFromFilePromise(user1Path);
  let promise2 = getDataFromFilePromise(user2Path);

  return Promise.all([promise1, promise2])
    .then((dataSet) => `[${dataSet[0]}, ${dataSet[1]}]`)
    .then((text) => JSON.parse(text));
};

readAllUsers();
```

#### 05_async & await

```js
const path = require("path");
const { getDataFromFilePromise } = require("./02_promiseConstructor");

const user1Path = path.join(__dirname, "files/user1.json");
const user2Path = path.join(__dirname, "files/user2.json");

const readAllUsersAsyncAwait = async () => {
  let promise1 = await getDataFromFilePromise(user1Path);
  let promise2 = await getDataFromFilePromise(user2Path);

  /* 1 */
  const text = `[${promise1}, ${promise2}]`;
  return JSON.parse(text);

  /* 2 */
  const result = [];
  const obj1 = JSON.parse(promise1);
  const obj2 = JSON.parse(promise2);
  result.push(obj1, obj2);

  return result;
};

readAllUsersAsyncAwait();
```

# Today's takeaway

- 하루 종일 풀어도 토이 프로젝트를 풀 수 없었다.
- Call Stack -> Web AIP -> Callback Queue -event loop-> Call Stack
- 비동기로 처리되는 블로킹 함수의 실행 위치를 보장하기 위해 Callback, Promise(.then() & .catch(), async & await) 사용
- Promise가 fulfilled되면 resole()의 인수를 return, rejected되면 reject()의 인수를 반환
- Promise 생성자로 Promise(로 감싼 함수)를 생성
- Promise에 .then()과 .catch()를 연결해서 실행 위치 보장
- Promise 다음의 .then()의 인수는 resolve()의 인수고, .then() 다음의 인수는 .then()의 return 값
- async 키워드로 Promise를 반환하는 함수로 만들고, await 키워드로 각 Promise들의 실행 위치 보장
- Promise를 반환하는 함수들을 Promise.all()로 배열(dataSet)로써 한 번에 다룰 수 있다.
