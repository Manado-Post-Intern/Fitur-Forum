/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image} from 'react-native';
import {React, useState} from 'react';
import {IMGMPTextPrimary} from '../../../../assets';
import {IcSearchBlue} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Header = ({onRefresh}) => {
  const handleRefresh = () => {
    // Memanggil fungsi refresh dari props
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Image style={styles.primaryTextMP} source={IMGMPTextPrimary} />
        <Text style={styles.forumText}>- Forum</Text>
        <View style={styles.searchIconSize}>
          <TouchableOpacity onPress={handleRefresh}>
            <IcSearchBlue style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// export default function MainComponent() {
//   const [refreshKey, setRefreshKey] = useState(0);

//   const handleRefresh = () => {
//     // Memicu re-render halaman
//     setRefreshKey(prevKey => prevKey + 1);
//   };

//   return (
//     <View key={refreshKey}>
//       <Header onRefresh={handleRefresh} />
//       {/* Komponen lain yang akan di-refresh */}
//     </View>
//   );
// }

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
  searchIconSize: {
    width: 25,
    height: 25,
  },
});
