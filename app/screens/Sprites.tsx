import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import SpriteSheet from 'rn-sprite-sheet';
import MySpriteSheet from '../components/MySpriteSheet';
import Appetite from '../components/AppetiteButton';
import Message from '../components/MessageButton';

// import SpriteSheet from 'rn-sprite-sheet'

export default function Sprites() {

    const [stateSprite, setStateSprite] = useState('left')
    return (
        <SafeAreaView  style={styles.spritesContainer}>
            <ScrollView>
                {/* <View style={styles.container}>
                    <Text>Open up App.tsx to start working on your app!</Text>
                    <StatusBar style="auto" />
                </View> */}
                <Message />
                <Appetite />
                <Button title={'left'} onPress={()=>setStateSprite('left')} />
                <Button title={'right'} onPress={()=>setStateSprite('right')} />
                <Button title={'forward'} onPress={()=>setStateSprite('forward')} />
                <MySpriteSheet 
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
    color: '#000'
  }
});
