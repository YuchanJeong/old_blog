---
title: "CSS"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - (Summary)
  - CSS
---

> Cascading Style Sheets

```css
selector {
  property: value;
}
```

## Selector

### 1. 복합 선택자

| Selector              | Details          |
| --------------------- | ---------------- |
| selector1selector2    | 일치 선택자      |
| selector1 selector2   | 하위 선택자      |
| selector1 > selector2 | 자식 선택자      |
| selector1 + selector2 | 인접 형제 선택자 |
| selector1 ~ selector2 | 일반 형제 선택자 |

### 2. 가상 클래스 선택자

| Selector                             | Details            |
| ------------------------------------ | ------------------ |
| selector:hover                       | 커서               |
| selector:active                      | 클릭               |
| selector:focus                       | 포커스             |
| selector:first-child                 | 첫 번째 자식 요소  |
| selector:last-child                  | 마지막 자식 요소   |
| selector:nth-child(n)                | n 번째 자식 요소   |
| selector:not(...)                    | ...이 아닌 것      |
| selector:link                        | 방문하지 않은 링크 |
| selector:visited                     | 방문한 링크        |
| selector::before { content: "..."; } | 내용 앞에 ... 삽입 |
| selector::after { content: "..."; }  | 내용 뒤에 ... 삽입 |

### 3. 속성 선택자

| Selector              | Details                          |
| --------------------- | -------------------------------- |
| [attribute]           | 해당 속성                        |
| tag[attribute]        | 해당 태그 중 해당 속성           |
| [attribute="value"]   | 해당 속성의 해당 값              |
| [attribute~="value"]  | 해당 값 & 해당 값 포함(띄어쓰기) |
| [attribute\|="value"] | 해당 값 & 해당 값-으로 시작      |
| [attribute^="value"]  | 해당 값으로 시작                 |
| [attribute$="value"]  | 해당 값으로 끝                   |
| [attribute*="value"]  | 해당 값 포함                     |

## Property

### 1. Box model Style

크기

| Property         | Details        |
| ---------------- | -------------- |
| `width`          | 넓이           |
| `height`         | 높이           |
| `max/min-width`  | 최대/최소 넓이 |
| `max/min-height` | 최대/최소 높이 |

여백 및 테두리

| Property                    | Details                                                    |
| --------------------------- | ---------------------------------------------------------- |
| `margin`                    | 외부 여백, 음수 가능                                       |
| `padding`                   | 내부 여백, 내용 선택 가능                                  |
| `border`: width style color | 테두리<br/>└ style solid \| dotted \| dashed               |
| `border-radius`             | 테두리 둥글게 깍는 정도                                    |
| `boxing-size: border-box;`  | 크기가 내부 여백과 테두리 포함 (원래는 컨텐츠 크기만 포함) |

출력

| Property                            | Details                                              |
| ----------------------------------- | ---------------------------------------------------- |
| `display`: none; \| flex; \| block; | 요소 출력 방식                                       |
| `opacity`                           | 투명도(0~1)                                          |
| `overflow`: hidden; \| auto;        | 넘친 내용 제어<br/>: 잘라냄 \| 자른 후 스크롤바 생성 |
| `box-shadow`: x y blur color        | 그림자                                               |

### 2. Text & Font Style

문자

| Property                                                | Details                  |
| ------------------------------------------------------- | ------------------------ |
| `text-align`: left; \| right; \| center; \| justify;    | 문자 정렬                |
| `text-decoration`: none; \| underline; \| line-through; | 문자를 꾸미는 선         |
| `text-transform`: uppercase; \| lowercase;              | 대소문자 변환            |
| `text-indent`                                           | 들여쓰기, 내어쓰기(음수) |
| `line-height`                                           | 행간                     |
| `letter-spacing`                                        | 자간                     |

글자

| Property                                    | Details                                  |
| ------------------------------------------- | ---------------------------------------- |
| `color`                                     | 글자 색상                                |
| `font-size`                                 | 글자 크기                                |
| `font-weight`: 400; \| 700;                 | 글자 두께: normal \| bold                |
| `font-style: italic;`                       | 이탤릭체                                 |
| `font-family`: 글꼴1, “글꼴 2”, …, 글꼴계열 | 글꼴<br/>└ 글꼴계열 - serif \| san-serif |

### 3. Background

| Property                                                             | Details                                                                             |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `background-color`                                                   | 배경색                                                                              |
| `background-image`: url("...")                                       | 배경 이미지                                                                         |
| `background-repeat`<br/>: repeat; (def) \| repeat-x/y; \| no-repeat; | 배경 반복                                                                           |
| `background-position`<br/>: top bottom left right center;<br/>: x y; | 배경 위치                                                                           |
| `background-size`<br/>: contain;<br/>: cover;<br/>: x y;             | 배경 크기<br/>: 더 좁은 범위 맞춤<br/>: 더 넓은 범위 맞춤<br/>: 가로 x, 세로 y<br/> |
| `background-attachment: fixed;`                                      | 배경 뷰포트에 고정                                                                  |

### 4. Position

