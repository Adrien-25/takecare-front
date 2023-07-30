// Import necessary dependencies from Next.js
import { Html, Head, Main, NextScript } from 'next/document'

// Entry point for rendering the entire application on the server side.
export default function Document() {
  return (
    // The root HTML element of the document, with the language set to French.
    <Html lang="fr">
      <Head />
      <body>
        {/* The main content of the application */}
        <Main />
        {/* NextScript contains additional scripts required by Next.js */}
        <NextScript />
      </body>
    </Html>
  )
}
