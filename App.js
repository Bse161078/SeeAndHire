import * as React from "react";
import { SafeAreaView, LogBox } from "react-native";
import MainNav from "./Src/Navigation/MainNav";

import { Provider } from "react-redux";
import { store, persistor } from "./Src/Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
LogBox.ignoreLogs(["Warning: ..."]);

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }}>
            <MainNav />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
