import { Races } from "./dtos/races";

export interface CreateGnome {
    name: string;
    age: number;
    strength: number;
    race: Races;
}

export interface Gnome extends CreateGnome{
    gnomeId: number;
    authorId: number;
}