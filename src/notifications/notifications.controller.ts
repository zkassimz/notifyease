import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  async sendNotification(@Body() body: { token: string, message: { title: string, body: string } }) {
    return this.notificationsService.sendNotification(body.token, body.message);
  }

  @Post('send-multiple')
  async sendNotificationsToMultipleDevices(@Body() body: { tokens: string[], message: { title: string, body: string } }) {
    return this.notificationsService.sendNotificationsToMultipleDevices(body.tokens, body.message);
  }
}
