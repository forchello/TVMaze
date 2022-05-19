import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

// for better scaling
import {RFValue} from 'react-native-responsive-fontsize';

import Header from './Header';

const error_image = require('../assets/images/medium_image_error.png');
const unfold_image = require('../assets/images/unfold.png');

const Series = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullImageURI, setFullImageURI] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);

  const [showButtonMore, setShowButtonMore] = useState(1);

  const dateLabelArray = route.params.label.split(' ');

  const dateLabel = `${dateLabelArray[2]} ${dateLabelArray[3]} ${dateLabelArray[4]}`;

  const previewCount = 3;
  const maximumCount = -1;

  const getMoviesFromApi = async limit => {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/schedule/?date=${route.params.date}&country=US`,
      );

      const responce_data = await response.json();
      setDataLength(responce_data.length);

      let count;

      if (limit === maximumCount) {
        count = responce_data.length;
      } else if (responce_data.length <= previewCount) {
        count = previewCount;
        setShowButtonMore(0);
      }

      setData(responce_data.slice(0, count));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMoviesFromApi(previewCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.main}>
      <Modal
        style={styles.content_container}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.content_container}>
          <Image
            style={styles.modal_window_container}
            source={
              fullImageURI === null
                ? error_image
                : {
                    uri: fullImageURI.original,
                  }
            }
            resizeMode="contain"
          />
        </View>
      </Modal>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header navigation={navigation} />
      <View style={styles.date_container}>
        <Text style={styles.date_label}> {dateLabel}</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.content_container}>
        {isLoading ? (
          <View style={styles.activity_indicator_container}>
            <ActivityIndicator size="large" color="#e10246" />
          </View>
        ) : (
          <View>
            <FlatList
              data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <View style={styles.item_container}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setFullImageURI(item.show.image);
                      setModalVisible(!modalVisible);
                    }}>
                    <Image
                      style={styles.filmLogo}
                      source={
                        item.image === null && item.show.image === null
                          ? error_image
                          : {
                              uri: item.show.image.medium,
                            }
                      }
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View style={styles.text_container}>
                    <Text style={styles.film_name}>{item.show.name}</Text>
                    <Text style={styles.film_release_year}>
                      {item.show.premiered.split('-')[0]}{' '}
                    </Text>
                    <View style={styles.current_season_container}>
                      <View style={styles.current_season_half}>
                        <Text style={styles.current_season_text}>
                          Season: {item.season}
                        </Text>
                      </View>
                      <View style={styles.current_season_half}>
                        <Text style={styles.current_season_text}>
                          {'\t'}Episode: {item.number}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              ListFooterComponent={() => {
                if (showButtonMore === 1) {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.unfold_container}
                      onPress={() => {
                        setShowButtonMore(2);
                        getMoviesFromApi(maximumCount);
                      }}>
                      <Text style={styles.unfold_text}>
                        More {dataLength - previewCount}
                      </Text>
                      <Image
                        style={[
                          styles.unfold_ico,
                          {transform: [{rotateX: '180deg'}]},
                        ]}
                        source={unfold_image}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                } else if (showButtonMore === 2) {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.unfold_container}
                      onPress={() => {
                        setShowButtonMore(1);
                        getMoviesFromApi(previewCount);
                      }}>
                      <Text style={styles.unfold_text}>Show main</Text>
                      <Image
                        style={styles.unfold_ico}
                        source={unfold_image}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                } else {
                  return <></>;
                }
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  content_container: {
    flex: 1,
  },
  modal_window_container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  activity_indicator_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date_container: {
    marginTop: 15,
  },
  date_label: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Semibold',
    color: '#4d5155',
    fontSize: RFValue(20, Dimensions.get('screen').height),
  },
  line: {
    marginTop: 15,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
  },
  item_container: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  filmLogo: {
    height: 130,
    width: 91,
    borderRadius: 10,
  },
  text_container: {
    marginLeft: 20,
    flexDirection: 'column',
    flex: 1,
  },
  film_name: {
    width: '100%',
    fontFamily: 'OpenSans-Regular',
    color: '#333333',
    fontSize: 16,
    lineHeight: 20,
  },
  film_release_year: {
    fontFamily: 'OpenSans-Semibold',
    color: '#b4b4b4',
    fontSize: 14,
  },
  current_season_container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'space-around',
    padding: RFValue(18, Dimensions.get('screen').height),
    position: 'absolute',
    bottom: 0,
  },
  current_season_half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  current_season_text: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Semibold',
    color: '#999999',
    fontSize: RFValue(17, Dimensions.get('screen').height),
  },
  unfold_container: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#d6d6d6',
    borderWidth: 2,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfold_text: {
    margin: 15,
    fontFamily: 'OpenSans-Regular',
    color: '#999999',
    fontSize: 16,
  },
  unfold_ico: {
    flex: 3,
    aspectRatio: 1.8,
    resizeMode: 'contain',
    maxWidth: 16,
  },
});

export default Series;
