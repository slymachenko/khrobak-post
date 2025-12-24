import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ParcelModule } from 'src/parcel/parcel.module';

@Module({
  imports: [ParcelModule],
  controllers: [ViewController],
})
export class ViewModule {}
