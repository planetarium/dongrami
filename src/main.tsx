import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const PRETENDARD_PREFERED_FONT =
  "'Pretendard Variable',Pretendard,-apple-system,BlinkMacSystemFont,system-ui,Roboto,'Helvetica Neue','Segoe UI','Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif";

const theme = extendTheme({
  fonts: {
    heading: PRETENDARD_PREFERED_FONT,
    body: PRETENDARD_PREFERED_FONT,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
