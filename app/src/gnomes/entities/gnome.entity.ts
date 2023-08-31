import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Races } from '../dtos/races';

@Entity()
export class Gnome {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author_id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    strength: number;

    @Column()
    race: Races;
}