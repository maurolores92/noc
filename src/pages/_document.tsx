// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import themeConfig from 'src/configs/themeConfig'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap'
          />
          <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
          <link rel='shortcut icon' href='/images/favicon.png' />
          <meta name='description' content={`${themeConfig.templateName} –Network Operations Center`} />
          <meta name='keywords' content='Network Operations Center' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta name='description' content='Optimiza la gestión de redes con nuestras herramientas NOC.' />
          <meta property='og:title' content='NOC | Network Operations Center' />
          <meta property='og:description' content='Optimiza la gestión de redes con nuestras herramientas NOC.' />
          <meta property='og:url' content='https://www.codewithmauricio.tech/' />
          <meta property='og:site_name' content='NOC | Network Operations Center | Mauricio Lores' />
          <meta property='og:type' content='website' />
          <meta property='og:locale' content='es_ES' />
          <link rel='canonical' href='https://codewithmauricio.tech/' />
          <meta property='og:image' content='http://imgfz.com/i/xsgHleE.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
        (
          <App
            {...props} // @ts-ignore
            emotionCache={cache}
          />
        )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    )
  })

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
