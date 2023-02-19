import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import {
  GetLastBlockIndexDocument,
  GetLastBlockIndexQuery,
  GetLastBlockIndexQueryVariables,
} from './graphql/sdk.main';
import { getLayout, Page } from './layouts/DefaultLayout';
import { AuthenticatePage, ErrorPage } from './pages';
import { MainPage } from './pages/main';
import { UnlockPage } from './pages/unlock';
import {
  EndpointType,
  useEndpointMutations,
  useEndpoints,
} from './store/endpoint';
import { useAccount, useAccountState, useMainMutations } from './store/main';
import { useWorker, useWorkerMutations } from './store/worker';
import { WorkerResultMessage } from './types/message';

type GraphQLBody<T> = {
  query: string;
  variables: T;
};

async function loadEndpointHealth(
  endpoints: EndpointType[],
  setEndpoints: (endpoints: EndpointType[]) => void
) {
  const newEndpoints = await Promise.all(
    // FIXME: Type Definition is dirty
    endpoints.map(async (endpoint) => {
      try {
        const {
          data: { data },
        } = await axios.post<
          never,
          AxiosResponse<{ data: GetLastBlockIndexQuery }>,
          GraphQLBody<GetLastBlockIndexQueryVariables>
        >(endpoint.value, {
          query: GetLastBlockIndexDocument,
          variables: { offset: 0 },
        });
        const result = data.chainQuery.blockQuery?.blocks[0].index;
        return {
          ...endpoint,
          lastIndex: result,
        };
      } catch (e) {
        return endpoint;
      }
    })
  );
  setEndpoints(newEndpoints);
}

function createWorker(
  worker: Worker | null,
  setWorker: (worker: Worker) => void,
  setMessage: (message: WorkerResultMessage) => void
) {
  if (!worker && window.Worker) {
    const _worker = new Worker(new URL('../worker.js', import.meta.url), {
      type: 'module',
    });

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

  const { setMessage } = useMainMutations();
  const { setWorker } = useWorkerMutations();
  const { setEndpoints } = useEndpointMutations();

  useEffect(
    () => createWorker(worker, setWorker, setMessage),
    [worker, setWorker, setMessage]
  );

  useEffect(() => {
    void loadEndpointHealth(endpoints, setEndpoints);

    const interval = setInterval(
      () => loadEndpointHealth(endpoints, setEndpoints),
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
