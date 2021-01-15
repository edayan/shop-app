import React, { useReducer, useCallback } from 'react'
import { StyleSheet, Button, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors'
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';


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


const AuthScreen = (props) => {

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidites: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState]);

    const dispatch = useDispatch();

    const signupHandler = () => {
        dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password))
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen} >
            <LinearGradient colors={['#ffedff', '#ff3dff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input id="email"
                            label="E-mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            initialValue=""
                            onInputChange={inputChangeHandler}//using .bind(this), triggers unlimited rendering
                        />

                        <Input id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password"
                            initialValue=""
                            onInputChange={inputChangeHandler} //using .bind(this), triggers unlimited rendering
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Login"
                                color={Colors.primary}
                                onPress={signupHandler} />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Switch to signup"
                                color={Colors.accent}
                                onPress={() => { }} />
                        </View>

                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView >
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}
export default AuthScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
})
