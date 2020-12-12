import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders'
import Card from '../../components/UI/Card'

const CartScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {

        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                quantity: state.cart.items[key].quantity,
                productPrice: state.cart.items[key].productPrice,
                productTitle: state.cart.items[key].productTitle,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId);
    });

    const dispatch = useDispatch();

    const addOrder = async () => {
        try {
            setIsLoading(true);
            await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };
    const removeOrder = async () => {
        try {
            setIsLoading(true);
            await dispatch(cartActions.removeFromCart(itemData.item.productId))
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);

    };

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ?
                    <ActivityIndicator size="small" color={Colors.primary} /> :
                    <Button color={Colors.accent}
                        title="Order now"
                        disabled={cartItems.length === 0}
                        onPress={addOrder} />}

            </Card>
            <FlatList data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (<CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deletable
                    onRemove={removeOrder}
                />)
                } />
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}
export default CartScreen

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    },
})
