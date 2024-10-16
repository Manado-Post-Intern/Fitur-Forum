/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IcBackBlue, IcSend} from '../assets';
import IcSendFix from '../assets/icons/Icon-Send-Fix.svg';
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import Card from '../components/Card';
import Comment from '../components/Comment';
import database from '@react-native-firebase/database'; // Import Firebase Realtime Database
import auth from '@react-native-firebase/auth'; // Import Firebase Auth untuk mendapatkan user

const DetailStatus = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // State untuk melacak data post yang diambil dari navigasi dan Firebase
  const [post] = useState(route.params.post); // Ambil post dari params awal

  // State untuk melacak teks komentar
  const [commentText, setCommentText] = useState('');

  // State untuk melacak user yang sedang login
  const [user, setUser] = useState(null);

  // State untuk menyimpan daftar komentar dari Firebase
  const [comments, setComments] = useState({});

  // State untuk melacak username yang sedang dibalas
  const [replyingTo, setReplyingTo] = useState(null);

  // Dapatkan user dari Firebase Auth
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser({
        userId: currentUser.uid, // userId dari auth
        fullName: currentUser.displayName || 'Pengguna Tanpa Nama', // Nama user dari auth
        userProfile: currentUser.photoURL || null,
      });
    }
  }, []);

  // Dapatkan komentar dari Firebase Realtime Database
  useEffect(() => {
    const commentsRef = database().ref(`forum/post/${post.id}/comments`); // Path yang benar

    // Mendengarkan perubahan data komentar di Firebase
    const onValueChange = commentsRef.on('value', snapshot => {
      if (snapshot.exists()) {
        setComments(snapshot.val()); // Simpan data komentar di state
      } else {
        setComments({}); // Jika tidak ada komentar, set ke object kosong
      }
    });

    // Membersihkan listener saat komponen unmount
    return () => commentsRef.off('value', onValueChange);
  }, [post.id]);

  // Fungsi untuk mengirim komentar ke Firebase
  const handleSendComment = async () => {
    if (commentText.length > 0 && user) {
      // Jika sedang membalas komentar
      if (replyingTo) {
        const replyRef = database()
          .ref(`forum/post/${post.id}/comments/${replyingTo.commentId}/replies`)
          .push(); // Membuat replyId unik

        const newReply = {
          userId: user.userId,
          fullName: user.fullName,
          value: commentText,
          userProfile: user.userProfile,
          likes: 0,
          commentDate: Date.now(),
        };

        try {
          await replyRef.set(newReply);
          console.log('Balasan berhasil dikirim:', newReply);
        } catch (error) {
          console.error('Error saat mengirim balasan:', error);
        }

        // Reset setelah mengirim balasan
        setReplyingTo(null);
      } else {
        // Jika bukan balasan, kirim sebagai komentar
        const commentRef = database()
          .ref(`forum/post/${post.id}/comments`)
          .push(); // Membuat commentId unik

        const newComment = {
          userId: user.userId,
          fullName: user.fullName,
          value: commentText,
          userProfile: user.userProfile,
          likes: 0,
          commentDate: Date.now(),
        };

        try {
          await commentRef.set(newComment);
          console.log('Komentar berhasil dikirim:', newComment);
        } catch (error) {
          console.error('Error saat mengirim komentar:', error);
        }
      }

      setCommentText(''); // Mengosongkan kolom komentar setelah mengirim
    } else if (!user) {
      console.log('User belum login');
    }
  };

  // Fungsi untuk mengambil ulang post dan komentar dari Firebase saat refresh

  // Fungsi untuk menangani klik tombol balas
  const handleReplyPress = (commentId, username) => {
    setReplyingTo({commentId, username});
  };

  return (
    <GestureHandlerRootView>
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

          {/* Tampilkan komentar menggunakan map */}
          {Object.keys(comments).length > 0 ? (
            Object.keys(comments).map(commentId => (
              <Comment
                postId={post.id}
                key={commentId}
                commentId={commentId}
                username={comments[commentId].fullName}
                value={comments[commentId].value}
                commentDate={comments[commentId].commentDate}
                userProfile={comments[commentId].userProfile}
                replies={comments[commentId].replies} // Tambahkan balasan
                onReplyPress={() =>
                  handleReplyPress(commentId, comments[commentId].fullName)
                }
              />
            ))
          ) : (
            <Text style={styles.noCommentText}>Belum ada komentar.</Text>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={
              replyingTo
                ? `Membalas ${replyingTo.username}...`
                : 'Masukkan komentar anda...'
            }
            style={styles.commentInput}
            multiline={true} // Mengizinkan multi-baris
            value={commentText}
            onChangeText={text => setCommentText(text)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendComment}
            disabled={commentText.length === 0}>
            {commentText.length === 0 ? (
              <IcSend style={styles.sendIcon} />
            ) : (
              <IcSendFix style={styles.sendIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
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
  noCommentText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
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
