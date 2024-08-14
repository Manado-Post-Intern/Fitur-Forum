/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image} from 'react-native';
import {React, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IcComments,
  IcDownvote,
  IcShare,
  IcUpvote,
  IcWarning,
  IMGkebakaran,
  IMGprofile,
} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Card = ({
  id,
  type = 'photo',
  initialUpvotes = 0,
  initialDownvotes = 0,
}) => {
  const isPhotoType = type === 'photo';
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  useEffect(() => {
    // Mengambil status dari AsyncStorage
    const fetchStatus = async () => {
      const upvoted = await AsyncStorage.getItem(`card_${id}_isUpvoted`);
      const downvoted = await AsyncStorage.getItem(`card_${id}_isDownvoted`);
      const storedUpvotes = await AsyncStorage.getItem(`card_${id}_upvotes`);
      const storedDownvotes = await AsyncStorage.getItem(
        `card_${id}_downvotes`,
      );

      if (upvoted !== null) {
        setIsUpvoted(JSON.parse(upvoted));
      }

      if (downvoted !== null) {
        setIsDownvoted(JSON.parse(downvoted));
      }

      if (storedUpvotes !== null) {
        setUpvotes(parseInt(storedUpvotes, 10));
      } else {
        setUpvotes(initialUpvotes);
      }

      if (storedDownvotes !== null) {
        setDownvotes(parseInt(storedDownvotes, 10));
      } else {
        setDownvotes(initialDownvotes);
      }
    };
    fetchStatus();
  }, [id, initialUpvotes, initialDownvotes]);

  const handleUpvote = async () => {
    const newUpvoteStatus = !isUpvoted;
    const voteChange = newUpvoteStatus ? 1 : -1;

    // Jika upvote diaktifkan dan downvote aktif, hapus downvote
    if (isDownvoted && newUpvoteStatus) {
      setIsDownvoted(false);
      await AsyncStorage.setItem(
        `card_${id}_isDownvoted`,
        JSON.stringify(false),
      );
      setDownvotes(prevDownvotes => prevDownvotes - 1);
      await AsyncStorage.setItem(
        `card_${id}_downvotes`,
        (downvotes - 1).toString(),
      );
    }

    // Perbarui status upvote
    setIsUpvoted(newUpvoteStatus);
    setUpvotes(prevUpvotes => prevUpvotes + voteChange);
    await AsyncStorage.setItem(
      `card_${id}_isUpvoted`,
      JSON.stringify(newUpvoteStatus),
    );
    await AsyncStorage.setItem(
      `card_${id}_upvotes`,
      (upvotes + voteChange).toString(),
    );
  };

  const handleDownvote = async () => {
    const newDownvoteStatus = !isDownvoted;
    const voteChange = newDownvoteStatus ? 1 : -1;

    // Jika downvote diaktifkan dan upvote aktif, hapus upvote
    if (isUpvoted && newDownvoteStatus) {
      setIsUpvoted(false);
      await AsyncStorage.setItem(`card_${id}_isUpvoted`, JSON.stringify(false));
      setUpvotes(prevUpvotes => prevUpvotes - 1);
      await AsyncStorage.setItem(
        `card_${id}_upvotes`,
        (upvotes - 1).toString(),
      );
    }

    // Perbarui status downvote
    setIsDownvoted(newDownvoteStatus);
    setDownvotes(prevDownvotes => prevDownvotes + voteChange);
    await AsyncStorage.setItem(
      `card_${id}_isDownvoted`,
      JSON.stringify(newDownvoteStatus),
    );
    await AsyncStorage.setItem(
      `card_${id}_downvotes`,
      (downvotes + voteChange).toString(),
    );
  };

  return (
    <View
      style={[
        styles.cardContainer,
        !isPhotoType && styles.cardContainerNonPhoto,
      ]}>
      {isPhotoType && (
        <View style={styles.cardImage}>
          <Image source={IMGkebakaran} style={styles.postImage} />
        </View>
      )}
      <View style={styles.userInformation}>
        <View style={styles.userProfile}>
          <Image style={styles.profileImage} source={IMGprofile} />
        </View>
        <Text style={styles.userName}>Jhellytha Kalantow</Text>
        <Text style={styles.dash}>-</Text>
        <Text style={styles.userCreatedAt}>13 jam</Text>
        <View style={styles.warningIcon}>
          <TouchableOpacity>
            <IcWarning />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.caption}>
        <Text style={styles.captionStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{' '}
        </Text>
        <Text style={styles.tagStyle}>#Kebakaran</Text>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <TouchableOpacity
            style={[styles.voteStyle, isUpvoted && styles.voteStyleUpvoted]}
            onPress={handleUpvote}>
            <IcUpvote />
            {isUpvoted && <Text style={styles.upvoteCount}>{upvotes}</Text>}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.voteStyle, isDownvoted && styles.voteStyleDownvoted]}
            onPress={handleDownvote}>
            <IcDownvote />
            {isDownvoted && <Text style={styles.upvoteCount}>{downvotes}</Text>}
          </TouchableOpacity>
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
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: 402,
    height: 433,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  cardContainerNonPhoto: {
    height: 240,
  },
  cardImage: {
    width: 380,
    height: 180,
    marginTop: 10,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  userInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginLeft: 14,
  },
  userProfile: {
    width: 44,
    height: 44,
    borderRadius: 30,
    backgroundColor: 'red',
    marginLeft: -20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  userName: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dash: {
    marginLeft: 5,
  },
  userCreatedAt: {
    marginLeft: 5,
  },
  warningIcon: {
    marginLeft: 110,
    width: 24,
    height: 24,
  },
  caption: {
    width: 343,
    height: 100,
    marginTop: 15,
  },
  captionStyle: {
    color: 'black',
    fontSize: 13,
  },
  tagStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    marginTop: 18,
    marginLeft: -20,
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
  voteStyleUpvoted: {
    marginLeft: 30,
    marginRight: -5,
    width: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00599B',
  },
  voteStyleDownvoted: {
    marginRight: -25,
    width: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F02D2D',
  },
  upvoteCount: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  commentContainer: {
    width: 132,
    height: 30,
    marginLeft: 43,
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
    marginLeft: 40,
  },
});
