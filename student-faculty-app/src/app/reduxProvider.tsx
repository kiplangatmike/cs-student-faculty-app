"use client";
import { PersistGate } from "redux-persist/integration/react";
import {persistor, store } from "@/redux/store";
import { Provider } from "react-redux";

function ReduxProvider({ children }: { children: any }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>;
}

export default ReduxProvider;
