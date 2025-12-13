import { Injectable } from '@nestjs/common';
import { BuffetItemRepository } from 'src/database/repositories/buffet-item.repository';
import { BuffetRepository } from 'src/database/repositories/buffet.repository';
import { SetItemRepository } from 'src/database/repositories/set-item.repository';
import { SetRepository } from 'src/database/repositories/set.repository';
import { FoodItemRepository } from 'src/database/repositories/food-items.repository';
import { CreateBuffetDto } from 'src/modules/menu/dto/buffet.dto';
import { CreateSetItemDto } from 'src/modules/menu/dto/set-item.dto';
import { CreateSetDto } from 'src/modules/menu/dto/set.dto';
import { CreateBuffetItemDto } from 'src/modules/menu/dto/buffet-item.dto';
import { In } from 'typeorm';
import { FoodCategoryRepository } from 'src/database/repositories/food-categories.repository';
import { CreateOrderDto } from 'src/modules/menu/dto/order-dto';
import { OrderRepository } from 'src/database/repositories/orders.repository';
import { JwtPayload } from 'src/modules/auth/jwt/jwt.guard';
import { FoodItemStatus, OrderStatus, UserType } from 'src/constants/enum.constant';
import { CreateOrderDetailDto } from 'src/modules/menu/dto/order-dto copy';
import { OrderDetailRepository } from 'src/database/repositories/order-details.repository';
import { async } from 'rxjs';

@Injectable()
export class MenuService {
    constructor(
        private readonly buffetRepository: BuffetRepository,
        private readonly setRepository: SetRepository,
        private readonly buffetItemRepository: BuffetItemRepository,
        private readonly setItemRepository: SetItemRepository,  
        private readonly foodItemRepository: FoodItemRepository,
        private readonly foodCategoryRepository: FoodCategoryRepository,
        private readonly orderRepository: OrderRepository,
        private readonly orderDetailRepository: OrderDetailRepository,
    ) {}
  
  async createBuffet(createBuffetDto: CreateBuffetDto) {
    return this.buffetRepository.save(createBuffetDto);
  }

  async findAllBuffet() {
    return this.buffetRepository.find();
  }

  async findOneBuffet(id: number) {
    return this.buffetRepository.findOne({ where: { id } });
  }

  async updateBuffet(id: number, updateBuffetDto: CreateBuffetDto) {
    return this.buffetRepository.update(id, updateBuffetDto);
  }

  async removeBuffet(id: number) {
    return this.buffetRepository.delete(id);
  }

  async createSet(createSetDto: CreateSetDto) {
    return this.setRepository.save(createSetDto);
  }

  async findAllSet() {
    return this.setRepository.find();
  }

  async findOneSet(id: number) {
    return this.setRepository.findOne({ where: { id } });
  }

  async updateSet(id: number, updateSetDto: CreateSetDto) {
    return this.setRepository.update(id, updateSetDto);
  }

  async removeSet(id: number) {
    return this.setRepository.delete(id);
  }

  async createBuffetItem(createBuffetItemDto: CreateBuffetItemDto) {
    return this.buffetItemRepository.save(createBuffetItemDto);
  }

  async findAllBuffetItem() {
    return this.buffetItemRepository.find();
  }

  async findOneBuffetItem(id: number) {
    return this.buffetItemRepository.findOne({ where: { id } });
  }

  async updateBuffetItem(id: number, updateBuffetItemDto: CreateBuffetItemDto) {
    return this.buffetItemRepository.update(id, updateBuffetItemDto);
  }

  async removeBuffetItem(id: number) {
    return this.buffetItemRepository.delete(id);
  }

  async createSetItem(createSetItemDto: CreateSetItemDto) {
    return this.setItemRepository.save(createSetItemDto);
  }

  async findAllSetItem() {
    return this.setItemRepository.find();
  }

  async findOneSetItem(id: number) {
    return this.setItemRepository.findOne({ where: { id } });
  }

  async updateSetItem(id: number, updateSetItemDto: CreateSetItemDto) {
    return this.setItemRepository.update(id, updateSetItemDto);
  }

  async removeSetItem(id: number) {
    return this.setItemRepository.delete(id);
  }

  async findAllItemsByBuffetId(buffetId: number) {
    const buffetItems = await this.buffetItemRepository.find({ where: { buffetId } });
    const foodItems = await this.foodItemRepository.find({ where: { id: In(buffetItems.map(item => item.foodItemId)) } });
    return foodItems;
  }

  async findAllItemsBySetId(setId: number) {
    const setItems = await this.setItemRepository.find({ where: { setId } });
    const foodItems = await this.foodItemRepository.find({ where: { id: In(setItems.map(item => item.foodItemId)) } });
    return foodItems;
  }

