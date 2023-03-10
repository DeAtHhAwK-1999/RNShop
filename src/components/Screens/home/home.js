import React, {useContext, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Linking,
  Dimensions,
  Modal,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Avatar, Image, Icon} from 'react-native-elements';
import MTranslate from '../../../../Languages/multiLang';
import {AuthContext} from '../../../context/provide.context';
import {getData} from '../../../services/helper';
import AppHeader from '../../global/header/header';

const {width, height} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const {setData, data} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getData(setData);
  }, []);
  setTimeout(() => {
    setLoading(false);
  }, 4000);

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" animating={loading} color="red" />
        </View>
      ) : (
        <View style={styles.homeContainer}>
          <TouchableOpacity>
            <Avatar size={100} rounded source={{uri: data?.sellerProfileUrl}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sellerNameStyle}>{data?.sellerName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.phoneNumberContainer}
            onPress={() => Linking.openURL(`tel:${data?.sellerPhonenumber}`)}>
            <Text style={styles.numberStyle}>{data?.sellerPhonenumber}</Text>
            <Icon size={25} name="phone" />
          </TouchableOpacity>
          <FlatList
            data={data?.media}
            style={styles.list}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Image
                key={index}
                source={{uri: item.imageUrl}}
                containerStyle={styles.item}
                PlaceholderContent={<ActivityIndicator />}
                onPress={() => {
                  setModalVisible(true);
                  setIndex(index);
                }}
              />
            )}
          />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <ImageBackground
            style={styles.modalView}
            resizeMode={'stretch'}
            source={{uri: data?.media[index]?.imageUrl}}></ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  sellerNameStyle: {
    color: '#000',
    fontSize: 50,
  },
  phoneNumberContainer: {
    marginVertical: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    backgroundColor: 'green',
    alignItems: 'center',
    width: width / 2,
    height: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  numberStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000b8',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: width - 20,
    height: height / 2,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageModalStyle: {
    width: width - 20,
    height: height - 100,
  },
});

export default Home;
