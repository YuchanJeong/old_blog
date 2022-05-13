---
title: "React Example"
showDate: false
showTableOfContents: false
showPagination: false
showAuthor: false
---

### useEffect()

```jsx
import { useState, useEffect } from "react";

export default function Component() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const handleChangeName = (e) => setName(e.target.value);
  const handleCountUp = () => setCount(count + 1);

  /* useEffect */
  useEffect(() => {
    // effect
    setTimeout(() => {
      console.log({ count, name });
    }, 1000);

    // clean-up
    return clearTimeout(setTimeout);
    // dependency
  }, [count]);

  return (
    <>
      <p>Name: {name}</p>
      <input type={"text"} value={name} onChange={handleChangeName} />
      <p>Count : {count}</p>
      <button onClick={handleCountUp}>up</button>
    </>
  );
}
```
