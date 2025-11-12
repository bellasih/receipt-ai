import Head from "next/head";
import React from "react";
import { Header } from "./components/Header";
// import { GoogleFonts } from 'next-google-fonts';
import { Footer } from "./components/Footer";
import Script from "next/script";

interface InjectedProps {
  page?: string;
  invertedHeader?: boolean;
  withHeader?: boolean;
  withFooter?: boolean;
  withHero?: boolean;
  loading?: boolean;
}

type LayoutProps = InjectedProps & React.HTMLProps<HTMLDivElement>;

// min-height: 91.5vh body + 8.5vh header
const Layout: React.FC<LayoutProps> = ({
  page,
  withHeader,
  withFooter,
  withHero,
  children,
  invertedHeader,
  loading,
  ...props
}) => {
  const { style, ...otherProps } = props;
  return (
    <>
      {/* <GoogleFonts href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" /> */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {(withHeader === undefined || withHeader) && (
        <Header inverted={invertedHeader} />
      )}
      {withHero !== undefined && !withHero && (
        <div className="w-full" style={{ height: "8.5vh" }} />
      )}
      <main style={{ minHeight: "100vh", ...style }} {...otherProps}>
        {loading ? (
          <div
            className="w-full flex justify-center items-center"
            style={{ height: "91.5vh" }}
          >
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-light" />
          </div>
        ) : (
          children
        )}
      </main>
      {(withFooter === undefined || withFooter) && <Footer />}
      <Script strategy="lazyOnload">
        {`document.querySelectorAll('a').forEach(function (anchor) {
            if (!anchor.getAttribute('href').startsWith('http')) {
              anchor.href = 'http://' + anchor.getAttribute('href');
            }
          });
        `}
      </Script>
    </>
  );
};
export default Layout;
