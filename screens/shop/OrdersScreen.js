import React from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';


const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders)
    return (
        <FlatList data={orders} keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>} />
    )
}

OrdersScreen.navigationOptions = navdata => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navdata.navigation.toggleDrawer()
                }} />
        </HeaderButtons>,
    }
}
export default OrdersScreen

const styles = StyleSheet.create({})
