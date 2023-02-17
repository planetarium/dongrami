import { useEffect } from 'react';
import { getLayout, Page } from './layouts/DefaultLayout';
import { AuthenticatePage, ErrorPage } from './pages';
import { MainPage } from './pages/Main';
import { useAccountState, useMutations, useWorker } from './store/main';
import { WorkerResultMessage } from './types/message';

function App() {
  const worker = useWorker();
  const { setWorker, setMessage } = useMutations();
  const authenticated = useAccountState();

  useEffect(() => {
    if (!worker && window.Worker) {
      const _worker = new Worker(new URL('../worker.js', import.meta.url), {
        type: 'module',
      });

      _worker.onmessage = async (e: MessageEvent<WorkerResultMessage>) => {
        setMessage(e.data);
      };

      setWorker(_worker);
    }
  }, [worker, setWorker, setMessage]);

  let Page: Page = () => <></>;
  if (!window.Worker) {
    Page = ErrorPage;
  } else if (!authenticated) {
    Page = AuthenticatePage;
  } else {
    Page = MainPage;
  }

  const Layout = getLayout(Page);

  return (
    <Layout>
      <Page />
    </Layout>
  );
}

export default App;
