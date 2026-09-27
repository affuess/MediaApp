import { MMKV } from "react-native-mmkv";


export const storage = new MMKV({
    id: 'user-default-storage'
}); 
export const mmkvService = {
    setItem: <T>(key: string, value: T): void => {
        storage.set(key, JSON.stringify(value));
    },
    getItem: <T>(key: string): T | null =>
    {
        const json = storage.getString(key);
        if(!json) return null;
        try{
            return JSON.parse(json) as T;
        }catch{
            return null;
        }
    },
    removeItem: (key: string): void =>{
        storage.delete(key);
    }
}