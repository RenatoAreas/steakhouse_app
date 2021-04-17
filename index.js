import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

//importando a classe de configuração do React Native Paper
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

//importando as bibliotecas do REACT-REDUX
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

//importando o REDUCER (componente do REACT-REDUX que irá
//acessar e incluir ou modificar dados na STORE (memória do app))
import shoppingCartReducer from './reducers/shoppingCartReducer';

//objeto para registrar todos os reducers criados no projeto..
//NOME_DO_REDUCER : Componente REDUCER
const rootReducer = combineReducers({
    shoopingCart : shoppingCartReducer
});

//criando a memória da aplicação (STORE)
const store = createStore(rootReducer);

//definindo o padrão de cores do toolkit
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#bf360c',
        secondary: '#ff5722'
    }
}

//configurando o uso da toolkit no projeto
export default function Main() {
    return (
        //Carregando o REACT-REDUX
        <Provider store={store}>            
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);



