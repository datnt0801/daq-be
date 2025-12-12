import { IsNumber, IsString, IsOptional } from 'class-validator';

export class PaymentDto {
  @IsNumber()
  id: number;

  @IsString()
  gateway: string;

  @IsString()
  transactionDate: string;

  @IsString()
  accountNumber: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsString()
  content: string;

  @IsString()
  transferType: string;

  @IsNumber()
  transferAmount: number;

  @IsNumber()
  accumulated: number;

  @IsOptional()
  @IsString()
  subAccount?: string;

  @IsString()
  referenceCode: string;

  @IsString()
  description: string;
}
