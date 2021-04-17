import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import Products from '../components/Products';

class Home extends React.Component {

    render() {
        return(
            <ScrollView>
                <Header
                    navigation={this.props.navigation}
                />
                <Products
                    navigation={this.props.navigation}
                />
            </ScrollView>
        )
    }

}

export default Home;


