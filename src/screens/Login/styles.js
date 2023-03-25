import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headingTextStyle: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
  },
  input: {
    height: 56,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderRadius: 12,
    marginTop: 24,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 16,
    fontWeight: '400',
  },
});
