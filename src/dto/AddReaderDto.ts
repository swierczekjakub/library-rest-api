import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString, MaxLength, Length} from 'class-validator';
export class AddReaderDto {
    @IsNotEmpty()
    @MaxLength(50)
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @MaxLength(100)
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @Length(5, 15)
    phoneNumber: string;

    @IsEmail()
    @MaxLength(255)
    @IsNotEmpty()
    email: string;
}
