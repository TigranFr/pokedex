
export interface IndexedPokemon{
    name:string,
    url:string
}

export interface IndexedPokemonByType{
    pokemon:IndexedPokemon;
    slot:string
}

export interface PokemonByTypeListResponse{
    id:number,
    pokemon:IndexedPokemonByType[]
}

export interface PokemonListResponse{
    count:number,
    next:string | null,
    previouse: string | null,
    results: IndexedPokemon[]
}

export interface IType{
    name:string,
    url:string
}

export interface TypeListResponse{
    count:number,
    next:string | null,
    previouse:string|null,
    results:IType[];
}

export interface ListPokemon {
    name:string,
    url:string,
    image:string,
    pokedexNumber:number
}

