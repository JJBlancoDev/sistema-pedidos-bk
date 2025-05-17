import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { ErrorManager } from 'src/config/handlers/error.handler';
import { CreateProductDTO } from '../dtos/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductDTO } from '../dtos/update.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async create(
    createProductDto: CreateProductDTO,
  ): Promise<ProductEntity> {
    try {
      const productCreate = this.productRepository.create(createProductDto);
      const productSaved = await this.productRepository.save(productCreate);
      return productSaved;
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async findProductByCode(code: string): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findOneBy({ code });

      if (!product) {
        throw new NotFoundException(`Product with code ${code} not found`);
      }

      return product;
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async getAllProducts(): Promise<ProductEntity[]> {
    try {
      const product = await this.productRepository.find();

      if (!product) {
        throw new NotFoundException(`Products not found`);
      }

      return product;
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async updateProductByCode(
    code: string,
    updateProducDto: UpdateProductDTO,
  ): Promise<ProductEntity> {
    try {
      const product = await this.findProductByCode(code);
      const updated = this.productRepository.merge(product, updateProducDto);
      return await this.productRepository.save(updated);
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }

  public async deleteProductByCode(code: string): Promise<{ message: string }> {
    try {
      const productDelete = await this.productRepository.delete({ code });

      if (productDelete.affected === 0) {
        throw new NotFoundException(
          `Failed to delete product with code ${code}`,
        );
      }

      return {
        message: `Product with code ${code} deleted`,
      };
    } catch (error) {
      throw ErrorManager.handlerExceptions(error);
    }
  }
}
