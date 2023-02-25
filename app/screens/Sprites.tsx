import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import MySpriteSheet from '../components/MySpriteSheet';
import MySpriteSheets from '../components/MySpriteSheets';
import Appetite from '../components/AppetiteButton';
import Message from '../components/MessageButton';
import { useSelector } from 'react-redux';

// import SpriteSheet from 'rn-sprite-sheet'

export default function Sprites() {
    const { appetite } = useSelector((state: RootState) => state.appetite);
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
    
    const spriteSize = 10 + appetite;

    return (
        <SafeAreaView  style={styles.spritesContainer}>
            <ScrollView>
                {/* <View style={styles.container}>
                    <Text>Open up App.tsx to start working on your app!</Text>
                    <StatusBar style="auto" />
                </View> */}
                {/* <Message /> */}
                <View>
                    <Appetite add={1} min={10} max={200} />
                    <Appetite add={-1} min={10} max={200} />
                    <Button title={'left'} onPress={()=>setStateSprite('left')} />
                    <Button title={'right'} onPress={()=>setStateSprite('right')} />
                    <Button title={'forward'} onPress={()=>setStateSprite('forward')} />
                    <Text style={styles.text}>{stateSprite}</Text>
                    <Text style={styles.text}>{spriteSize}</Text>
                </View>

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
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    spritesContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  text: {
    color: '#FFF'
  }
});
