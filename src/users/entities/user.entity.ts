import { BaseEntity } from 'src/config/entities/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { Exclude } from 'class-transformer';

@Entity('customer')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  customer_id: string;

  @Column({ type: 'text' })
  full_name: string;

  @Column({ type: 'text', unique: true, nullable: false })
  identification: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ type: 'text', nullable: false })
  password: string;

  @ManyToMany(() => RoleEntity, (role) => role.customers)
  @JoinTable({
    name: 'role_customers',
    joinColumn: {
      name: 'customer',
      referencedColumnName: 'customer_id',
    },
    inverseJoinColumn: {
      name: 'role',
      referencedColumnName: 'rol_id',
    },
  })
  roles: RoleEntity[];
}
