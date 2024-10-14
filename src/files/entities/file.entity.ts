import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('file')
export class TransferredFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  originalFileName: string;

  @Column({ nullable: true })
  awsFileName: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;
}
