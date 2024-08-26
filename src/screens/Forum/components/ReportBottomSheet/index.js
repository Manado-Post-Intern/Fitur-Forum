/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IcOption, IcClose} from '../../assets';

const ReportBottomSheet = ({onClose}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.laporkan}>Laporkan</Text>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <IcClose />
      </TouchableOpacity>
      <View style={styles.line} />
      <Text style={styles.title}>Mengapa anda melaporkan postingan ini?</Text>
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
  );
};

export default ReportBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 5,
  },
  laporkan: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 40,
  },
  close: {
    alignItems: 'flex-end',
    paddingRight: 15,
    marginTop: -63,
    marginBottom: 20,
  },
  line: {
    width: '200%',
    height: 1,
    marginLeft: -20,
    backgroundColor: '#ADA5A5',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginLeft: 22,
    paddingVertical: 15,
  },
  option: {
    fontSize: 15,
    fontWeight: '500',
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
