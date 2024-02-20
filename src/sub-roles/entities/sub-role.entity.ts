// subrole.entity.ts
import { User } from 'src/auth/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subRoles')
export class SubRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Role, (role) => role.subRoles, { eager: true })
  role: Role;

  @ManyToMany(() => User, (user) => user.subRoles)
  @JoinTable()
  users: User[];
}
