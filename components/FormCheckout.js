import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Card, Title, Paragraph, TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatCurrency } from '../helpers/formatCurrency';
import * as apiServices from '../services/apiServices';
import * as cepServices from '../services/cepServices';
import { clear } from '../actions/shoppingCartActions';

class FormCheckout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pedidoFinalizado: false,
            codigoPedido: '',
            mensagemPedido: '',
            possuiEndereco: false,
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: ''
        }

        //registrando a função no construtor do componente (bind)
        this.finalizarPedido = this.finalizarPedido.bind(this);
    }

    finalizarPedido(){

        //dados que serão enviados para a API..
        var pedido = {
            logradouro: this.state.logradouro,
            complemento: this.state.complemento,
            numero: this.state.numero,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            estado: this.state.estado,
            cep: this.state.cep,
            itensPedido : []
        }

        this.props.cestaDeCompras.map(
            function(item, i){
                pedido.itensPedido.push({
                    idItem : item.id,
                    quantidade: item.quantidade
                })
            }
        )

        apiServices.postPedido(pedido, this.props.accessToken)
            .then(
                data => {
                    Alert.alert('Pedido finalizado com sucesso!');
                    this.props.clear();

                    this.props.navigation.navigate('home');
                }
            )
            .catch(
                e => {
                    Alert.alert('Erro ao finalizar pedido!')
                }
            )
    }

    obterEndereco() {
        //pesquisa do endereço baseado no cep..
        cepServices.getEndereco(this.state.cep)
            .then(
                data => {
                    this.setState({
                        logradouro: data.logradouro,
                        complemento: data.complemento,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                        possuiEndereco: true
                    })
                }
            )
            .catch(
                e => {
                    this.setState({
                        possuiEndereco: false
                    })
                }
            )
    }

    render() {

        var self = this;

        return (
            <View>
                <Card>
                    <Card.Title
                        title="Finalizar Pedido"
                        subtitle="Confirme os dados para realizar o pedido"
                    />
                    <Card.Content>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Dados do Cliente
                        </Text>

                        <Text>{self.props.cliente.nome}</Text>
                        <Text>{self.props.cliente.email}</Text>
                        <Text>{self.props.cliente.telefone}</Text>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>
                            Itens do Pedido
                        </Text>

                        {
                            self.props.cestaDeCompras.map(
                                function (item, i) {
                                    return (
                                        <View key={i} style={{ marginTop: 10 }}>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                {item.nome}
                                            </Text>
                                            <Text>Preço (unidade): {item.preco}</Text>
                                            <Text>Quantidade: {item.quantidade}</Text>
                                        </View>
                                    )
                                }
                            )
                        }

                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Title>Valor total: {formatCurrency(self.props.valorTotal)}</Title>
                            <Paragraph>Quantidade de itens: {self.props.quantidadeItens}</Paragraph>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="Informe o CEP de entrega:"
                                keyboardType="number-pad"
                                mode="outlined"
                                onChangeText={(cep) => this.setState({ cep })}
                                value={this.state.cep}
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Button mode="contained" icon="check"
                                onPress={() => self.obterEndereco()}>
                                Obter Endereço de Entrega
                            </Button>
                        </View>

                        {
                            self.state.possuiEndereco ? (
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        Endereço de Entrega:
                                    </Text>

                                    <Text>{self.state.logradouro}, {self.state.bairro}</Text>
                                    <Text>{self.state.cidade} - {self.state.estado}</Text>
                                    <Text>CEP: {self.state.cep}</Text>

                                    <View style={{ marginTop: 20 }}>
                                        <TextInput
                                            label="Informe o Número:"
                                            keyboardType="number-pad"
                                            mode="outlined"
                                            onChangeText={(numero) => this.setState({ numero })}
                                            value={this.state.numero}
                                        />
                                    </View>

                                    <View style={{ marginTop: 20 }}>
                                        <TextInput
                                            label="Informe o Complemento:"
                                            mode="outlined"
                                            onChangeText={(complemento) => this.setState({ complemento })}
                                            value={this.state.complemento}
                                        />
                                    </View>

                                    <View style={{ marginTop: 20, marginBottom: 60 }}>
                                        <Button mode="contained" icon="check"
                                            onPress={() => self.finalizarPedido()}>
                                            Finalizar Pedido
                                        </Button>
                                    </View>

                                </View>
                            ) : (
                                <View></View>
                            )
                        }

                    </Card.Content>
                </Card>
            </View>
        )
    }
}

//função utilizada para ler informações do state
const mapStateToProps = (state) => {
    return {

        //ler informações armazenadas no STATE da aplicação..

        //clienteReducer.js
        accessToken: state.cliente.accessToken,
        dataExpiracao: state.cliente.dataExpiracao,
        cliente: state.cliente.cliente,

        //shoppingCartReducer.js
        cestaDeCompras: state.shoopingCart.cestaDeCompras,
        valorTotal: state.shoopingCart.valorTotal,
        quantidadeItens: state.shoopingCart.quantidadeItens
    }
}

//função para disparar ações neste componente
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        clear
    }, dispatch)
)

//conectando o componente ao REDUX
export default connect(mapStateToProps, mapDispatchToProps)(FormCheckout);
