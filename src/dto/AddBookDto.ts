import {IsNotEmpty, IsString, Length, MaxLength} from 'class-validator'
export class AddBookDto {
    @IsNotEmpty()
    @MaxLength(255)
    @IsString()
    title: string;

    @IsNotEmpty()
    @MaxLength(100)
    @IsString()
    author: string;

    @IsNotEmpty()
    @Length(10, 17)
    @IsString()
    isbn: string;

    @IsNotEmpty()
    @MaxLength(255)
    @IsString()

    publisher: string;
}
