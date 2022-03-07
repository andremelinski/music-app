import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Music {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({nullable: false})
    user_id:number;

    @Column({nullable: false})
    song_name: string;

    @Column({nullable: false})
    artist: string;

    @Column({nullable: false})
    album: string;
}