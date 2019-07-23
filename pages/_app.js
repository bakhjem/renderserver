import App from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'

import * as gtag from '../lib/gtag'


const linkStyle = {
    margin: '0 10px 0 0'
}
Router.events.on('routeChangeStart', url => {
    console.log(`Loading: ${url}`)
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default App