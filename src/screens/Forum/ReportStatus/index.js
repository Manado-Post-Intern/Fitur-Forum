/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {React, useState, useEffect, useRef} from 'react';
import {useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import Card from '../components/Card';
import {Gap} from '../../../components';
import Footer from '../components/Footer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {IcClose, IcOption} from '../assets';

const ReportStatus = ({navigation}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['90%'], []);

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
        <Card />
        <BottomSheet
          ref={bottomSheetRef} // Attach ref to BottomSheet
          index={0} // Start with the sheet opened to 90% of the screen height
          snapPoints={snapPoints} // Define snap points
          enablePanDownToClose={true}>
          <View>
            <Text style={styles.laporkan}>Laporkan</Text>
            <TouchableOpacity style={styles.close}>
              <IcClose />
            </TouchableOpacity>
            <View style={styles.line} />
            <Text style={styles.title}>
              Mengapa anda melaporkan postingan ini?
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.option}>Berita palsu</Text>
              <View style={styles.click}>
                <IcOption />
              </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.option}>Perundungan atau pelecehan</Text>
              <View style={styles.click}>
                <IcOption />
              </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.option}>Pelanggaran privasi</Text>
              <View style={styles.click}>
                <IcOption />
              </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.option}>Spam</Text>
              <View style={styles.click}>
                <IcOption />
              </View>
            </TouchableOpacity>

            <View style={styles.line} />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.option}>Lainnya</Text>
              <View style={styles.click}>
                <IcOption />
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default ReportStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0DBF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    height: 40,
    backgroundColor: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
  },
  laporkan: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
  },
  close: {
    alignItems: 'flex-end',
    paddingRight: 25,
    marginTop: -48,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ADA5A5',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    marginLeft: 22,
    paddingVertical: 20,
  },
  option: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 22,
    color: 'black',
  },
  button: {
    marginVertical: 20,
  },
  click: {
    alignItems: 'flex-end',
    marginTop: -18,
    marginRight: 25,
  },
});
