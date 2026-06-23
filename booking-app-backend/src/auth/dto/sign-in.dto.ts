import { IsEmail, IsString, Length, MaxLength } from "class-validator";

export class SignInDto {
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
