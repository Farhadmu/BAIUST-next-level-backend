import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'student@university.edu' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Farhadul Islam' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'CSE-2023-019', required: false })
  @IsOptional()
  @IsString()
  studentId?: string;

  @ApiProperty({ example: 42, required: false })
  @IsOptional()
  batchNumber?: number;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  semester?: number;
}

export class LoginDto {
  @ApiProperty({ example: 'student@university.edu' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh_token_uuid' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
