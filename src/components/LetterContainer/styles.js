import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    // width: 50,
    // height: 50,
    width: Dimensions.get('window').width * 0.12,
    height: Dimensions.get('window').height * 0.062,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  containerTextStyle: {color: 'black', fontSize: 20},
});
