import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { adicionarItem, removerItem } from '../actions/shoppingCartActions';
import { formatCurrency } from '../helpers/formatCurrency';

class ItemsShoppingCart extends React.Component {

    render() {

        var self = this;

        return (
            <View>
                <Card>
                    <Card.Title
                        title="Cesta de Compras"
                        subtitle="Gerencie os itens do seu pedido"
                    />
                    <Card.Content>

                        {
                            self.props.cestaDeCompras.map(
                                function (item, i) {
                                    return (
                                        <View key={i}>
                                            <Card>
                                                <Card.Content>
                                                    <View>
                                                        <Text style={{
                                                            fontWeight: 'bold'
                                                        }}>
                                                            {item.nome}
                                                        </Text>
                                                        <Text>
                                                            Preço (unidade): {item.preco}
                                                        </Text>
                                                        <Text>
                                                            Quantidade: {item.quantidade}
                                                        </Text>
                                                    </View>
                                                </Card.Content>
                                                <Card.Actions>
                                                    <Button icon="plus" mode="text"
                                                        onPress={
                                                            () => self.props.adicionarItem(item)
                                                        }>
                                                        Adicionar
                                                    </Button>
                                                    <Button icon="minus" mode="text"
                                                        onPress={
                                                            () => self.props.removerItem(item)
                                                        }>
                                                        Remover
                                                    </Button>
                                                </Card.Actions>
                                            </Card>
                                        </View>
                                    )
                                }
                            )
                        }

                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Title>Valor total: {formatCurrency(self.props.valorTotal)}</Title>
                            <Paragraph>Quantidade de itens: {self.props.quantidadeItens}</Paragraph>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Button mode="contained" icon="cart-outline">
                                Finalizar Pedido
                            </Button>
                        </View>

                    </Card.Content>
                </Card>
            </View>
        )
    }
}

//função para ler o conteudo da store
const mapStateToProps = (state) => {
    return {
        //ler os valores do store (utilizo o nome do reducer)
        cestaDeCompras: state.shoopingCart.cestaDeCompras,
        valorTotal: state.shoopingCart.valorTotal,
        quantidadeItens: state.shoopingCart.quantidadeItens
    }
}

//função para disparar as actions
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        //definindo as actions que poderão ser disparadas pelo componente
        adicionarItem,
        removerItem
    }, dispatch)
)

//conectando o componente no REACT-REDUX
export default connect(mapStateToProps, mapDispatchToProps)(ItemsShoppingCart);


