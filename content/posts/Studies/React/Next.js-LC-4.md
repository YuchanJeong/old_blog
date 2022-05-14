---
title: "[Next.js] Learn Course (4) - CREATE YOUR FIRST APP 2"
date: 2022-04-17
categories:
  - <Studies>
tags:
  - Next.js
---

# CREATE YOUR FIRST APP

## 4. Pre-rendering and Data Fetching

1. [Static-site Generation(SSG)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then reused on each request.
2. [Server-side Rendering(SSR)](https://nextjs.org/docs/basic-features/pages#server-side-rendering) is the pre-rendering method that generates the HTML on **each request**.

- We recommend using **SSG** whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.
- If your page shows frequently updated data, and the page content changes on every request, you can use **SSR**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use **CSR** to populate frequently updated data.

### getStaticProps[^](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

```js
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

- Create `posts/test1.md`

  ```md
  ---
  title: "Test1"
  date: "2020-01-01"
  ---

  Lorem ipsum dolor sit amet.
  ```

- Create `posts/test2.md`

  ```md
  ---
  title: "Test2"
  date: "2020-01-02"
  ---

  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  ```

  \*_Each markdown file has a metadata section at the top containing title and date. This is called **YAML Front Matter**, which can be parsed using a library called **gray-matter**._

  ```
  npm install gray-matter
  ```

- Create `lib/posts.js`

  ```js
  import fs from "fs";
  import path from "path";
  import matter from "gray-matter";

  const postsDirectory = path.join(process.cwd(), "posts");

  export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });
    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  ```

  \*_It's usually convention to use lib or utils._

- Update `pages/index.js`

  ```js
  ...
  import { getSortedPostsData } from "../lib/posts";

  export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
  }

  export default function Home ({ allPostsData }) {
    return (
      <Layout home>
        ...
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                {title}
                <br />
                {id}
                <br />
                {date}
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    );
  }
  ```

### getServerSideProps[^](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

Because getServerSideProps is called at request time, its parameter (context) contains request specific parameters.

You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time.

## 5. Dynamic Routes[^](https://nextjs.org/docs/routing/dynamic-routes)

Create a page at /pages/posts/[id].js

1. A React component to render this page
2. **[getStaticPaths](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths)** which returns an array of possible values for **id**
3. **[getStaticProps](https://nextjs.org/docs/api-reference/data-fetching/get-static-props)** which fetches necessary data for the post with **id**

- Update `lib/posts.js`

  ```js
  ...

  export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ""),
        },
      };
    });
  }

  export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  }
  ```

  \*_**Important**: Each object must have the `params` key and contain an object with the `id` key (because we’re using `[id]` in the file name). Otherwise, getStaticPaths will fail._

- Create `pages/posts/[id].js`

  ```jsx
  import Layout from "../../components/layout";
  import { getAllPostIds, getPostData } from "../../lib/posts";

  export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
  }

  export async function getStaticProps({ params }) {
    const postData = getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  }

  export default function Post({ postData }) {
    return (
      <Layout>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
      </Layout>
    );
  }
  ```

### Render Markdown

```bash
npm install remark remark-html
```

- Update `lib/posts.js`

  ```js
  ...
  import { remark } from 'remark'
  import html from 'remark-html'

  ...

  export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }
  ```

- Update `pages/posts/[id].js`

  ```jsx
  ...

  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  }

  export default function Post({ postData }) {
    return (
      <Layout>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    )
  }
  ```

### Polishing the Post Page

1. Adding title to the Post Page

   - Update `pages/posts/[id].js`

     ```jsx
     ...
     import Head from 'next/head'

     ...

     export default function Post({ postData }) {
      return (
        <Layout>
          <Head>
            <title>{postData.title}</title>
          </Head>
          ...
        </Layout>
      )
     }
     ```

2. Formatting the Date

   ```bash
   npm install date-fns
   ```

   - Create `components/date.js`

     ```js
     import { parseISO, format } from "date-fns";

     export default function Date({ dateString }) {
       const date = parseISO(dateString);
       return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
     }
     ```

   - Update `pages/posts/[id].js`

     ```jsx
       ...
       import Date from '../../components/date'

       ...

       export default function Post({ postData }) {
         return (
           <Layout>
             ...
             {/* Replace {postData.date} with this */}
             <Date dateString={postData.date} />
             ...
           </Layout>
         )
       }
     ```

3. Adding CSS

   - Update `pages/posts/[id].js`

     ```jsx
      ...
      import utilStyles from '../../styles/utils.module.css'

      ...

      export default function Post({ postData }) {
        return (
          <Layout>
            <Head>
              <title>{postData.title}</title>
            </Head>
            <article>
              <h1 className={utilStyles.headingXl}>{postData.title}</h1>
              <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
          </Layout>
        )
      }
     ```

### Polishing the Index Page

- Update `pages/index.js`

  ```js
  ...
  import Link from 'next/link'
  import Date from '../components/date'

  ...

  export default function Home({ allPostsData }) {
    return (
      ...
      {/* Replace <li>...</li> with this */}
      <li className={utilStyles.listItem} key={id}>
        <Link href={`/posts/${id}`}>
          <a>{title}</a>
        </Link>
        <br />
        <small className={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
      </li>
  ...
  ```

### Dynamic Routes Details

- [Essential information of dynamic routes](https://nextjs.org/docs/routing/dynamic-routes)
- Fallback
  - If fallback is `false`, then any paths not returned by getStaticPaths will result in a **404 page**.
  - If fallback is `true`, then the paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “**fallback**” version of the page on the first request to such a path.
  - If fallback is `blocking`, then new paths will be server-side rendered with getStaticProps, and cached for future requests so it only happens once per path.
- [Catch-all Routes](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)
  - `pages/posts/[...id].js` matches `/posts/a`, but also `/posts/a/b`, `/posts/a/b/c` and so on.
    ```js
    return [
      {
        params: {
          // Statically Generates /posts/a/b/c
          id: ["a", "b", "c"],
        },
      },
      //...
    ];
    ```
    ```js
    export async function getStaticProps({ params }) {
      // params.id will be like ['a', 'b', 'c']
    }
    ```
- [Router](https://nextjs.org/docs/api-reference/next/router#userouter)
  ```js
  import { useRouter } from "next/router";
  ```
- [404 Pages](https://nextjs.org/docs/advanced-features/custom-error-page)
  ```js
  // pages/404.js
  export default function Custom404() {
    return <h1>404 - Page Not Found</h1>;
  }
  ```

## 6. API Routes[^](https://nextjs.org/docs/api-routes/introduction)

- Create `pages/api/hello.js`
  ```js
  export default function handler(req, res) {
    res.status(200).json({ text: "Hello" });
  }
  ```
  - [http://localhost:3000/api/hello](http://localhost:3000/api/hello)
- Do Not Fetch an API Route from `getStaticProps` or `getStaticPaths`
  - Because they run only on the server-side and will never run on the client-side.
- A Good Use Case: Handling Form Input
  - A good use case for API Routes is handling form input. For example, you can create a form on your page and have it send a POST request to your API Route. You can then write code to directly save it to your database. The API Route code will not be part of your client bundle, so you can safely write server-side code.
    ```js
    export default function handler(req, res) {
      const email = req.body.email;
      // Then save email to your database, etc...
    }
    ```
- [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
- [Dynamic API Routes](https://nextjs.org/docs/api-routes/dynamic-api-routes)

## 7. Deploying Your Next.js App

### Deploy to Vercel

1. Create a Github Repository
2. ```bash
   git remote add origin git@github.com:YuchanJeong/nextjs-blog-sample.git
   git push -u origin main
   ```
3. [Create a Vercel Account](https://vercel.com/signup)
4. Import your `nextjs-blog-sample` repository

- [nextjs-blog-sample](https://nextjs-blog-sample-omega.vercel.app/)

### Next.js and Vercel[^](https://vercel.com/docs)

- Default features:
  - Pages that use Static Generation and assets (JS, CSS, images, fonts, etc) will automatically be served from the Vercel Edge Network, which is blazingly fast.
  - Pages that use Server-Side Rendering and API routes will automatically become isolated Serverless Functions. This allows page rendering and API requests to scale infinitely.
- More features:
  - **Custom Domains**: Once deployed on Vercel, you can assign a custom domain to your Next.js app. Take a look at [our documentation](https://vercel.com/docs/concepts/projects/custom-domains) here.
  - **Environment Variables**: You can also set environment variables on Vercel. Take a look at [our documentation](https://vercel.com/docs/concepts/deployments/build-step#environment-variables) here. You can then use those [environment variables](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) in your Next.js app.
  - **Automatic HTTPS**: HTTPS is enabled by default (including custom domains) and doesn't require extra configuration. We auto-renew SSL certificates.

### Preview Deployment for Every Push (Develop, Preview, Ship)

When you have a pull request open, Vercel automatically creates a preview deployment for that branch on every push. The preview URL will always point to the latest preview deployment.

You can share this preview URL with your collaborators and get immediate feedback.

If your preview deployment looks good, merge it to `main`. When you do this, Vercel automatically creates a production deployment.

---

Ref. [https://nextjs.org/learn/basics/create-nextjs-app](https://nextjs.org/learn/basics/create-nextjs-app)
