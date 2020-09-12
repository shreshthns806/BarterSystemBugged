import { createStackNavigator } from 'react-navigation-stack';
import ExchangeItemScreen from '../screens/ExchangeItem';
import ItemDetailScreen from '../screens/ItemDetailScreen';

export const StackNavigator = createStackNavigator({
    ExchangeItemScreen : {
        screen : ExchangeItemScreen,
        navigationOptions : {
            headerShown : false,
        }
    },
    ItemDetailScreen : {
        screen : ItemDetailScreen,
        navigationOptions : {
            headerShown : false,
        }
    },
},
{
    initialRouteName : 'ExchangeItemScreen'
}
)