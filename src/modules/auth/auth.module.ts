import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailModule } from 'src/modules/email/email.module';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';

@Module({
  imports: [EmailModule],
  controllers: [AuthController, OAuthController],
  providers: [AuthService, OAuthService],
})
export class AuthModule {}
