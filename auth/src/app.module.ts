import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenModule } from './authen/authen.module';

@Module({
  imports: [AuthenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
