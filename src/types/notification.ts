export type NotificationType = 'info' | 'warning' | 'error' | 'danger' | 'ack';

export type ApplicationName = '4screen' | 'carsync' | 'ZeekrGPT' | 'Zeekr Places' | 'Navi' | 'Zeekr Circle';

export interface BaseNotification {
  message: string;
  timestamp?: string;
}

export interface SystemNotification extends BaseNotification {
  type: NotificationType;
}

export interface ApplicationNotification extends BaseNotification {
  application: ApplicationName;
}

export type UnifiedNotification = SystemNotification | ApplicationNotification; 