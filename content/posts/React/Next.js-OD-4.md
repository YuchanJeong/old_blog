---
title: "[Next.js] Official Documentation (4) - How Next.js Works"
date: 2022-04-06
categories:
  - "'React'"
tags:
  - Next.js
---

# How Next.js Works

## 0. Development and Production Environments

During development, you’re building and running the application on your local machine. [Going to production](https://nextjs.org/docs/going-to-production) is the process of making your application ready to be deployed and consumed by users.

- In the development stage, Next.js optimizes for the developer and their experience building the application. It comes with features that aim to improve the Developer Experience such the TypeScript and ESLint integration, Fast Refresh, and more.
- In the production stage, Next.js optimizes for the end-users, and their experience using the application. It aims to transform the code to make it performant and accessible.

Next.js handles much of these **code transformations** and **underlying infrastructure** to make it easier for your application to go to production.

This is made possible because Next.js has a compiler written in **Rust**, a low-level programming language, and **SWC**, a platform that can be used for compilation, minification, bundling, and more.

## 1. What is Compiling?

Compiling refers to the process of taking code in one language and outputting it in another language or another version of that language.

- Developer code

  ```jsx
  export default function HomePage() {
    return <div>DX of the Future</div>;
  }
  ```

- Compiled code

  ```js
  "use strict";

  Object defineProperty(exports,
    "__esModule", {
    value: true
  });
  exports.default = HomePage;

  function HomePage() {
    return /*#__PURE__*/React.createElement(
      "div", null, "DX of the Future"
    );
  }
  ```

In Next.js, compilation happens during the development stage as you edit your code, and as part of the build step to prepare your application for production.

## 2. What is Minifying?

Minification is the process of removing unnecessary code formatting and comments without changing the code’s functionality. The goal is to improve the application’s performance by decreasing file sizes.

- Minified code

  ```bash
  "use strict";Object.defineProperty(exports,"__esModule",{value:0});exports.default=HomePage;function HomePage(){return React.createElement("div",null,"DX of the Future");}
  ```

## 3. What is Bundling?

Exporting and importing internal modules, as well as external third-party packages, creates a complex web of file dependencies.

Bundling is the process of resolving the web of dependencies and merging (or ‘packaging’) the files (or modules) into optimized bundles for the browser, with the goal of reducing the number of requests for files when a user visits a web page.

## 4. What is Code Splitting?

Code-splitting is the process of splitting the application’s bundle into smaller chunks required by each **entry point(URLs)**. The goal is to improve the application's initial load time by only loading the code required to run that page.

Next.js has built-in support for code splitting. Each file inside your **pages/** directory will be automatically code split into its own JavaScript bundle during the build step.

## 5. Build Time and Runtime

- Build time (or build step)
  - A series of steps that prepare your application code for production.
  - Built files include:
    - HTML files for statically generated pages
    - JavaScript code for rendering pages on the server
    - JavaScript code for making pages interactive on the client
    - CSS files
- Runtime (or request time)
  - The period of time when your application runs in response to a user’s request, after your application has been built and deployed.

## 6. Client and Server

In the context of web applications, the **client** refers to the browser on a user’s device that sends a request to a server for your application code. It then turns the response it receives from the server into an interface the user can interact with.

**Server** refers to the computer in a data centre that stores your application code, receives requests from a client, does some computation, and sends back an appropriate response.

## 7. What is Rendering?

There is an unavoidable unit of work to convert the code you write in React into the HTML representation of your UI. This process is called rendering.

- **Client-Side Rendering**
  - In a standard React application, the browser receives an **empty HTML** shell from the server along with the JavaScript instructions to construct the UI. The initial rendering work happens on the user's device.
- Pre-Rendering
  - Next.js pre-renders every page by default. Pre-rendering means the HTML is generated in advance, on a server, instead of having it all done by JavaScript on the user's device.
  1.  **Server-Side Rendering**
      - The HTML of the page is generated on a server for each request. The generated HTML, JSON data, and JavaScript instructions to make the page interactive are then sent to the client.
      - On the client, the HTML is used to show a fast non-interactive page, while React uses the JSON data and JavaScript instructions to make components interactive (for example, attaching event handlers to a button). This process is called hydration.
      - In Next.js, you can opt to server-side render pages by using [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props).
        > React 18 and Next 12 introduce an alpha version of React `server components`. Server components are completely rendered on the server and do not require client-side JavaScript to render. In addition, server components allow developers to keep some logic on the server and only send the result of that logic to the client. This reduces the bundle size sent to the client and improves client-side rendering performance. [Learn more about React server components here](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html).
  2.  **Static Site Generation**
      - The HTML is generated on the server, but unlike server-side rendering, there is no server at runtime. Instead, content is generated once, at build time, when the application is deployed, and the HTML is stored in a CDN and re-used for each request.
      - In Next.js, you can opt to statically generate pages by using [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props).

The beauty of Next.js is that you can choose the most appropriate rendering method for your use case on a page-by-page basis, whether that's Static Site Generation, Server-side Rendering, or Client-Side Rendering. To learn more about which rendering method is right for your specific use case, see the [data fetching docs](https://nextjs.org/docs/basic-features/data-fetching/overview).

## 8. What is the Network?

- Origin Servers
  - The server refers to the main computer that stores and runs the original version of your application code. We use the term origin to distinguish this server from the other places application code can be distributed to, such as CDN servers and Edge servers.
- Content Delivery Network (CDN)
  - CDNs store static content (such as HTML and image files) in multiple locations around the world and are placed between the client and the origin server. When a new request comes in, the closest CDN location to the user can respond with the **cached result**.
  - This **reduces the load on the origin** because the computation doesn’t have to happen on each request. It also **makes it faster for the user** because the response comes from a location geographically closer to them.
  - In Next.js, since pre-rendering can be done ahead of time, CDNs are well suited to store the static result of the work - making content delivery faster.
- The Edge
  - The Edge is a generalized concept for the fringe (or edge) of the network, closest to the user. CDNs could be considered part of "the Edge" because they store static content at the fringe (edge) of the network.
  - Similar to CDNs, Edge servers are distributed to multiple locations around the world. But unlike CDNs, which store static content, some Edge servers can run code.
  - By running code at the Edge, you can move some of the work that was traditionally done client-side or server-side to the Edge (see examples with Next.js here). This can make your application more performant.
  - In Next.js, you can run code at the Edge with [Middleware](https://nextjs.org/docs/middleware), and soon with [React Server Components](https://nextjs.org/docs/advanced-features/react-18/overview#react-server-components-alpha).

---

\*[https://nextjs.org/learn/foundations/how-nextjs-works](https://nextjs.org/learn/foundations/how-nextjs-works)
