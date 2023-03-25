import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import AppNavigator from './src/navigator';
import {store} from './src/redux/store';

const App = () => {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={styles.conatiner}>
          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});

export default App;
