/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IcBackBlue, IcSend} from '../assets';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import Card from '../components/Card';
import Comment from '../components/Comment';
import {Gap} from '../../../components';

const DetailStatus = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Ambil data post yang dikirim dari navigasi
  const {post} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backButtonStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IcBackBlue />
          </TouchableOpacity>
        </View>
        <Text style={styles.textPostingan}>Postingan</Text>
      </View>
      <ScrollView>
        <View style={styles.cardStyle}>{post && <Card post={post} />}</View>
        <Text style={styles.komentarTitle}>Komentar</Text>
        <Comment
          username={'Putri Kalantow'}
          Type={'replied'}
          value={'Otolong kasiang sekali doeh dia ini'}
        />
        <Comment
          username={'Rikard Yong'}
          value={'Tolong urus ini yang komen tidak berakal'}
        />
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Masukkan komentar anda"
          style={styles.commentInput}
          multiline={true} // Mengizinkan multi-baris
        />
        <IcSend style={styles.sendStyle} />
      </View>
    </View>
  );
};

export default DetailStatus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E7F0F5',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 72,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButtonStyle: {
    right: 10,
  },
  textPostingan: {
    fontSize: 24,
    fontFamily: 'NotoSerifGeorgian-Bold',
    color: '#00599B',
    bottom: 3,
  },
  cardStyle: {
    alignItems: 'center',
  },
  komentarTitle: {
    fontSize: 20,
    color: '#373737',
    fontFamily: 'Inter-Bold',
    marginLeft: 15,
  },
  commentInput: {
    width: '95%',
    height: 50,
    maxWidth: 400,
    paddingHorizontal: 15,
    paddingRight: 50,
    backgroundColor: '#F1F2F6',
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#66686A',
    marginHorizontal: 5,
    top: 10,
    flexWrap: 'wrap',
  },
  inputContainer: {
    justifyContent: 'center',
    Width: 430,
    height: 80,
    backgroundColor: '#E7F0F5',
    borderTopColor: '#66686A',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  sendStyle: {
    position: 'absolute',
    right: 25,
    top: 25,
  },
});
