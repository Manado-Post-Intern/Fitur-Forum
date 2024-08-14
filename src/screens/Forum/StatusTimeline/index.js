/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import {React, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import Card from '../components/Card';
import {Gap} from '../../../components';
import Footer from '../components/Footer';

const StatusTimeline = () => {
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

  const cardData = [
    {id: '1', initialUpvotes: 2, initialDownvotes: 12, type: 'non-photo'},
    {id: '2', initialUpvotes: 211, initialDownvotes: 222},
    {id: '3', initialUpvotes: 2, initialDownvotes: 20},
    {id: '4', initialUpvotes: 2, initialDownvotes: 8},
  ];

  return (
    <View style={styles.container} key={refreshKey}>
      <Header onRefresh={handleRefresh} />
      <ScrollView style={styles.content}>
        {cardData.map(card => (
          <Card
            key={card.id}
            id={card.id}
            initialUpvotes={card.initialUpvotes}
            initialDownvotes={card.initialDownvotes}
            type={card.type}
          />
        ))}
        <Gap height={20} />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default StatusTimeline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#B0DBF3',
    paddingHorizontal: 5,
  },
});
