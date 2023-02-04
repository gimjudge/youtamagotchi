import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAppetite } from "../redux/appetite";

const Appetite = () => {
		const dispatch = useDispatch();
		const { appetite } = useSelector((state: RootState) => state.appetite);
		console.log("🚀 ~ file: App.tsx:32 ~ Appetite ~ appetite", appetite)
	
		const handlePress = () => {
			console.log("🚀 ~ file: App.tsx:49 ~ handlePress ~ 1", 1)
			dispatch(setAppetite(1));
		};
	
		
		console.log("🚀 ~ file: App.tsx:32 ~ Appetite ~ appetite", appetite)
		return (
			<View style={styles.container}>
				<Text style={styles.text}>yes{appetite} no</Text>
				<Button title={'Set Appetite'} onPress={handlePress} />
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



export default Appetite