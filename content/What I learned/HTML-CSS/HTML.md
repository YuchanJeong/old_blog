---
title: "HTML"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - (Summary)
  - HTML
---

> HyperText Markup Language

```html
<tag attribute="value">contents</tag>
```

## Head

### 1. Meta Tag

```html
<meta name="author" content="..." />
```

```html
<meta name="description" content="..." />
```

SEO

```html
<meta name="keywords" content="..., ..." />
```

```html
<meta name="robots" content="noindex, nofollow" />
```

Open Graph[^](https://ogp.me/)

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />
```

Twitter Cards[^](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)

```html
<meta property="twitter:card" content="summary" />
<meta property="twitter:site" content="..." />
<meta property="twitter:title" content="..." />
<meta property="twitter:description" content="..." />
<meta property="twitter:image" content="..." />
<meta property="twitter:url" content="..." />
```

### 2. Favicon

```html
<link rel="icon" href="..." />
<!-- └ /favicon.ico로 대체 가능 -->
```

```html
<link rel="shortcut icon" href="..." />
```

### 3. Style Reset

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"
/>
```

### 4. CSS 연결

```html
<link rel="stylesheet" href="..." />
```

### 5. JS 연결

```html
<script defer|async src="..."></script>
```

|       | 순서         | 적용                                                      |
| ----- | ------------ | --------------------------------------------------------- |
| defer | 문서 위치 순 | DOM 전체가 필요한 스크립트나 실행 순서가 중요한 경우 적용 |
| async | 다운로드 순  | 독립적인 스크립트나 실행 순서가 중요하지 않은 경우 적용   |

## Tag

| Global Attribute              | Details              |
| ----------------------------- | -------------------- |
| title="..."                   | 커서 시 설명         |
| class="... ..."               | 중복 가능한 이름 (.) |
| id="..."                      | 고유한 이름 (#)      |
| style="property: value; ...;" | 인라인 스타일        |

### 1. Block Level Tag

\- 요소가 수직으로 쌓임  
\- 가로는 부모 요소의 크기만큼 자동으로 늘어남  
\- 세로는 포함한 콘텐츠의 크기만큼 자동으로 줄어듦

```html
<div></div>

<h1-6></h1-6>

<p></p>

<br />
```

### 2. Inline Level Tag

\- 요소가 수평으로 나열됨  
\- 포함한 콘텐츠의 크기만큼 자동으로 줄어듦  
\- Inline 요소 하위에는 Block 요소 불가능

```html
<span></span>

<img src="..." alt="..." />

<a href="..."></a>
<!-- └ target="_blank"로 새 창에서 열기 가능 -->
<!-- └ #ID로 문서 내 연결 가능 -->

<button onClick="..."></button>
```

### 3. List Tag

```html
<!-- 순서가 있는 목록 -->
<ol></ol>

<!-- 순서가 없는 목록 -->
<ul></ul>

<!-- 목록 요소 -->
<li></li>
```

### 4. Form Tag

\- [form](https://developer.mozilla.org/ko/docs/Web/HTML/Element/form), [input](https://developer.mozilla.org/ko/docs/Web/HTML/Element/input)

```html
<form></form>

<input type="..." />

<!-- 폼을 하나의 그룹으로 묶음 -->
<fieldset></fieldset>

<!-- 폼 그룹의 제목 -->
<legend></legend>

<!-- input과 contents 연결 -->
<label></label>
```

Ex.

```html
<form action="javascript:void(0)" method="post">
  <fieldset>
    <legend>Alphabet</legend>
    <label><input type="radio" name="Alphabet" required />A</label><br />
    <label><input type="radio" name="Alphabet" required />B</label><br />
    <label><input type="radio" name="Alphabet" required />C</label><br />
    <input type="submit" />
  </fieldset>
</form>
```

### 5. Select Tag

\- [select](https://developer.mozilla.org/ko/docs/Web/HTML/Element/select), [option](https://developer.mozilla.org/ko/docs/Web/HTML/Element/option)

```html
<select>
  <option value="...">contents</option>
</select>
```

### 6. Multimedia Tag

\- [audio](https://developer.mozilla.org/ko/docs/Web/HTML/Element/audio)

```html
<audio src="경로"></audio>
```

\- [video](https://developer.mozilla.org/ko/docs/Web/HTML/Element/video)

```html
<video src="경로"></video>
```

### 7. Semantic Tag

```html
<header></header>

<section></section>

<nav></nav>

<aside></aside>

<footer></footer>
```

## Etc

- !
  - HTML 기본 형태 구성
- BEM 클래스 속성 작명법
  - Block\_\_Element--Modifier
- javascript:void(0)
  - 경로 지정 시 주소를 할당하지 않고 기능만 확인
- Emmet
  - Ex. ul#Father>(li.Son>a)\*5
