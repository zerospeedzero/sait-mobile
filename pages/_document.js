import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class PWADocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="../node_modules/@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <Script
             src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
             strategy="beforeInteractive"
          /> */}

        </body>
      </Html>
    );
  }
}