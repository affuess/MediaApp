import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { MediaFile } from "../types/media";

interface Props{
    media: MediaFile | null,
    onClear: () => void;
}

export const MediaPreview: React.FC<Props> =({media, onClear}) => {
    if(!media){
        return(
            <View style = {styles.emptyContainer}>
                <Text style = {styles.emptyText}>No file selected</Text>
            </View>
        );
    }
    return(
        <View style = {styles.container}>
            {media.type === 'image' ? (
                <Image source={{ uri: media.uri }} style={styles.media} resizeMode="cover" />
                ) : (
                <VideoPlayerView uri={media.uri} />
            )}
        
            <TouchableOpacity style={styles.clearBtn} onPress={onClear}>
                <Text style={styles.clearBtnText}>Delete file</Text>
            </TouchableOpacity>
        </View>
    );
}

const VideoPlayerView: React.FC<{uri: string}> = ({uri}) =>{
    const player = useVideoPlayer(uri, (player) => {
        player.loop = true;
        player.play();
    });

    return(
        <VideoView
            style = {styles.media}
            player={player}
            allowsPictureInPicture
        ></VideoView>
    );
};

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center'
    },
    emptyContainer:{
        height:300,
        width:'100%',
        backgroundColor:'#1e293b',
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 2,
        borderColor:'#334155',
        borderStyle: 'dashed',
    },
    emptyText:{
        color:'#94a3b8',
        fontSize:16,
    },
    media:{
        width:'100%',
        height:300,
        borderRadius:12,
    },
    clearBtn:{
        marginTop: 12,
        backgroundColor:'#110664',
        paddingVertical:8,
        paddingHorizontal:16,
        borderRadius:6,
    },
    clearBtnText:{
        color:'#ffffff',
        fontWeight:"bold",
    },
})