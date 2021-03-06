import React, {
    Component
} from 'react';
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import FirstPage from './TopTv';
import SecondPage from './SecondPage';
import UserDetailsPage from './UserDetailsPage';
import ActorProfile from './ActorProfile';


const App = createStackNavigator({
    FirstPage: {
      screen: FirstPage
    },
    SecondPage: {
        screen: SecondPage
    },
    UserDetailsPage:{
        screen:UserDetailsPage
    }, ActorProfile: {
        screen: ActorProfile
    }
}, {
    initialRouteName: 'FirstPage',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:'#1E1C1C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
});

const RenderStack = createAppContainer(App);

class StackNavigation extends Component {
    state = {  }
    render() { 
        return (
            <RenderStack  />
            );
    }
}
 
export default StackNavigation;