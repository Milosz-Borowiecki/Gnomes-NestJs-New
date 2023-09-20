import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Races } from '../dtos/races';
import { User } from 'src/user/entities/user.entity';
import { Type } from 'class-transformer';

@Entity()
export class Gnome {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User,(user) => user.gnomes)
    user: User

    @Column()
    name: string;

    @Column()
    @Type(() => Number)
    age: number;

    @Column()
    @Type(() => Number)
    strength: number;

    @Column()
    race: Races;
}