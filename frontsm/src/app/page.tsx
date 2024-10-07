"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ItemProvider } from '../context/ItemContext';
import { Provider } from 'react-redux';
import { store  } from '@/redux/store/store'; 
import Home from '@/pages/Home';

const queryClient = new QueryClient();

const Main: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}> 
        <ItemProvider>
          <Home />
        </ItemProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Main;