import Document, { Head, Main, NextScript } from 'next/document'
import classes from '../Css/style.css';
import { GA_TRACKING_ID } from '../lib/gtag';
import Helmet from 'react-helmet'

export default class MyDocument extends Document {
//  static async getInitialProps(ctx) {
//    const initialProps = await Document.getInitialProps(ctx)
//    return { ...initialProps }
//  }
 static async getInitialProps (...args) {
    const documentProps = await super.getInitialProps(...args)
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() }
  }

  // should render on <html>
  get helmetHtmlAttrComponents () {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents () {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents () {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
}

 render() {
   return (
     <html lang="vi" {...this.helmetHtmlAttrComponents}>
       <Head>
           {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
           <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `
            }}
        />
        {this.helmetHeadComponents}
       </Head>
       <body {...this.helmetBodyAttrComponents}>
         <Main />
         <NextScript />
       </body>
     </html>
   )
 }
}