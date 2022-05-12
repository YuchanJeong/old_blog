---
title: "Node.js"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - JavaScript
---

- 확장성 네트워크 애플리케이션(특히 서버 사이드) 개발에 사용되는 소프트웨어 플랫폼(런타임 환경)
- 작성 언어로 JavaScript를 활용하며, Non-blocking I/O과 Single thread Event loop를 통한 높은 처리 성능을 가짐

## 1. NVM(Node Version Manager)

1. Home Brew 설치 [^](https://github.com/YuchanJeong/WIL/blob/master/Etc/HomeBrew.md)
   - /bin/bash -c "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. Error Handling
   - command not found: brew
     - eval $(/opt/homebrew/bin/brew shellenv)
   - nvm install
     - arch -x86_64 zsh
3. Node.js 설치
   - brew install node

| 명령어               | 설명                |
| -------------------- | ------------------- |
| node --version       | node 버전           |
| nvm --version        | nvm 버전            |
| nvm install [버전]   | 특정 버전 node 설치 |
| nvm uninstall [버전] | 특정 버전 node 삭제 |
| nvm ls               | node 목록           |
| nvm use [버전]       | 특정 버전 node 사용 |

## 2. NPM(Node Package Manager)

| 명령어                                | 설명                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------- |
| npm init -y                           | package.json 생성                                                         |
| npm install<br/>npm i (-D) [패키지명] | package.json에 기록된 패키지 설치<br/>일반(개발) 의존성 패키지 설치       |
| npm update [패키지명]                 | 같은 major의 최신 버전으로 업데이트 <br/>(^major.minor.patch일 때만 가능) |
| npm run [명령]                        | package.json의 script에<br/>"명령": "명령어" 등록 후 사용                 |
| npx [명령어]                          | 패키지의 명령어 바로 사용                                                 |

\*패키지명@패키지버전으로 특정 버전 패키지 설치 가능<br/>
\*.cache/, dist/, node_modules/는 package.json에 기록되어 있어서 버전 관리 제외(.gitignore) 필요

## 3. 기타 PACKAGE

- -g [nodemon](https://www.npmjs.com/package/nodemon)
- [lodash](https://lodash.com/docs)
- -D [parcel-bundler](https://parceljs.org/docs/)
- [dayjs](https://www.npmjs.com/package/dayjs)
- [nanoid](https://www.npmjs.com/package/nanoid)
