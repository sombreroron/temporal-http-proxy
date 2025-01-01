import { IsArray, IsObject, IsOptional } from 'class-validator';
import { SearchAttributes } from '@temporalio/client';

export class ProxyDto {
  @IsArray()
  args: any[];

  @IsOptional()
  @IsObject()
  searchAttributes?: SearchAttributes;
}
