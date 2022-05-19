import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const bg = require('../assets/images/bg.png');
const logo = require('../assets/images/logo.png');
const back = require('../assets/images/back.png');

const Header = ({navigation}) => {
  return (
    <View style={styles.header_container}>
      <ImageBackground
        source={bg}
        resizeMode="cover"
        style={styles.image_container}>
        {navigation.canGoBack() ? (
          <View style={styles.back_container}>
            <TouchableOpacity
              style={styles.touchable_container}
              onPress={() => navigation.navigate('Main')}>
              <Image style={styles.back} source={back} />
            </TouchableOpacity>
            <View style={styles.empty_back_container} />
          </View>
        ) : (
          <View style={styles.back_container} />
        )}
        <Image style={styles.logo} source={logo} />

        <View style={styles.back_container} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    flex: 1,
    maxHeight: '15%',
  },
  image_container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  touchable_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_back_container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
  },
  back: {
    resizeMode: 'contain',
    width: '22%',
  },
});

export default Header;
