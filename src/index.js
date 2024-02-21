import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import store from './redux/store';
import { Provider } from 'react-redux';
import {QueryClientProvider , QueryClient} from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <AuthProvider>
        <App />
    </AuthProvider>
  </Provider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
