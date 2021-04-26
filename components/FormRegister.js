import React from 'react';
import { Alert, View, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import * as services from '../services/apiServices';

class FormRegister extends React.Component {

    constructor(props) {
        super(props);

        //criando o state..
        this.state = {
            nome: '', email: '', telefone: '', senha: '', senhaConfirmacao: '',
            erros: {
                nome: [], email: [], telefone: [], senha: [], senhaConfirmacao: []
            }
        }
    }

    //função para realizar o cadastro do cliente
    cadastrarCliente() {

        //limpar as mensagens de erro de validação..
        this.setState({
            erros: {
                nome: [], email: [], telefone: [], senha: [], senhaConfirmacao: []
            }
        })

        services.postCliente(this.state)
            .then(
                data => {
                    Alert.alert(data.message);

                    this.setState({
                        nome: '',
                        email: '',
                        telefone: '',
                        senha: '',
                        senhaConfirmacao: ''
                    });

                    this.props.navigation.navigate('login');
                }
            )
            .catch(
                e => {

                    //capturando o erro retornado pela API..
                    var error = e.response;

                    switch (error.status) {

                        case 400:

                            //capturar as mensagens de erro de validação
                            var val = error.data.errors;

                            //armazenar as mensagens de erro no state
                            this.setState({
                                erros: {
                                    nome: val.Nome !== undefined ? val.Nome : [],
                                    telefone: val.Telefone !== undefined ? val.Telefone : [],
                                    email: val.Email !== undefined ? val.Email : [],
                                    senha: val.Senha !== undefined ? val.Senha : [],
                                    senhaConfirmacao: val.SenhaConfirmacao !== undefined ? val.SenhaConfirmacao : [],
                                }
                            })

                            break;

                        case 500:
                            Alert.alert(error.data.message);
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
                        title="Cadastrar Conta de Cliente"
                        subtitle="Preencha os campos para cadastrar sua conta."
                    />
                    <Card.Content>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                label="Nome do Cliente:"
                                keyboardType="default"
                                autoCompleteType="name"
                                mode="outlined"
                                onChangeText={(nome) => this.setState({ nome })}
                                value={this.state.nome}
                            />
                            {
                                this.state.erros.nome.map(
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
                                label="Telefone do Cliente:"
                                keyboardType="phone-pad"
                                autoCompleteType="tel"
                                mode="outlined"
                                onChangeText={(telefone) => this.setState({ telefone })}
                                value={this.state.telefone}
                            />
                            {
                                this.state.erros.telefone.map(
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
                            <TextInput
                                label="Confirme sua Senha:"
                                keyboardType="default"
                                secureTextEntry={true}
                                mode="outlined"
                                onChangeText={(senhaConfirmacao) => this.setState({ senhaConfirmacao })}
                                value={this.state.senhaConfirmacao}
                            />
                            {
                                this.state.erros.senhaConfirmacao.map(
                                    (item, i) => (
                                        <Text key={i} style={{ color: '#d9534f' }}>
                                            {item}
                                        </Text>
                                    )
                                )
                            }
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Button mode="contained" icon="account-circle"
                                onPress={() => this.cadastrarCliente()}>
                                Realizar Cadastro
                            </Button>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Button mode="outlined" icon="check-circle"
                                onPress={() => this.props.navigation.navigate('login')}>
                                Voltar para autenticação
                            </Button>
                        </View>

                    </Card.Content>
                </Card>
            </View>
        )
    }

}

export default FormRegister;