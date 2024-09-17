import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Entity } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeesConfig from './config/coffees.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Entity]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['buddy brew', 'nescafe'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
