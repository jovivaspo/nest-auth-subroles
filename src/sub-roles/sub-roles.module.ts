import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';
import { SubRole } from './entities/sub-role.entity';
import { SubRolesController } from './sub-roles.controller';
import { SubRolesService } from './sub-roles.service';

@Module({
  controllers: [SubRolesController],
  providers: [SubRolesService],
  imports: [ConfigModule, TypeOrmModule.forFeature([SubRole]), RolesModule],
  exports: [TypeOrmModule, SubRolesService],
})
export class SubRolesModule {}
