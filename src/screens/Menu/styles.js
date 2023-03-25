import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
  },
  headingContainerStyle: {
    backgroundColor: '#9DE0FF',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderColor: 'grey',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
  },
  menuContainerStyle: {
    flex: 1,
    marginTop: 30,
  },
  menuButtonStyle: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    marginTop: 30,
  },
  startButtonStyle: {
    backgroundColor: '#FA7598',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
    marginTop: 16,
  },
  leaderboardButtonStyle: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  scoreTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
});
