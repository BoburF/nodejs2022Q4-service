import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const timeSet = () => Math.floor(Date.now() / 1000);

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  version: number;

  @Column({ default: timeSet() })
  createdAt: number;

  @Column({ default: timeSet() })
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }
}
