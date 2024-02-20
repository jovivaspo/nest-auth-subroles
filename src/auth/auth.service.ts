import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { SubRolesService } from 'src/sub-roles/sub-roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly roleService: RolesService,
    private readonly subRoleService: SubRolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, role, subRoles, ...userData } = createUserDto;

      const roleToFind = await this.roleService.findOne(role);
      if (!roleToFind) throw new BadRequestException('Role not found');

      const subRolesFound = await Promise.all(
        subRoles.map(async (subRole) => {
          const subRoleToFind = await this.subRoleService.findOne(subRole);
          if (!subRoleToFind)
            throw new BadRequestException('SubRole not found');
          return subRoleToFind;
        }),
      );

      const user = this.userRepository.create({
        ...userData,
        subRoles: subRolesFound,
        role: roleToFind,
        password: bcrypt.hashSync(password, 10),
      });
      console.log(user);
      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
      };
      // TODO: Retornar el JWT de acceso
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
