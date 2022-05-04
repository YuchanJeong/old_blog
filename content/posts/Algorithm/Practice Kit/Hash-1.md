---
title: "[Practice Kit] Hash"
date: 2022-05-02
categories:
  - "'Algorithm'"
tags:
  - Algorithm
  - Practice Kit
---

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
// 중복이 있어서 이미 값이 있는 경우 해당 key에 1이 남게 됨.
// completion에 없는 경우 1이 남게 됨.
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

3. reduce 사용

```js
// completion의 요소를 key로 중복이 있으면 1+a, 없으면 1을 value로 가지는 객체 생성.
// completion에 있는 경우 -1을 해주고, 없을 경우 0이라 falsy 즉, 해당 el이 반환.
// "쉼표 연산자"
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

### 2. 위장 (Lv.2) [\*](https://programmers.co.kr/learn/courses/30/lessons/42578?language=javascript)

1. Map 사용

```js
// 옷 종류별로 갯수 + 1(안입는 경우의 수) 전부 곱한 뒤 -1(아무것도 안입는 경우의 수)
function solution(clothes) {
  let count = 1;

  const map = new Map();

  for (let el of clothes) {
    const type = el[1];
    map.set(type, (map.get(type) || 0) + 1);
  }

  // for (let v of map.values()) {
  for (let [_, v] of map) {
    count *= v + 1;
  }

  return count - 1;
}
```

2. reduce 사용

```js
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

### 3. 베스트앨범 [\*](https://programmers.co.kr/learn/courses/30/lessons/42579)

```js
function solution(genres, plays) {
  const info = genres.map((genre, idx) => ({
    num: idx,
    genre: genre,
    play: plays[idx],
  }));

  // 1) 장르별 총 플레이 시간
  const genre_play_obj = genres.reduce(
    (obj, genre, idx) => (
      (obj[genre] = obj[genre] ? obj[genre] + plays[idx] : plays[idx]), obj
    ),
    {}
  );

  info.map((el) => {
    const genre = el.genre;
    const genre_play = genre_play_obj[genre];

    el.genre = genre_play;
  });

  // 2) 순서대로 정렬
  info.sort((a, b) => b.play - a.play);
  info.sort((a, b) => b.genre - a.genre);

  // 3) 2개만 베스트앨범에 추가
  const count = {};
  const best_album = [];

  info.forEach((el) => {
    count[el.genre] = count[el.genre] ? count[el.genre] + 1 : 1;

    if (count[el.genre] < 3) {
      best_album.push(el.num);
    }
  });

  return best_album;
}
```

---

\*Ref. [프로그래머스 고득점 Kit - 해시](https://programmers.co.kr/learn/courses/30/parts/12077)
\*Ref. [ratsgo's blog - 해싱, 해시함수, 해시테이블](https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/)