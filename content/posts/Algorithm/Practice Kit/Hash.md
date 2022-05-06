---
title: "[Practice Kit] 해시(Hash)"
date: 2022-05-02
categories:
  - "'Algorithm'"
tags:
  - Algorithm
  - Practice Kit
---

> Key-value쌍으로 데이터를 빠르게 찾아보세요.

## 개념 정리

### Hash Table

- key, value 쌍으로 데이터를 배열(bucket, slot)에 저장하는 자료 구조.
- 적은 리소스로 많은 데이터를 효율적으로 관리하기 위해 사용.
  - Ex. 작은 크기의 캐쉬 메모리로도 프로세스 관리 가능.
- 빠른 저장 혹은 검색 가능.
- key값에 해시 함수를 적용해서 고유한 index를 찾은 후 값을 저장 혹은 검색.
- 데이터 저장 혹은 검색 시 해시 함수를 1번만 수행해서 평균 시간복잡도는 **O(1) (상수 시간, Constant time)**.
- 메모리를 미리 할당해 둬야 해서 공간 효율적이지는 않음.

### Hash Function

임의의 길이를 갖는 임의의 데이터를 고정된 길이의 데이터(hash value)로 매핑하는 단방향 함수.

1. Division Method

   - 숫자로 된 키값을 해시 테이블의 크기로 나눈 나머지를 해시값으로 반환.
   - 해시 테이블의 크기는 2의 제곱수와 거리가 먼 소수를 사용하는 것이 좋음.
   - 단점: 해시 테이블의 크기가 정해짐.

2. Multiplication Method

   - 숫자로 된 키값 _k_, 0과 1 사이의 실수 _A_, 해시 테이블의 크기 _m_
     - h(_k_)=(*kA*mod1)x*m*
     - *m*은 중요하지 않으며 보통 2의 제곱수를 사용.
   - 2진수 연산에 최적화한 컴퓨터 구조 고려.
   - 단점: Division Method 보다 느림.

