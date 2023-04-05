import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { AddressSection } from '../sections/Address';
import { EndpointSection } from '../sections/Endpoint';
import { ActionSection } from '../sections/ActionSection';
import { EndpointType } from '../types/endpoint';

export function MainPage() {
  const [endpoint, setEndpoint] = useState<EndpointType | undefined>();
  const endpointState = { endpoint, setEndpoint };

  return (
    <>
      <AddressSection />
      <EndpointSection {...endpointState} />
      {endpoint && <ActionSection />}
    </>
  );
}

MainPage.Layout = MainLayout;
