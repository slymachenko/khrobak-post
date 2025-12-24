import { Injectable } from '@nestjs/common';
import { ParcelDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class ParcelService {
  constructor(private prisma: PrismaService) {}

  async createParcel(dto: ParcelDto, res: Response) {
    const sender = await this.prisma.user.findUnique({
      where: {
        phone: dto.sender_phone,
      },
    });

    if (!sender) {
      res.status(400).send({ error: 'Sender not found' });
      return;
    }

    return await this.prisma.parcel.create({
      data: {
        width: dto.width,
        height: dto.height,
        length: dto.length,
        weight: dto.weight,
        sender: {
          connect: {
            id: sender.id,
          },
        },
        sender_address: dto.sender_address,
        reciever_phone: dto.reciever_phone,
        reciever_address: dto.reciever_address,
      },
    });
  }

  async getUserParcels(user_id: number) {
    return await this.prisma.parcel.findMany({
      where: {
        sender_id: user_id,
      },
      include: {
        sender: true,
      },
    });
  }

  async payParcel(dto: ParcelDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: dto.sender_phone,
      },
    });

    if (!user) {
      res.status(400).send({ error: 'Sender not found' });
      return;
    }

    return await this.prisma.payment.create({
      data: {
        amount: 30,
        card_number: dto.card_number,
        expiration: dto.expiration,
        cvv: dto.cvv,
        postal_code: dto.postal_code,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async getParcelStatuses() {
    return await this.prisma.parcelStatus.findMany();
  }

  async generatePDF(dto: ParcelDto): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      doc.fontSize(25).text('Parcel ticket', 50, 50);

      doc.fontSize(20).text('Personal Information', 50, 85);

      doc.fontSize(10).text(`Parcel details:`, 50, 115);
      doc.fontSize(10).text(`Width: ${dto.width} cm`, 50, 130);
      doc.fontSize(10).text(`Height: ${dto.height} cm`, 50, 145);
      doc.fontSize(10).text(`Length: ${dto.length} cm`, 50, 160);
      doc.fontSize(10).text(`Weight: ${dto.weight} kg`, 50, 175);

      doc.fontSize(10).text(`Sender Information:`, 250, 115);
      doc.fontSize(10).text(`Phone: ${dto.sender_phone}`, 250, 130);
      doc.fontSize(10).text(`Address: ${dto.sender_address}`, 250, 145);

      doc.fontSize(10).text(`Reciever Information:`, 400, 115);
      doc.fontSize(10).text(`Phone: ${dto.reciever_phone}`, 400, 130);
      doc.fontSize(10).text(`Address: ${dto.reciever_address}`, 400, 145);

      doc.fontSize(20).text('Payment Information', 50, 195);
      doc.fontSize(10).text(`Amount payed: 30 HRN`, 50, 225);
      doc
        .fontSize(10)
        .text(`Date and time: ${new Date().toLocaleString()}`, 50, 240);

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }
}
