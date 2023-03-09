import React, { Component } from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Header, Avatar, SearchBar } from 'react-native-elements';
import Colors from '../../../../assets/Themes/Colors';
import MTranslate from '../../../../Languages/multiLang';
import { AuthContext } from '../../../context/provide.context';

const { width } = Dimensions.get("screen");

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.updateSearch = this.updateSearch.bind(this);
    }
    static contextType = AuthContext;
    state = {
        search: "",
    }

    updateSearch = (search) => {
        this.setState({ search });
    };
    render() {
        return (
            <SafeAreaView>
                <Header
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: () => this.props.navigation.toggleDrawer(),
                    }}
                    rightComponent={
                        <View style={styles.headerRight}>
                            <SearchBar
                                placeholder="Search Products"
                                platform='ios'
                                onChangeText={this.updateSearch}
                                value={this.state.search}
                                containerStyle={styles.searchStyle}
                                inputContainerStyle={styles.searchInputStyle}
                                inputStyle={styles.searchTextStyle}
                                placeholderTextColor={"gray"}
                                cancelButtonProps={{color: "#000"}}
                                round
                                lightTheme
                            />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                                <Avatar
                                    size={30}
                                    rounded
                                    source={require("../../../../assets/images/logo.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                    centerComponent={{ text: MTranslate("main"), style: styles.heading }}
                    placement={"left"}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PrimaryColor,
        marginBottom: 20,
        width: width,
        paddingVertical: 15,
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchIconStyle: {
        marginHorizontal: 10,
    },
    searchStyle: {
        width: width / 2,
        justifyContent: 'center',
        backgroundColor: 'transperant',
        height: 30,
    },
    searchInputStyle: {
        height: 30,
    },
    searchTextStyle: {
        color: 'gray',
    },
});

export default AppHeader;