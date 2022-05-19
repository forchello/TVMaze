import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';

import Header from './Header';
import Info from './Info';
import MyCalendar from './Calendar';

const Main = ({navigation}) => {
  return (
    <View style={styles.main}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header navigation={navigation} />
      <Info />
      <MyCalendar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  calendar: {
    flex: 4,
    backgroundColor: 'red',
  },
});

export default Main;
