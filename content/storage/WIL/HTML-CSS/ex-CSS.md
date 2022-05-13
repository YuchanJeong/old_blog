---
title: "CSS Example"
showDate: false
showTableOfContents: false
showPagination: false
showAuthor: false
---

### Root Selector

```css
:root {
  --background-color: #f4f5f6;
}

body {
  background-color: var(--background-color);
}
```

### Pseudo Selector

```css
:is(section, article, aside, nav) :is(h1, h2, h3, h4, h5, h6) {
  color: #f4f5f6;
}

/* ... which would be the equivalent of: */
section h1,
section h2,
section h3,
section h4,
section h5,
section h6,
article h1,
article h2,
article h3,
article h4,
article h5,
article h6,
aside h1,
aside h2,
aside h3,
aside h4,
aside h5,
aside h6,
nav h1,
nav h2,
nav h3,
nav h4,
nav h5,
nav h6 {
  color: #f4f5f6;
}
```

### CSS Module + classnames

\- [classnames](https://github.com/JedWatson/classnames)

```bash
npm i classnames
```

```css
/* example.module.css */
:global(.inner) /* module의 고유화 방지 */ {
  width: 1100px; /* 최대 넓이 */
  max-width: 100%; /* 모바일용 */
  margin: 0 auto; /* 가로 가운데 정렬 */
  position: relative;
}

.show {
  display: block;
}

.hide {
  display: none;
}
```

```jsx
import styles from "./example.module.css";
import classNames from "classnames/bind";

const cx() = classNames.bind(styles);

export default function Example() {
  return (
    <div className={styles.inner}>
      <h1 className={cx("show", { hide: false })}>Hello world!</h1>
    </div>
  );
}
```
