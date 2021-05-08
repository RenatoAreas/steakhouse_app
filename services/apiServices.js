import axios from 'axios';

//função publica para retornar o endereço do servidor da API..
export const getApiUrl = () => {
    return 'http://apirestaurante2-001-site1.ftempurl.com';
}

//função para retornar os produtos..
export const getProdutos = (idCategoria = 0) => {

    var resource = '/api/cardapio';

    if(idCategoria > 0)
        resource += "/" + idCategoria;

    return axios.get(getApiUrl() + resource)
        .then(
            response => {
                return response.data;
            }
        )
}

//função para retornar as categorias..
export const getCategorias = () => {
    return axios.get(getApiUrl() + "/api/categorias")
        .then(
            response => {
                return response.data;
            }
        )
}

//função para realizar uma chamada POST
//para cadastro de cliente na API..
export const postCliente = (cliente) => {
    return axios.post(getApiUrl() + "/api/cliente", cliente)
        .then(
            response => {
                return response.data;
            }
        )
}

//função para realizar uma chamada POST
//para autenticação de cliente na API..
export const postLogin = (cliente) => {
    return axios.post(getApiUrl() + "/api/login", cliente)
        .then(
            response => {
                return response.data;
            }
        )
}

//função para realizar uma chamada POST
//para finalizar um pedido na API
export const postPedido = (pedido, accessToken) => {
    return axios.post(getApiUrl() + "/api/pedido", pedido, {
        headers : {
            'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(
            response => {
                return response.data;
            }
        )
}