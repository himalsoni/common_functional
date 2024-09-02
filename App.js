import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import store from "@store";
import Router from "./src/Router";
import { LogBox } from "react-native"

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

//npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

const App = () => {
    const persistor = persistStore(store);
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} >
				<Router />
			</PersistGate>
		</Provider>
	);
};
export default App;