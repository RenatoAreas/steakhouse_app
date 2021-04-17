import * as actions from '../actions/shoppingCartActions';
import { Alert } from 'react-native';

//definindo quais informações serão gravadas na STORE..
const initialState = {
    cestaDeCompras: [], //produtos adicionados na cesta de compras
    valorTotal: 0, //valor total da cesta
    quantidadeItens: 0, //quantidade de itens adicionados
};

//declarando o reducer
const shoppingCartReducer = (
    state = initialState, //dados que serão armazenados
    action //ações que o componente irá 'escutar'
) => {

    switch (action.type) {

        case actions.ADD_ITEM:

            Alert.alert('Item \"' + action.data.nome + "'\" adicionado com sucesso.");

            var itemJaExiste = false;
            //verificando se o item ja existe na cesta de compras do state..
            for(var i = 0; i < state.cestaDeCompras.length; i++){
                var item = state.cestaDeCompras[i];
                //verificando se o produto enviado na action 
                //já foi adicionado no state
                if(item.id == action.data.id){
                    ++item.quantidade;
                    itemJaExiste = true;
                    break;
                }
            }

            //se item não existe no state..
            if(!itemJaExiste){
                action.data.quantidade = 1;
                state.cestaDeCompras.push(action.data);
            }

            //escrevendo os dados no state
            return {
                ...state,
                valorTotal: new Number(state.valorTotal) + new Number(action.data.precoDecimal),
                quantidadeItens: (state.quantidadeItens + 1)
            };

        case actions.REMOVE_ITEM:
            
            //percorrer a cesta de compras para encontrar o item enviado na ação
            for(var i = 0; i < state.cestaDeCompras.length; i++){
                var item = state.cestaDeCompras[i];
                //verificando se o item da cesta é o mesmo da action
                if(item.id == action.data.id){
                    --item.quantidade;
                    break;
                }
            }

            //remover todos os itens da cesta de compras com quantidade = 0
            //filter -> filtrar somente os itens da cesta que possuem
            //quantidade > 0
            const items = state.cestaDeCompras.filter((i) => i.quantidade > 0);

            //escrevendo os dados no state..
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