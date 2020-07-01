import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CardProps {
  style: Object
}

const Card: React.FC<CardProps> = (props): JSX.Element => {
  return (
    <View style={{...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 7,
    borderRadius: 10,
    backgroundColor: "white",
  }
})

export default Card;