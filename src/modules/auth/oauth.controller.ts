import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FirstTimePasswordDto } from 'src/modules/auth/dto/first-time-password.dto';
import { SignInGoogleDto } from 'src/modules/auth/dto/sign-in-google.dto';
import { JwtAuthGuard, JwtPayload } from 'src/modules/auth/jwt/jwt.guard';
import { OAuthService } from 'src/modules/auth/oauth.service';
import { GetJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';

@Controller('oauth')
@ApiTags('OAuth')
@ApiBearerAuth()
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Post('/google-auth-redirect')
  @ApiOperation({
    summary: 'Google auth redirect',
    description: 'Google auth redirect',
  })
  signInGoogle(@Body() body: SignInGoogleDto) {
    return this.oauthService.loginWithGoogle(body);
  }

  @Post('/first-time-password')
  @ApiOperation({
    summary: 'First time password',
    description: 'First time password',
  })
  @UseGuards(JwtAuthGuard)
  firstTimePassword(@Body() firstTimePasswordDto: FirstTimePasswordDto, @GetJwtPayload() payload: JwtPayload) {
    return this.oauthService.firstTimePassword(firstTimePasswordDto, payload.userId);
  }

  @Get('/First-time-oauth-status')
  @ApiOperation({
    summary: 'First time oauth status',
    description: 'First time oauth status',
  })
  @UseGuards(JwtAuthGuard)
  firstTimeOauthStatus(@GetJwtPayload() payload: JwtPayload) {
    return this.oauthService.firstTimeOauthStatus(payload.userId);
  }
}
