---
title: "[Next.js] Official Documentation (2) - From JavaScript to React"
date: 2022-04-05
categories:
  - "'React'"
tags:
  - Next.js
---

# From JavaScript to React

## 1. Rendering User Interfaces

When a user visits a web page, the server returns an HTML file to the browser. Then the browser reads the HTML and constructs the DOM.

- [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

  1. An object representation of the HTML elements
  2. A bridge between your code and the user interface
  3. A tree-like structure with parent and child relationships

- **Imperative** vs **Declarative** Programming

  1. DOM Methods: An imperative Programming

     - Imperative programming is like giving a chef step-by-step instructions on how to make a pizza.
     - Ex. "Knit the dough, roll the dough, add tomato sauce, add cheese, add ham, add pineapple, bake at 200 degrees celsius in a stone oven for...”

     ```html
     <!-- index.html -->
     <html>
       <body>
         <div id="app"></div>

         <script type="text/javascript">
           // Select the div element with 'app' id
           const app = document.getElementById("app");

           // Create a new H1 element
           const header = document.createElement("h1");

           // Create a new text node for the H1 element
           const headerContent = document.createTextNode("Develop. Preview. Ship. 🚀");

           // Append the text to the H1 element
           header.appendChild(headerContent);

           // Place the H1 element inside the div
           app.appendChild(header);
         </script>
       </body>
     </html>
     ```

  2. React: A declarative UI library

     - Declarative programming is like ordering a pizza without being concerned about the steps it takes to make the pizza.
     - Ex. “A Hawaiian pizza please.”

## 2. Getting Started with React

1. **react**
   - The core React library
2. **react-dom**
   - Provides DOM-specific methods that enable you to use React with the DOM

```html
<html>
  <body>
    <div id="app"></div>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <!-- Babel Script -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/jsx">
      const app = document.getElementById('app');
      ReactDOM.render(<h1>Develop. Preview. Ship. 🚀</h1>, app);
    </script>
  </body>
</html>
```

- You need a JavaScript compiler, such as a **Babel**, to transform your JSX code into regular JavaScript.
- React is a library that contains reusable snippets of code that perform tasks on your behalf - in this case, updating the UI.

\*If you’d like to learn more, take a look at the [UI trees](https://beta.reactjs.org/learn/preserving-and-resetting-state#the-ui-tree) and the [render method](https://beta.reactjs.org/apis/render) sections in the React Documentation.

## 3. Building UI with Components

User interfaces(UI) can be broken down into smaller building blocks called components.

```jsx
const app = document.getElementById("app");

function Header() {
  return <h1>Develop. Preview. Ship. 🚀</h1>;
}

function HomePage() {
  return (
    <div>
      {/* Nesting the Header component */}
      <Header />
    </div>
  );
}

// Capitalize the React Component
ReactDOM.render(<HomePage />, app);
```

## 4. Displaying Data with Props

Using props

```jsx
// function Header(props) {
//   return <h1>{props.title ? props.title : "Default title"}</h1>;
// }

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}

function Page() {
  return (
    <div>
      <Header title="React 💙" />
      <Header title="A new title" />
    </div>
  );
}
```

Iterating through lists

```jsx
function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 5. Adding Interactivity with State

```jsx
function HomePage() {
  const [likes, setLikes] = useState()

  function handleClick() {
    setLikes(likes + 1)
  }}

  return (
    <div>
      <button onClick={handleClick}>Likes ({likes})</button>
    </div>
  )
}
```

\*If you’d like to learn more, take a look at the [Adding Interactivity](https://beta.reactjs.org/learn/adding-interactivity) and [Managing State](https://beta.reactjs.org/learn/managing-state) sections in the React Documentation.

---

\*[https://nextjs.org/learn/foundations/from-javascript-to-react](https://nextjs.org/learn/foundations/from-javascript-to-react)
