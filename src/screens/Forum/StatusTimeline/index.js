/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import {React, useState, useEffect, useRef, useMemo} from 'react';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import Card from '../components/Card';
import {Gap} from '../../../components';
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {IcPencil} from '../assets';
import ReportBottomSheet from '../components/ReportBottomSheet'; // Import ReportBottomSheet
import BottomSheet from '@gorhom/bottom-sheet';

const StatusTimeline = ({navigation}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postedId, setPostedId] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const openBottomSheet = id => {
    // Step 2: Modify the function to accept an id
    setPostedId(id); // Store the id
    setBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  };

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    // Tidak perlu reset AsyncStorage di sini
  }, [refreshKey]);

  return (
    <GestureHandlerRootView>
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
          <Card onReportPress={openBottomSheet} />
          <Gap height={120} />
        </ScrollView>
        {isBottomSheetVisible && (
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={() => setBottomSheetVisible(false)}>
            <ReportBottomSheet onClose={closeBottomSheet} postedId={postedId} />
          </BottomSheet>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default StatusTimeline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#E7F0F5',
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
