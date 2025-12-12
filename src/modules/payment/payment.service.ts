import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/database/repositories/orders.repository';  
import { OrderStatus, OrderType } from 'src/constants/enum.constant';
import { PaymentDto } from 'src/modules/payment/dto/payment.dto';
import { BuffetRepository } from 'src/database/repositories/buffet.repository';
import { SetRepository } from 'src/database/repositories/set.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly orderRepo: OrderRepository,
    private readonly buffetRepo: BuffetRepository,
    private readonly setRepo: SetRepository) {

  }

  async confirmPayment(payload: PaymentDto) {
    console.log( "DEBUG PAYMENT: ", payload);
    let amount;
    if(payload.transferType === 'in') {
        const code = payload.code || ""; // "DH123"
        const orderId = code.replace(/\D/g, ""); // -> "123"
        const orderIdNumber = Number(orderId);   // -> 123
        
      const order = await this.orderRepo.findOne({ where: { id: orderIdNumber } });
      if(order && order.status === OrderStatus.UNPAID) {
        if (order.type === OrderType.BUFFET) {
          const buffet = await this.buffetRepo.findOne({ where: { id: order.type_id } });
          amount = order.total * buffet?.price!;
        }
        if (order.type === OrderType.SET) {
          const set = await this.setRepo.findOne({ where: { id: order.type_id } });
          amount = order.total * set?.price!;
        }
        if (payload.transferAmount === amount) {
          order.status = OrderStatus.PAID;
          await this.orderRepo.save(order);
          return { message: 'success' };
        }
       
      }
    }
    return { message: 'not found' };
  }

  async FEconfirmPayment(orderId: number) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if(order && order.status === OrderStatus.PAID) {
      return { message: 'paid' };
    }
    return { message: 'unpaid' };
  }
}
