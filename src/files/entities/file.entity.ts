import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  password: string;
}
