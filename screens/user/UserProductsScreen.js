import React from 'react'
import { Button, FlatList, Platform, StyleSheet, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = productId => {
        props.navigation.navigate('EditProduct', { productId })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure', 'Do you really want to delete', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productActions.deleteProduct(id))
                }
            }
        ]);
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { editProductHandler(itemData.item.id) }}
                >
                    <Button color={Colors.primary} title="Edit" onPress={() => { editProductHandler(itemData.item.id) }} />
                    <Button color={Colors.primary} title="Delete" onPress={() => deleteHandler(itemData.item.id)} />
                </ProductItem>}
        />
    )
}

export default UserProductsScreen

UserProductsScreen.navigationOptions = navdata => {
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
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item
                title="Add"
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navdata.navigation.navigate('EditProduct')
                }} />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({})
