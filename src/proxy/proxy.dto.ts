import { IsArray } from 'class-validator';

export class ProxyDto {
  @IsArray()
  args: any[];
}
