import 'dotenv/config';

import '../styles/globals.css';
import Head from 'next/head';

// /** ********************** */
// /** Redux && Redux Persist */
// /** ********************** */
// import { persistStore, persistReducer } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';

// import user from '../reducers/user';

// const reducers = combineReducers({
// 	user,
// });

// const persistConfig = {
// 	key: 'hackatweet',
// 	storage,
// 	// blacklist: ['bookmarks'],
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
// 	reducer: persistedReducer,
// 	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
// });

// const persistor = persistStore(store);
// /** ***************************** */
// /** END OF Redux && Redux Persist */
// /** ***************************** */


// function App({ Component, pageProps }) {
// 	return (
// 		<Provider store={store}>
// 			<PersistGate loading={null} persistor={persistor}>
// 				<Head>
// 					<title>Hackatweet</title>
// 				</Head>
// 				<Component {...pageProps} />
// 			</PersistGate>
// 		</Provider>
// 	);
// }

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';

const store = configureStore({
	reducer: { user },
});

function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Head>
				<title>Hackatweet</title>
			</Head>
			<Component {...pageProps} />
		</Provider>
	);
}

export default App;
