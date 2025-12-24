import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { OptionalJwtGuard } from 'src/auth/guard/optional-jwt.guard';
import { ParcelService } from 'src/parcel/parcel.service';

@Controller()
export class ViewController {
  constructor(private parcelService: ParcelService) {}

  @Get()
  @Render('home')
  @UseGuards(OptionalJwtGuard)
  getHomeAuth(@GetUser() user: User): object {
    return { isAuth: user ? true : false };
  }

  @Get('prices')
  @Render('prices')
  @UseGuards(OptionalJwtGuard)
  getPrices(@GetUser() user: User): object {
    return { isAuth: user ? true : false };
  }

  @Get('login')
  @Render('login')
  @UseGuards(OptionalJwtGuard)
  getLogin(@GetUser() user: User): object {
    return { isAuth: user ? true : false };
  }

  @Get('signup')
  @Render('signup')
  @UseGuards(OptionalJwtGuard)
  getSignup(@GetUser() user: User): object {
    return { isAuth: user ? true : false };
  }

  @Get('parcels')
  @Render('parcels')
  @UseGuards(JwtGuard)
  async getParcels(@GetUser() user: User) {
    const rawParcels = await this.parcelService.getUserParcels(user.id);

    const statuses = await this.parcelService.getParcelStatuses();

    const parcels = rawParcels.map((parcel) => {
      return {
        id: parcel.id,
        width: parcel.width,
        height: parcel.height,
        length: parcel.length,
        weight: parcel.weight,
        status: statuses[parcel.status_id - 1].status,
        sender: {
          phone: parcel.sender.phone,
          address: parcel.sender_address,
        },
        reciever: {
          phone: parcel.reciever_phone,
          address: parcel.reciever_address,
        },
      };
    });

    return { isAuth: true, parcels };
  }

  @Get('parcels/create')
  @Render('create_parcel')
  @UseGuards(JwtGuard)
  getShipment(@GetUser() user: User): object {
    const userdata = {
      phone: user.phone,
      address: user.address,
    };

    return { isAuth: user ? true : false, userdata };
  }

  @Get('profile')
  @Render('profile')
  @UseGuards(JwtGuard)
  async getProfile(@GetUser() user: User) {
    return { isAuth: true, user };
  }
}
