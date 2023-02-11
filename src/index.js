import React from 'react';
import ReactDOM from "react-dom";
import App from './components/App/App';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../src/scss/_main.scss';


ReactDOM.render(
  <React.StrictMode>
	<BrowserRouter>
		<Provider store={store}>
		<App />
		</Provider>
	</BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