| Property                                                                                                                         | Details                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `position`[^](https://developer.mozilla.org/ko/docs/Web/CSS/position)<br/>: relative;<br/>: absolute;<br/>: fixed;<br/>: sticky; | 기준<br/>: 자신 기준<br/>: 부모(position 필요) 기준<br/>: 뷰포트 기준 고정<br/>: 스크롤 시 뷰포트 기준 고정 |
| `top`<br/>`bottom`<br/>`left`<br/> `right`                                                                                       | 위치                                                                                                        |
| `z-index`                                                                                                                        | 쌓임 맥락에서 자신의 위치                                                                                   |

<details>
<summary>sticky가 작동하지 않을 때 확인 사항</summary>
<ol>
<li>고정될 위치를 지녀야함</li>
<li>부모 요소가 %가 아닌 height 값을 지녀야 함</li>
<li>상위 요소에 overflow 속성이 없어야 함</li>
</ol>
</details>

### 5. Flex

Flex container (부모 요소)

| Property                                                                                                         | Details                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `display`<br/>: flex;<br/>: inline-flex;                                                                         | 요소 출력 방식<br/>: container가 block요소<br/>: container가 inline요소                                                         |
| `justify-content`<br/>: flex-start; (def)<br/>: flex-end;<br/>: center;<br/>: space-between;<br/>: space-around; | items 주축(수평) 정렬<br/>: 시작점 정렬<br/>: 끝점 정렬<br/>: 가운데 정렬<br/>: 나눔정렬(양 끝 붙임)<br/>: 나눔정렬(양 끝 띄움) |
| `align-content`                                                                                                  | items 교차축(수직) 정렬,<br/>2줄 이상일 때 묶어서 정렬                                                                          |
| `align-items`<br/>: stretch; (def)<br/>: flex-start;<br/>: flex-end;<br/>: center;                               | items 교차축(수직) 정렬<br/>: 늘림<br/>: 시작점 정렬<br/>: 끝점 정렬<br/>: 가운데 정렬                                          |
| `flex-wrap: wrap;`                                                                                               | items 줄바꿈 허가                                                                                                               |
| `gap`                                                                                                            | items 간격                                                                                                                      |
| `flex-direction`<br/>: row; (def)<br/>: column;                                                                  | 주축 방향<br/>: 수평 주축<br/>: 수직 주축                                                                                       |

Flex item (자식 요소)

| Property                                                      | Details                         | Default  |
| ------------------------------------------------------------- | ------------------------------- | -------- |
| `order`                                                       | 순서(오름차순), 음수가능        | 0        |
| `align-self`                                                  | 개별 item의 교차축 정렬         | auto     |
| `flex`[^](https://developer.mozilla.org/ko/docs/Web/CSS/flex) | grow, shrink, basis의 단축 속성 | 1 1 auto |
| `flex-grow`                                                   | item의 증가 너비 비율           | 1        |
| `flex-shrink`                                                 | item의 감소 너비 비율           | 1        |
| `flex-basis`                                                  | item의 기본 너비, 주로 0        | auto     |

### 6. Transition & Transform

Transition (전환)

| Property                                                                                                                | Details                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `transition`[^](https://developer.mozilla.org/ko/docs/Web/CSS/transition)<br/>: property duration timing-function delay | 해당 요소 변화 시 전환 효과<br/>└ timing-function - ease \| linear \| ease-in \| ease-out |

Transform (변환)

| Property                                                                                                                                                                                                           | Details                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `transform`[^](https://developer.mozilla.org/ko/docs/Web/CSS/transform)<br/>: scale(xy \| x, y);<br/>: translate(x \| x, y);<br/>: skew(x \| x, y);<br/>: rotate(deg);<br/>: perspective(n);<br/>: rotateX/Y(deg); | 형태 변환<br/>: 크기 변환<br/>: 위치 변환<br/>: 기울기 변환<br/>: 2d 회전<br/>: 3d 원근감 (먼저 작성 필요)<br/>: 3d 회전 |
| `backface-visibility: hidden;`                                                                                                                                                                                     | 뒷면 감추기                                                                                                              |

### 7. Etc

| Property                                                                                                                                                                   | Details                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `cursor`[^](https://developer.mozilla.org/ko/docs/Web/CSS/cursor)                                                                                                          | 커서 모양                                                |
| `-moz-user-select: none;`<br>`-webkit-user-select: none;`<br>`-ms-user-select: none;`<br>`user-select: none;`                                                              | 사용자가 텍스트 선택 못함                                |
| `scroll-snap-type` : x/y mandatory; \| proximity; [^](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)<br>`scroll-snap-align`: start; \| end; \| center; | snap 축 (부모요소에 입력)<br>snap 위치 (자식요소에 입력) |

## Etc

1. `@media`[^](https://developer.mozilla.org/ko/docs/Web/CSS/@media)

   ```css
   /* 데스크탑 스타일 */
   @media screen and (max-width: 768px) {
     /* 모바일 스타일 */
   }

   ---
   
   /* 모바일 스타일 */
   @media screen and (min-width: 769px) {
     /* 데스크탑 스타일 */
   }
   ```

1. `:root`[⋯](/storage/wil/html-css/ex-css/#root-selector)
1. `:is()`[⋯](/storage/wil/html-css/ex-css/#pseudo-selector)
1. module.css[⋯](/storage/wil/html-css/ex-css/#css-module--classnames)
1. Etc
   - 우선순위는 `inline` > `#id` > `.class` > `tag` > `*` > 나중에 적힌 순  
     \*_`value !important;`는 최우선 순위_
   - 방향 단축 특성은 "상하 좌우", "상 좌우 하", "상 우 하 좌"  
     \*_`margin`, `padding`, `gap`에 적용_
   - 문자관련 특성은 자동 상속
   - 색상: white, #fff, rgb(0,0,0), rgba(0,0,0,.5)
   - 크기: px, %, vw, vh, em, rem
   - `@import url("...")`로 CSS 병열 연결
