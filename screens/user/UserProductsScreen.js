import React from 'react'
import { Button, FlatList, Platform, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'


const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();


    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { }}
                >
                    <Button color={Colors.primary} title="Edit" onPress={() => { }} />
                    <Button color={Colors.primary} title="Delete" onPress={() => { }} />
                </ProductItem>}
        />
    )
}

export default UserProductsScreen

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'My Products',
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
const styles = StyleSheet.create({})
