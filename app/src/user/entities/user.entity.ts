import { Gnome } from 'src/gnomes/entities/gnome.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Gnome, (gnome) => gnome.user)
    gnomes: Gnome[]

    @Column()
    username: string;

    @Column()
    password: string;
}