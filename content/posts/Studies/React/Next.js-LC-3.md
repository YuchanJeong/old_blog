---
title: "[Next.js] Learn Course (3) - CREATE YOUR FIRST APP 1"
date: 2022-04-06
categories:
  - <Studies>
tags:
  - Next.js
---

# CREATE YOUR FIRST APP

## 1. Create a Next.js App

1. Create a Next.js App

   ```bash
   npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
   ```

   \*_If it doesn’t work, please take a look at this [page](https://github.com/vercel/next-learn/blob/master/basics/errors/install.md)._

2. Run the development server

   ```bash
   cd nextjs-blog
   npm run dev
   ```

3. Editing the Home Page
   - pages/index.js

## 2. Navigate Between Pages

In Next.js, a page is a React Component exported from a file in the pages directory.  
Pages are associated with a route based on their file name. For example, in development:

- pages/index.js is associated with the / route.
- pages/posts/first-post.js is associated with the /posts/first-post route.

Simply create a JS file under the pages directory, and the path to the file becomes the URL path.

- pages/posts/first-post.js

  ```jsx
  export default function FirstPost() {
    return <h1>First Post</h1>;
  }
  ```

  \*_The component can have any name, but you must export it as a default export._

### Link Component

In Next.js, you use the Link Component from next/link to wrap the \<a> tag. \<Link> allows you to do client-side navigation to a different page in the application. Client-side navigation means that the page transition happens using JavaScript, which is faster than the default navigation done by the browser(full refresh).

- pages/index.js

  ```jsx
  import Link from "next/link";
  ```

  ```jsx
  <h1 className="title">
    Read{" "}
    <Link href="/posts/first-post">
      <a>this page!</a>
    </Link>
  </h1>
  ```

  \*_`{' '}` adds an empty space, which is used to divide text over multiple lines._

- pages/posts/first-post.js

  ```jsx
  import Link from "next/link";

  export default function FirstPost() {
    return (
      <>
        <h1>First Post</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </>
    );
  }
  ```

\*_If you need to add attributes like, for example, className, add it to the a tag, not to the Link tag. [Here’s an example](https://github.com/vercel/next-learn/blob/master/basics/snippets/link-classname-example.js)._  
\*_You can learn more about the Link component [in the API reference for next/link](https://nextjs.org/docs/api-reference/next/link) and routing in general [in the routing documentation](https://nextjs.org/docs/routing/introduction)._

### Code splitting and prefetching

Next.js does code splitting automatically, so each page only loads what’s necessary for that page. Only loading the code for the page you request also means that pages become isolated. If a certain page throws an error, the rest of the application would still work.

Furthermore, in a production build of Next.js, whenever Link components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant.

## 3. Assets, Metadata, and CSS

### Assets

Next.js can serve static assets, like images, under the top-level public directory. Files inside public can be referenced from the root of the application similar to pages.

- Save the picture as [profile.jpg](https://github.com/vercel/next-learn/blob/master/basics/basics-final/public/images/profile.jpg) in the public/images directory.

  ```jsx
  import Image from "next/image"; // Image Component and Image Optimization

  const YourComponent = () => (
    <Image
      src="/images/profile.jpg" // Route of the image file
      height={144} // Desired size with correct aspect ratio
      width={144} // Desired size with correct aspect ratio
      alt="Your Name"
    />
  );
  ```

\*_To learn more about Automatic Image Optimization, check out the [documentation](https://nextjs.org/docs/basic-features/image-optimization)._  
\*_To learn more about the Image component, check out the [API reference for next/image](https://nextjs.org/docs/api-reference/next/image)._

### Metadata

- pages/index.js

  ```jsx
  import Head from "next/head";
  ```

  ```jsx
  <Head>
    <title>Create Next App</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  ```

\*_To learn more about the Head component, check out the [API reference for next/head](https://nextjs.org/docs/api-reference/next/head)._  
\*_If you want to customize the \<html> tag, for example to add the lang attribute, you can do so by creating a `pages/\_document.js` file. Learn more in the [custom Document documentation](https://nextjs.org/docs/advanced-features/custom-document)._

### Third-Party JavaScript

In addition to metadata, scripts that need to load and execute as soon as possible are usually added within the \<head> of a page. Using a regular HTML \<script> element, an external script would be added as follows:

- pages/posts/first-post.js

  ```jsx
  import Script from "next/script";
  ```

  ```jsx
  <Script
    src="https://connect.facebook.net/en_US/sdk.js"
    strategy="lazyOnload"
    onLoad={() =>
      console.log(`script loaded correctly, window.FB has been populated`)
    }
  />
  ```

  - strategy controls when the third-party script should load. A value of lazyOnload tells Next.js to load this particular script lazily during browser idle time
  - onLoad is used to run any JavaScript code immediately after the script has finished loading. In this example, we log a message to the console that mentions that the script has loaded correctly

\*_To learn more about the Script component, check out the [documentation](https://nextjs.org/docs/basic-features/script)._

### Layout Component

- pages/posts/first-post.js

  ```jsx
  import Head from "next/head";
  import Link from "next/link";
  import Layout from "../../components/layout";

  export default function FirstPost() {
    return (
      <Layout>
        <Head>
          <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </Layout>
    );
  }
  ```

- components/layout.module.css

  ```css
  .container {
    max-width: 36rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
  }
  ```

- components/layout.js

  ```jsx
  import styles from "./layout.module.css";

  export default function Layout({ children }) {
    return <div className={styles.container}>{children}</div>;
  }
  ```

### Global Styles

- [pages/\_app.js](https://nextjs.org/docs/advanced-features/custom-app)

  ```js
  import "../styles/global.css";

  export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
  }
  ```

  \*_You need to restart the development server when you add pages/\_app.js._

- styles/global.css

  ```css
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
      Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
    font-size: 18px;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #0070f3;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    display: block;
  }
  ```

  \*_Only inside pages/\_app.js you can import global CSS files._

### Polishing Layout

- Update `components/layout.module.css`

  ```css
  .container {
    max-width: 36rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .backToHome {
    margin: 3rem 0 0;
  }
  ```

- Create `styles/utils.module.css`

  ```css
  .heading2Xl {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
  }

  .headingXl {
    font-size: 2rem;
    line-height: 1.3;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
  }

  .headingLg {
    font-size: 1.5rem;
    line-height: 1.4;
    margin: 1rem 0;
  }

  .headingMd {
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .borderCircle {
    border-radius: 9999px;
  }

  .colorInherit {
    color: inherit;
  }

  .padding1px {
    padding-top: 1px;
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .listItem {
    margin: 0 0 1.25rem;
  }

  .lightText {
    color: #666;
  }
  ```

- Update `components/layout.js`

  ```jsx
  import Head from "next/head";
  import Image from "next/image";
  import styles from "./layout.module.css";
  import utilStyles from "../styles/utils.module.css";
  import Link from "next/link";

  const name = "Yuchan";
  export const siteTitle = "Next.js Sample Website";

  export default function Layout({ children, home }) {
    return (
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <Image
                    priority
                    src="/images/profile.jpg"
                    className={utilStyles.borderCircle}
                    height={108}
                    width={108}
                    alt={name}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    );
  }
  ```

- Update `pages/index.js`

  ```jsx
  import Head from "next/head";
  import Layout, { siteTitle } from "../components/layout";
  import utilStyles from "../styles/utils.module.css";

  export default function Home() {
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>Hi! I'm Yuchan Jeong.</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{" "}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
      </Layout>
    );
  }
  ```

---

\*Ps. [Styling Tips](https://nextjs.org/learn/basics/assets-metadata-css/styling-tips)  
Ref. [https://nextjs.org/learn/basics/create-nextjs-app](https://nextjs.org/learn/basics/create-nextjs-app)
