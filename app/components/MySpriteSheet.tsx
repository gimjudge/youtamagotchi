import { Animated, Image, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren, useEffect, useState } from 'react'


const frameSize = 64

interface Animation {
	name: string;
	row: number;
	frames?: number;
}

type InternalAnimations = {[key: string]: InternalAnimation}

interface InternalAnimation {
	frames: number;
	input: number[];
	output: number[];
	translateY: number;
}

const blankInternalAnimation: InternalAnimation = {
	frames: 0,
	input: [0, 0],
	output: [0, 0],
	translateY: 0,

}
interface Props {
	src: any;
	rows?: number;
	columns: number;
	rate?: number;
	animations: Animation[];
	defaultAnimation: string;
	style?: StyleProp<ViewStyle>;
}

const defaultProps: Partial<Props> = {
	rows: 1,
}
const defaultFrameSize = 64

interface State {
	time: Animated.Value;
	internalAnimations: InternalAnimations;
	currentAnimation: string;
	size: number;
	loaded: boolean;
	playing: boolean;
}

export class MySpriteSheet extends React.Component<Props, State> {


	constructor(props: Props) {
		super(props)

		const internalAnimations = {}
		for (let animation of this.props.animations) {

			const numberFrames = animation.frames ?? this.props.columns
			// console.log("🚀 ~ file: MySpriteSheet.tsx:74 ~ MySpriteSheet ~ constructor ~ frameSize", frameSize)
			

			const internalAnimation = {
				frames: numberFrames,
				input: getNumPairs(numberFrames).slice(0, 2*numberFrames-1),
				output: [0].concat(getNumPairs(numberFrames-1).map((i) => -(i+1)*frameSize)),
				translateY: -animation.row*frameSize
			}
			// console.log("🚀 ~ file: MySpriteSheet.tsx:24 ~ MySpriteSheet ~ constructor ~ internalAnimation", internalAnimation)
			internalAnimations[animation.name] = internalAnimation
		}

		this.state = {
			time: new Animated.Value(1.0),
			internalAnimations: internalAnimations,
			currentAnimation: this.props.defaultAnimation,

		}
		
		this.play()
	}


	play () {
		this.state.time.setValue(0)
		Animated.timing(this.state.time, {
			toValue: this.state.internalAnimations[this.state.currentAnimation].frames,
			duration: 1000,
			useNativeDriver: true,
		}).start(()=> this.play())
	}
	
	render() {
		// this.props
		// console.log("🚀 ~ file: MySpriteSheet.tsx:101 ~ MySpriteSheet ~ render ~ this.props", this.props)
		return (
			<View 
				style={[styles.spriteContainer, this.props.style]}
				// onLayout={this.onLayout}
			>
				{/* <Image source={src} style={{width: 400, height: 400}}/> */}
				{/* <Image source={require('../../assets/slime.jiggle.png')} style={{width: 400, height: 400}}/> */}
				{/* <Image source={{uri: 'https://opengameart.org/sites/default/files/slime.jiggle.png'}} style={{width: 400, height: 400}}/> */}
				<Animated.Image
					// source={{uri: 'https://opengameart.org/sites/default/files/slime.jiggle.png'}}
					source={require('../../assets/slime.jiggle.png')}
					style={[styles.img, {
						transform: [
							{ translateX: this.state.time.interpolate({
								inputRange: this.state.internalAnimations[this.state.currentAnimation].input,
								outputRange: this.state.internalAnimations[this.state.currentAnimation].output,
							})},
							{ translateY: this.state.internalAnimations[this.state.currentAnimation].translateY}
						]
					}]}
				/>
			</View>
		)
	}
}

const getNumPairs = (length: number) => {
	const pairsArray: number[] = [];
	for (let index = 0; index < length; index++) {
		pairsArray.push(index)
		pairsArray.push(index)
	}
	return pairsArray
}

export default MySpriteSheet

const styles = StyleSheet.create({
	spriteContainer: {
		aspectRatio: 1,
		height: 64,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#f00',
		// height: 150,
	},
	img: {

	},
	// bkg: {
	// 	position: 'absolute',
	// 	aspectRatio: 1,
	// 	width: '100%',
	// 	height: undefined,
	// 	top: -150,
	// }
});