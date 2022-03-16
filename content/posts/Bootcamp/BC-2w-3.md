---
title: "BC-2w-3 / [Linux] 기초"
date: 2021-09-01
categories:
  - "'Bootcamp'"
tags:
  - CLI
---

## Today I learned

### CLI 명령어

- 기본적인 이동/생성/삭제/복사 등의 명령어
- 관리자 권한을 획득하는 명령어 sudo
- 텍스트 에디터 nano
- ls -l
  - d: 폴더 / -: 파일
  - r: 읽기 권한
  - w: 쓰기 권한
  - e: 실행 권한
  - -: 권한 없음
- \-f는 강제 명령

### 패키지와 패키지 매니저 Home Brew

> eval $(/opt/homebrew/bin/brew shellenv)

| 명령어                    | 설명                      |
| ------------------------- | ------------------------- |
| brew update               | brew 자체 업데이트        |
| brew outdated             | 업데이트 필요한 파일 조회 |
| brew upgrade 프로그램명   | 프로그램 업그레이드       |
| brew search 프로그램명    | 프로그램 검색             |
| brew info 프로그램명      | 프로그램 정보 확인        |
| brew install 프로그램명   | 프로그램 설치             |
| brew uninstall 프로그램명 | 프로그램 삭제             |
| brew list                 | 설치된 프로그램 보기      |

### Node.js

- JavaScript 런타임 환경
- M1이라 막히는 부분이 있었느냐, 검색으로 잘 해결

### 짝수 생성기 과제

- 에러 발생
  1. 에러는 무엇을 말하고 있나요? Cannot find module 'range'
  2. 처음 에러가 발생한 파일은 어떤 파일인가요? internal/modules/cjs/loader
  3. 무슨 파일에서 에러가 발생했는지 알아냈다면, 몇 번째 줄인지도 알아낼 수 있을까요? :928

```bash
node:internal/modules/cjs/loader:928
  throw err;
  ^

Error: Cannot find module 'range'
Require stack:
- /Users/gotoweb/sw-sprints-cli-practice-master/getListMultiplesOfTwo.js
- /Users/gotoweb/sw-sprints-cli-practice-master/index.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:925:15)
    at Function.Module._load (node:internal/modules/cjs/loader:769:27)
    at Module.require (node:internal/modules/cjs/loader:997:19)
    at require (node:internal/modules/cjs/helpers:92:18)
    at Object.<anonymous> (/Users/gotoweb/sw-sprints-cli-practice-master/getListMultiplesOfTwo.js:1:19)
    at Module._compile (node:internal/modules/cjs/loader:1108:14)
   ...생략...
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/gotoweb/sw-sprints-cli-practice-master/getListMultiplesOfTwo.js',
    '/Users/gotoweb/sw-sprints-cli-practice-master/index.js'
  ]
}
```

- npm install range로 설치
- range 모듈을 이용하여 getListMultiplesOfTwo함수를 구현([range 모듈 사용법](https://www.npmjs.com/package/range))
  - range(이상, 미만, 증가 수)
- 이전에 만들었던 과제들도 전부 npm run submit을 이용해 제출

## Today's takeaway

- 여러 CLI 명령어들을 공부하고 개발을 위한 기본 세팅을 했다. 아직 M1에서는 여러 제한들이 있어서 검색으로 해결하였다.
- 이틀 동안 계산기를 만드느라 바빠서 책(개발자의 글쓰기)을 못 읽었는데, 오늘은 시간이 나서 다시 독서 및 정리를 하였다. 아직 개발에 관한 상식이 부족한 나에게 많은 도움이 되고, 관련 일화들도 재미있어서 좋다. 마지막 장이 기술 블로그 쉽게 쓰고 운영하기이니 다 읽고 나서 발전한 블로그를 볼 수 있으면 좋겠다.
- 탭스 리딩 진단고사를 봤다. 결과는 처참했다. 아무리 영어 공부를 조금 쉬었어도 토익 955점 + 외국인 여자 친구의 영어 자부심이 와르르 무너졌다. 다시 단어부터 차근차근 외우며 영어와 친해져야겠다.
- 주가 코딩 공부이다 보니 시간도 부족하고, 기본적으로 어휘력이 너무 부족해서 일단 리딩은 단어부터 다 외우고, 리스닝만 공부하기로 결정하였다. 내일은 리스닝 진단고사를 치고 공부 계획을 잡을 예정이다.
- 3,300개의 단어 중에서 0.2초 안에 정확한 뜻을 아는 단어를 걸러내는 작업을 하였다. 내일 마무리될 것이다.

## Tomorrow I'll learn

- 하루 종일 깃에 대하여 배울 예정이다. 깃은 버전 관리를 하기 위해 사용하며, 깃허브를 통해 원격 저장소에서 관리할 수 있다.
- 이미 공부하고 정리한 부분이지만 아직 실전에서 제대로 써본 적이 없기에 기대하고 있다.
- 각종 명령어와 브랜치의 개념을 배울 것이다.
- 확실히 아는 단어 고르기 작업을 완료하고 28개의 챕터를 2개씩 묶어 14개 챕터로 만들 것이다.
- 리스닝 진단고사를 치르고, 리스닝 공부 계획을 세울 것이다.
