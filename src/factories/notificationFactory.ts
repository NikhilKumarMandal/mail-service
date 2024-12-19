import { MailTransport } from "../mail"
import { NotificationTransport } from "../types/notificationTypes"

const transport: NotificationTransport[] = [];


export const createNotificationTransport = (type: "mail" | "sms"): NotificationTransport => {
    switch (type) {
        case 'mail': {
            const requiredTransportCache = transport.find(transport => transport instanceof MailTransport);
            if (requiredTransportCache) return requiredTransportCache;
            const instance = new MailTransport();
            transport.push(instance)
            return instance;  
        }
        case 'sms':
            throw new Error("SMS notification is not supported.")
        default:
            throw new Error(`${type} Notification provider is not supported`)
    }
}