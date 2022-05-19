import React from 'react';
import {View, Text, StyleSheet, LogBox, TouchableHighlight} from 'react-native';

import {Calendar} from 'react-native-calendars';

LogBox.ignoreLogs(['ViewPropTypes will be removed']);

const MyCalendar = ({navigation}) => {
  // при необходимости можно использовать LocaleConfig из react-native-calendars
  // это позволит создавать локализацию для определенных языков
  // но в данном случае будет достаточно массива с английскими вариантами

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const onDayPressHandler = e => {
    navigation.navigate('Series', {
      date: e.date.dateString,
      label: e.accessibilityLabel,
    });
  };

  const pressProps = {
    activeOpacity: 1,
    underlayColor: '#f1f1f1',
  };

  return (
    <View style={styles.calendar_container}>
      <Calendar
        firstDay={1}
        hideDayNames={true}
        dayComponent={e => {
          let DayTextComponent;
          if (e.state === 'disabled') {
            DayTextComponent = (
              <Text style={[styles.dayText, styles.dayTextInactive]}>
                {e.date.day}
              </Text>
            );
          } else if (e.state === 'today') {
            return (
              <TouchableHighlight
                {...pressProps}
                onPress={() => onDayPressHandler(e)}
                style={[
                  styles.dayContainer,
                  {borderColor: 'red', borderWidth: 2},
                ]}>
                <Text style={styles.todayText}> {e.date.day} </Text>
              </TouchableHighlight>
            );
          } else {
            DayTextComponent = (
              <Text style={styles.dayText}> {e.date.day} </Text>
            );
          }

          return (
            <TouchableHighlight
              onPress={() => onDayPressHandler(e)}
              style={styles.dayContainer}
              {...pressProps}>
              {DayTextComponent}
            </TouchableHighlight>
          );
        }}
        theme={{
          weekVerticalMargin: 0,
          calendarBackground: 'white',
          arrowColor: '#8c939a',
          'stylesheet.calendar.header': {
            week: {
              flex: 1,
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          },
        }}
        style={styles.header}
        renderHeader={date => {
          return (
            <Text style={styles.headerTitle}>
              {monthNames[date.getMonth()]}
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar_container: {
    flex: 3.3,
    backgroundColor: 'white',
  },
  dayTextInactive: {
    color: '#cccfd3',
  },
  dayText: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    color: '#000000',
    fontSize: 16,
  },
  todayText: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    color: '#4d5155',
    fontSize: 16,
  },
  dayContainer: {
    width: '100%',
    height: 50,
    borderColor: '#d0d4d9',
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#f1f1f1',
    paddingLeft: 0,
    paddingRight: 0,
  },
  headerTitle: {
    color: '#333333',
    fontFamily: 'OpenSans-Semibold',
    fontSize: 16,
  },
});

export default MyCalendar;
