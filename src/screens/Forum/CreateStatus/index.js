/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {React, useState} from 'react';
import {
  IcBackBlue,
  IcClose,
  IcComments,
  IcDownvote,
  IcDropdown,
  IcShare,
  IcUploadGrey,
  IcUpvote,
  IcWarning,
  IMGprofile,
} from '../assets';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Gap} from '../../../components';
import {launchImageLibrary} from 'react-native-image-picker';

const CreateStatus = () => {
  const navigation = useNavigation();
  const [statusText, setStatusText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleTextChange = text => {
    if (text.length <= 280) {
      setStatusText(text);
    }
  };
  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        console.log(response.assets); // Tambahkan log untuk melihat isi response
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IcBackBlue />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Buat Status</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.postButton}>
            <Text style={styles.postTextStyle}>Post</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.createSection}>
        <View style={styles.userInformation}>
          <View style={styles.userProfile}>
            <Image style={styles.profileImage} source={IMGprofile} />
          </View>
          <View style={styles.usernameCategoryStyle}>
            <Text style={styles.usernameStyle}>Kalantow Jhellytha</Text>
            <View style={styles.categoryStyle}>
              <TouchableOpacity style={styles.categoryStyle}>
                <Text style={styles.textCategoryStyle}>Kategori</Text>
                <Gap width={5} />
                <IcDropdown style={styles.dropdownIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.captionInputSection}>
          <TextInput
            placeholder="Apa yang terjadi?"
            style={styles.textInputStyle}
            multiline={true} // Mengizinkan input teks untuk memiliki beberapa baris
            textAlignVertical="top" // Mengatur teks agar dimulai dari atas
            value={statusText}
            onChangeText={handleTextChange}
          />
          <Text style={styles.characterCount}>{statusText.length}/280</Text>
        </View>

        <View style={styles.uploadMediaButton}>
          <TouchableOpacity
            style={styles.uploadMediaStyle}
            onPress={handleImagePick}>
            <IcUploadGrey />
            <Text style={styles.textUploadMedia}>Upload Media</Text>
          </TouchableOpacity>
        </View>

        {imageUri && (
          <View key={imageUri} style={styles.imagePreviewContainer}>
            <Image source={{uri: imageUri}} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setImageUri(null)}>
              <IcClose />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.previewSection}>
          <Text style={styles.textPreview}>Preview</Text>
          <View
            style={[
              styles.previewCard,
              {
                minHeight: 180, // Ketinggian awal ketika tidak ada gambar atau teks
                paddingBottom: imageUri || statusText ? 20 : 15, // Menambahkan padding bottom jika ada gambar/teks
              },
            ]}>
            {imageUri && (
              <View key={imageUri} style={styles.imagePreviewContainer1}>
                <Image source={{uri: imageUri}} style={styles.imagePreview1} />
              </View>
            )}
            <View style={styles.userInformationPreview}>
              <View style={styles.userProfilePreview}>
                <Image style={styles.profileImagePreview} source={IMGprofile} />
              </View>
              <Text style={styles.userName}>Kalantow Jhellytha</Text>
              <Text style={styles.dash}>-</Text>
              <Text style={styles.userCreatedAt}>13 jam</Text>
              <View style={styles.warningIcon}>
                <TouchableOpacity>
                  <IcWarning />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.captionPreview}>{statusText}</Text>
            <View style={styles.previewCardFooter}>
              <View style={styles.voteStyle}>
                <IcUpvote />
              </View>
              <View style={styles.voteStyle}>
                <IcDownvote />
              </View>
              <View style={styles.commentContainer}>
                <TouchableOpacity style={styles.commentStyle}>
                  <IcComments />
                  <Text style={styles.commentTextStyle}>Komentar</Text>
                  <Text style={styles.totalComment}>(8)</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shareButton}>
                <TouchableOpacity>
                  <IcShare />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateStatus;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    height: 65,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#39A5E1',
  },
  backButton: {
    width: 50,
    height: 50,
  },
  textContainer: {
    marginBottom: 3,
  },
  headerText: {
    fontSize: 24,
    color: '#00599B',
    fontFamily: 'Inter-SemiBold',
  },
  postButton: {
    width: 99,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00599B',
    borderRadius: 4,
    left: 120,
  },
  postTextStyle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  createSection: {
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },
  userInformation: {
    flexDirection: 'row',
  },
  userProfile: {
    marginLeft: 19,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    // marginLeft: -20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  usernameCategoryStyle: {
    marginLeft: 24,
  },
  usernameStyle: {
    fontSize: 21,
    fontFamily: 'Inter-Bold',
    color: 'black',
    marginBottom: 3,
  },
  categoryStyle: {
    width: 115,
    height: 25,
    backgroundColor: '#00599B',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCategoryStyle: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 15,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 4,
  },
  textInputStyle: {
    width: 380,
    marginTop: 20,
    fontSize: 29,
    marginLeft: 18,
    fontFamily: 'Inter-Medium',
    textAlignVertical: 'top',
  },
  characterCount: {
    marginLeft: 18,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'black',
  },
  uploadMediaStyle: {
    width: '100%',
    height: 67,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#39A5E1',
    borderBottomWidth: 1,
    borderBottomColor: '#39A5E1',
    paddingLeft: 25,
  },
  uploadMediaButton: {
    marginTop: 208,
    width: '100%',
    height: 67,
  },
  textUploadMedia: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#617D97',
    marginLeft: 11,
  },
  textPreview: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#373737',
    marginLeft: 15,
    marginTop: 16,
    marginBottom: 16,
  },
  previewCard: {
    marginLeft: 10,
    width: 392,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 6,
    marginBottom: 40,
    paddingLeft: 27,
    minHeight: 200,
    paddingBottom: 0, // Menambahkan padding bottom jika ada gambar/teks
  },
  previewSection: {
    backgroundColor: '#E7F0F5',
  },
  userInformationPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    flexShrink: 1,
  },
  userProfilePreview: {
    width: 44,
    height: 44,
    borderRadius: 30,
    backgroundColor: 'red',
    // marginLeft: -20,
  },
  profileImagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  userName: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 12,
    flexShrink: 1,
  },
  dash: {
    marginLeft: 10,
  },
  userCreatedAt: {
    marginLeft: 5,
  },
  warningIcon: {
    position: 'absolute', // Changed from 'relative' to 'absolute'
    right: 20,
    width: 24,
    height: 24,
  },
  captionPreview: {
    marginTop: 12,
    width: 343,
    fontSize: 13,
    fontFamily: 'Inter-Light',
    color: 'black',
    flexShrink: 1,
  },
  previewCardFooter: {
    flexDirection: 'row',
    marginTop: 60,
    marginLeft: -15,
    flexShrink: 0,
  },
  voteStyle: {
    flexDirection: 'row',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#39A5E1',
    marginLeft: 15,
  },
  commentContainer: {
    width: 132,
    height: 30,
    marginLeft: 130,
    position: 'absolute',
  },
  commentStyle: {
    width: 132,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#39A5E1',
  },
  commentTextStyle: {
    color: '#39A5E1',
    marginHorizontal: 8,
  },
  totalComment: {
    color: '#39A5E1',
  },
  shareButton: {
    position: 'absolute',
    marginLeft: 320,
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
  },
  imagePreviewContainer1: {
    marginLeft: -10,
    width: 360,
    height: 180,
    marginTop: 10,
  },
  imagePreview1: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  closeIcon: {
    marginBottom: -45,
    top: -190, // Jarak dari atas gambar
    left: 170, // Jarak dari kanan gambar
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opsional: menambahkan latar belakang transparan
    borderRadius: 15, // Agar ikon close berbentuk bulat
    padding: 5, // Ruang di sekitar ikon
  },
});
