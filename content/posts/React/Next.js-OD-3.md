---
title: "[Next.js] Official Documentation (3) - From React to Next.js"
date: 2022-04-06
categories:
  - "'React'"
tags:
  - Next.js
---

# From React to Next.js

```bash
npm install react react-dom next
```

- pages/index.jsx

  ```jsx
  import { useState } from "react";

  function Header({ title }) {
    return <h1>{title ? title : "Default title"}</h1>;
  }

  export default function HomePage() {
    const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

    const [likes, setLikes] = useState(0);

    function handleClick() {
      setLikes(likes + 1);
    }

    return (
      <div>
        <Header title="Develop. Preview. Ship. 🚀" />
        <ul>
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <button onClick={handleClick}>Like ({likes})</button>
      </div>
    );
  }
  ```

- package.json

  ```json
  ...
  "scripts": {
    "dev": "next dev"
  },
  ...
  ```

> You removed the babel script, a taste of the complex tooling configuration you no longer have to think about.

---

\*[https://nextjs.org/learn/foundations/from-react-to-nextjs](https://nextjs.org/learn/foundations/from-react-to-nextjs)
