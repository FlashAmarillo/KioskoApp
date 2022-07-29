import { KioskoProvider } from '../context/KioskoProvider';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <KioskoProvider>
      <Component {...pageProps} />
    </KioskoProvider>
  )
}

export default MyApp
