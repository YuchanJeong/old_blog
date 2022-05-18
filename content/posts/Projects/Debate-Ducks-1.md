---
title: "[Debate-Ducks] 개선 프로젝트 시작"
date: 2022-05-09
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## 개요

> 새로운 스택을 적극 활용해 기존 프로젝트를 개선한 새로운 버전의 Debate-Ducks 프로젝트 시작.

Ps1. 원래는 조금 더 일찍 시작해야 했으나 내가 증상이 심한 코로나에 걸려 후유증에 오래 시달리고, 또 각자의 일정이 있어서 이제야 시작하게 되었다. 🤧🤒🤕  
Ps2. 팀원중 한분은 바로 취업하셔서 4인 프로젝트에서 3인 프로젝트로 변경 되었다. 👏👏👏

## 목적

### 1. 프로젝트의 목적

- 기존 프로젝트에서 완성하지 못했던 기능 완성.
- UI/UX에서 아쉬웠던 부분 개선.
- 코드의 가독성 및 재활용성 개선.
- 기간의 압박으로 도입하지 못했던 새로운 스택들의 도입.
- 협업의 방식을 효율적으로 개선.

### 2. 새로운 스택 사용 목적

1. **TypeScript**를 사용하여 코드의 안정성과 가독성 향상.
   - 정적 타입
     - 컴파일 단계에서 오류 포착 가능
     - 개발자의 의도를 코드로 명확히 표시 가능
2. **Next.js**를 사용하여 기능 및 편의성 향상.
   - Pre-rendering, 파일 시스템 기반 라우팅등의 장점
3. **React-query**를 사용하여 외부 데이터 효율적 처리.
   - 캐싱, 중복 호출 허용 시간 조절등의 장점
4. **SCSS**를 사용하여 관심사 분리.
   - 중첩, 변수 선언, 연산자등의 장점
5. **NestJS**를 사용하여 효율성, 안정성, 확장성 향상.

## 규칙 설정

### 1. Communication Rules

부트 캠프의 프로젝트 때는 거의 모든 의사소통을 영상 회의를 통해 하였다. 그러다 보니 회의에 너무 많은 시간을 소비하였다. 그래서 이번에는 **정규 회의**를 월요일에 진행하고, 메시지와 Comment를 적극적으로 활용하며, 회의가 필요한 경우에만 목적을 명확히 하고 **임시 회의**를 진행 하기로 하였다.

### 2. Git Message Convention

기존의 Type 분류가 명확하지 않아 헷갈리던 부분을 개선하였다. (Ex. Add의 경우 파일 추가를 기준으로 하였었는데 기능 추가 없이 단순히 파일만 늘어나게 되는 경우 애매하였음) 또한 예시를 추가하여 명확성을 높혔다.

```bash
[Type] Title
# ----------
# [Add] 기능 추가 / Ex. 로그인 기능 추가
# [Update] 기능 개선 / Ex. 로그인 기능에 유효성 검사 추가
# [Delete] 기능 삭제 / Ex. 로그인 기능 삭제
# [Change] 기능 수정 / Ex. 유효성 검사 조건 변경
# [Modify] 오타 수정 및 코드 정돈 / Ex. 로그인 기능 코드 정돈
# [Fix] 문제 해결 / Ex. 로그인 기능에 중복 아이디 생성 문제 해결
# [Setting] 설정 / Ex. Redux-toolkit 초기 설정
# [Style] 스타일 관련 작업 / Ex. 로그인 버튼 스타일 적용
# [Docs] 문서 관련 작업 / Ex. README 문서에 변경 사항 추가
# [Test] 테스트 관련 작업 / Ex. 로그인 기능 테스트 코드 변경
# ----------
# 개조식으로 작성
# 내용이 필요할 경우 제목에서 한 줄 띄우고 작성
# 내용이 여러 줄일 때는 "-"로 구분
# "어떻게" 보다는 "무엇을", "왜"를 설명
```

## Github 세팅

### 1. Labels

부트 캠프의 프로젝트 때는 라벨링을 팀 단위로 철저히 적용하지는 않았다. 개인적으로는 닫힌 Issue나 PR을 확인할 때 라벨을 통해 쉽게 **필터링**이 가능하다는 장점이 마음에 들어 적극 활용하였다. 이번에는 이 장점을 적극 어필하였고 라벨링을 팀 단위로 철저히 적용하기로 하였다.

