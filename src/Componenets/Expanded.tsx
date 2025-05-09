import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import {Img} from '../Utils/Imagepath' // You can use any icon set

interface ExpandedProps {
  title: string;
  children: React.ReactNode;
}

const Expanded: React.FC<ExpandedProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };
  const chevronImage = isExpanded ? Img.chevrons : Img.chevron;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image source={chevronImage} style={styles.icon} />
      </TouchableOpacity>
      {isExpanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 20, // Adjust size
    height: 20, // Adjust size
    marginLeft: 10, // Space between title and icon
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    paddingBottom: 10,
    paddingTop: 5,
  },
});

export default Expanded;
