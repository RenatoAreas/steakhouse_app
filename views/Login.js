import React from 'react';
import { ScrollView } from 'react-native';
import FormLogin from '../components/FormLogin';
import Header from '../components/Header';

class Login extends React.Component {

    render() {
        return (
            <ScrollView>
                <Header
                    navigation={this.props.navigation}
                />
                <FormLogin
                navigation={this.props.navigation}
                />
            </ScrollView>
        )
    }

}

export default Login;