export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
  STAFF = 'STAFF',
}

export enum UserStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  BLOCKED = 'Blocked',
}

export enum TableStatus {
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CASHLESS = 'CASHLESS',
}

export enum OrderType {
  BUFFET = 'BUFFET',
  SET = 'SET',
  ITEM = 'ITEM',
}

export enum OrderStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FoodItemStatus {
  SERVED = 'SERVED',
  DOING = 'DOING',
}
