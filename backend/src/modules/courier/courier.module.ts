import { Module } from '@nestjs/common';
import { CourierController } from './courier.controller';

@Module({
  controllers: [CourierController],
  providers: [],
})
export class CourierModule {}
