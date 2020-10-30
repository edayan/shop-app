import React from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';
const ProductOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemViewHandler = (itemData) => {
        props.navigation.navigate('ProductDetail', {
            productId: itemData.item.id,
            productTitle: itemData.item.title
        })
    }

    return (
        <FlatList data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={selectItemViewHandler}
                ><Button color={Colors.primary} title="View details" onPress={selectItemViewHandler} />
                    <Button color={Colors.primary} title="Add to cart" onPress={
                        () => { dispatch(cartActions.addToCart(itemData.item)); }} />
                </ProductItem>} />
    )
}

ProductOverviewScreen.navigationOptions = navdata => {
    return {
        headerTitle: 'All products',
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
                title="cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navdata.navigation.navigate('Cart')
                }} />
        </HeaderButtons>
    }
}

export default ProductOverviewScreen

const styles = StyleSheet.create({

})
