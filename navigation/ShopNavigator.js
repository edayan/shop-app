import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import COLORS from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductsScreen from '../screens/user/EditProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primary : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary
}
const ProductsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {// configured here for material drawer icon, so cons in drawer has to give in stack config
        drawerIcon: (drawerConfig) => <Ionicons name={Platform.OS === 'android' ? "md-cart" : "ios-cart "}
            size={23} color={drawerConfig.tintColor} />
    }
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {// configured here for material drawer icon, so cons in drawer has to give in stack config
        drawerIcon: (drawerConfig) => <Ionicons name={Platform.OS === 'android' ? "md-list" : "ios-list "}
            size={23} color={drawerConfig.tintColor} />
    }
});

const AdminNavigator = createStackNavigator({
    UserPrducts: UserProductsScreen,
    EditProduct: EditProductsScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {// configured here for material drawer icon, so cons in drawer has to give in stack config
        drawerIcon: (drawerConfig) => <Ionicons name={Platform.OS === 'android' ? "md-create" : "ios-create"}
            size={23} color={drawerConfig.tintColor} />
    }
});


const ShopNavigator = createDrawerNavigator({
    Products: { screen: ProductsNavigator },
    Orders: { screen: OrdersNavigator },
    Admin: { screen: AdminNavigator }
}, {
    contentOptions: {
        activeTintColor: COLORS.primary
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions,
})
const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);