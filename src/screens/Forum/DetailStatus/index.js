/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {IcBackBlue, IcSend} from '../assets';
import IcSendFix from '../assets/icons/Icon-Send-Fix.svg';
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

  // State untuk melacak teks komentar
  const [commentText, setCommentText] = useState('');

  // Fungsi untuk mengirim komentar
  const handleSendComment = () => {
    if (commentText.length > 0) {
      console.log('Mengirim komentar:', commentText);
      setCommentText(''); // Mengosongkan kolom komentar setelah mengirim
    }
  };

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
          value={'Astaga, itu di Manado bagian mana?'}
        />
        <Comment
          username={'Rikard Yong'}
          value={'Tolong urus ini yang komen tidak berakal'}
        />
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Masukkan komentar anda..."
          style={styles.commentInput}
          multiline={true} // Mengizinkan multi-baris
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendComment}
          disabled={commentText.length === 0}
        >
          {commentText.length === 0 ? (
            <IcSend style={styles.sendIcon} />
          ) : (
            <IcSendFix style={styles.sendIcon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailStatus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
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
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    paddingRight: 50,
    backgroundColor: '#F1F2F6',
    borderRadius: 16,
    borderColor: '#66686A',
    marginHorizontal: 5,
    flexWrap: 'wrap',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#66686A',
    borderTopWidth: 0.2,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});
