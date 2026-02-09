import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/store';
import App from './App';




const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

//COME ANd comment out this console method IF YOU WANT YOUR CONSOLE.LOGS TO SHOW AGAIN
if(!window.console) window.console = {};
var methods = ["log", "debug", "warn", "info"];
for(var i=0;i<methods.length;i++){
    //console[methods[i]] = function(){};
   // console.error =  function(){};
   // console.log =  function(){};
}


root.render(
  <HelmetProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

