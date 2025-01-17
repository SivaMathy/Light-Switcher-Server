import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class EmailService {
    constructor (private mailService:MailerService){}
   async sendMail(email:string,subject:string){
    await this.mailService.sendMail({
        to:email,
        subject:subject,
      template: './invitation'
    })
   }
}
