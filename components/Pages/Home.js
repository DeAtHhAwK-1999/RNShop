import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false)
    }, 4000);
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
                    </View>
            }
        </View>
    );
};

export default Home;