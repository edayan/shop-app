import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Alert, Platform, ScrollView, StyleSheet, View, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input'
import * as productActions from '../../store/actions/products'
import Colors from '../../constants/Colors'
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();


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
        formIsValid: editedProduct ? true : false
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('an error occured', error,
                [{ text: 'Okay' }])
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Input', 'Plese check this errors in the form', [
                { text: 'Okay' }
            ])
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            if (editedProduct) {
                await dispatch(productActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl));
            } else {
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price));
            }
            props.navigation.goBack();
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);
    }, [formState, prodId, dispatch]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])

    inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState]);

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}//mandatory, otherwise will not work
            behavior='height' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label={"title"}
                        errorText={"Please enter a valid title"}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        autoCorrect
                        onInputChange={inputChangeHandler} //using .bind(this), triggers unlimited rendering
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label={"Image URL"}
                        errorText={"Please enter a valid Image URL"}
                        keyboardType='default'
                        returnKeyType='done'
                        onInputChange={inputChangeHandler}//using .bind(this), triggers unlimited rendering
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />

                    {editedProduct ? null :
                        <Input
                            id='price'
                            label={"Price"}
                            errorText={"Please enter a valid price"}
                            keyboardType='decimal-pad'
                            autoCorrect
                            onInputChange={inputChangeHandler}//using .bind(this), triggers unlimited rendering
                            required
                            min={0.1}
                        />}
                    <Input
                        id='description'
                        label={"description"}
                        errorText={"Please enter a valid description"}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}//using .bind(this), triggers unlimited rendering
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>


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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
