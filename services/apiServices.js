import axios from 'axios';


export const getApiUrl = () => {
    return 'http://apirestaurante-001-site1.itempurl.com';
}

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

export const getCategorias = () => {
    return axios.get(getApiUrl() + "/api/categorias")
        .then(
            response => {
                return response.data;
            }
        )
}
