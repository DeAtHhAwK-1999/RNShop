import React, { useContext, useState } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import MTranslate from '../../Languages/multiLang';
import { AuthContext } from '../Navigation/AuthProvider';

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false)
    }, 4000);
    
    const {Lang} = useContext(AuthContext);

    return (
        <View>
            {
                loading
                    ?
                    <View>
                        <ActivityIndicator animating={loading} size={25} color="red" />
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={() => { navigation.push('Settings') }}>
                            <Text>Login Page</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.push('Profile') }}>
                            <Text>Profile Page</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.push('ChangeLanguage') }}>
                            <Text>Change Language Page</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
                            <Text>Change Language Page</Text>
                        </TouchableOpacity>
                        <Text>{MTranslate("password")}</Text>
                    </View>
            }
        </View>
    );
};

export default Home;