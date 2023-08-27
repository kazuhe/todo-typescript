import React, { FC, PropsWithChildren } from "react";
import Head from "next/head";

type Props = PropsWithChildren;

const Layout: FC<Props> = ({ children }) => {
  const siteTitle = "todo-typescript";

  return (
    <div className="h-screen bg-zinc-900 text-zinc-200">
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta
          name="description"
          content="Full-stack ToDo application with TypeScript."
        />
        <meta property="og:image" content="/images/profile.png" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      <header className="">
        <h1>{siteTitle}</h1>
      </header>
      <main className="max-w-xl mx-auto p-16">{children}</main>
    </div>
  );
};

export default Layout;
