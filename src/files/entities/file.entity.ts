import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class TransferredFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  password: string;
}
