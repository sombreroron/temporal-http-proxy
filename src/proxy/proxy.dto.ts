import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class ProxyDto {
  @IsString()
  @IsNotEmpty()
  activity: string;

  @IsArray()
  args: any[];
}
