import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import MySpriteSheet from '../components/MySpriteSheet';
import MySpriteSheets from '../components/MySpriteSheets';
import Appetite from '../components/AppetiteButton';
import Message from '../components/MessageButton';
import { useSelector } from 'react-redux';
import ShrinkButton from '../components/ShrinkButton';
import GrowButton from '../components/GrowButton';
import SteakButton from '../components/food/SteakButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import StrengthButton from '../components/action/StrengthButton';
import SpeedButton from '../components/action/SpeedButton';

// import SpriteSheet from 'rn-sprite-sheet'

export default function Sprites() {
    const { size } = useSelector((state: RootState) => state.size);
    const ref = useRef(null)
    const [stateSprite, setStateSprite] = useState('forward')
    // console.log("🚀 ~ file: Sprites.tsx:16 ~ Sprites ~ stateSprite", stateSprite)
    // console.log("🚀 ~ file: Sprites.tsx:16 ~ Sprites ~ stateSprite", stateSprite)
    
    // setTimeout(()=>{
    //     ref.current && (ref.current as any).stop()
    // }, 2000)

    // setTimeout(()=>{
    //     ref.current && (ref.current as any).play()
    // },4000)

    // useEffect(() => {
    //     console.log("🚀 ~ file: Sprites.tsx:34 ~ useEffect ~ stateSprite", stateSprite)
        
    //     setTimeout(()=>{
    //         ref.current && (ref.current as any).stop()
    //     }, 2000)
    
    //     setTimeout(()=>{
    //         ref.current && (ref.current as any).play()
    //     },4000)
    // }, [stateSprite])\
    
    // useEffect(() => {
    //     console.log("🚀 ~ file: Sprites.tsx:34 ~ useEffect ~ stateSprite", stateSprite)
        
    //     setTimeout(()=>{
    //         ref.current && (ref.current as any).stop()
    //     }, 2000)
    
    //     setTimeout(()=>{
    //         ref.current && (ref.current as any).play()
    //     },4000)
    // }, [])



    const OriginalSprite = () => {
        return <MySpriteSheet 
                    style={{
                        // aspectRatio: 1,
                        // height: '50%',
                        // width: undefined,
                    }} 
                    src={require('../../assets/slime.jiggle.png')} 
                    columns={8} 
                    animations={[
                        { 
                            name: "left",
                            row: 0,
                            frames: 8
                        },
                        { 
                            name: "right",
                            row: 1,
                            frames: 8
                        },
                        { 
                            name: "forward",
                            row: 2,
                            frames: 8
                        }
                    ]}
                    defaultAnimation={stateSprite}

                />
    }
    
    const spriteSize = 10 + size;

    return (
        <SafeAreaView  style={styles.containerSAV} >
            <View  style={styles.containerMainView} >
                {/* <View style={styles.container}>
                    <Text>Open up App.tsx to start working on your app!</Text>
                    <StatusBar style="auto" />
                </View> */}
                {/* <Message /> */}
                <View style={styles.spritesContainer}>
                    <MySpriteSheets 
                        ref={ref}
                        // src={require('../../assets/slime.jiggle.svg')} 
                        src={require('../../assets/slime.jiggle.png')} 
                        columns={8} 
                        rows={3} 
                        frameSize={64}
                        frameVerticalOffset={-10}
                        frameHorizontalOffset={0}
                        size={spriteSize}
                        maxSize={250}
                        minSize={25}
                        // size={64}
                        animations={[
                            { 
                                name: "left",
                                row: 0,
                                frames: 8
                            },
                            { 
                                name: "right",
                                row: 1,
                                frames: 8
                            },
                            { 
                                name: "forward",
                                row: 2,
                                frames: 8
                            }
                        ]}
                        defaultAnimation={stateSprite}
                        style={{
                            aspectRatio: 1,
                            height: spriteSize,
                            // height: 64,
                            width: undefined,
                        }}
                    />   
                </View>
                <View style={styles.statsContainer}>
                    <Icon name="rocket" size={30} color="#900" />
                    <Text style={styles.text}>{stateSprite}</Text>
                    <Text style={styles.text}>{spriteSize}</Text>
                </View>
                <View style={styles.controlsContainer}>
                    <View style={styles.feedContainer}>
                        <GrowButton amount={1} max={250}/>
                        <SteakButton amount={50} max={250} />
                    </View>
                    <View style={styles.feedContainer}>
                        <ShrinkButton amount={1} min={25} />
                        <StrengthButton amount={50} min={25} />
                        <SpeedButton amount={25} min={25} />
                    </View>
                    <View style={styles.directionContainer}>
                        <Button title={'left'} onPress={()=>setStateSprite('left')} />
                        <Button title={'forward'} onPress={()=>setStateSprite('forward')} />
                        <Button title={'right'} onPress={()=>setStateSprite('right')} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerSAV: {
        width: '100%',
        backgroundColor: '#000',
    },
    containerMainView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
		borderWidth: 1,
        borderColor: 'purple',
    },
    spritesContainer: {
        width: '100%',
        flex: 5,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
		borderWidth: 1,
        borderColor: 'white'
    },
    statsContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
		borderWidth: 1,
        borderColor: 'red'
    },
    controlsContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
		borderWidth: 1,
        borderColor: 'green'
    },
    feedContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
		borderWidth: 1,
        borderColor: 'blue'
    },
    directionContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
		borderWidth: 1,
        borderColor: 'orange'
    },
    text: {
        color: '#FFF'
    }
});
