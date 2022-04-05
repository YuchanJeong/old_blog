---
title: "[Next.js] Official Documentation (2) - From JavaScript to React"
date: 2022-04-05
categories:
  - "'React'"
tags:
  - Next.js
draft: true
---

# From JavaScript to React

## 1. Rendering User Interfaces

When a user visits a web page, the server returns an HTML file to the browser. Then the browser reads the HTML and constructs the DOM.

- [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

  - An object representation of the HTML elements
  - A bridge between your code and the user interface
  - A tree-like structure with parent and child relationships

## 2. Imperative vs Declarative Programming

- DOM Methods: An imperative Programming (step-by-step)

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

- React: A declarative UI library