1. 엑세스 토큰 발급
   - [https://github.com/settings/tokens](https://github.com/settings/tokens)
   - scopes에서 repo 선택
2. labels.json 파일 생성

   ```json
   [
     {
       "name": "Problem",
       "color": "3B170B",
       "description": ""
     },
     ...
   ]
   ```

3. github-label-sync 사용
   ```bash
   npx github-label-sync --access-token [액세스 토큰] --labels labels.json [계정명]/[저장소 이름]
   ```

<img width="1085" alt="스크린샷 2022-05-09 오후 9 22 51" src="https://user-images.githubusercontent.com/84524514/167466579-9bdc32c8-a2dd-43e8-b79e-34afa9ab43d8.png">

- Issue Labels: `Problem`, `Suggestion`, `Urgent`
- Pull Request Labels: Git message의 [Type](#git-message-convention)과 일치

### 2. Issue Template

부트 캠프의 프로젝트 때는 Issue를 주로 Task Card로 활용하였다. 하지만 Issues 탭을 보았을 때 Task Card로 가득하여 정작 어떤 이슈들이 있었는지 알아보기 힘들었고, Task Card도 결국 PR과 중복되는 내용이라 크게 의미가 없었다. 그래서 Issue는 정말 이슈가 있을 때만 발행하고, 작업 관리의 경우 다른 툴을 활용하기로 결정하였다. (이번에는 Client와 Server의 저장소를 분리해서 Issues에서 통합 관리가 되지 않는 문제도 있었음)

- .github/ISSUE_TEMPLATE/problem-template.md

  ```md
  ---
  name: Problem Template
  about: 문제가 발생했을 때 발행하는 이슈입니다.
  title: ""
  labels: "Problem"
  assignees: ""
  ---

    <!-- 어떤 문제이며 어떤 상황에서 발생하는지 명시 -->
    <!-- 원하는지 결과 명시 -->
    <!-- 해결을 위해 사용해 본 방법 명시 -->
    <!-- 에러 코드가 있을 경우 첨부 -->
    <!-- 필요할 경우 Screenshot 및 Gif 첨부 -->
    <!-- 해결된 문제의 경우 해결 방법 명시 -->
  ```

- .github/ISSUE_TEMPLATE/suggestion-template.md

  ```md
  ---
  name: Suggestion Template
  about: 제안이 있을 때 발행하는 이슈입니다.
  title: ""
  labels: "Suggestion"
  assignees: ""
  ---

  <!-- 제안과 제안의 이유 명시 -->
  <!-- 구제적인 실현 방법이 있을 경우 명시 -->
  <!-- 참고 자료가 있을 경우 첨부 -->
  ```

### 3. Pull Request Template

부트 캠프의 프로젝트 때는 어떤 브랜치에서 어떤 브랜치로 PR을 보내는지 직접 작성하였는데 Github에서 기본적으로 명시해 주는 내용이라 더 이상 작성하지 않기로 하였다.

- .github/pull_request_template.md
  ```md
  <!-- 제목의 경우 [Type] 사용하지 않기 -->
  <!-- 변경 사항을 개조식으로 작성 -->
  <!-- 변경 사항이 여러 개일 경우 "-"로 구분 -->
  <!-- "어떻게" 보다는 "무엇을", "왜"를 설명 -->
  <!-- 결과물에 대한 Screenshot 및 Gif 추가 가능 -->
  <!-- Reviewers 등록 -->
  <!-- Assignees 등록 -->
  <!-- 포함되는 Commit의 Label 등록 -->
  ```

## Client 초기 세팅

### 1. Next.js + TypeScript

```bash
npx create-next-app --typescript debate-ducks --use-npm
```

- tsconfig.json
  ```json
  "target": "es6",
  ```

### 2. EsLint + Prettier

```bash
npm i -D eslint prettier eslint-config-prettier @typescript-eslint/eslint-plugin
```

- .eslintrc.json

  ```json
  {
    "plugins": ["@typescript-eslint"],
    "extends": [
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    "rules": {
      "react/react-in-jsx-scope": 0,
      "@typescript-eslint/no-unused-vars": 2,
      "@typescript-eslint/no-explicit-any": 2
    }
  }
  ```

- .prettierrc.json

  ```json
  {
    "arrowParens": "always",
    "bracketSpacing": true,
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxBracketSameLine": false,
    "jsxSingleQuote": false,
    "printWidth": 80,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2,
    "trailingComma": "all",
    "useTabs": false,
    "vueIndentScriptAndStyle": false
  }
  ```

- .vscode/settings.json

  ```json
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "css.lint.unknownAtRules": "ignore"
  }
  ```
