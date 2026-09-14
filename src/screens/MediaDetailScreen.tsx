import React from "react";
import { MediaDetailScreenProps } from "../types/navigation";
import { View, StyleSheet } from "react-native";
import { MediaPreview } from "../components/MediaPreview";

export const MediaDetailScreen: React.FC<MediaDetailScreenProps> = ({ route, navigation }) => {
  const { media } = route.params;

  return (
    <View style={styles.container}>
      <MediaPreview 
        media={media} 
        onClear={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    padding: 16,
  },
});