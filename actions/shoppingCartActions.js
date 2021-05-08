/*
    ADD_ITEM: Adicionar um item no carrinho de compras
    REMOVE_ITEM: Remover um item do carrinho de compras
*/
export const ADD_ITEM = "add_item";
export const REMOVE_ITEM = "remove_item";
export const CLEAR = "clear";

/*
    Criando as funções que serão disparadas nas ações
*/
export const adicionarItem = (item) => (
    {
        type : ADD_ITEM, /* Nome da ação */
        data : item /* Conteúdo da ação (objeto) */
    }
)

export const removerItem = (item) => (
    {
        type : REMOVE_ITEM, /* Nome da ação */
        data : item /* Conteúdo da ação (objeto) */
    }
)

export const clear = () => (
    {
        type : CLEAR
    }
)