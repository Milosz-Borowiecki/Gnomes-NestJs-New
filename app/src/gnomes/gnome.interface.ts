import { Races } from "./dtos/races";

export interface CreateGnomeInterface {
    name: string;
    age: number;
    strength: number;
    race: Races;
}

export interface GnomeInterface extends CreateGnomeInterface{
    gnomeId: number;
    authorId: number;
}