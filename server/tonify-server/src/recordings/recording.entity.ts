import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Recording {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notes: string
}

// {
//   tone: string,
//   attack: string,
//   release: string
// }[]