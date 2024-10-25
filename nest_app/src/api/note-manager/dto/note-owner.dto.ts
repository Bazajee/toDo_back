import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class NoteDto {
    
    @IsInt()
    @IsNotEmpty()
    userId: string;

    @IsInt()
    @IsNotEmpty()
    noteId: string;

}
