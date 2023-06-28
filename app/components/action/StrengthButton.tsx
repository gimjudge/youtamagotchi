import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSize } from "../../redux/size";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const StrengthButton = ({amount, min}) => {
		const dispatch = useDispatch();
		const { size } = useSelector((state: RootState) => state.size);
	
		const handlePress = () => {
			if (min < size) {
                dispatch(setSize(-amount));
            }
		};
	
		return (
			<MaterialCommunityIcons name="weight-lifter" size={30} color="#900" onPress={handlePress} />
		);

		return (
			<Button title={`Strength`} onPress={handlePress} />
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



export default StrengthButton