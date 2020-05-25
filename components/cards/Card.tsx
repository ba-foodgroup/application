import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const Card = (props) => {
    return (
        <View style={styles.card}>
          {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 10
  },
});

export default Card;