---
title: "Git"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - Git
---

> Work Space -`add`-> Stage -`commit`-> Local Repo -`push`-> Remote Repo

## 버전 관리

### 1. .gitignore

| List                        | Details                    |
| --------------------------- | -------------------------- |
| [fileName.ext]              | 해당 파일명 전부 제외      |
| /[fileName.ext]             | 현재 폴더의 해당 파일 제외 |
| [folderName]/               | 해당 폴더의 하위 경로 제외 |
| [folderName]/[fileName.ext] | 해당 폴더의 해당 파일 제외 |
| \*.[ext]                    | 특정 확장자 파일 전부 제외 |
| ![fileName.ext]             | 예외 파일명 (버전 관리 ON) |

### 2. 시작 & 전역 속성

| Command                                               | Details                 |
| ----------------------------------------------------- | ----------------------- |
| git init                                              | 깃 추적 시작            |
| git config --global core.autocrlf true                | 개행문자 설정           |
| git config --global user.name "[사용자 이름]"         | 사용자 이름 설정        |
| git config --global user.email "[사용자 메일]"        | 사용자 메일 설정        |
| git config --global core.editor "[vim\|nano]"         | 에디터 vim\|nano로 설정 |
| git config --global commit.template ~/.gitmessage.txt | commit 템플릿 설정      |
| git config --global --list                            | 전역 속성 보기          |

### 3. 원격 저장소

| Command                                  | Details                           |
| ---------------------------------------- | --------------------------------- |
| git remote add [원격 저장소 이름] [주소] | 원격 저장소에 연결                |
| git remote remove [원격 저장소 이름]     | 원격 저장소 연결 해제             |
| git remote -v                            | 원격 저장소 연결 확인             |
| git push [원격 저장소 이름] [브랜치명]   | 로컬 저장소를 원격 저장소에 Push  |
| git pull [원격 저장소 이름] [브랜치명]   | 원격 저장소를 로컬 저장소에 Pull  |
| git clone [주소] ([폴더명])              | 현재 폴더에 클론폴더(폴더명) 생성 |

### 4. 파일 상태

| Command                        | Details                                       |
| ------------------------------ | --------------------------------------------- |
| git status                     | 파일 상태 확인                                |
| git diff                       | 파일 상태 비교<br/>(작업역역과 스테이지 차이) |
| git diff --cached              | 파일 상태 비교<br/>(스테이지와 저장소 차이)   |
| git diff [커밋ID] [커밋ID]     | 커밋간 상태 비교                              |
| git diff [브랜치명] [브랜치명] | 브랜치간 상태 비교                            |

### 5. 스테이징 (추가)

| Command          | Details                                                             |
| ---------------- | ------------------------------------------------------------------- |
| git add -p       | 변경 내용을 확인하고 헝큰 별로 추가<br/>\*y(추가), n(제외), q(종료) |
| git add [경로명] | 해당 폴더 및 하위 폴더의 변경 내용을 추가                           |
| git add .        | 현재 폴더 및 하위 폴더의 변경 내용을 추가                           |

### 6. 커밋 (확정)

| Command                   | Details                                             |
| ------------------------- | --------------------------------------------------- |
| git commit                | 커밋 생성                                           |
| git commit -m "[메시지]"  | 메시지와 함께 커밋 생성                             |
| git commit -am "[메시지]" | 스테이징 후 커밋<br/>\*한번 이상 커밋한 파일만 가능 |

### 7. 커밋 기록

| Command                        | Details                      |
| ------------------------------ | ---------------------------- |
| git log                        | 커밋 기록 보기               |
| git log -p                     | 커밋 기록과 패치내용 보기    |
| git log --stat                 | 커밋 기록과 패치통계 보기    |
| git log --online               | 커밋ID와 메시지만 보기       |
| git log [브랜치명]..[브랜치명] | 후자에만 있는 커밋 기록 보기 |

### 8. 작업 되돌리기

| Command                             | Details                                                        |
| ----------------------------------- | -------------------------------------------------------------- |
| git reset --hard [커밋ID]\|HEAD~[n] | 해당 커밋으로 되돌린 후<br/>이후의 커밋, 스테이징, 작업 초기화 |
| git reset [커밋ID]\|HEAD~[n]        | 해당 커밋으로 되돌린 후<br/>이후의 커밋, 스테이징 초기화       |
| git reset --soft [커밋ID]\|HEAD~[n] | 해당 커밋으로 되돌린 후<br/>이후의 커밋만 초기화               |
| git revert [커밋ID]                 | 해당 커밋의 수정사항 취소 후 새 커밋 생성                      |
| git revert [커밋ID]..[커밋ID]       | 해당 범위의 수정사항 취소 후 새 커밋 생성                      |

### 9. 작업 임시 저장

| Command                       | Details                                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| git stash (-u)                | 임시 저장 후 이전 커밋 상태로 되돌아감<br>(새로 추가한 파일도 임시 저장)<br/>\*한번 이상 스테이징한 파일만 임시 저장 |
| git stash list                | 스태시 목록 보기                                                                                                     |
| git stash pop                 | 최근 스태시 apply 후 drop                                                                                            |
| git stash apply (stash@{[n]}) | 최근(해당) 스태시 상대로 돌아가기                                                                                    |
| git stash drop (stash@{[n]})  | 최근(해당) 스태시 지우기                                                                                             |

## 브랜치

### 1. 브랜치 목록 및 관리

| Command                             | Details                      |
| ----------------------------------- | ---------------------------- |
| git branch (-a)                     | 브랜치 목록(+원격 목록) 보기 |
| git branch [브랜치명]               | 브랜치 생성                  |
| git branch -d [브랜치명]            | 해당 브랜치 삭제             |
| git branch -m [브랜치명] [브랜치명] | 브랜치명 바꾸기              |

### 2. 브랜치 전환 및 병합

| Command                                   | Details                        |
| ----------------------------------------- | ------------------------------ |
| git checkout [브랜치명]                   | 브랜치 전환                    |
| git checkout -b [브랜치명]                | 브랜치 생성 후 전환            |
| git checkout -t [원격저장소명]/[브랜치명] | 원격 브랜치 로드 후 전환       |
| git merge [브랜치명]                      | 현재 브랜치에 해당 브랜치 병합 |

## Etc

### 1. 파일 및 폴더 삭제

| Command                       | Details                         |
| ----------------------------- | ------------------------------- |
| git rm (--cached) [파일명]    | 해당 파일 지움(원격에서만 지움) |
| git rm -r (--cached) [경로명] | 해당 폴더 지움(원격에서만 지움) |

### 2. Fork를 이용한 공동작업

1. Fork로 내 원격 저장소에 다른 원격 저장소의 파일 찍어오기
2. 로컬에 불러와서 작업 후 내 원격 저장소에 Push
3. 내 원격 저장소에서 Pull Request

### 3. SSH 등록

1. ssh-keygen
   - ~/.ssh/에 id_rsa.pub(공개키)와 id_rsa(개인키) 생성
2. cat ~/.ssh/id_rsa.pub
   - 공개키를 복사해서 Settings -> SSH and GPG keys에 등록

### 4. GitHub 계정 오류 있을 때

- 키체인 접근 -> github.com
