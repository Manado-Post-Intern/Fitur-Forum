import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {IcOption, IcClose, IcBack, IcCheckbox} from '../../assets';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gap} from '../../../../components';

const ReportBottomSheet = ({onClose}) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState('main');
  const [selectedOption, setSelectedOption] = useState('');
  const [reasonText, setReasonText] = useState(''); 
  const [statusText, setStatusText] = useState(''); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const translateX = useSharedValue(300);

  const handleTextChange = text => {
    if (text.length <= 280) {
      setReasonText(text);
      setStatusText(text);
    }
  };

  const handleOptionPress = option => {
    setSelectedOption(option);
    setCurrentContent('detail');
    setIsDetailVisible(true);
    translateX.value = withTiming(0, {duration: 500});
  };

  const handleBackPress = () => {
    translateX.value = withTiming(300, {duration: 500}, () => {
      runOnJS(setIsDetailVisible)(false); // Menjalankan fungsi di luar UI thread
      runOnJS(setCurrentContent)('main'); // Menjalankan fungsi di luar UI thread
      runOnJS(setSelectedOption)('');
      runOnJS(setReasonText)('');
      runOnJS(setStatusText)('');
    });
  };

  const handleSendPress = () => {
    if (!isSendButtonDisabled()) {
      setIsModalVisible(true); 
    }
  };

  const handleBackToTimeline = () => {
    setIsModalVisible(false); 
    onClose(); 
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
      <View style={styles.header}>
        {isDetailVisible && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <IcBack /> 
          </TouchableOpacity>
        )}
        
        <Text style={styles.headerTitle}>Laporkan</Text>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <IcClose />
        </TouchableOpacity>
      </View>
      
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
              onChangeText={handleTextChange}
            />
            <Text style={styles.characterCount}>{statusText.length}/280</Text>
          </View>

          <Gap height={25} />
          <TouchableOpacity
            style={[
              styles.sendButton,
              isSendButtonDisabled() && styles.sendButtonDisabled,
            ]}
            disabled={isSendButtonDisabled()} 
            onPress={handleSendPress} 
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
            <View style={styles.textAlertContainer}>
              <IcCheckbox/>
              <Gap width={7}/>
            <Text style={styles.modalText}>Laporan berhasil dikirim!</Text>
            </View>
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
      marginBottom: 17,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 20,
    },
    backButton: {
      position: 'absolute',
      top: 10,
      left: 20,
      zIndex: 1, // Menambah zIndex untuk memastikan tombol ada di atas
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
      fontSize: 19,
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
      paddingVertical: 15,
      borderRadius: 8,
    },
    sendButtonText: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '700',
      color: '#FFF',
    },
    sendButtonDisabled: {
      backgroundColor: '#AAA',
    },
    characterCount: {
      position: 'absolute',
      right: 10,
      bottom: 10,
      fontSize: 14,
      color: 'gray',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 20,
      color: 'black',
      fontWeight: '600',
      marginBottom: 10,
      marginTop: 5,
    },
    modalButton: {
      backgroundColor: '#00599B',
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 15,
      width: 284,
     alignItems: 'center',
    },
    modalButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
    },
    textAlertContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      right: 10,
    }
  });