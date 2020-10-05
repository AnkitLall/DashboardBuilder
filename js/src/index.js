import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store,persistor } from './Utils/Store';
import history from './Utils/History';
import LoadingView from './Modals/LoadingModal/LoadingModal';
import './css/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <App />
      </PersistGate>      
    </Router>
  </Provider>,
  document.getElementById('root')
);
