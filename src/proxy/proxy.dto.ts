import { IsArray, IsObject, IsOptional } from 'class-validator';

export class ProxyDto {
  @IsArray()
  args: any[];

  @IsOptional()
  @IsObject()
  searchAttributes?: Record<any, any>;
}
