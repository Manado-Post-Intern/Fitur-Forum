/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import {React, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import Card from '../components/Card';
import {Gap} from '../../../components';
import Footer from '../components/Footer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IcPencil} from '../assets';

const StatusTimeline = ({navigation}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Fungsi untuk membersihkan dan mengatur ulang AsyncStorage
  const resetAsyncStorage = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');

      // Set initial values
      await AsyncStorage.setItem('isUpvoted', JSON.stringify(false));
      await AsyncStorage.setItem('isDownvoted', JSON.stringify(false));
      await AsyncStorage.setItem('upvotes', '2'); // Ubah sesuai nilai inisial
      await AsyncStorage.setItem('downvotes', '8'); // Ubah sesuai nilai inisial
      console.log('AsyncStorage reset with initial values');
    } catch (error) {
      console.error('Failed to clear and reset AsyncStorage:', error);
    }
  };

  // Efek untuk menjalankan resetAsyncStorage saat refreshKey berubah
  useEffect(() => {
    resetAsyncStorage();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // const cardData = [
  //   {id: '1', initialUpvotes: 2, initialDownvotes: 12, type: 'non-photo'},
  //   {id: '2', initialUpvotes: 211, initialDownvotes: 222},
  //   {id: '3', initialUpvotes: 2, initialDownvotes: 20},
  //   {id: '4', initialUpvotes: 2, initialDownvotes: 8},
  // ];

  return (
    <View style={styles.container} key={refreshKey}>
      <Header onRefresh={handleRefresh} />
      <Gap height={10} />
      <TouchableOpacity style={styles.createStatusButton}>
        <View style={styles.createStatusButton}>
          <Text style={styles.createStatusTextStyle}>Tulis Laporan Anda</Text>
          <IcPencil />
        </View>
      </TouchableOpacity>
      <Gap height={5} />
      <ScrollView style={styles.content}>
        <Card />
        <Gap height={90} />
      </ScrollView>
    </View>
  );
};

export default StatusTimeline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0DBF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#B0DBF3',
    // paddingHorizontal: 5,
  },
  createStatusButton: {
    flexDirection: 'row',
    width: 402,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00599B',
    borderRadius: 16,
  },
  createStatusTextStyle: {
    fontSize: 13,
    color: '#ffffff',
    marginRight: 8,
    fontWeight: 'semibold',
  },
});
