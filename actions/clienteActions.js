//Nome da Ação
export const AUTENTICAR_CLIENTE = "autenticar_cliente";

//Função para chamada da Ação
export const Autenticar = (dados) => (
    {
        type: AUTENTICAR_CLIENTE, //nome da ação!
        data: dados //dados da ação!
    }
)