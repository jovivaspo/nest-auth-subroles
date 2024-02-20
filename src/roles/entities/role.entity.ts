import { User } from 'src/auth/entities/user.entity';
import { SubRole } from 'src/sub-roles/entities/sub-role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => SubRole, (subrole) => subrole.role)
  subRoles: SubRole[];
}
