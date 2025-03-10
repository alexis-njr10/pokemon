export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonDetails {
    id: number;
    name: string;
    weight: number;
    height: number;
    types: string[];
}
