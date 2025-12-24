import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class ParcelDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  sender_phone: string;

  @IsString()
  @IsNotEmpty()
  sender_address: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  reciever_phone: string;

  @IsString()
  @IsNotEmpty()
  reciever_address: string;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNotEmpty()
  weight: number;

  @IsString()
  @IsNotEmpty()
  card_number: string;

  @IsString()
  @IsNotEmpty()
  expiration: string;

  @IsString()
  @IsNotEmpty()
  cvv: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;
}
