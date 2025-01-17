import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { existsSync } from 'fs';
const isDist = existsSync(join(__dirname, 'templates'));

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://mathyvathanas14@gmail.com:hohf rrix chhe lrwk@smtp.gmail.com',
      defaults: {
        from: 'mathyvathanas14@gmail.com',
      },
      template: {
        dir:join(__dirname, 'templates') ,
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports:[EmailService]
})
export class EmailModule {}
