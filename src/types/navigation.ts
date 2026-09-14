import{NativeStackScreenProps} from '@react-navigation/native-stack'
import { MediaFile } from './media'

export type RootStackParamList = {
    Home: undefined;
    MediaDetail: {media: MediaFile};
    Profile: undefined;
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type MediaDetailScreenProps = NativeStackScreenProps<RootStackParamList, "MediaDetail">;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;