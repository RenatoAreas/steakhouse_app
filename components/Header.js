import React from 'react';
import { Appbar } from 'react-native-paper';

class Header extends React.Component {

    render() {
        
        return (
            <Appbar.Header>
                <Appbar.Content 
                    title="Steakhouse"
                    subtitle="Bem vindo ao aplicativo"
                />
                <Appbar.Action
                    icon="home"
                    onPress={ () => this.props.navigation.navigate('home') }
                />          
                <Appbar.Action
                    icon="account-circle"
                    onPress={ () => this.props.navigation.navigate('login') }
                />         
                <Appbar.Action
                    icon="cart-outline"
                    onPress={ () => this.props.navigation.navigate('shoppingCart') }
                />
            </Appbar.Header>
        )
    }

}

export default Header;