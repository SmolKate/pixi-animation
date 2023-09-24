import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../shared/store/store'
import { Provider } from 'react-redux'
import LoadingWrapper from '@/shared/hoc/Loading/LoadingWrapper'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LoadingWrapper>
        <Component {...pageProps} />
      </LoadingWrapper>
    </Provider>
  )
}
