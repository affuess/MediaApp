import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props{
    onPickGallary:() => void;
    onTakePhoto:() => void;
}

export const ControlButtons: React.FC<Props> = ({onPickGallary, onTakePhoto}) =>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.btn, styles.galleryBtn]} onPress={onPickGallary}>
                <Text style={styles.btnText}>📁Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.cameraBtn]} onPress={onTakePhoto}>
                <Text style={styles.btnText}>📷Camera</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flexDirection:'row',
      gap:12,
      marginTop: 20,  
    },
    btn:{
        flex:1,
        paddingVertical:14,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    galleryBtn:{
        backgroundColor:'#10b981',
    },
    cameraBtn:{
        backgroundColor:'#3b82f6',
    },
    btnText:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'bold',
    },
});