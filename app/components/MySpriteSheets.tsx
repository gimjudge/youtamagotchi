import { Animated, Easing, Image, LayoutChangeEvent, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { PropsWithChildren, useEffect, useState } from 'react'


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
	rows: 0,
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

export class MySpriteSheets extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)

		const internalAnimations: InternalAnimations = {
			[this.props.defaultAnimation]: blankInternalAnimation
		}

		this.state = {
			time: new Animated.Value(1.0),
			internalAnimations: internalAnimations,
			currentAnimation: this.props.defaultAnimation,
			size: defaultFrameSize,
			loaded: false,
			playing: false,

		}
		
		this.play()
		
		console.log("🚀 ~ file: MySpriteSheets.tsx:72 ~ MySpriteSheets ~ constructor ~ props", this.props)
	}
	
	// componentDidUpdate(prevProps) {
	// 	console.log("🚀 ~ file: MySpriteSheets.tsx:76 ~ MySpriteSheets ~ componentDidUpdate ~ prevProps", prevProps)
	// 	console.log("🚀 ~ file: MySpriteSheets.tsx:76 ~ MySpriteSheets ~ componentDidUpdate ~ this.props", this.props)
	// 	console.log("🚀 ~ file: MySpriteSheets.tsx:76 ~ MySpriteSheets ~ componentDidUpdate ~ this.props", this.state)
	// }


	play () {
		this.state.time.setValue(0)
		// console.log('play')
		// console.log(this.state.time)

		Animated.timing(this.state.time, {
			toValue: this.state.internalAnimations[this.state.currentAnimation].frames-1,
			duration: 500,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(( finished )=>{
			if ( !finished ) return; 

			if(!this.state.playing) {
				this.setState((prevState) => ({
					...prevState,
					playing: true,
				}))
			}
			this.play()
		})
	}

	stop = () => {
		this.state.time.stopAnimation()
	}

	generateInterpolationRanges = (event: LayoutChangeEvent) => {
		if (this.state.loaded) return;

		const size = event.nativeEvent.layout.height
		console.log("🚀 ~ file: MySpriteSheets.tsx:104 ~ MySpriteSheets ~ size", size)
		
		const internalAnimations: InternalAnimations = {}
		for (let animation of this.props.animations) {
			// console.log("🚀 ~ file: MySpriteSheet.tsx:16 ~ MySpriteSheet ~ constructor ~ animation", animation)

			const numberFrames = animation.frames ?? this.props.columns

			const internalAnimation = {
				frames: numberFrames,
				input: getNumPairs(numberFrames).slice(0, 2*numberFrames-1),
				output: [0].concat(getNumPairs(numberFrames-1).map((i) => -(i+1)*size)),
				translateY: animation.row*size
			}
				console.log("🚀 ~ file: MySpriteSheets.tsx:118 ~ MySpriteSheets ~ animation.row", internalAnimation)
			// console.log("🚀 ~ file: MySpriteSheets.tsx:24 ~ MySpriteSheet ~ constructor ~ internalAnimation", internalAnimation)
			internalAnimations[animation.name] = internalAnimation
		}
		
		// console.log("🚀 ~ file: MySpriteSheets.tsx:123 ~ MySpriteSheets ~ internalAnimations", internalAnimations)

		this.setState((prevState) => ({
			...prevState,
			internalAnimations: internalAnimations,
			size: size,
			loaded: true
		}))
		// this.play()
	}
	
	render() {
		console.log('this.state.currentAnimation',this.state.currentAnimation)
		console.log("🚀 ~ file: MySpriteSheets.tsx:166 ~ MySpriteSheets ~ render ~ this.state.internalAnimations[this.state.currentAnimation].translateY", this.state.internalAnimations[this.state.currentAnimation].translateY)

		return (
			<View 
				style={[styles.spriteContainer, this.props.style]}
				onLayout={this.generateInterpolationRanges}
			>
				{/* <Image source={src} style={{width: 400, height: 400}}/> */}
				{/* <Image source={require('../../assets/slime.jiggle.png')} style={{width: 400, height: 400}}/> */}
				{/* <Image source={{uri: 'https://opengameart.org/sites/default/files/slime.jiggle.png'}} style={{width: 400, height: 400}}/> */}
				<Animated.Image
					// source={{uri: 'https://opengameart.org/sites/default/files/slime.jiggle.png'}}
					source={require('../../assets/slime.jiggle.png')}
					style={[styles.img, {
						// opacity: this.state.playing ? 1.0 : 0.0 ,
						// height: this.state.size,
						width: this.state.size*this.props.columns,
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

export default MySpriteSheets

const styles = StyleSheet.create({
	spriteContainer: {
		aspectRatio: 1,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#f00',
		height: 64,
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