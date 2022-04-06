import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DataLayer } from '../DataLayer'
import reducer, { initialState } from '../reducer'
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
