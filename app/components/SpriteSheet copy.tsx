import { Animated, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const SpriteSheet = ({style, src, columns, animations, defaultAnimation}) => {

	const [stateTime, setStateTime] = useState(new Animated.Value(1.0))
	const [stateInternalAnimations, setStateInternalAnimations] = useState({})
	const [stateCurrentAnimation, setStateCurrentAnimation] = useState(defaultAnimation)

	

	const frameSize = 50

	useEffect(() => {
		console.log("🚀 ~ file: SpriteSheet.tsx:39 ~ useEffect ~ animations", animations)
		const internalAnimations = {}
		for (let animation of animations) {

			const numberFrames = animation.frames ?? columns

			const internalAnimation = {
				frames: numberFrames,
				input: getNumPairs(numberFrames).slice(0, 2*numberFrames-1),
				output: [0].concat(getNumPairs(numberFrames-1).map((i) => (i+1)*frameSize)),
				translateY: animation.row*frameSize
			}
			internalAnimations[animation.name] = internalAnimation
		}

		setStateInternalAnimations(internalAnimations)
		// console.log("🚀 ~ file: SpriteSheet.tsx:43 ~ useEffect ~ internalAnimations", stateTime)
		// console.log("🚀 ~ file: SpriteSheet.tsx:43 ~ useEffect ~ internalAnimations", stateInternalAnimations)
		// console.log("🚀 ~ file: SpriteSheet.tsx:43 ~ useEffect ~ internalAnimations", stateCurrentAnimation)

		

		play()
	}, [])


	const play = () => {
		stateTime.setValue(0)
		Animated.timing(stateTime, {
			toValue: stateInternalAnimations[stateCurrentAnimation].input,
			duration: 1000,
			useNativeDriver: true,
		}).start(()=> {})
	}
	
	
	// style={[styles.img, {
	// 	transform: [
	// 		{ translateX: stateTime.interpolate({
	// 			inputRange:[0,0],
	// 			outputRange:[0,0],
	// 		})},
	// 		{ translateY: 0}
	// 	]
	// }]}

	// return <Image source={{uri: src}}/>
	// return <Image source={require('../../assets/slime.jiggle.png')}/>
	const isAnimated = (!!stateInternalAnimations[stateCurrentAnimation]?.input)
	console.log("🚀 ~ file: SpriteSheet.tsx:62 ~ SpriteSheet ~ isAnimated", isAnimated)
	if (!isAnimated) return null

  return (
		<View style={[styles.container, style]}>
			{/* <Image source={src} style={{width: 400, height: 400}}/> */}
			{/* <Image source={require('../../assets/slime.jiggle.png')} style={{width: 400, height: 400}}/> */}
			{/* <Image source={{uri: 'https://opengameart.org/sites/default/files/slime.jiggle.png'}} style={{width: 400, height: 400}}/> */}
			<Animated.Image
				source={{uri: 'https://opengameart.org/sites/default/files/slime.jiggle.png'}}
				style={[styles.img, {
					transform: [
						{ translateX: stateTime.interpolate({
							inputRange: stateInternalAnimations[stateCurrentAnimation].input,
							outputRange: stateInternalAnimations[stateCurrentAnimation].output,
						})},
						{ translateY: stateInternalAnimations[stateCurrentAnimation].translateY}
					]
				}]}
			/>
		</View>
  )
}

const getNumPairs = (length: number) => {
	const pairsArray: number[] = [];
	for (let index = 0; index < length; index++) {
		pairsArray.push(index)
		pairsArray.push(index)
	}
	return pairsArray
}

export default SpriteSheet

const styles = StyleSheet.create({
	container: {
		aspectRatio: 1,
		overflow: 'hidden',
		borderWidth: 1,
		height: 150,
	},
	img: {
		height: 400
	},
	// bkg: {
	// 	position: 'absolute',
	// 	aspectRatio: 1,
	// 	width: '100%',
	// 	height: undefined,
	// 	top: -150,
	// }
});