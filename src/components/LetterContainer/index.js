import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';

const LetterContainer = ({letter = '', onPressButton = () => {}, disabled}) => {
  return (
    <Pressable
      style={styles.mainContainer}
      onPress={onPressButton}
      disabled={disabled}>
      <Text style={styles.containerTextStyle}>{letter}</Text>
    </Pressable>
  );
};

export default LetterContainer;
