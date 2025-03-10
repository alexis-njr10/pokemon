import { HttpService } from "../../services/http.service";
import { IPokemon, IPokemonDetails, PokemonType } from "../models/pokemon.model";

class PokemonService {
    
    getAllPokemon(): Promise<IPokemon[]> {
        return HttpService.get<{ results: IPokemon[] }>("pokemon?limit=1302")
            .then(data => data.results);
    }

    getPokemonDetails(name: string): Promise<IPokemonDetails | null> {
        return HttpService.get<IPokemonDetails>(`pokemon/${name}`)
            .then(data => ({
                id: data.id,
                name: data.name,
                weight: data.weight,
                height: data.height,
                types: data.types.map((t: any) => t.type.name),
            }));
    }
}

const pokemonService = new PokemonService();
export { pokemonService };
