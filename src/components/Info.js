import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const image = require('../assets/images/tv_logo.png');

const Info = () => {
  return (
    <View style={styles.info_container}>
      <Image style={styles.tv_logo} source={image} />
      <View style={styles.text_container}>
        <Text style={styles.h1}>
          For a list of serials, please select{'\n'}
          required month and day.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info_container: {
    flex: 3,
    backgroundColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  tv_logo: {
    height: 120,
    width: 160,
  },
  text_container: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 14,
    lineHeight: 16,
    color: '#333333',
  },
});

export default Info;
