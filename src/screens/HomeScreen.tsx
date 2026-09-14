import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useMediaPicker } from "../hooks/useMediaPicker";
import { ControlButtons } from "../components/ControlButtons";
import { HomeScreenProps } from "../types/navigation";


export const HomeScreen: React.FC<HomeScreenProps> =({navigation}) =>{
    const {selectedMedia, pickFromGallery, takePhoto, clearMedia} = useMediaPicker();

    const handlePickGallery = async () => {
        await pickFromGallery();
    };

    const handleTakePhoto = async () => {
        await takePhoto();

    };
return (
  <View style={style.container}>
    <Text style={style.title}>Media Manager📱</Text>
    <ControlButtons 
      onPickGallary={handlePickGallery}
      onTakePhoto={handleTakePhoto}
    />
    
    {selectedMedia && (
      <View style={style.previewCard}>
        <Text style={style.previewText}>
          Selected file: {selectedMedia.type === 'image' ? '🖼️ Photo' : '🎥 Video'}
        </Text>

        <TouchableOpacity
          style={style.openBtn}
          onPress={() => navigation.navigate('MediaDetail', { media: selectedMedia })}
        >
          <Text style={style.openBtnTxt}>Open Fullscreen ➔</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.clearBtn} onPress={clearMedia}>
          <Text style={style.clearBtnTxt}>Clear selection</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);
    
}
const style = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"rgb(107, 184, 233)",
        justifyContent:'center',
    },
    title:{
        fontSize:26,
        fontWeight:'bold',
        color:"rgb(255, 0, 195)",
        textAlign:'center',
        marginBottom:30,
    },
    previewText:{
        fontSize:16,
        color:"rgb(0, 0, 0)",
        marginBottom:12,
    },
    previewCard:{
        marginTop:30,
        padding:16,
        backgroundColor:"rgb(60, 255, 0)",
        borderRadius:12,
        borderWidth:1,
        borderColor:"rgb(5, 61, 3)",
        alignItems:'center',
    },
    openBtn:{
        backgroundColor:"rgb(232, 11, 235)",
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:9,
        marginBottom:8,
    },
    openBtnTxt:{
        color:"rgb(0, 0, 0)",
        fontWeight:'bold',
    },
    clearBtn:{
        paddingVertical:6,
    },
    clearBtnTxt:{
        color:"rgb(0, 0, 0)",
        fontSize:14,
    },
});