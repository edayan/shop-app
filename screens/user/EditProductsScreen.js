import React, { useCallback, useEffect, useReducer } from 'react'
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/products'
import Input from '../../components/UI/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, actions) => {
    if (actions.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidities = {
            ...state.inputValidites,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputValidites: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state;
}

const EditProductsScreen = (props) => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : '',
        },
        inputValidites: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
        },
        formIsValid: false
    });

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Input', 'Plese check this errors in the form', [
                { text: 'Okay' }
            ])
            return;
        }
        if (editedProduct) {
            dispatch(productActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl));
        } else {
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price));
        }
        props.navigation.goBack();

    }, [formState, prodId, dispatch]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])

    textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.length > 0 && text.trim.length > 0) {
            isValid = true;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid,
            input: inputIdentifier
        })
    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    label={"title"}
                    errorText={"Please enter a valid title"}
                    keyboardType='default'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    autoCorrect
                />
                <Input
                    label={"Image URL"}
                    errorText={"Please enter a valid Image URL"}
                    keyboardType='default'
                    returnKeyType='done'
                />

                {editedProduct ? null :
                    <Input
                        label={"Price"}
                        errorText={"Please enter a valid price"}
                        keyboardType='decimal-pad'
                        autoCorrect
                    />}
                <Input
                    label={"description"}
                    errorText={"Please enter a valid description"}
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    multiline
                    numberOfLines={3}
                />
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

})
