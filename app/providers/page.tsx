"use client";

import { UserProvider } from "./userProviders";
import store from "./redux/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function Providers({ children }: any) {
  const persistor = persistStore(store);
  return (
    <UserProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        {children}

        </PersistGate>
      </Provider>
    </UserProvider>
  );
}

export default Providers;
