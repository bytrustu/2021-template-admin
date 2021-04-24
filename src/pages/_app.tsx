import React from 'react'
import NextApp, { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { wrapper } from '../stores/store'
import { AppLayout, Header, Contents, Footer } from '../components'
import { createGlobalStyle, ServerStyleSheet } from 'styled-components'
import Head from 'next/head'
import nextSeoConfig from '../../next-seo.config'

const App = ({ Component, pageProps }: AppProps) => {
  /**
   * Head 에 주입되는 페이지 설정입니다.
   */
  const pageConfigs = [
    { id: 'config-1', name: 'http-equiv', content: 'autoRotate:disabled' },
    {
      id: 'config-2',
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, viewport-fit=cover',
    },
  ]

  return (
    <>
      {/* Head 에 메타정보를 주입합니다. */}
      <Head>
        {pageConfigs.map((config) => (
          <meta key={config.id} {...config} />
        ))}
      </Head>

      {/* SEO 용 메타정보를 추가로 주입합니다. */}
      <DefaultSeo {...nextSeoConfig} />

      {/* 글로벌 스타일들을 페이지에 적용합니다. */}
      <GlobalStyles />

      {/* 페이지 기본 구조를 구성합니다. */}
      <AppLayout>
        <Header />
        <Contents>
          <Component {...pageProps} />
        </Contents>
        <Footer />
      </AppLayout>
    </>
  )
}

App.getInitialProps = async (context: any) => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = context.renderPage
  try {
    context.renderPage = () =>
      originalRenderPage({
        // @ts-ignore
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      })
    const initialProps = await NextApp.getInitialProps(context)
    return {
      ...initialProps,
      styles: (
        <>
          {/* @ts-ignore */}
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    }
  } catch (e) {
    console.error(e)
  } finally {
    sheet.seal()
  }
}

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html,
  body {
    height: 100%;
  }
`

export default wrapper.withRedux(App)
