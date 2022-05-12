---
title: "Linux Console"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - Linux
---

{{< alert "circle-info" >}}
리눅스 콘솔 명령어 추가 예정
{{< /alert >}}

### 1. 기본 명령어

| Command      | Details                     |
| ------------ | --------------------------- |
| man [명령어] | 메뉴얼 보기                 |
| clear        | 터미널 창 정리              |
| open .       | 현재 경로를 Finder에서 열기 |
| code .       | 현재 경로를 VSC에서 열기    |
| sudo         | 관리자 권한 획득            |

### 2. 경로 탐색

| Command                                       | Details                                                                                |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| pwd                                           | 현재 절대 경로 보기                                                                    |
| ls<br/>ㅤ[경로명]<br/>ㅤ-l<br/>ㅤ-a           | 현재 경로 목록 보기<br/>- 경로 지정<br/>- 자세히 보기<br/>- 숨겨진 목록 보기           |
| which [프로그램명]                            | 해당 프로그램의 실행 경로 보기                                                         |
| cd<br/>ㅤ[경로명]<br/>ㅤ..<br/>ㅤ~<br/>ㅤ-    | <br/>해당 경로로 이동<br/>상위 경로로 이동<br/>최상위 경로로 이동<br/>직전 경로로 이동 |
| find . -type directory\|file -name "[검색어]" | 현재 및 하위 경로의 특정 폴더\|파일 찾기<br/>(Ex. "\*A\*", "\*.md")                    |

<details>
<summary>권한 (ls -l로 볼 수 있음)</summary>
사용 권한 (Ex. drwxr-xr-x)
  <ul>
    <li>d(directory) | -(non-directory)</li>
    <li>user group other</li>
    <li>r(read) | w(write) | x(execute)</li>
  </ul>
권한 변경: chmod
  <ol>
    <li>
    Symbolic method (Ex. chmod a=r-x project)
    <ul>
      <li>u(user) | g(group) | o(other) | a(all)</li>
      <li>+(add) | -(remove) | =(set exact)</li>
      <li>r(read) | w(write) | x(execute)</li>
    </ul>
    </li>
    <li>
    Absolute form (Ex. chmod 740 index.js)
    <ul>
    <li>user group other</li>
    <li>4(r)2(w)1(x)</li>
    </ul>
    </li>
  </ol>
</details>

### 3. 파일·폴더 생성 및 관리

| Command                                                             | Details                                                                                      |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| mkdir<br/>ㅤ[경로명]<br/>ㅤ-p [경로명]                              | <br/>하위 폴더 만들기<br/>해당 경로를 따라 하위 폴더 만들기                                  |
| touch [파일명]                                                      | 파일 만들기                                                                                  |
| echo<br/>ㅤ"[문자열]" > [파일명]<br/>ㅤ"[문자열]" >> [파일명]       | <br/>문자열을 덮어쓰면서 파일 만들기<br/>문자열을 추가하면서 파일 만들기                     |
| cat [파일명] (...)                                                  | 파일(들) 내용 확인                                                                           |
| mv<br>ㅤ[경로·파일명] (...) [경로]<br>ㅤ[경로·파일명] [경로·파일명] | <br>해당 폴더로 폴더·파일(들) 이동<br>이름 변경 (후자가 없는 경우)                           |
| cp<br>ㅤ[파일명] [복사파일명]<br>ㅤ-r [경로명] [복사경로명]         | <br>해당 파일 복사<br>해당 폴더 복사                                                         |
| rm<br/>ㅤ[파일명]<br/>ㅤ-r [경로명]                                 | <br/>해당 파일 삭제<br/>해당 폴더 삭세                                                       |
| grep "[검색어]" [경로명]<br/>ㅤ-n<br/>ㅤ-i<br/>ㅤ-r                 | 특정 파일에서 특정 키워드 검색<br/>- 줄 표시<br/>- 대소문자 무시<br/>- 현재 및 하위경로 검색 |

### 4. 환경 변수

| Command                | Details             |
| ---------------------- | ------------------- |
| export [환경변수]=[값] | 환경 변수 임시 저장 |
| unset [환경변수]       | 해당 환경 변수 삭제 |
| env                    | 모든 환경 변수 보기 |

### 5. 텍스트 에디터

| Name | Command       | Details              |
| ---- | ------------- | -------------------- |
| vim  | vi [파일명]   | i -> esc -> :wq      |
| nano | nano [파일명] | ctrl+X -> Y -> enter |
