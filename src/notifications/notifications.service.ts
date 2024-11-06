import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { MessagingPayload } from 'firebase-admin/lib/messaging';

@Injectable()
export class NotificationsService {
  constructor() {
    const serviceAccount = require('../firebase-adminsdk.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async sendNotification(token: string, message: { title: string, body: string }) {
    const payload: MessagingPayload = {
      notification: {
        title: message.title,
        body: message.body,
      },
    };

    try {
      const response = await admin.messaging().sendToDevice(token, payload);
      console.log('Notificação enviada:', response);
      return response;
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      throw error;
    }
  }

  async sendNotificationsToMultipleDevices(tokens: string[], message: { title: string, body: string }) {
    const payload: MessagingPayload = {
      notification: {
        title: message.title,
        body: message.body,
      },
    };

    try {
      const response = await admin.messaging().sendMulticast({ tokens, ...payload });
      console.log('Notificações enviadas:', response.successCount);
      return response;
    } catch (error) {
      console.error('Erro ao enviar notificações:', error);
      throw error;
    }
  }
}
