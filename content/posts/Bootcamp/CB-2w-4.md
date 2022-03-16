---
title: "BC-2w-4 / [Git] 기초"
date: 2021-09-02
categories:
  - "'Bootcamp'"
tags:
  - Git
---

# Today I learned

### Git 설치

- git config --global core.editor nano
  - 텍스트 에디터를 나노로 변경

### SSH 등록

- ssh-keygen
  - 경로 ~/.ssh/ 에 두 파일 id_rsa 와 id_rsa.pub를 생성
    - id_rsa.pub는 공개키(Public Key)
    - id_rsa는 개인키(Private Key) 또는 비밀키(Secret Key)
- cat ~/.ssh/id_rsa.pub
  - 공개키 복사
- Settings SSH and GPG keys에 등록

### git 명령어

- git restore
  - 커밋되지 않은 변경 사항을 폐기
- origin 대신 다른 이름으로 여러 원격 저장소 관리 가능
- master 대신 다른 이름으로 여러 브랜치 관리 가능  
  \*BLM운동의 일환으로 main으로 바뀌는 중

### 페어로 Git 실습

- 간단한 계산 함수의 기능들을 하나씩 작성하면 원격 저장소를 통해 페어와 협업을 연습
- 각자 작업을 하면서 커밋 기록, 일부러 충돌이 생기는 상황도 만들고 해결

# Today's takeaway

- Git Command Quiz로 깃 사용 과정을 한눈에 볼 수 있게 만들어 놓아서, untracked files -> staging area -> (stash) -> local main, remote origin/pair의 흐름을 쉽게 이해할 수 있었다.
- 터미널에서 Tap으로 자동완성을 할 수 있다는 것을 페어에게 배웠다.
- 오늘은 책(개발자의 글쓰기)에서 에러 메시지 작성에 대한 부분을 읽었다. 나는 기능만 잘 작동하게 만들면 에러를 만들지 않을 수 있다고 생각했으나, 책에서 나온 대부분의 에러 예시는 사용자가 잘못 입력한 것이 원인이었다. 에러를 해결하기 위해 유저 친화적으로 유저의 입장에서 생각하고 개발을 해야 한다는 점을 배웠다. 개발은 잠시라도 생각을 멈추면 안 되는 작업인 거 같다.
- 영어 단어 정리가 완료되었다. 처음의 3,300 단어를 2,300 단어까지 줄였다. 이제 내일부터 틈이 날 때마다(화장실, 계단 타기, 식사시간, 취침 직전 등) 단어를 외울 것이다.
- 리스닝의 경우 생각보다 단어 정리에 시간이 걸려서 진단고사를 반밖에 진행하지 못하여서 내일 진단고사를 마무리할 것이다.

# Tomorrow I'll learn

- 배열은 위치로 값을 불러오는 참조형 데이터이다.
- 객체는 key로 값을 불러오는 참조형 데이터이다.
