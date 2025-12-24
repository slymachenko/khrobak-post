import { Body, Controller, Post, Get, Res, UseGuards } from '@nestjs/common';
import { ParcelDto } from './dto';
import { ParcelService } from './parcel.service';
import { Response } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('parcels')
export class ParcelController {
  constructor(private parcelService: ParcelService) {}

  @Post()
  async createParcel(@Body() dto: ParcelDto, @Res() res: Response) {
    await this.parcelService.createParcel(dto, res);

    await this.parcelService.payParcel(dto, res);

    const buffer = await this.parcelService.generatePDF(dto);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=parcel_ticket.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Get()
  async getUserParcels(@GetUser('id') user_id: number) {
    return await this.parcelService.getUserParcels(user_id);
  }
}
