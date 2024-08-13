/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Card from '../components/Card';
import {Gap} from '../../../components';

const StatusTimeline = () => {
  return (
    <View>
      <Header />
      <ScrollView style={styles.content}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Gap height={100} />
      </ScrollView>

      <Text>Status Timeline</Text>
    </View>
  );
};

export default StatusTimeline;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#B0DBF3',
    // height: '100%',
    // alignItems: 'center',
    paddingHorizontal: 5,
  },
});
