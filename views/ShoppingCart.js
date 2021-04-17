import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import ItemsShoppingCart from '../components/ItemsShoppingCart';

class ShoppingCart extends React.Component {

    render() {
        return (
            <ScrollView>
                <Header
                    navigation={this.props.navigation}
                />
                 <ItemsShoppingCart
                    navigation={this.props.navigation}
                />
            </ScrollView>
        )
    }

}

export default ShoppingCart;
