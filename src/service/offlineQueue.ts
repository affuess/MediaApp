import NetInfo from '@react-native-community/netinfo';
import { mmkvService } from './mmkvStorage';
import { apiClient } from '../api/apiClient';

export interface PendingAction {
    id: string;
    endpoint: string;
    method: 'POST' | 'PUT' | 'DELETE';
    payload: any;
}

const QUEUE_KEY = "offline_pending_action";

export const offlineQueue = {
    getQueue: (): PendingAction[] => {
        return mmkvService.getItem<PendingAction[]>(QUEUE_KEY) || [];
    },
    addAction: (action: Omit<PendingAction, 'id'>) => {
        const queue = offlineQueue.getQueue();
        const newAction: PendingAction = { ...action, id: Date.now().toString() };
        queue.push(newAction);
        mmkvService.setItem(QUEUE_KEY, queue);
    },
    removeAction: (actionId: string) => {
        const queue = offlineQueue.getQueue().filter((a) => a.id !== actionId);
        mmkvService.setItem(QUEUE_KEY, queue);
    },
    processQueue: async () => {
        const queue = offlineQueue.getQueue();
        if (queue.length === 0) return;
        for (const action of queue) {
            try {
                await apiClient.request({
                    url: action.endpoint,
                    method: action.method,
                    data: action.payload,
                });
                offlineQueue.removeAction(action.id);
            } catch {
                break;
            }
        }
    }
};

NetInfo.addEventListener((state) => {
    if (state.isConnected && state.isInternetReachable) {
        offlineQueue.processQueue();
    }
});