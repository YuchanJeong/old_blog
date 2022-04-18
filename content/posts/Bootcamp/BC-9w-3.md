---
title: "BC-9w-3 / [React] 데이터 흐름의 이해와 비동기 처리"
date: 2021-10-20
categories:
  - "'Bootcamp'"
tags:
  - React
---

## Today I learned

<!-- ## Algorithm Test 10 이진 탐색 ☆

```js
const func = function (arr, target) {
  /* 1
  함수 안에 함수를 두고, 재귀호출을 이용해 리스트의 길이가 1이 될 때까지 리스트를 반씩 쪼개나가면서 탐색을 진행
  */
  const search = (leftIdx, rightIdx) => {
    const midIdx = parseInt((leftIdx + rightIdx) / 2);
    // 탈출 조건: 배열의 길이가 1
    if (leftIdx === rightIdx) {
      // target이 없는 경우
      if (arr[leftIdx] !== target) {
        return -1;
      }
      return leftIdx;
      // target이 mid보다 크면 오른쪽만 탐색
    } else if (target > arr[midIdx]) {
      return search(midIdx + 1, rightIdx);
      // target이 mid보다 작으면 왼쪽만 탐색
    } else {
      return search(leftIdx, midIdx);
    }
  };
  return search(0, arr.length - 1);

  /* 2 */
  let leftIdx = 0;
  let rightIdx = arr.length - 1;
  while (leftIdx <= rightIdx) {
    let midIdx = parseInt((leftIdx + rightIdx) / 2);
    if (arr[midIdx] === target) {
      return midIdx;
    }
    if (target <= arr[midIdx]) {
      rightIdx = midIdx - 1;
    } else {
      leftIdx = midIdx + 1;
    }
  }
  return -1;
};
``` -->

### React 데이터 흐름

