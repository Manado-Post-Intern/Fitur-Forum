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
import {useNavigation} from '@react-navigation/native';

const StatusTimeline = ({navigation}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    // Tidak perlu reset AsyncStorage di sini
  }, [refreshKey]);

  return (
    <View style={styles.container} key={refreshKey}>
      <Header onRefresh={handleRefresh} />
      <Gap height={10} />
      <TouchableOpacity
        style={styles.createStatusButton}
        onPress={() => navigation.navigate('CreateStatus')}>
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
