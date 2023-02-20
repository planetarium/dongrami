import { MainLayout } from '../layouts/MainLayout';
import { AddressSection } from '../sections/Address';
import { EndpointSection } from '../sections/Endpoint';
import { SendSection } from '../sections/SendSection';
import { useCurrentEndpoint } from '../store/endpoint';
export function MainPage() {
  const currentEndpoint = useCurrentEndpoint();

  return (
    <>
      <AddressSection />
      <EndpointSection />
      {currentEndpoint && <SendSection />}
    </>
  );
}

MainPage.Layout = MainLayout;
