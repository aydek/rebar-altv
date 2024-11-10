export type NotificationTypes = 'info' | 'error' | 'bell' | 'bag' | 'success' | 'warning';

export type INotification = {
    type: NotificationTypes;
    message: string;
};
