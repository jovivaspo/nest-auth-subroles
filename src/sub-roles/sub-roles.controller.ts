import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSubRoleDto } from './dto/create-sub-role.dto';
import { UpdateSubRoleDto } from './dto/update-sub-role.dto';
import { SubRolesService } from './sub-roles.service';

@Controller('sub-roles')
export class SubRolesController {
  constructor(private readonly subRolesService: SubRolesService) {}

  @Post()
  create(@Body() createSubRoleDto: CreateSubRoleDto) {
    return this.subRolesService.create(createSubRoleDto);
  }

  @Get()
  findAll() {
    return this.subRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subRolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubRoleDto: UpdateSubRoleDto) {
    return this.subRolesService.update(+id, updateSubRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subRolesService.remove(+id);
  }
}
