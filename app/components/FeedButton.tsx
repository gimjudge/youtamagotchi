import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAppetite } from "../redux/appetite";

const Appetite = ({add}) => {
		const dispatch = useDispatch();
		const { appetite } = useSelector((state: RootState) => state.appetite);
	
		const handlePress = () => {
			dispatch(setAppetite(add));
		};
	
		return (
			<View style={styles.container}>
				<Text style={styles.text}>yes{appetite} no</Text>
				<Button title={`Add ${add}`} onPress={handlePress} />
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