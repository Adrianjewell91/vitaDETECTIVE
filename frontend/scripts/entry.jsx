import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const root = document.getElementById('root');
  // console.log('root')
  window.store = store;
  ReactDOM.render(<Root store={store} />, root);
});

// const vitamin_list = require("./vitamin_search_params");
// const genomeLink = require('genomelink-node');

// function buildSelector(selector) {

//   vitamin_list.forEach((el) => {
//     let choice = document.createElement("OPTION");
//     choice.setAttribute("value", el);
//     let text = document.createTextNode(el);
//     choice.appendChild(text);
//     selector.appendChild(choice);
//   });

// }

// function setAuthUrl(a,b,c) {
//   return genomeLink.OAuth.authorizeUrl({ scope: a.join(' '),
//                                          clientId: b,
//                                          callbackUrl: c });
// };

// window.addEventListener("DOMContentLoaded", () => {

//   const GENOMELINK_CLIENT_ID='t0pRdHSsViMvhmFKGejrph0jvtyQFx760cz32qKB';
//   const GENOMELINK_CLIENT_SECRET='gi27X7FmYpqv0dkb5VJTsuBoNpOG7uBjDFxvdLg1uE3Aqj2UE9vKtWZI24bcJIdfrjFYRRu6AM5qV6OuWZ3HYSg33l08ONAPD6TnH2IxMoiA3IEm35Q2DdyMoxdsDlos';
//   const GENOMELINK_CALLBACK_URL='http://127.0.0.1:3000/callback';
//   // const GENOMELINK_CALLBACK_URL='https://vitadetective-api.herokuapp.com/callback';
//   const selector = document.getElementById("vitamin_selector");

//   buildSelector(selector);

//   let authorizeUrl = setAuthUrl(vitamin_list, GENOMELINK_CLIENT_ID, GENOMELINK_CALLBACK_URL);
//   console.log(vitamin_list);

//   document.getElementById('auth-url').href = authorizeUrl;
//   selector.addEventListener("change", (e) => {
//       e.preventDefault();
//       // authorizeUrl = setAuthUrl(selector.value, GENOMELINK_CLIENT_ID, GENOMELINK_CALLBACK_URL);
//       // document.getElementById('auth-url').href = authorizeUrl;
//       console.log(authorizeUrl);
//   });

// });
