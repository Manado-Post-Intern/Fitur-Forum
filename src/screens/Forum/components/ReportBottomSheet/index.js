import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { IcOption, IcClose } from '../../assets';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Gap } from '../../../../components';

const ReportBottomSheet = ({ onClose }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState('main');
  const [selectedOption, setSelectedOption] = useState('');
  const translateX = useSharedValue(300);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setCurrentContent('detail');
    setIsDetailVisible(true);
    translateX.value = withTiming(0, { duration: 500 });
  };

  const handleBackPress = () => {
    translateX.value = withTiming(300, { duration: 500 }, () => {
      setIsDetailVisible(false);
      setCurrentContent('main');
      setSelectedOption('');
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Laporkan</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <IcClose />
      </TouchableOpacity>
      <View style={styles.separator} />

      {!isDetailVisible && (
        <>
          <Text style={styles.mainTitle}>Mengapa anda melaporkan postingan ini?</Text>

          <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress('Berita palsu')}>
            <Text style={styles.optionText}>Berita palsu</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress('Perundungan atau pelecehan')}>
            <Text style={styles.optionText}>Perundungan atau pelecehan</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress('Pelanggaran privasi')}>
            <Text style={styles.optionText}>Pelanggaran privasi</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress('Spam')}>
            <Text style={styles.optionText}>Spam</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress('Lainnya')}>
            <Text style={styles.optionText}>Lainnya</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>
        </>
      )}

      {isDetailVisible && (
        <Animated.View style={[styles.detailContainer, animatedStyle]}>

          <Text style={styles.detailTitle}>Anda akan mengirimkan laporan</Text>
          <Text style={styles.detailDescription}>
            Kami hanya akan menghapus postingan yang tidak sesuai dengan Standar Komunitas.
          </Text>

          <Gap height={10} />

          <Text style={styles.reportDetailTitle}>Rincian Laporan</Text>

          <View style={styles.selectedOptionContainer}>
            <Text style={styles.selectedOptionLabel}>Mengapa anda melaporkan postingan ini?</Text>
            <Text style={styles.selectedOption}>{selectedOption}</Text>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Berikan kami penjelasan..."
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Animated.View>
      )}
    </View>
  );
};

export default ReportBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ADA5A5',
    marginVertical: 5,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginVertical: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  optionIcon: {
    marginRight: 10,
  },
  detailContainer: {
    flex: 1,
    paddingTop: 10,
  },
  detailTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
  },
  reportDetailTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  selectedOptionContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 10,
    paddingTop: 8,
    marginBottom: 20,
  },
  selectedOptionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 10,
  },
  selectedOption: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  textInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 15,
    paddingTop: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    height: 180,
  },
});
