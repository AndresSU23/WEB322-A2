import '../styles/globals.css';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import { UnitProvider } from '@/context/UnitContext';
import { ResultsProvider } from '@/context/ResultsContext';
import { IdSearchErrorProvider } from '@/context/IdSearchErrorContext';
import { ResultErrorProvider } from '@/context/ResultErrorContext';
function MyApp({ Component, pageProps }) {
  return (
    <RecentlyViewedProvider>
        <UnitProvider>
          <ResultsProvider>
            <IdSearchErrorProvider>
              <ResultErrorProvider>
                <Component {...pageProps} />
              </ResultErrorProvider>
            </IdSearchErrorProvider>
          </ResultsProvider>
        </UnitProvider>
    </RecentlyViewedProvider>
  );
}

export default MyApp;

