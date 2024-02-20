import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateSubRoleDto } from './dto/create-sub-role.dto';
import { UpdateSubRoleDto } from './dto/update-sub-role.dto';
import { SubRole } from './entities/sub-role.entity';

@Injectable()
export class SubRolesService {
  constructor(
    @InjectRepository(SubRole)
    private readonly subRoleRepository: Repository<SubRole>,

    private readonly rolesService: RolesService,
  ) {}
  async create(createSubRoleDto: CreateSubRoleDto) {
    try {
      const { role } = createSubRoleDto;
      const roleFound = await this.rolesService.findOne(role);
      if (!roleFound) throw new BadRequestException('Role not found');

      const subRole = this.subRoleRepository.create({
        ...createSubRoleDto,
        role: roleFound,
      });
      return this.subRoleRepository.save(subRole);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all subRoles`;
  }

  findOne(id: string) {
    return this.subRoleRepository.findOneBy({ id });
  }

  update(id: number, updateSubRoleDto: UpdateSubRoleDto) {
    return `This action updates a #${id} subRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} subRole`;
  }
}
