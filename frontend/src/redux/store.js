import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import thunk from 'redux-thunk';
import storage from './storage';
import authReducer from './reducers/auth.slice';

import groupReducer from './reducers/group.slice';
//import pitchReducer from './reducers/pitch.slice';
//import inboxReducer from './reducers/chat.slice';
//import transactionReducer from './reducers/transactions.slice';
// import chatReducer from '../chat-src/redux/slices/chat';



const reducers = combineReducers({
  auth: authReducer,
  group: groupReducer,
  //student: studentReducer,
  //pitch:pitchReducer,
  // chat: chatReducer,
  //inbox: inboxReducer, 
  //transaction: transactionReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null

const persistConfig = {
  key: 'root',
  storage,
   //blacklist: [],
   //whitelist: [],
  
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});


export default store;
