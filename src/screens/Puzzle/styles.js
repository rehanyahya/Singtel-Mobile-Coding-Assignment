import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  detailTextStyle: {
    color: 'black',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 30,
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: '#FA7598',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginTop: 40,
  },
  correctTextStyle: {
    color: 'lightgreen',
    fontSize: 24,
  },
  remainingTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
});
