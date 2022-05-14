---
title: "TypeScript"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - TypeScript
---

Ref. [TypeScript Cheat sheets](https://www.typescriptlang.org/cheatsheets)

## TS Init

### 1. 설치 및 사용

| Command                                                                                | Details            |
| -------------------------------------------------------------------------------------- | ------------------ |
| npm i -D typescript                                                                    | typescript 설치    |
| npx tsc --init [^](https://www.typescriptlang.org/docs/handbook/compiler-options.html) | tsconfig.json 생성 |
| npx tsc ([파일명])                                                                     | (해당 파일) 컴파일 |
| npx tsc -w                                                                             | 자동 컴파일 모드   |

### 2. tsconfig.json[^](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

| Property        | Details                                                                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| "compileOnSave" | 저장 후 자동 컴파일                                                                                                                                   |
| "extends"       | 컴파일러 옵션 상속 경로                                                                                                                               |
| "files"         | 컴파일 할 것들 배열 (>exclude)                                                                                                                        |
| "include"       | 컴파일 할 것들 배열<br/>\*확장자를 선언하지 않으면, .ts, .tsx, .d.ts만 포함                                                                           |
| "exclude"       | include에 포함된 것들 중 제외할 것들 배열<br/>\*_설정하지 않으면, 4개 경로 자동 제외(<br/>node_modules, bower_components,<br/>jspm_packages, outDir)_ |

\*_""를 입력하면 최상위 프로퍼티 목록 확인 가능_<br/>\*_files, include, exclude를 셋다 설정하지 않으면 모든 관련 파일 컴파일_<br/>

| "compileOptions" | Details                                                          |
| ---------------- | ---------------------------------------------------------------- |
| "target"         | 빌드 결과물의 버전을 지정<br/>\*_화살표 함수, 클래스는 es6 이상_ |
| "outDir"         | 컴파일 된 결과물을 모을 폴더 지정 (Ex. ./dist/)                  |
| "rootDir"        | 컴파일 할 소스를 모을 폴더 지정 (Ex. ./src/)                     |
| "strict"         | 엄격 모드                                                        |

## TS Data Type

```ts
data: valueType; //Type annotation
```

### 1. Primitive Type

1. : string
2. : number
3. : boolean
4. : symbol (es6) [^](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
5. : null
6. : undefined

### 2. Non-Primitive Type

1. object literal type
   - : { key1: Type1; key2: Type2; ... }
2. array
   - : 타입[]
   - : (타입1 | 타입2 | ...)[]
3. tuple
   - : [타입1, 타입2, ...]
4. ~~: any~~
5. : unknown[⋯](/storage/wil/javascript/ex-typescript/#unknown)
   - 타입을 확정한 뒤 할당 및 사용 가능
6. : never
   - 항상 오류를 출력하거나, 절대 값을 반환하지 않는 함수의 리턴 타입
   - 모든 타입의 서브타입이며 어떤 타입도 할당 불가
7. : void
   - 값을 반환하지 않는 함수의 리턴 타입
   - undefined만 할당 가능

### 3. Union Type

- : 타입1 | 타입2 | ...

### 4. Interaction Type

- : 타입1 & 타입2 & ...

## TS Custom Type

### 1. Type alias

```ts
type 에일리아스 = union | interaction | tuple;
```

### 2. Interface

```ts
/* 인터페이스 */
interface 인터페이스 {
 key: valueType
 method(parameter: valueType, ...): returnType
}

/* 인터페이스 상속 */
interface 하위_인터페이스 extends 상위_인터페이스, ... { }

/* 인터페이스 -> 클래스 */
class 클래스 implements 인터페이스 { }
```

\*_인터페이스는 중복 작성했을 때, 자동으로 병합됨 (Declaration Merging)_

### 3. Class

```ts
/*
class 클래스 {
   key: valueType // 초기값 필요(but, "!:"면 필요 X)
   constructor(parameter: valueType, ...) {
      this.key = parameter
   }
}
*/

// this로 한 번 더 할당할 필요 X
class 클래스 {
   constructor(public|private|protected parameter: valueType, ...) { }
}

class 하위_클래스 extends 상위_클래스 {
   constructor(public|private|protected parameter: valueType, ...) {
      super(/* 상위_클래스_parameter */)
   }
}
```

| Access Modifier | Details                                                                                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public          | 외부에서도 접근 가능 (def)                                                                                                                                                                                       |
| private         | 내부에서만 접근 가능<br/>\*_관습적으로 앞에 \_사용_                                                                                                                                                              |
| protected       | 내부와 하위 클래스에서만 접근 가능                                                                                                                                                                               |
| static          | 클래스 자체에서만 호출 가능<br/>\*_인스턴스에서 호출 불가능_                                                                                                                                                     |
| abstract        | 추상 메서드는 정의만 되어있을 뿐 구현되어 있지 않음<br/>추상 클래스는 특정 클래스의 상속 대상이 되는 클래스</br>상속하는 클래스는 반듯이 정의된 추상 메서드를 구현해야 함<br/>추상 클레스는 인스턴스 생성 불가능 |
| readonly        | 초깃값만 할당 가능                                                                                                                                                                                               |

\*_[getter & setter 예제](/storage/wil/javascript/ex-typescript/#getter--setter)_

### 4. Generic[^](https://www.typescriptlang.org/ko/docs/handbook/utility-types.html) [⋯](/storage/wil/javascript/ex-typescript/#generic)

| Questions   | Answers                    |
| ----------- | -------------------------- |
| 제네릭이란? | 일종의 타입 변수           |
| 형태는?     | \<Type>                    |
| 상속은?     | \<Type extends Super_Type> |

| Utility Types         | Details                                                       |
| --------------------- | ------------------------------------------------------------- |
| Partial\<Type>        | Type의 모든 프로퍼티를 선택으로 설정한 타입 생성              |
| Required\<Type>       | Type의 모든 프로퍼티를 필수로 설정한 타입 생성                |
| Readonly\<Type>       | Type의 모든 프로퍼티를 읽기 전용으로 설정한 타입 생성         |
| Record\<Keys, Values> | 키의 타입은 Keys, 값의 타입은 Values인 타입 생성              |
| Pick<Type, Keys>      | Type의 프로퍼티 중 Keys만 선택한 타입 생성                    |
| Omit<Type, Keys>      | Type의 프로퍼티 중 Keys만 제외한 타입 생성                    |
| Exclude<Type1, Type2> | Type1의 유니온 멤버 중 Type2의 유니온 멤버만 제외한 타입 생성 |
| NonNullable\<Type>    | Type에서 null과 undefined를 제외한 타입 생성                  |

## TS Etc

**1\) Index Signatures**

- \[index: string]: valueType
- 이름, 존재 여부 상관없는 key들의 value의 타입 지정

**2\) Optional Type**

- ?:
- 해당 요소가 있어도 되고 없어도 됨

**3\) Non-Null Assertion Operator**[^](https://www.typescriptlang.org/play?ssl=7&ssc=66&pln=3&pc=1#code/MYewdgzgLgBAhgJwTAvDA2gbwG5wDYCuApgFwwCMAvgDQw77FkBMlAugNwBQoksAllCIBbVPCQA6AGZ8wAEwAURPKgB8MJeNyEiqFGiYBKLj2gwERCATyw0A4ZoY6A1BXYwA9O4AqAZXVIQBFoIGWAdOxE+CBh5fDwiAHMiWTwATwMYAAcQCBCAIzSYAjkiaTBkzm5wU3NLawB1AQALAHlMqD5wfFEIgH4HbRgXcjdPHw68ZTgwfwRAgEIYPoHiGCXo6D5JrJz8wuLZUpkKqt4zCysoRqhWzKIEOChAnsEheZXnVw93AEEm2hujwA5NEbjpwER5pwgA)

- !.
- 해당 피연산자가 null, undefined가 아니라고 단언

**4\) readonly ...**

- 해당 요소에 초기값만 할당 가능

**5\) keyof 타입**

- 해당 타입의 모든 키값을 union 멤버로 반환

**6\)Type Assertion**

- ... as 타입
- ... as const (readonly) [⋯](/storage/wil/javascript/ex-typescript/#as-const)
