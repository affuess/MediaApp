import { useState, useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';
import { mmkvService } from "../service/mmkvStorage";
import { offlineQueue } from "../service/offlineQueue";
import { apiClient } from "../api/apiClient";

export function useOfflineData<T>(cacheKey: string, fetchEndpoint: string) {
    const [data, setData] = useState<T | null>(() => mmkvService.getItem<T>(cacheKey));
    const [loading, setLoading] = useState<boolean>(!data);
    const [isOffline, setIsOffline] = useState<boolean>(false);

    const loadData = async () => {
        const netState = await NetInfo.fetch();
        setIsOffline(!netState.isConnected);
        const cacheData = mmkvService.getItem<T>(cacheKey);
        if (cacheData) {
            setData(cacheData);
        }
        if (netState.isConnected) {
            try {
                setLoading(true);
                const response = await apiClient.get<T>(fetchEndpoint);
                setData(response.data);
                mmkvService.setItem(cacheKey, response.data);
            } catch {
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOffline(!state.isConnected);
        });
        return () => unsubscribe();
    }, [fetchEndpoint]);

    const createItem = async (newItemPayload: any) => {
        const newState = await NetInfo.fetch();
        if (newState.isConnected) {
            await apiClient.post(fetchEndpoint, newItemPayload);
            await loadData();
        } else {
            offlineQueue.addAction({
                endpoint: fetchEndpoint,
                method: 'POST',
                payload: newItemPayload,
            });

            if (Array.isArray(data)) {
                const updated = [newItemPayload, ...data] as unknown as T;
                setData(updated);
                mmkvService.setItem(cacheKey, updated);
            }
        }
    };

    return { data, loading, isOffline, refresh: loadData, createItem };
}