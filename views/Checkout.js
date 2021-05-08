import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import FormCheckout from '../components/FormCheckout';

class Checkout extends React.Component {

    render() {
        return (
            <ScrollView>
                <Header
                    navigation={this.props.navigation}
                />
                <FormCheckout
                    navigation={this.props.navigation}
                />
            </ScrollView>
        )
    }

}

export default Checkout;