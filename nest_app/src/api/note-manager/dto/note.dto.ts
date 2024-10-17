import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class NoteDto {
    
    @IsString()
    @IsOptional()
    title: string
}
