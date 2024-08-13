/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {IMGMPTextPrimary} from '../../../../assets';
import {IcSearchBlue} from '../../assets';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Image style={styles.primaryTextMP} source={IMGMPTextPrimary} />
        <Text style={styles.forumText}>- Forum</Text>
        <IcSearchBlue style={styles.searchIcon} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  primaryTextMP: {
    height: 19,
    width: 140,
    marginLeft: 21,
    marginTop: 3,
  },
  headerTextContainer: {
    flexDirection: 'row',
  },
  forumText: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#00599B',
  },
  searchIcon: {
    marginLeft: 132,
  },
});
