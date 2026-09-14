import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MediaFile } from "../types/media";

export const useMediaPicker = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);

  const pickFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Error", "Need permission from gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setSelectedMedia({
        uri: asset.uri,
        type: asset.type === "video" ? "video" : "image",
        width: asset.width,
        height: asset.height,
      });
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Error", "Need permission for camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setSelectedMedia({
        uri: asset.uri,
        type: "image",
        width: asset.width,
        height: asset.height,
      });
    }
  };

  const clearMedia = () => setSelectedMedia(null);

  return {
    selectedMedia,
    pickFromGallery,
    takePhoto,
    clearMedia,
  };
};