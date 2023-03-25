import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLeaderboardData} from '../../redux/slice/leaderboard';
import {getAllScoresFromDb} from '../../util';
import styles from './styles';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const getLeaderboardData = async () => {
    const data = await getAllScoresFromDb();
    dispatch(setLeaderboardData(data));
  };

  useEffect(() => {
    getLeaderboardData();
  }, []);

  const leaderboardData = useSelector(state => state.leaderboard);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.itemContainer,
          {backgroundColor: index % 2 === 0 ? 'white' : 'lightgrey'},
        ]}>
        <Text style={[styles.leaderBoardTextStyle]}>{`${index + 1}. `}</Text>
        <Text style={[styles.leaderBoardTextStyle, {flex: 1}]}>
          {`${item.email}`}
        </Text>
        <Text style={styles.leaderBoardTextStyle}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingTextStyle}>Leaderboard</Text>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={leaderboardData}
        keyExtractor={(_, index) => index}
        renderItem={renderItem}
        // ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
      />
    </View>
  );
};

export default Leaderboard;
