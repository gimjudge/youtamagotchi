import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/message";

const Message = () => {

    const dispatch = useDispatch();
    const { message } = useSelector((state: RootState) => state.message);
    const handlePress = () => {
      dispatch(setMessage('Message from Component'));
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
        <Button title={'Set Message'} onPress={handlePress} />
      </View>
    );
  };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 50
	},
	text: {
		color: '#000'
	}
});

export default Message