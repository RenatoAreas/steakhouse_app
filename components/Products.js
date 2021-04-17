import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import * as services from '../services/apiServices';
import { adicionarItem } from '../actions/shoppingCartActions'; //ações
import { connect } from 'react-redux'; //conexão do componente com o REACT-REDUX
import { bindActionCreators } from 'redux'; //disparar ações no componente
import { formatCurrency } from '../helpers/formatCurrency';

class Products extends React.Component {

    //construtor
    //utilizado para declarar o 'state' do componente..
    constructor(props) {
        super(props);

        //declarando o state..
        this.state = {
            //armazenar os produtos obtidos da API
            products_list: [],
            categorias_list: [],
            idCategoria: 0
        };
    }

    //função executada antes do componente
    //renderizar o seu conteudo (Before Render)
    componentDidMount() {
        this.consultarCategorias();
        this.consultarProdutos();
    }

    consultarProdutos(idCategoria = 0){
        //realizando uma chamada para a API..
        services.getProdutos(idCategoria)
            .then( //promisse de sucesso!
                data => {
                    //capturando o retorno da API e 
                    //armazenando dentro do state..
                    this.setState({
                        products_list: data
                    });
                }
            )
            .catch( //promisse de erro!
                e => {
                    Alert.alert(e.response);
                }
            )
    }

    consultarCategorias(){
        //realizando uma chamada para a API..
        services.getCategorias()
            .then( //promisse de sucesso!
                data => {
                    //capturando o retorno da API e 
                    //armazenando dentro do state..
                    this.setState({
                        categorias_list: data
                    });
                }
            )
            .catch( //promisse de erro!
                e => {
                    Alert.alert(e.response);
                }
            )
    }

    filtrarPorCategoria(idCategoria) {
        this.setState({
            idCategoria
        })

        this.consultarProdutos(idCategoria);
    }

    render() {

        var self = this;

        return (
            <View>

                {
                    self.props.valorTotal > 0 ? (
                        <View style={{
                            alignItems: 'center',
                            backgroundColor: '#bf360c'
                        }}>

                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginBottom: 10,
                                marginTop: 10,
                                color: '#fff'
                            }}>
                                Total do Pedido: {formatCurrency(self.props.valorTotal)}
                            </Text>

                        </View>
                    ) : (
                        <View></View>
                    )
                }

                <Card style={{ backgroundColor: '#eee' }}>
                    <Card.Content>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Conheça nosso cardápio
                        </Text>
                        <Text style={{ fontSize: 14 }}>
                            Selecione os itens e faça o seu pedido
                        </Text>
                        <Text style={{ fontSize: 14 }}>
                            {self.state.products_list.length} itens exibidos.
                        </Text>
                    </Card.Content>
                </Card>

                <View style={{ backgroundColor: '#fff' }}>
                    <Picker style={{ fontSize: 16 }}
                        selectedValue={self.state.idCategoria}
                        onValueChange={
                            (itemValue, itemIndex) => self.filtrarPorCategoria(itemValue)
                        }
                    >
                        <Picker.Item label="Todas as categorias" value="0"/>
                        {
                            self.state.categorias_list.map(
                                function(item, i){
                                    return(
                                        <Picker.Item
                                            key={i}
                                            label={item.nome}
                                            value={item.id}
                                        />
                                    )
                                }
                            )
                        }
                    </Picker>
                </View>

                {
                    self.state.products_list.map(
                        function (item, i) {

                            return (
                                <Card key={i}>
                                    <Card.Title
                                        title={item.nome}
                                        subtitle={item.preco}
                                    />
                                    <Card.Content>
                                        <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                                            {item.categoria.nome}
                                        </Text>
                                        <Paragraph style={{ marginBottom: 10 }}>
                                            {item.descricao}
                                        </Paragraph>
                                    </Card.Content>
                                    <Card.Cover
                                        source={{ uri: services.getApiUrl() + item.foto }}
                                    />
                                    <Card.Actions>
                                        <Button style={{ fontWeight: 'bold' }}
                                            mode="outlined"
                                            icon="cart-outline"
                                            onPress={() => self.props.adicionarItem(item)}
                                        >
                                            Adicionar ao pedido
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            )

                        }
                    )
                }

            </View>
        )
    }
}

//função para ler os dados da STORE..
const mapStateToProps = (state) => {
    return {
        //ler o valor total da cesta de compras
        //para ler um valor do state, precisamos saber o nome do reducer
        //onde esta gravado a informação desejada, o nome do reducer é
        //o mesmo definido no index.js no objeto combineReducers (shoopingCart)
        valorTotal: state.shoopingCart.valorTotal
    }
}

//função para disparar ACTIONS para o REDUX
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        //Ações que o componente dispara
        adicionarItem //método da ação
    }, dispatch)
)

//conectando o componente ao REDUX e registrando as funções
//de disparo de ações e de leitura da store..
export default connect(mapStateToProps, mapDispatchToProps)(Products);


