import { useEffect } from 'react';
import { getLayout, Page } from './layouts/DefaultLayout';
import { AuthenticatePage, ErrorPage } from './pages';
import { MainPage } from './pages/main';
import { UnlockPage } from './pages/unlock';
import {
  useEndpointMutations,
  useEndpoints,
  useTempEndpoint,
} from './store/endpoint';
import { useAccount, useAccountState, useMainMutations } from './store/main';
import { useWorker, useWorkerMutations } from './store/worker';
import { WorkerResultMessage } from './types/message';

import './styles/index.css';
import { loadAllEndpointHealth } from './utils/endpoint';
import Worker from './worker?worker';

function createWorker(
  worker: Worker | null,
  setWorker: (worker: Worker) => void,
  setMessage: (message: WorkerResultMessage) => void
) {
  if (!worker && window.Worker) {
    const _worker = new Worker();

    _worker.onmessage = async (e: MessageEvent<WorkerResultMessage>) => {
      setMessage(e.data);
    };

    setWorker(_worker);
  }
}

function App() {
  const worker = useWorker();
  const account = useAccount();
  const authenticated = useAccountState();
  const endpoints = useEndpoints();
  const tempEndpoint = useTempEndpoint();

  const { setMessage } = useMainMutations();
  const { setWorker } = useWorkerMutations();
  const { setEndpoints, setTempEndpoint } = useEndpointMutations();

  useEffect(
    () => createWorker(worker, setWorker, setMessage),
    [worker, setWorker, setMessage]
  );

  useEffect(() => {
    void loadAllEndpointHealth(
      endpoints,
      setEndpoints,
      tempEndpoint,
      setTempEndpoint
    );

    const interval = setInterval(
      () =>
        loadAllEndpointHealth(
          endpoints,
          setEndpoints,
          tempEndpoint,
          setTempEndpoint
        ),
      10000
    );

    return () => {
      clearTimeout(interval);
    };
  }, []);

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
