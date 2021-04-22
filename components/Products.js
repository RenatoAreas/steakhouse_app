import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import * as services from '../services/apiServices';
import { adicionarItem } from '../actions/shoppingCartActions'; 
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux'; 
import { formatCurrency } from '../helpers/formatCurrency';

class Products extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products_list: [],
            categorias_list: [],
            idCategoria: 0
        };
    }

    componentDidMount() {
        this.consultarCategorias();
        this.consultarProdutos();
    }

    consultarProdutos(idCategoria = 0){
    
        services.getProdutos(idCategoria)
            .then(
                data => {
                    this.setState({
                        products_list: data
                    });
                }
            )
            .catch(
                e => {
                    Alert.alert(e.response);
                }
            )
    }

    consultarCategorias(){

        services.getCategorias()
            .then(
                data => {
                    this.setState({
                        categorias_list: data
                    });
                }
            )
            .catch(
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

const mapStateToProps = (state) => {
    return {
        valorTotal: state.shoopingCart.valorTotal
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        adicionarItem 
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Products);