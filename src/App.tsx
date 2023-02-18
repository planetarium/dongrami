import { useEffect } from 'react';
import { getLayout, Page } from './layouts/DefaultLayout';
import { AuthenticatePage, ErrorPage } from './pages';
import { MainPage } from './pages/main';
import { UnlockPage } from './pages/unlock';
import { useAccount, useAccountState, useMainMutations } from './store/main';
import { useWorker, useWorkerMutations } from './store/worker';
import { WorkerResultMessage } from './types/message';

function App() {
  const worker = useWorker();
  const account = useAccount();
  const authenticated = useAccountState();

  const { setMessage } = useMainMutations();
  const { setWorker } = useWorkerMutations();

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
    Page = account ? UnlockPage : AuthenticatePage;
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
