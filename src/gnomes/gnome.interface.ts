import { Races } from "./dtos/races";

export interface Gnome {
    gnomeId: number;
    authorId:number;
    name: string;
    age: number;
    strength: number;
    race: Races;
}