import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {IcOption, IcClose, IcBack} from '../../assets';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Gap} from '../../../../components';

const ReportBottomSheet = ({onClose}) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState('main');
  const [selectedOption, setSelectedOption] = useState('');
  const [reasonText, setReasonText] = useState(''); 
  const [isModalVisible, setIsModalVisible] = useState(false); // state untuk modal
  const translateX = useSharedValue(300);

  const handleOptionPress = option => {
    setSelectedOption(option);
    setCurrentContent('detail');
    setIsDetailVisible(true);
    translateX.value = withTiming(0, {duration: 500});
  };

  const handleBackPress = () => {
    translateX.value = withTiming(300, {duration: 500}, () => {
      setIsDetailVisible(false);
      setCurrentContent('main');
      setSelectedOption('');
      setReasonText(''); 
    });
  };

  const handleSendPress = () => {
    if (!isSendButtonDisabled()) {
      setIsModalVisible(true); // Tampilkan modal ketika laporan berhasil dikirim
    }
  };

  const handleBackToTimeline = () => {
    setIsModalVisible(false); // Tutup modal
    onClose(); // Kembali ke timeline atau menutup bottom sheet
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const isSendButtonDisabled = () => {
    return selectedOption === 'Lainnya' && reasonText.trim() === '';
  };

  return (
    <View style={styles.container}>
      {isDetailVisible && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <IcBack /> 
        </TouchableOpacity>
      )}
      
      <Text style={styles.headerTitle}>Laporkan</Text>
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <IcClose />
      </TouchableOpacity>
      
      <View style={styles.separator} />
  
      {!isDetailVisible && (
        <>
          <Text style={styles.mainTitle}>
            Mengapa anda melaporkan postingan ini?
          </Text>
  
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionPress('Berita palsu')}>
            <Text style={styles.optionText}>Berita palsu</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>
  
          <View style={styles.separator} />
  
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionPress('Perundungan atau pelecehan')}>
            <Text style={styles.optionText}>Perundungan atau pelecehan</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>
  
          <View style={styles.separator} />
  
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionPress('Pelanggaran privasi')}>
            <Text style={styles.optionText}>Pelanggaran privasi</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>
  
          <View style={styles.separator} />
  
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionPress('Spam')}>
            <Text style={styles.optionText}>Spam</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>
  
          <View style={styles.separator} />
  
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionPress('Lainnya')}>
            <Text style={styles.optionText}>Lainnya</Text>
            <IcOption style={styles.optionIcon} />
          </TouchableOpacity>
        </>
      )}
  
      {isDetailVisible && (
        <Animated.View style={[styles.detailContainer, animatedStyle]}>
          <Text style={styles.detailTitle}>Anda akan mengirimkan laporan</Text>
          <Text style={styles.detailDescription}>
            Kami hanya akan menghapus postingan yang tidak sesuai dengan Standar
            Komunitas.
          </Text>
  
          <Gap height={10} />
  
          <Text style={styles.reportDetailTitle}>Rincian Laporan</Text>
  
          <View style={styles.selectedOptionContainer}>
            <Text style={styles.selectedOptionLabel}>
              Mengapa anda melaporkan postingan ini?
            </Text>
            <Text style={styles.selectedOption}>{selectedOption}</Text>
          </View>
  
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Berikan kami penjelasan..."
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={reasonText}
              onChangeText={setReasonText} // Update state saat teks diubah
            />
          </View>
          <Gap height={25} />
          <TouchableOpacity
            style={[
              styles.sendButton,
              isSendButtonDisabled() && styles.sendButtonDisabled,
            ]}
            disabled={isSendButtonDisabled()} // Disable tombol jika kondisi terpenuhi
            onPress={handleSendPress} // Panggil fungsi untuk mengirim laporan
          >
            <Text style={styles.sendButtonText}>Kirim</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Laporan berhasil dikirim</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleBackToTimeline}>
              <Text style={styles.modalButtonText}>Kembali ke Timeline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
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
    fontSize: 21,
    color: '#555',
    marginBottom: 20,
  },
  reportDetailTitle: {
    fontSize: 20,
    fontWeight: '700',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 8,
    height: 150,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    height: '100%',
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#00599B',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  sendButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#00599B',
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});
