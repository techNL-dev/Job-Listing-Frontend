import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

type Props = {
  children?: ReactNode;
  title?: string;
  home?: boolean;
};

const Layout = ({
  children,
  title = "This is the default title",
  home,
}: Props) => (
  <div
    className="
      bg-techNLWhite
      dark:bg-techNLDarkGray 
      min-h-screen 
      h-auto
      text-techNLDarkGray 
      dark:text-techNLWhite 
      flex 
      flex-col
    "
  >
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {!home && (
      <header
        className="
        flex 
        flex-row 
        justify-between 
        items-center
        py-8
        px-6
        sticky
        top-0
        z-50
        h-12
        bg-techNLWhite
        dark:bg-techNLGray 
        shadow-2xl
      "
      >
        <Link href="/">
          <div className="text-2xl font-semibold cursor-pointer">
          <Image
            src="/TechNLLogoHorizontal.png"
            alt="TechNL"
            objectFit="contain"
            height="48"
            width="124"
          />
            {/* <h1 className="sm:block hidden">TechNL Job Listings</h1> */}
            {/* <h1 className="block sm:hidden">TechNL</h1> */}
          </div>
        </Link>
        <nav className="flex flex-row items-center space-x-4">
          <Link href="/listings">
            <a>Listings</a>
          </Link>
          {/* <Link href="/search">
            <a>Search</a>
          </Link> */}
          <Link href="/about">
            <a>About</a>
          </Link>
        </nav>
      </header>
    )}
    {children}
  </div>
);

export default Layout;
