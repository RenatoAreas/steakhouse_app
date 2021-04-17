import axios from 'axios';

//função publica para retornar o endereço do servidor da API..
export const getApiUrl = () => {
    return 'http://apirestaurante-001-site1.itempurl.com';
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
