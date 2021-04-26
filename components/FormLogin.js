import React from 'react';
import { Alert, View, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import * as services from '../services/apiServices';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Autenticar } from '../actions/clienteActions';

class FormLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '', senha: '',
            erros: {
                email: [], senha: []
            }
        }
    }

    componentDidMount() {
        if(this.props.accessToken != '')
            this.props.navigation.navigate('checkout');
    }

    autenticarCliente() {

        //limpar as mensagens de erro de validação..
        this.setState({
            erros: {
                email: [], senha: []
            }
        })

        //chamada para a API..
        services.postLogin(this.state)
            .then(
                data => {
                    
                    var dados = {
                        accessToken : data.accessToken,
                        dataExpiracao : data.dataExpiracao,
                        cliente : data.cliente
                    };

                    //disparando a ACTION de autenticação (REDUX)
                    this.props.Autenticar(dados);

                    //redirecionar para a página de pagamento..
                    this.props.navigation.navigate('checkout');
                }
            )
            .catch(
                e => {
                    var error = e.response;

                    switch(error.status){
                        case 400:

                            var val = error.data.errors;

                            this.setState({
                                erros: {
                                    email : val.Email !== undefined ? val.Email : [],
                                    senha : val.Senha !== undefined ? val.Senha : []
                                }
                            })

                            break;

                        case 500:
                            Alert.alert(error.data.message);
                            this.setState({ senha : '' });
                            break;
                    }
                }
            )
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <Card>
                    <Card.Title
                        title="Acessar Conta de Cliente"
                        subtitle="Preencha os campos para acessar sua conta."
                    />
                    <Card.Content>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="Email de Acesso:"
                                keyboardType="email-address"
                                autoCompleteType="email"
                                mode="outlined"
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />
                            {
                                this.state.erros.email.map(
                                    (item, i) => (
                                        <Text key={i} style={{ color: '#d9534f' }}>
                                            {item}
                                        </Text>
                                    )
                                )
                            }
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="Senha de Acesso:"
                                keyboardType="default"
                                secureTextEntry={true}
                                mode="outlined"
                                onChangeText={(senha) => this.setState({ senha })}
                                value={this.state.senha}
                            />
                            {
                                this.state.erros.senha.map(
                                    (item, i) => (
                                        <Text key={i} style={{ color: '#d9534f' }}>
                                            {item}
                                        </Text>
                                    )
                                )
                            }
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Button mode="contained" icon="check-circle"
                                onPress={() => this.autenticarCliente()}>
                                Acessar Conta
                            </Button>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Button mode="outlined" icon="account-circle"
                                onPress={() => this.props.navigation.navigate('register')}>
                                Criar Conta de Cliente
                            </Button>
                        </View>

                    </Card.Content>
                </Card>
            </View>
        )
    }
}

//função para ler as informações da store
const mapStateToProps = (state) => {
    return {
        accessToken : state.cliente.accessToken
    }
}

//função que irá permitir ao componente disparar ações (dispatch)
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        Autenticar //função da ação
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);


