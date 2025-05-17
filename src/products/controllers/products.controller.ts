import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDTO } from '../dtos/create.dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  public async create(@Body() createProductDto: CreateProductDTO) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  public async getByCode(@Query('code') code: string) {
    return await this.productService.findProductByCode(code);
  }

  @Get('all')
  public async getAll() {
    return await this.productService.getAllProducts();
  }

  @Patch(':code')
  public async update(
    @Param('code') code: string,
    @Body() createProductDto: CreateProductDTO,
  ) {
    return await this.productService.updateProductByCode(
      code,
      createProductDto,
    );
  }

  @Delete(':code')
  public async delete(@Param('code') code: string) {
    return await this.productService.deleteProductByCode(code);
  }
}
