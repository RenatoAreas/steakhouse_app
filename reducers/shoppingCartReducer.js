import * as actions from '../actions/shoppingCartActions';
import { Alert } from 'react-native';

const initialState = {
    cestaDeCompras: [], 
    valorTotal: 0, 
    quantidadeItens: 0,
};

const shoppingCartReducer = (
    state = initialState,
    action 
) => {

    switch (action.type) {

        case actions.ADD_ITEM:

            Alert.alert('Item \"' + action.data.nome + "'\" adicionado com sucesso.");

            var itemJaExiste = false;
            
            for(var i = 0; i < state.cestaDeCompras.length; i++){
                var item = state.cestaDeCompras[i];
               
                if(item.id == action.data.id){
                    ++item.quantidade;
                    itemJaExiste = true;
                    break;
                }
            }

            if(!itemJaExiste){
                action.data.quantidade = 1;
                state.cestaDeCompras.push(action.data);
            }

            return {
                ...state,
                valorTotal: new Number(state.valorTotal) + new Number(action.data.precoDecimal),
                quantidadeItens: (state.quantidadeItens + 1)
            };

        case actions.REMOVE_ITEM:
            
            
            for(var i = 0; i < state.cestaDeCompras.length; i++){
                var item = state.cestaDeCompras[i];
                
                if(item.id == action.data.id){
                    --item.quantidade;
                    break;
                }
            }

            const items = state.cestaDeCompras.filter((i) => i.quantidade > 0);

            return {
                ...state,
                cestaDeCompras : items,
                valorTotal : (new Number(state.valorTotal) - new Number(action.data.precoDecimal)),
                quantidadeItens: (state.quantidadeItens - 1)
            };

        default:
            return state;
    }

}

export default shoppingCartReducer;