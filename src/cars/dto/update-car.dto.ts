import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  readonly model?: string;
}
