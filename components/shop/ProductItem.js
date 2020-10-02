import React from 'react';
import { Button, Image, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/Colors'
import { hidden } from 'ansi-colors';
const ProductItem = (props) => {

    let TouchableComponenet = (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponenet onPress={props.onViewDetail}
                    useForeground //for ripple effect to put over all including image
                >
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>

                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>$: {props.price.toFixed(2)}</Text>

                        </View>
                        <View style={styles.actions}>
                            <Button color={Colors.primary} title="View details" onPress={props.onViewDetail} />
                            <Button color={Colors.primary} title="Add to cart" onPress={props.onAddToCart} />
                        </View>
                    </View>


                </TouchableComponenet>
            </View>

        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5, // for android 
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,

    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,// have rounder corner on image like card
        borderTopRightRadius: 10,// have rounder corner on image like card
        overflow: 'hidden'// have rounder corner on image like card
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})
