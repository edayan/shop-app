import React, { useCallback, useEffect, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/products'
const EditProductsScreen = (props) => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [allValues, setAllValues] = useState({
        title: editedProduct ? editedProduct.title : '',
        imageUrl: editedProduct ? editedProduct.imageUrl : '',
        price: '',
        description: editedProduct ? editedProduct.description : '',
    });

    const [titleIsValid, setTitleIsValid] = useState(false);

    const changeHandler = (name, text) => {
        setAllValues({ ...allValues, [name]: text });
    }

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (!titleIsValid) {
            Alert.alert('Wrong Input', 'Plese check this errors in the form', [
                { text: 'Okay' }
            ])
            return;
        }
        if (editedProduct) {
            dispatch(productActions.updateProduct(
                prodId,
                allValues.title,
                allValues.description,
                allValues.imageUrl));
        } else {
            dispatch(productActions.createProduct(
                allValues.title,
                allValues.description,
                allValues.imageUrl,
                +allValues.price));
        }
        props.navigation.goBack();

    }, [allValues, prodId, dispatch]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])

    titleChangeHandler = (title) => {
        if (text.length === 0 || text.trim.length === 0) {
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
        if (titleIsValid) {
            changeHandler('title', title)
        }
    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={allValues.title}
                        onChangeText={titleChangeHandler}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        autoCorrect
                        onEndEditing={() => { console.log('End editing') }}
                        onSubmitEditing={() => console.log('Submit editing')} />
                    {!titleIsValid && <Text>Please enter a valid title</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={allValues.imageUrl}
                        onChangeText={imageUrl => changeHandler('imageUrl', imageUrl)}
                        returnKeyType='done' />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        value={allValues.price}
                        onChangeText={price => changeHandler('price', price)}
                        keyboardType='decimal-pad' />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={allValues.description}
                        onChangeText={description => changeHandler('description', description)} />
                </View>
            </View>

        </ScrollView>

    )
}

EditProductsScreen.navigationOptions = (navdata) => {
    const submitFn = navdata.navigation.getParam('submit')
    return {
        headerTitle: navdata.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item
                title="Save"
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submitFn} />
        </HeaderButtons>
    }
}
export default EditProductsScreen

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})
