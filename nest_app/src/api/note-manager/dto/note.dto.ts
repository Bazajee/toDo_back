import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class NoteDto {
    
    @IsString()
    @IsOptional()
    title: string

    @IsInt()
    @IsOptional()
    noteId: string

    @IsString()
    @IsOptional()
    noteContent: Object
    
}
