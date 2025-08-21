import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { RedisService } from "@liaoliaots/nestjs-redis";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";
import { ERROR_MESSAGES } from "src/shared/messages/error-messages";
import { AuthService } from "./auth.service";
import { UserRepository } from "src/database/repositories/users.repository";
import { createHash } from "crypto";
import { SignInGoogleDto } from "src/modules/auth/dto/sign-in-google.dto";
import { FirstTimePasswordDto } from "src/modules/auth/dto/first-time-password.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class OAuthService {

    private readonly oauth2Client: OAuth2Client;

    private readonly redisClient: Redis;

    private readonly logger = new Logger(OAuthService.name);

    constructor(
        private readonly redisService: RedisService,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository,
    ) {
        this.oauth2Client = new OAuth2Client({
            clientId: this.configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
        });
        this.redisClient = this.redisService.getClient();
    }

    async verifyToken(token: string) {
        try {

            const ticket = await this.oauth2Client.verifyIdToken ({
                idToken: token,
                audience: this.configService.get('GOOGLE_CLIENT_ID'),
            });
            
            const payload = ticket.getPayload();
            
            return payload;

        } catch (error) {
            this.logger.error('Error verifying Google token');
            this.logger.error(error);
           throw new BadRequestException(ERROR_MESSAGES.INVALID_TOKEN);
        }
        
    }

    async loginWithGoogle(payload: SignInGoogleDto) {
        const data = await this.verifyToken(payload.credential);
    
        const user = await this.userRepository.findOne({
          where: {
            email: data?.email,
          },
        });

        if (!user) {
            throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND);
        }
    
        const requirePasswordChange = await this.redisClient.get(`REQUIRE_PASSWORD_CHANGE_${user.id}`);
    
        const credentials = await this.authService.generateCredentials(user);
    
        if (requirePasswordChange && requirePasswordChange === 'true') {
          const oneTimeAccessToken = createHash('sha256').update(Date.now().toString()).digest('hex');
    
          this.redisClient.set(`REQUIRE_PASSWORD_CHANGE_ONE_TIME_TOKEN_${user.id}`, oneTimeAccessToken);
    
          return {
            requirePasswordChange,
            message: 'Mật khẩu cần thay đổi khi đăng nhập lần đầu',
            user,
            oneTimeAccessToken,
          };
        }
    
        return { credentials, user };
      }

      async firstTimePassword(firstTimePasswordDto: FirstTimePasswordDto, userId: number) {
        const user = await this.userRepository.findOne({
          where: {
            id: userId,
          },
        });
        if (!user) {
          throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND);
        }
    
        if (user.hashPassword !== 'no-password') {
          throw new BadRequestException(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }
    
        const hashPassword = bcrypt.hashSync(firstTimePasswordDto.password, 10);
    
        user.hashPassword = hashPassword;
    
        await this.userRepository.save(user);
    
        return true;
      }
    
      async firstTimeOauthStatus(userId: number) {
        const user = await this.userRepository.findOne({
          where: {
            id: userId,
          },
        });
        if (!user) {
          throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND);
        }
    
        return user.hashPassword === 'no-password';
      }
}
