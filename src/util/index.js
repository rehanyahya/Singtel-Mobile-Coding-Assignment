import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  setIsUserLogin,
  setUserLoginData,
  setUserScore,
} from '../redux/slice/user';
import {store} from '../redux/store';

export const shuffle = word => {
  let array = word.split('');
  let wordArray = [];
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    wordArray.push({letter: '', index: -1});
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return {shuffledArray: array, wordArray};
};

export const getScore = (wordLength, numOfAttempts, isCorrect) => {
  return isCorrect ? Math.floor(wordLength * (wordLength / numOfAttempts)) : 0;
};

export const getAllScoresFromDb = async () => {
  try {
    const leaderboardData = await firestore()
      .collection('leaderboard')
      .orderBy('score', 'desc')
      .get();
    return leaderboardData.docs.map(doc => doc.data());
  } catch (error) {
    console.log(error);
  }
};

const getScoreFromDb = async () => {
  try {
    const leaderboardData = await firestore()
      .collection('leaderboard')
      .doc(store.getState().user.uid)
      .get();
    if (leaderboardData.exists) {
      return leaderboardData.data()?.score ?? 0;
    }
    return 0;
  } catch (error) {
    console.log(error);
  }
};

const setScoreInDb = async () => {
  try {
    await firestore()
      .collection('leaderboard')
      .doc(store.getState().user.uid)
      .set({
        email: store.getState().user.email,
        score: store.getState().user.score,
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateScoreInDb = async score => {
  try {
    await firestore()
      .collection('leaderboard')
      .doc(store.getState().user.uid)
      .update({
        score: score,
      });
    console.log('Score Updated');
  } catch (error) {
    console.log(error);
    if (error.code === 'firestore/not-found') {
      setScoreInDb();
    }
  }
};

const setUserAndUpdateScoreInDb = (user, callback) => {
  store.dispatch(
    setUserLoginData({
      email: user.email,
      uid: user.uid,
    }),
  );
  if (callback) {
    callback();
  }
};

export const createUserOrLogin = async (email, password, callback) => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);
    setUserAndUpdateScoreInDb(user, async () => {
      await setScoreInDb();
      store.dispatch(setIsUserLogin(true));
      if (callback) {
        callback();
      }
    });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      try {
        const {user} = await auth().signInWithEmailAndPassword(email, password);
        setUserAndUpdateScoreInDb(user, async () => {
          const scoreFromDb = await getScoreFromDb();
          await updateScoreInDb(scoreFromDb + store.getState().user.score);
          store.dispatch(setUserScore(scoreFromDb));
          store.dispatch(setIsUserLogin(true));
          if (callback) {
            callback();
          }
        });
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          alert('Invalid Password');
          if (callback) {
            callback();
          }
        }
      }
    } else if (error.code === 'auth/invalid-email') {
      alert('That email address is invalid!');
      if (callback) {
        callback();
      }
    } else {
      console.log(error);
    }
  }
};
