import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div
    className="
      bg-gray-900 
      min-h-screen 
      h-auto 
      text-white 
      flex 
      flex-col
    "
  >
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header
      className="
        flex 
        flex-row 
        justify-between 
        items-center
        py-2
        px-4
        sticky
        top-0
        z-50
        bg-gray-800
        shadow-2xl
      "
    >
      <Link href="/">
        <h1 className="text-2xl font-semibold cursor-pointer">Website Name</h1>
      </Link>
      <nav className="flex flex-row items-center space-x-4">
        <Link href="/listings">
          <a>Listings</a>
        </Link>
        <Link href="/search">
          <a>Search</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
