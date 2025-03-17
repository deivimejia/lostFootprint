import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PetPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 30,
    nullable: false,
    default: 'unknown',
  })
  userId: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  petName: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  imageUrl: string;

  @Column('enum', {
    enum: Status,
    default: Status.PENDING,
    nullable: false,
  })
  status: Status;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  hasfound: boolean;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;
}
