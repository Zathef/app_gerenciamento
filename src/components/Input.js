import React from 'react';
import { TextInput } from 'react-native';
import styles from '@styles/inputStyles';

export default function Input({ value, onChangeText, placeholder, secureTextEntry = false }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#aaa"
    />
  );
}
