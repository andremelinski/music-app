import { IsNotEmpty, IsNumber,  } from 'class-validator';
export class AddMusicDto{

    @IsNotEmpty()
    artist: string;

    @IsNotEmpty()
    album: string;

    @IsNotEmpty()
    song_name: string;
}