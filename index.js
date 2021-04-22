import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

//importando a classe de configuração do React Native Paper
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

//importando as bibliotecas do REACT-REDUX
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import shoppingCartReducer from './reducers/shoppingCartReducer';

const rootReducer = combineReducers({
    shoopingCart : shoppingCartReducer
});

const store = createStore(rootReducer);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#bf360c',
        secondary: '#ff5722'
    }
}

export default function Main() {
    return (
        
        <Provider store={store}>            
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);



