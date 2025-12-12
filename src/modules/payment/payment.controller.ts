import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { PaymentDto } from 'src/modules/payment/dto/payment.dto';
import { GetJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, JwtPayload } from 'src/modules/auth/jwt/jwt.guard';
import { UserType } from 'src/constants/enum.constant';
import { AllowedRoles } from 'src/shared/guards/role.guards';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  handleWebhook(@Body() paymentDto: PaymentDto) {
    return this.paymentService.confirmPayment(paymentDto);
  }

  @Post('confirm/:orderId')
  @HttpCode(HttpStatus.OK)
  confirmPayment(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.paymentService.FEconfirmPayment(orderId);
  }
}
