import '../styles/globals.css';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import { UnitProvider } from '@/context/UnitContext';
import { ResultsProvider } from '@/context/ResultsContext';

function MyApp({ Component, pageProps }) {
  return (
    <RecentlyViewedProvider>
        <UnitProvider>
          <ResultsProvider>
            <Component {...pageProps} />
          </ResultsProvider>
        </UnitProvider>
    </RecentlyViewedProvider>
  );
}

export default MyApp;

