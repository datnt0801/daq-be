import { Global, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSource } from 'src/configs/database.config';
import { databaseConfig } from 'src/configs/database.config';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserRepository } from 'src/database/repositories/users.repository';
import { BuffetEntity } from 'src/database/entities/buffet.entity';
import { BuffetItemEntity } from 'src/database/entities/buffet_item.entity';
import { SetEntity } from 'src/database/entities/set.entity';
import { SetItemEntity } from 'src/database/entities/set_item.entity';
import { FoodItemEntity } from 'src/database/entities/food_items.entity';
import { FoodCategory } from 'src/database/entities/food_category';
import { BuffetRepository } from 'src/database/repositories/buffet.repository';
import { SetRepository } from 'src/database/repositories/set.repository';
import { BuffetItemRepository } from 'src/database/repositories/buffet-item.repository';
import { SetItemRepository } from 'src/database/repositories/set-item.repository';
import { FoodItemRepository } from 'src/database/repositories/food-items.repository';
import { FoodCategoryRepository } from 'src/database/repositories/food-categories.repository';
import { OrderEntity } from 'src/database/entities/orders.entity';
import { OrderRepository } from 'src/database/repositories/orders.repository';
import { OrderDetail } from 'src/database/entities/order_detail.entity';
import { OrderDetailRepository } from 'src/database/repositories/order-details.repository';

const entities = [
  UserEntity,
  BuffetEntity,
  BuffetItemEntity, 
  SetEntity,
  SetItemEntity, 
  FoodItemEntity,
  FoodCategory,
  OrderEntity, 
  OrderDetail,
  ];
const repositories = [
  UserRepository,
  BuffetRepository,
  SetRepository,
  BuffetItemRepository, 
  SetItemRepository,
  FoodItemRepository, 
  FoodCategoryRepository,
  OrderRepository,
  OrderDetailRepository,
];

const typeOrmModule = TypeOrmModule.forRoot(databaseConfig);

export const databaseProviders: Provider[] = [
  {
    provide: DataSource,
    useFactory: async () => {
      try {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
      } catch (error) {
        console.error(error?.message);
        process.exit(-100);
      }

      return dataSource;
    },
  },
];

@Global()
@Module({
  imports: [typeOrmModule, TypeOrmModule.forFeature(entities)],
  providers: [...databaseProviders, ...repositories],
  exports: [...databaseProviders, ...repositories],
})
export class DatabaseModule {}