  async findAllCategoriesAndItemsByMenuId(menuId: number, type: string) {
    let categories = await this.foodCategoryRepository.find();
    let items;
    let data;
    data = categories.map((category: any) => ({
      category,
      items: []
    }));
    
    if(type === 'item') {
      items = await this.foodItemRepository.find();
      items.forEach((item: any) => {
       return data[item.foodCategoryId].items.push(item);
      });
      // console.log('[DEBUG] items',items);
      // console.log('[DEBUG] categories',categories);
      // for(let i = 0; i < data.length; i++) {
      //   console.log('[DEBUG] data',data[i].items);
      // }

      return data;
    }
    if(type === 'buffet') {
      items = await this.findAllItemsByBuffetId(menuId);
      // console.log('[DEBUG] buffet items',items);
      items.forEach((item: any) => {
        return data[item.foodCategoryId].items.push(item);
       });

       return data;
    }
    if(type === 'set') {
      items = await this.findAllItemsBySetId(menuId);
      // console.log('[DEBUG] set items',items);
      items.forEach((item: any) => {
        return data[item.foodCategoryId].items.push(item);
       });

       return data;
    }
  }

  async findAllItemsByOrderId(orderId: number) {
    const orderDetails = await this.orderDetailRepository.find({ where: { order_id: orderId } });
    const foodItems = await this.foodItemRepository.find({ where: { id: In(orderDetails.map(item => item.food_item_id)) } });

    const result = orderDetails.map(detail => {
      const item = foodItems.find(f => f.id === detail.food_item_id);
      return {
        item,
        quantity: detail.amount,
        status: detail.status
      };
    });
   
    return result;
  }

  async createOrder(payload: JwtPayload, createOrderDto: CreateOrderDto) {
    //TODO: check if order is already created, check table_id
    let result;
    if(payload.userType === UserType.USER) {
      createOrderDto.user_id = payload.userId;
      result = await this.orderRepository.save(createOrderDto);
    } else {
      result = await this.orderRepository.save(createOrderDto);
    }
   
    return result;
  }

  async findAllOrders() {
    return this.orderRepository.find();
  }

  async findOneOrder(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  async updateOrder(id: number, updateOrderDto: CreateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  async removeOrder(id: number) {
    return this.orderRepository.delete(id);
  }

  async createOrderDetail(createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailRepository.save(createOrderDetailDto);
  }

  // async createOrderDetailsByOrderId(orderId: number, createOrderDetailsDto: {foodItemId: number, quantity: number}[]) {
  //   const dataNeedUpdate = await this.orderDetailRepository.find({ where: { order_id: orderId, food_item_id: In(createOrderDetailsDto.map(item => item.foodItemId)), status: FoodItemStatus.DOING} });
  //   dataNeedUpdate.forEach((item: any) => {
  //     item.amount += createOrderDetailsDto.find((detail: any) => detail.foodItemId === item.food_item_id)?.quantity || 0;
  //   });
  //   return this.orderDetailRepository.save(dataNeedUpdate);
  // }

  async createOrderDetailsByOrderId(
    orderId: number,
    createOrderDetailsDto: { foodItemId: number; quantity: number }[]
  ) {
    const foodIds = createOrderDetailsDto.map(i => i.foodItemId);

    const dataNeedUpdate = await this.orderDetailRepository.find({
      where: {
        order_id: orderId,
        food_item_id: In(foodIds),
        status: FoodItemStatus.DOING,
      },
    });

    const existingIds = new Set(dataNeedUpdate.map(d => d.food_item_id));
  
    const dataNeedInsert = createOrderDetailsDto
      .filter(i => !existingIds.has(i.foodItemId))
      .map(i => ({
        order_id: orderId,
        food_item_id: i.foodItemId,
        amount: i.quantity,
        status: FoodItemStatus.DOING,
      }));

      const dataToUpdate = dataNeedUpdate.map(i => {
        const detail = createOrderDetailsDto.find(
          d => d.foodItemId === i.food_item_id
        );
      
        const addQuantity = detail ? detail.quantity : 0;
      
        return {
          id: i.id,
          amount: i.amount + addQuantity,
        };
      });
      

    if (dataNeedInsert.length > 0) {
      await this.orderDetailRepository.save(dataNeedInsert);
    }
  
    if (dataToUpdate.length > 0) {
      await this.orderDetailRepository.save(dataToUpdate);
    }
  
    return {
      updated: dataToUpdate,
      inserted: dataNeedInsert,
    };
  }
  

  async findAllOrderDetails() {
    return this.orderDetailRepository.find();
  }

  async findAllOrderDetailsByOrderId(orderId: number) {
    return this.orderDetailRepository.find({ where: { order_id: orderId } });
  }

  async findOneOrderDetail(id: number) {
    return this.orderDetailRepository.findOne({ where: { id } });
  }

  async updateOrderDetail(id: number, updateOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailRepository.update(id, updateOrderDetailDto);
  }

  async removeOrderDetail(id: number) {
    return this.orderDetailRepository.delete(id);
  }

  async checkPayment(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    return { confirmed: order?.status === OrderStatus.PAID}
  }
}
