import { IsNotEmpty, IsOptional } from 'class-validator';
export class MusicFilterDto{
    
    @IsOptional()
    @IsNotEmpty()
    artist: string;

    @IsOptional()
    @IsNotEmpty()
    album: string

    @IsOptional()
    @IsNotEmpty()
    songName: string
}


