import React, {useState} from 'react';
import {View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {gameData} from '../../data';
import styles from './styles';

const Menu = ({navigation}) => {
  const [selected, setSelected] = useState('');

  const userData = useSelector(state => state.user);
  console.log(userData);

  const selectedButtonStyle = {
    backgroundColor: 'lightgreen',
  };

  const navigateToGame = () => {
    if (gameData[selected].length > 0)
      navigation.navigate('Puzzle', {
        selected,
      });
  };

  const onPressStart = () => {
    if (selected != '') navigateToGame();
  };

  const onPressLeaderboard = () => {
    if (!userData.isLogin) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Leaderboard');
    }
  };

  return (
    <View style={styles.mainConatiner}>
      <View style={styles.headingContainerStyle}>
        <Text style={styles.textStyle}>Word Puzzle</Text>
      </View>
      <View style={styles.menuContainerStyle}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 12}}
          showsVerticalScrollIndicator={false}>
          {Object.keys(gameData).map((item, index) => {
            return (
              <Pressable
                key={index}
                style={[
                  styles.menuButtonStyle,
                  selected === item ? selectedButtonStyle : {},
                ]}
                onPress={() => setSelected(item)}>
                <Text style={styles.textStyle}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <Text style={styles.scoreTextStyle}>{`Score: ${userData.score}`}</Text>
      <Pressable style={styles.startButtonStyle} onPress={onPressStart}>
        <Text style={styles.textStyle}>START</Text>
      </Pressable>
      <Pressable
        style={styles.leaderboardButtonStyle}
        onPress={onPressLeaderboard}>
        <Text style={styles.textStyle}>Leaders Board</Text>
      </Pressable>
    </View>
  );
};

export default Menu;
