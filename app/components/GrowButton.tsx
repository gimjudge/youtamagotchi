import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSize } from "../redux/size";

const ShrinkButton = ({amount, max}) => {
		const dispatch = useDispatch();
		const { size } = useSelector((state: RootState) => state.size);
	
		const handlePress = () => {
			if (max > size) {
                dispatch(setSize(amount));
            }
		};
	
		return (
			<Button title={`Grow`} onPress={handlePress} />
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



export default ShrinkButton