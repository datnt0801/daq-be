import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, JwtPayload } from 'src/modules/auth/jwt/jwt.guard';
import { AllowedRoles } from 'src/shared/guards/role.guards';
import { UserType } from 'src/constants/enum.constant';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateBuffetDto } from 'src/modules/menu/dto/buffet.dto';
import { CreateSetDto } from 'src/modules/menu/dto/set.dto';
import { CreateSetItemDto } from 'src/modules/menu/dto/set-item.dto';
import { CreateBuffetItemDto } from 'src/modules/menu/dto/buffet-item.dto';
import { ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto } from 'src/modules/menu/dto/order-dto';
import { GetJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';
import { CreateOrderDetailDto } from 'src/modules/menu/dto/order-dto copy';
import { ApiOperation } from '@nestjs/swagger';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Post("/buffet")
  @ApiOperation({ summary: 'Create a new buffet', description: 'Create a new buffet' })
  createBuffet(@Body() createBuffetDto: CreateBuffetDto) {
    return this.menuService.createBuffet(createBuffetDto);
  }

  @Get("/buffets")
  @ApiOperation({ summary: 'Get all buffets', description: 'Get all buffets' })
  findAllBuffet() {
    return this.menuService.findAllBuffet();
  }

  @Get("/buffet/:id")
  findOneBuffet(@Param('id') id: number) {
    return this.menuService.findOneBuffet(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Patch("/buffet/:id")
  updateBuffet(@Param('id') id: number,@Body() updateBuffetDto: CreateBuffetDto) {
    return this.menuService.updateBuffet(id, updateBuffetDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Delete("/buffet/:id")
  removeBuffet(@Param('id') id: number) {
    return this.menuService.removeBuffet(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Post("/buffet-item")
  createBuffetItem(@Body() createBuffetItemDto: CreateBuffetItemDto) {
    return this.menuService.createBuffetItem(createBuffetItemDto);
  }

  @Get("/buffet-items")
  findAllBuffetItem() {
    return this.menuService.findAllBuffetItem();
  }

  @Get("/buffet-item/:id")
  findOneBuffetItem(@Param('id') id: number) {
    return this.menuService.findOneBuffetItem(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Patch("/buffet-item/:id")
  updateBuffetItem(@Param('id') id: number,@Body() updateBuffetItemDto: CreateBuffetItemDto) {
    return this.menuService.updateBuffetItem(id, updateBuffetItemDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Delete("/buffet-item/:id")
  removeBuffetItem(@Param('id') id: number) {
    return this.menuService.removeBuffetItem(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Post("/set")
  createSet(@Body() createSetDto: CreateSetDto) {
    return this.menuService.createSet(createSetDto);
  }

  @Get("/sets")
  findAllSet() {
    return this.menuService.findAllSet();
  }

  @Get("/set/:id")
  findOneSet(@Param('id') id: number) {
    return this.menuService.findOneSet(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Patch("/set/:id")
  updateSet(@Param('id') id: number,@Body() updateSetDto: CreateSetDto) {
    return this.menuService.updateSet(id, updateSetDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Delete("/set/:id")
  removeSet(@Param('id') id: number) {
    return this.menuService.removeSet(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Post("/set-item")
  createSetItem(@Body() createSetItemDto: CreateSetItemDto) {
    return this.menuService.createSetItem(createSetItemDto);
  }

  @Get("/set-items")
  findAllSetItem() {
    return this.menuService.findAllSetItem();
  }

  @Get("/set-item/:id")
  findOneSetItem(@Param('id') id: number) {
    return this.menuService.findOneSetItem(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Patch("/set-item/:id")
  updateSetItem(@Param('id') id: number,@Body() updateSetItemDto: CreateSetItemDto) {
    return this.menuService.updateSetItem(id, updateSetItemDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN)
  @Delete("/set-item/:id")
  removeSetItem(@Param('id') id: number) {
    return this.menuService.removeSetItem(id);
  }

  @Get("/items/buffet/:buffetId")
  findAllItemsByBuffetId(@Param('buffetId') buffetId: number) {
    return this.menuService.findAllItemsByBuffetId(buffetId); 
  }

  @Get("/items/set/:setId")
  findAllItemsBySetId(@Param('setId') setId: number) {
    return this.menuService.findAllItemsBySetId(setId); 
  }

  @Get("/categories/type/:type/menu/:menuId")
  findAllCategoriesAndItemsByMenuId(@Param('menuId', ParseIntPipe) menuId: number, @Param('type') type: string) {
    return this.menuService.findAllCategoriesAndItemsByMenuId(menuId, type); 
  }

  @Get("/items/order/:orderId")
  findAllItemsByOrderId(@Param('orderId') orderId: number) {
    return this.menuService.findAllItemsByOrderId(orderId); 
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.USER, UserType.STAFF, UserType.ADMIN)
  @ApiBearerAuth()
  @Post("/order")
  createOrder(@GetJwtPayload() payload: JwtPayload, @Body() createOrderDto: CreateOrderDto) {
    return this.menuService.createOrder(payload, createOrderDto);
  }

  @Get("/orders")
  findAllOrders() {
    return this.menuService.findAllOrders();
  }

  @Get("/order/:id")
  findOneOrder(@Param('id') id: number) {
    return this.menuService.findOneOrder(id);
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @AllowedRoles(UserType.ADMIN, UserType.STAFF)
  @Patch("/order/:id")
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: CreateOrderDto) {
    return this.menuService.updateOrder(id, updateOrderDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @AllowedRoles(UserType.ADMIN, UserType.STAFF)
  @Delete("/order/:id")
  removeOrder(@Param('id') id: number) {
    return this.menuService.removeOrder(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.USER, UserType.STAFF, UserType.ADMIN)
  @ApiBearerAuth()
  @Post("/order-detail")
  createOrderDetail(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.menuService.createOrderDetail(createOrderDetailDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.USER, UserType.STAFF, UserType.ADMIN)
  @Post("/order-details/order/:orderId")
  createOrderDetailsByOrderId(@Param('orderId') orderId: number, @Body() createOrderDetailsDto: {foodItemId: number, quantity: number}[]) {
    return this.menuService.createOrderDetailsByOrderId(orderId, createOrderDetailsDto);
  }

  @Get("/order-details")
  findAllOrderDetails() {
    return this.menuService.findAllOrderDetails();
  }

  @Get("/order-detail/:id")
  findOneOrderDetail(@Param('id') id: number) {
    return this.menuService.findOneOrderDetail(id);
  }

  @Get("/order-detail/order/:orderId")
  findAllOrderDetailsByOrderId(@Param('orderId') orderId: number) {
    return this.menuService.findAllOrderDetailsByOrderId(orderId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN, UserType.STAFF)
  @Patch("/order-detail/:id")
  updateOrderDetail(@Param('id') id: number, @Body() updateOrderDetailDto: CreateOrderDetailDto) {
    return this.menuService.updateOrderDetail(id, updateOrderDetailDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN, UserType.STAFF)
  @Delete("/order-detail/:id")
  removeOrderDetail(@Param('id') id: number) {
    return this.menuService.removeOrderDetail(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(UserType.ADMIN, UserType.STAFF)
  @Get("/order-detail/:id")
  checkPayment(@Param('id') id: number) {
    return this.menuService.checkPayment(id);
  }
}
