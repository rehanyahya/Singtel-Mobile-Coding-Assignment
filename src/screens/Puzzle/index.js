import React, {useState, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LetterContainer} from '../../components';
import {getScore, shuffle, updateScoreInDb} from '../../util';
import styles from './styles';
import {gameData} from '../../data';
import {setUserScore} from '../../redux/slice/user';

let isSkip = false;
let numOfAttempts = 0;
let currentGameIndex = 0;
let currentIndex = 0;
let previousSelected = '';
let word = '';

const Puzzle = ({navigation, route}) => {
  const {selected} = route.params;
  const dispatch = useDispatch();

  const userData = useSelector(state => state.user);

  const [shuffled, setShuffled] = useState([]);
  const [letters, setLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [detail, setDetail] = useState(false);

  useEffect(() => {
    initPuzzle();
    return () => {
      if (currentGameIndex === gameData[selected].length) currentGameIndex = 0;

      if (!isSkip) {
      }
    };
  }, []);

  const initPuzzle = () => {
    if (previousSelected !== selected) {
      currentGameIndex = 0;
    }
    previousSelected = selected;
    isSkip = false;
    currentIndex = 0;
    numOfAttempts = 0;
    const data = gameData[selected][currentGameIndex];
    const {word: _word, detail: _detail} = data;
    word = _word;
    setDetail(_detail);
    const {shuffledArray, wordArray} = shuffle(word);

    setShuffled([...shuffledArray]);
    setLetters([...wordArray]);
  };

  const onPressNext = () => {
    currentGameIndex++;
    if (currentGameIndex < gameData[selected].length) {
      navigation.replace('Puzzle', {
        selected,
      });
    } else {
      navigation.pop();
    }
  };

  const onPressSkip = () => {
    isSkip = true;
    currentGameIndex++;
    if (currentGameIndex < gameData[selected].length) {
      navigation.replace('Puzzle', {
        selected,
      });
    } else {
      navigation.pop();
    }
  };

  const checkAnswer = async () => {
    const inputWord = letters.map(item => item.letter).join('');
    if (inputWord === word) {
      const _score = getScore(letters.length, numOfAttempts, true);
      dispatch(setUserScore(_score));
      setIsCorrect(true);
      if (userData.isLogin) {
        await updateScoreInDb(userData.score + _score);
      }
    } else {
      setIsCorrect(false);
    }
  };

  const onPressWordItem = (item, _index) => {
    if (item !== '') {
      const _letters = [...letters];
      const _shuffled = [...shuffled];
      _shuffled[_letters[_index].index] = _letters[_index].letter;
      setShuffled(_shuffled);
      _letters[_index].letter = '';
      _letters[_index].index = -1;
      setLetters(_letters);
      currentIndex--;
    }
  };

  const onPressShuffledItem = (item, index) => {
    if (item !== '') {
      const _letters = [...letters];
      const _shuffled = [...shuffled];
      _shuffled[index] = '';
      _letters[currentIndex].letter = item;
      _letters[currentIndex].index = index;
      setLetters(_letters);
      setShuffled(_shuffled);
      currentIndex++;
      numOfAttempts++;
      if (currentIndex === letters.length) {
        setIsCompleted(true);
        checkAnswer();
      }
    }
  };

  return (
    <View style={styles.mainConatiner}>
      <Text style={styles.remainingTextStyle}>{`${currentGameIndex + 1}/${
        gameData[selected].length
      }`}</Text>
      <View style={styles.subContainer}>
        {!isCompleted ? (
          <>
            <View style={styles.boxesContainer}>
              {letters.map((item, index) => {
                return (
                  <LetterContainer
                    key={index}
                    letter={item.letter}
                    onPressButton={() => onPressWordItem(item.letter, index)}
                    disabled={currentIndex - 1 !== index}
                  />
                );
              })}
            </View>
            <Text style={styles.detailTextStyle}>{detail}</Text>
            <View style={styles.boxesContainer}>
              {shuffled.map((item, index) => {
                return (
                  <LetterContainer
                    key={index}
                    letter={item}
                    onPressButton={() => onPressShuffledItem(item, index)}
                    disabled={false}
                  />
                );
              })}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.correctTextStyle}>
              {isCorrect ? 'Correct!' : 'Wrong!'}
            </Text>

            {isCorrect ? (
              <Text style={styles.correctTextStyle}>{'Congratulations'}</Text>
            ) : null}

            <Text style={styles.correctTextStyle}>
              {`You earn ${getScore(
                letters.length,
                numOfAttempts,
                isCorrect,
              )} points`}
            </Text>
          </>
        )}
      </View>

      <Pressable
        style={styles.buttonContainer}
        onPress={currentIndex === letters.length ? onPressNext : onPressSkip}>
        <Text style={styles.buttonTextStyle}>
          {currentIndex === letters.length ? `NEXT` : `SKIP`}
        </Text>
      </Pressable>
    </View>
  );
};

export default Puzzle;
