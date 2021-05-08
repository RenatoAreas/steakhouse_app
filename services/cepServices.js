import axios from 'axios';

//função publica para retornar o endereço do servidor da API..
export const getApiUrl = () => {
    return 'https://viacep.com.br/ws/';
}

//função para retornar os produtos..
export const getEndereco = (cep) => {
    return axios.get(getApiUrl() + cep + "/json")
        .then(
            response => {
                return response.data;
            }
        )
}