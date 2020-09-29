import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import COLORS from '../constants/Colors'

const ProductsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? COLORS.primary : 'white'
        }, headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary
    }
});

export default createAppContainer(ProductsNavigator);