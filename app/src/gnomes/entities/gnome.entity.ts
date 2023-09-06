import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Races } from '../dtos/races';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Gnome {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User,(user) => user.gnomes)
    user: User

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    strength: number;

    @Column()
    race: Races;
}