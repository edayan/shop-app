import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, View, Text, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';


const ProductOverviewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemViewHandler = (itemData) => {
        props.navigation.navigate('ProductDetail', {
            productId: itemData.item.id,
            productTitle: itemData.item.title
        })
    }

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productActions.fetchProducts());
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(err);
            setError(err.message)
        }
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    if (isLoading) {
        return <View style={styles.fullCenter}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={styles.fullCenter}>
            <Text>No products found</Text>
        </View>
    }

    if (error) {
        return <View style={styles.fullCenter}>
            <Text>Error occurred</Text>
            <Button title="try again" onPress={loadProducts} color={Colors.primary} />
        </View>
    }
    return (
        <FlatList data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => selectItemViewHandler(itemData)}
                ><Button color={Colors.primary} title="View details" onPress={() => selectItemViewHandler(itemData)} />
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
    fullCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
