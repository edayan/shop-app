import React from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'

const EditProductsScreen = () => {
    return (
        <ScrollView>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} />
            </View>
        </ScrollView>

    )
}

export default EditProductsScreen

const styles = StyleSheet.create({
    label: {},
    input: {}
})
