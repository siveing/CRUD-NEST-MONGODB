import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ConfigDto {
  @IsOptional()
  NODE_ENV?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value: x }) => +x)
  APPLICATION_PORT?: number;

  @IsOptional()
  MONGO_URI?: string;

  @IsOptional()
  MONGO_DB_NAME?: string;
}
