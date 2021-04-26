import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import FormRegister from '../components/FormRegister'

class Register extends React.Component {

    render() {
        return (
            <ScrollView>
                <Header
                    navigation={this.props.navigation}
                />
                <FormRegister
                    navigation={this.props.navigation}
                />
            </ScrollView>
        )
    }

}

export default Register;