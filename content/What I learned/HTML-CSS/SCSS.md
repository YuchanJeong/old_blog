---
title: "SCSS"
showDate: false
showPagination: false
categories:
  - <What I learned>
tags:
  - (Summary)
  - SCSS
---

> Sassy CSS; CSS preprocessor

## 변수(유효범위, 재할당) - $

```scss
.container {
  $size: 300px;
  top: $size; // 300px
  .item {
    $size: 100px;
    width: $size; //100px
  }
  left: $size; // 100px
}
```

## 리터럴 템퍼링 - \#\{}

```scss
$size: 100px;
.box-#{$size} {
  width: $size;
}
```

## 선택자 중첩(Nesting)

```scss
.ancestor {
  > .children {
    // 자식 선택자
  }
  .descendent {
    // 자손 선택자
  }
}
```

## 상위 선택자 참조 - &

```scss
.btn {
  &:hover {
  }
  &-small {
  }
}
```

## 재사용 - @mixin, @include, @content

```scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
  @content;
}
@mixin box($w: 100px, $h: 100px, $color: royalblue) {
  width: $w;
  height: $h;
  background-color: $color;
}

.container {
  @include center {
    margin: auto;
  }
  @include box(200px, 200px, orange);
  .item {
    @include box();
  }
}
.box {
  @include box($color: tomato);
}
```

## 색상 내장 함수

```scss
.box {
  $color: royalblue;
  &.built-in-1 {
    background-color: rgba($color, 0.5); // 투명도
  }
  &:hover {
    background-color: mix($color, red); // 섞기
  }
  &.built-in-2 {
    background-color: lighten($color, 10%); // 밝게
  }
  &.built-in-3 {
    background-color: darken($color, 10%); // 어둡게
  }
  &.built-in-4 {
    background-color: saturate($color, 50%); // 채도 up
  }
  &.built-in-5 {
    background-color: desaturate($color, 50%); // 채도 down
  }
}
```

## 함수

```scss
@function ratio($size, $ratio) {
  @return $size * $ratio;
}
.box {
  $width: 300px;
  width: $width;
  height: ratio($width, (9/16));
}
```

## 반복문 - @for $i from ... through ... / $map, @each

```scss
@for $i from 1 through 10 {
  .item:nth-child(#{$i}) {
    width: 100px \* $i;
  }
}
$map: (
  o: orange,
  r: royalblue,
  y: yellow,
);
@each $k, $v in $map {
  .box-#{$k} {
    color: $v;
  }
}
```

## 단축 속성

```scss
.box {
  margin: {
    top: 10px;
    left: 20px;
  }
}
```

## 산술 연산

- `+, -, \*, %` 는 정상적으로 동작
- `/` 는 CSS에서 단축 속성 구분에 쓰여서 연산을 위해서는 괄호로 묶어야 함
- 연산은 산술 규칙을 따르며, 같은 단위만 연산 가능
- `calc()` 는 다른 단위의 연산 시 사용

## 가져오기

```scss
@import url("./sub.scss");
@import "./sub.scss";
@import "./sub", "./sub2";
```