- 데이터 흐름
  - 컴포넌트를 만들고, 조립해서 페이지를 만듦(상향식)
  - 컴포넌트는 단일 책임 원칙(하나의 컴포넌트는 하나의 일만 담당)
  - 데이터는 위에서 아래로 흐름(props)(하향식) -> 단방향 데이터 흐름(one-way data flow)
  - 상태(state)는 최소화하는 것이 좋음
    - 부모로부터 props를 통해 전달되지 않고,
    - 시간이 지날 때 변하며,
    - 컴포넌트 안의 다른 state나 props를 가지고 계산 가능할 때, state
  - 하나의 상태를 기반으로 두 컴포넌트가 영향을 받는다면 이때는 공통 소유 컴포넌트를 찾아 그곳에 상태를 위치해야 함
  - [State and Lifecycle](https://ko.reactjs.org/docs/state-and-lifecycle.html)
- State 끌어올리기 (Lifting State Up)

  > 상위 컴포넌트의 "상태를 변경하는 함수" 그 자체를 하위 컴포넌트로 전달하고, 이 함수를 하위 컴포넌트가 실행한다

  ```js
  function ParentComponent() {
    const [value, setValue] = useState("1");
    const handleChangeValue = (newValue) => {
      setValue(newValue);
    };
    return (
      <div>
        <div>값은 {value} 입니다</div>
        <ChildComponent handleChangeValue={handleChangeValue} />
      </div>
    );
  }

  function ChildComponent({ handleChangeValue }) {
    // 함수의 실행 자체를 넘겨주면 안됨
    const handleClick = () => {
      handleChangeValue("2");
    };
    return <button onClick={handleClick}>값 변경</button>;
  }
  ```

### Effect Hook

#### Side Effect

- Side Effect (부수 효과)

  ```js
  // 전역 변수 foo를 bar라는 함수가 수정하는 예제
  let foo = "hello";

  function bar() {
    foo = "world";
  }

  bar();
  ```

- Pure Function (순수 함수)

  - 오직 함수의 입력만이 함수의 결과에 영향을 주는 함수
  - 어떤 전달 인자가 주어질 경우, 항상 똑같은 값이 리턴됨
  - 예측 가능한 함수

  ```js
  function upper(str) {
    // toUpperCase is immutable
    return str.toUpperCase();
  }

  upper("hello"); // 'HELLO'
  ```

- 우리가 앞서 배운 React의 함수 컴포넌트는, props가 입력으로, JSX Element가 출력으로 나감 (순수 함수)
- AJAX 요청이 필요하거나, LocalStorage 또는 타이머와 같은 React와 상관없는 API를 사용하는 경우 발생하는 Side Effect를 다루기 위한 Hook인 Effect Hook을 제공

#### Effect Hook (1) - 기본

```js
function Proverb({ saying }) {
  // side effect
  useEffect(() => {
    document.title = saying;
  });
  return (
    <div>
      <h3>오늘의 명언</h3>
      <div>{saying}</div>
    </div>
  );
}
```

- 아래와 같이 매 번 새롭게 컴포넌트가 렌더링될 때, Effect Hook이 실행
  - 컴포넌트 생성 후 처음 화면에 렌더링(표시)
  - 컴포넌트에 새로운 props가 전달되며 렌더링
  - 컴포넌트에 상태(state)가 바뀌며 렌더링
- Hook을 쓸 때 주의할 점
  - 최상위에서만 Hook을 호출
  - React 함수 내에서 Hook을 호출

#### Effect Hook (2) - 조건부 실행

```js
useEffect(() => {
  const result = getProverbs(filter);
  setProverbs(result);
}, [filter]);
```

- useEffect(함수)
  - 렌더링 마다 실행
- useEffect(함수, [])
  - 첫 렌더링 때만 실행
- useEffect(함수, [종속성1, 종속성2, ...])
  - 배열의 인자들 값이 변할 때 마다 실행

#### AJAX 요청

|                            | 장점                                          | 단점                                                                                    | 예시                                                                  |
| -------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **컴포넌트 내부에서 처리** | HTTP 요청의 빈도를 줄임                       | 브라우저(클라이언트)의 메모리상에 많은 데이터를 갖게 되므로, 클라이언트의 부담이 늘어남 | 처음 단 한번, 외부 API로부터 명언 목록을 받아오고, filter 함수를 이용 |
| **컴포넌트 외부에서 처리** | 클라이언트가 필터링 구현을 생각하지 않아도 됨 | 빈번한 HTTP 요청이 일어나게 되며, 서버가 필터링을 처리하므로 서버가 부담을 가져감       | 검색어가 바뀔 때마다, 외부 API를 호출                                 |

- 컴포넌트 외부에서 처리 with 로딩 화면(loading indicator)

  ```js
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://서버주소/proverbs?q=${filter}`)
      .then((resp) => resp.json())
      .then((result) => {
        setProverbs(result);
        setIsLoading(false);
      });
  }, [filter]);
  ```

  ```js
  const [isLoading, setIsLoading] = useState(true);

  ...
  return {
    isLoading ? <LoadingIndicator /> : <div>로딩 완료 화면</div>
  }
  ```

- 클라이언트가 서버에 요청을 덜 보내는 방법
  - [Throttle a series of fetch requests in JavaScript](https://dev.to/edefritz/throttle-a-series-of-fetch-requests-in-javascript-ka9)
  - [throttle과 debounce](https://webclub.tistory.com/607)
    - throttle은 재발동에 시간 제한을 검
    - debounce는 그룹의 (주로)마지막 값을 받음
- [HTTP caching](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)

### Sprint - StatesAirline Client (1) 항공권 목록 필터링

```js
/* main.js */
const search = ({ departure, destination }) => {
  if (
    condition.departure !== departure ||
    condition.destination !== destination
  ) {
    // Search.js에서 search 함수 작동
    setCondition({ departure, destination });
  }
};

useEffect(() => {
    setIsLoading(true);
    // 조건을 받아서 그 데이터를 리스트에 넣음
    getFlight(condition).then((data) => {
      setFlightList(data);
      setIsLoading(false);
    });
  }, [condition]);

...
return
...
<Search onSearch={search} />
...
// 로딩 페이지
{isLoading ? <LoadingIndicator /> : <FlightList list={flightList} />}
```

```js
/* Search.js */
const handleSearchClick = () => {
  const departure = "ICN";
  const destination = textDestination === "" ? null : textDestination;
  // search 함수를 props로 받아서 인자를 넣어 실행
  onSearch({ departure, destination });
};

...
return
...
<button id="search-btn" onClick={handleSearchClick}>
  검색
</button>
```

### Sprint - StatesAirline Client (2) AJAX 요청

```js
// 인수(filterBy)가 객체
export function getFlight(filterBy = {}) {
  let query = "";

  if (filterBy.departure) query = query + `departure=${filterBy.departure}&`;
  if (filterBy.destination) {
    query = query + `destination=${filterBy.destination}`;
  }

  return fetch(`http://ec2-13-124-90-231.ap-northeast-2.compute.amazonaws.com:81/flight?${query}`).then((response) => response.json());
}
```

## Today's takeaway

- State 끌어올리기는 state나 setState를 props로 전달
- useState로 사이드 이펙트를 처리
- 원래 하던 대로 했을 때 잘되지 않았는데, 이유는 좀 더 쉽게 할 수 있게 자동으로 자료들이 처리되게 미리 구성되어 있었기 때문이었다. 전체 구조를 파악하고 데이터의 흐름을 이해하고 나니 해결할 수 있었다.
- query string은 서버에서 설계한 데로 작동한다.
