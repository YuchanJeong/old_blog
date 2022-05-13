---
title: "TS Example"
showDate: false
showTableOfContents: false
showPagination: false
showAuthor: false
---

### Unknown

```ts
declare const maybe: unknown;
if (typeof maybe === "boolean") {
  const aBoolean: boolean = maybe;
}
if (typeof maybe === "string") {
  const aString: string = maybe;
}
```
