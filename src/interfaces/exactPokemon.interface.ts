export interface NameURL {
  name: string;
  url: string;
};

export interface SpeciesURL  {
  base_happiness: number | undefined;
  capture_rate: number | undefined;
  color: NameURL;
  egg_groups: any[];
  evolution_chain: any;
  evolves_from_species: any;
  flavor_text_entries: any[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: any[];
  generation: any;
  growth_rate: any;
  habitat: any;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: any[];
  order: number;
  pall_park_encounters: any[];
  pokedex_numbers: any[];
  shape: any;
  varieties: any;
};

export interface IPagination  {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
};

export interface IPokemon  {
  abilities: Abilities[];
  base_experience: number;
  forms: Forms[];
  game_indices: GameIndices[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stats[];
  types: Types[];
  weight: number;
};

export interface Abilities  {
  ability: NameURL;
  is_hidden: boolean;
  slot: number;
};

export interface Forms  {
  name: string;
  url: string;
};
export interface GameIndices  {
  game_index: number;
  version: NameURL;
};

export interface VersionGroupDetails  {
  level_learned_at: number;
  move_learn_method: NameURL;
  version_group: NameURL;
};

export interface Moves  {
  move: NameURL;
  version_group_details: VersionGroupDetails[];
};

export interface Species  {
  name: string;
  url: string;
};

export interface DreamWorld  {
  front_default: string | null;
  front_female: string | null;
};

export interface HomeSprite  {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

export interface OfficialArtwork  {
  front_default: string | null;
};

export interface Sprites  {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: DreamWorld;
    home: HomeSprite;
    "official-artwork": OfficialArtwork;
    versions: any;
  };
};

export interface Stats  {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export interface Types  {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export interface Slots  {
  slot: number;
  pokemon: NameURL;
};

export interface PokemonSpecies  {
  pokemon_species: NameURL;
  rate: number;
};

export interface PokemonTypes  {
  slot: number;
  type: NameURL;
};

export interface TriggerTypes  {
  baby_trigger_item: null;
  chain: any;
  id: number;
};