3. Universal Hashing
   - 다수의 해시 함수를 집합 *H*에 넣어두고, 무작위로 선택해 해시값을 만드는 방법.
   - 임의의 키값을 임의의 해시값에 매핑할 확률을 1/*m*로 만드는 것이 목적.

### Hash Collision

해시 함수가 서로 다른 두 개의 키에 대해 동일한 해시값 반환.

1. Separate Chaining(분리 연결법)
   - 해당 버킷에 데이터가 이미 있으면 노드를 추가해 다음 노드를 가리키는 방식으로 구현.
   - 장점: 해시 테이블의 확장이 필요없고, 간단하게 구현 및 삭제 가능.
   - 단점: 데이터의 수가 많아지면 동일한 버킷에 연결되는 데이터가 많아지며 효율성 감소.  
     \*O(n)까지 시간복잡도 증가 가능
2. Open Addressing(개방 주소법)
   - 비어있는 해시 테이블의 공간을 활용.
   - 해시 함수로 얻은 주소가 아닌, 다른 주소에 데이터를 저장.
   - 메모리 문제가 발생하지 않으나 해시 충돌이 생길 수 있음.

## 문제

### 1. 완주하지 못한 선수 (Lv.1) [\*](https://programmers.co.kr/learn/courses/30/lessons/42576?language=javascript#)

1. sort 사용

```js
// 1. 순서데로 정렬.
// 2. 하나씩 비교 -> 다른 순간 해당 참가자는 완주하지 못한 것.
function solution(participant, completion) {
  participant.sort();
  completion.sort();

  const idx = participant.findIndex((el, idx) => el !== completion[idx]);

  return participant[idx];
}
// Ps. 해시로 풀지 않음.
```

2.  Map 사용

```js
// participant에 있는 경우 +1,completion에 있는 경우 -1, 1이 남는 경우가 정답.
function solution(participant, completion) {
  const map = new Map();

  for (let i = 0; i < participant.length; i++) {
    const a = participant[i];
    const b = completion[i];

    map.set(a, (map.get(a) || 0) + 1);
    map.set(b, (map.get(b) || 0) - 1);
  }

  for (let [k, v] of map) {
    if (v > 0) return k;
  }

  return "nothing";
}
```

3. reduce, 쉼표 연산자 사용

```js
// completion의 요소를 key로 중복이 있으면 1+a, 없으면 1을 value로 가지는 객체 생성.
// completion에 있는 경우 -1을 해주고, 없을 경우 0이라 falsy 즉, 해당 el이 반환!
function solution(participant, completion) {
  const obj = completion.reduce(
    (acc, cur) => ((acc[cur] = acc[cur] ? acc[cur] + 1 : 1), acc),
    {}
  );
  return participant.find((el) => {
    if (obj[el]) obj[el] = obj[el] - 1;
    else true;
  });
}
```

```js
// 2022.05.04
function solution(participant, completion) {
  const participant_obj = participant.reduce(
    (acc, cur) => ((acc[cur] = acc[cur] ? acc[cur] + 1 : 1), acc),
    {}
  );

  completion.forEach((el) => {
    participant_obj[el] -= 1;
  });

  for (let key in participant_obj) {
    if (participant_obj[key] === 1) return key;
  }
}
```

### 2. 위장 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42578?language=javascript)

1. Map 사용

```js
// 옷 종류별로 갯수 + 1(안입는 경우의 수) 전부 곱한 뒤 -1(아무것도 안입는 경우의 수).
function solution(clothes) {
  let count = 1;

  const map = new Map();

  for (let el of clothes) {
    const type = el[1];
    map.set(type, (map.get(type) || 0) + 1);
  }

  for (let [_, v] of map) {
    count *= v + 1;
  }

  return count - 1;
}
```

2. reduce 사용

```js
// reduce로 obj와 값을 추출!
function solution(clothes) {
  return (
    Object.values(
      clothes.reduce(
        (acc, cur) => ((acc[cur[1]] = acc[cur[1]] ? acc[cur[1]] + 1 : 1), acc),
        {}
      )
    ).reduce((acc, cur) => acc * (cur + 1), 1) - 1
  );
}
```

```js
// 2022.05.04
function solution(clothes) {
  const clothes_obj = clothes.reduce(
    (obj, _clothes) => (
      (obj[_clothes[1]] = obj[_clothes[1]] ? obj[_clothes[1]] + 1 : 1), obj
    ),
    {}
  );

  let count = 1;

  for (let key in clothes_obj) {
    count *= clothes_obj[key] + 1;
  }

  return count - 1;
}
```

### 3. 베스트앨범 (Lv.3) [\*](https://programmers.co.kr/learn/courses/30/lessons/42579)

1. reduce 사용

```js
function solution(genres, plays) {
  const infos = genres.map((genre, idx) => ({
    num: idx,
    genre: genre,
    play: plays[idx],
  }));

  // 1) 장르별 총 플레이 시간.
  const genre_play = genres.reduce(
    (obj, genre, idx) => (
      (obj[genre] = obj[genre] ? obj[genre] + plays[idx] : plays[idx]), obj
    ),
    {}
  );

  infos.map((el) => {
    const genre = el.genre;
    const genre_play = genre_play[genre];

    el.genre = genre_play;
  });

  // 2) 순서대로 정렬.
  infos.sort((a, b) => b.play - a.play);
  infos.sort((a, b) => b.genre - a.genre);

  // 3) 2개만 앨범에 추가.
  const count = {};
  const album = [];

  infos.forEach((el) => {
    count[el.genre] = count[el.genre] ? count[el.genre] + 1 : 1;

    if (count[el.genre] < 3) {
      album.push(el.num);
    }
  });

  return album;
}
```

```js
// 2022.05.04
function solution(genres, plays) {
  // reduce로 Type 별로 정리
  const genres_play = genres.reduce(
    (acc, genre, idx) => (
      (acc[genre] = acc[genre] ? acc[genre] + plays[idx] : plays[idx]), acc
    ),
    {}
  );

  const count = {};
  const album = [];
  genres
    // 객체에 정보 담아서
    .map((genre, idx) => ({ genre, play: plays[idx], idx }))
    .sort((a, b) => {
      // 다중 정렬
      if (a.genre !== b.genre) {
        return genres_play[b.genre] - genres_play[a.genre];
      }
      if (a.play !== b.play) {
        return b.play - a.play;
      }
      return a.idx - b.idx;
    })
    // 상위 2개만 앨범에 포함
    .filter((info) => {
      count[info.genre] = count[info.genre] ? count[info.genre] + 1 : 1;
      if (count[info.genre] < 3) {
        album.push(info.idx);
      }
    });

  return album;
}
```

2. forEach, 다중 sort 사용

```js
function solution(genres, plays) {
  const genre_play = {};
  genres.forEach((genre, idx) => {
    genre_play[genre] = genre_play[genre]
      ? genre_play[genre] + plays[idx]
      : plays[idx];
  });

  const genre_play_count = {};
  return (
    genres
      .map((genre, idx) => ({ genre: genre, play: plays[idx], num: idx }))
      // 다중 sort.
      .sort((a, b) => {
        if (a.genre !== b.genre) {
          return genre_play[b.genre] - genre_play[a.genre];
        }
        if (a.play !== b.play) {
          return b.play - a.play;
        }
        return a.num - b.num;
      })
      .filter((genre) => {
        if (genre_play_count[genre.genre] >= 2) return false;
        genre_play_count[genre.genre] = genre_play_count[genre.genre]
          ? genre_play_count[genre.genre] + 1
          : 1;
        return true;
      })
      .map((genre) => genre.num)
  );
}
```

## My Tips

- sort
  - 내부의 값을 이용한 정렬
  - 다중 정렬

### Compile by Type

- reduce
  ```js
  const obj = arr1.reduce(
    (acc, cur, idx) => (
      (acc[cur] = acc[cur] ? acc[cur] + arr2[idx] : arr2[idx]), acc
    ),
    {}
  );
  ```
- forEach
  ```js
  const obj = {};
  arr1.forEach((el, idx) => {
    obj[el] = obj[el] ? obj[el] + arr2[idx] : arr2[idx];
  });
  ```
- map
  ```js
  const map = new Map();
  for (let i = 0; i < arr1.length; i++) {
    map.set(arr1[i], (map.get(arr1[i]) || arr2[i]) + arr2[i]);
  }
  ```

### .sort

- 객체 정렬

  ```js
  // 1) value
  arr.sort((a, b) => a.value - b.value); // value값 기준 오름차순정렬
  arr.sort((a, b) => b.value - a.value); // value값 기준 내림차순정렬

  // 2) key
  arr.map((el) => Object.entries(el));
  arr.sort((a, b) => a[0] - b[0]); // key값 기준 오름차순정렬
  arr.sort((a, b) => b[0] - a[0]); // key값 기준 내림차순정렬
  ```

- 다중 정렬

  ```js
  arr.sort((a, b) => {
    if (a.type1 !== b.type1) {
      return b.type1 - a.type1;
    }
    if (a.type2 !== b.type2) {
      return b.type2 - a.type2;
    }
    return b.type3 - a.type3;
  });

  /*
  성능이 떨어짐!
  arr.sort((a, b) => b.type3 - a.type3)
  arr.sort((a, b) => b.type2 - a.type2)
  arr.sort((a, b) => b.type1 - a.type1)
  */
  ```

---

\*Ref. [프로그래머스 고득점 Kit - 해시](https://programmers.co.kr/learn/courses/30/parts/12077)
\*Ref. [ratsgo's blog - 해싱, 해시함수, 해시테이블](https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/)
