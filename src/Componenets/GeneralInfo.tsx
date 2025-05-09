// GeneralInfo.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface GeneralInfoProps {
  description: string;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ description }) => {
  return <Text style={styles.description}>{description}</Text>;
};

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});

export default GeneralInfo;
