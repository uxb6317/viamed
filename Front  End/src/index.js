import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './common/styles/app.css';
import * as serviceWorker from './serviceWorker';
import './app/i18n';

import store from './app/store'; // redux store

import App from './app/App';

ReactDOM.render(
  <Provider store={store}>
    <LoadScript googleMapsApiKey='AIzaSyDZ8tGX7K7z_57BftLksPQsYDfHlv3HDb8'>
      <Router>
        <App />
      </Router>
    </LoadScript>
  </Provider>,

  document.getElementById('root')
);

serviceWorker.register();
