import { BaseEntity } from 'src/config/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'integer', default: 0 })
  stock: number;

  @Column({ type: 'bool', default: true })
  isActive: boolean;
}
