import React from 'react'
import { useParams } from 'react-router-dom'
import usePokemon from '../../hooks/usePokemon'
import styles from './PokemonDetailed.module.scss';

const PokemonDetailed = (): JSX.Element => {
  const { pokemonName } = useParams()
  const { pokemon, isLoading } = usePokemon({ pokemonName })

  return (
    <div className={styles.pokemonDetailed}>
        {isLoading 
            ? <div>Loading...</div> 
            : <div className={styles.Container}>
                <>
                    <div className={styles.imageContainer}>
                        <img className={styles.pokemonImage} src={pokemon?.sprites.other['official-artwork'].front_default}/>
                        <span className={styles.pokemonName}>{pokemon?.name}</span>
                    </div>
                    <div className={styles.pokemonBasicInfo}>
                        <div className={styles.bwh}>
                            <div className={styles.bwhItem}>
                                <span className={styles.bwhItemSpan}>Base experience</span>
                                <div className={styles.bwhItemDiv}>{pokemon?.base_experience} BE</div>
                            </div>
                            <div className={styles.bwhItem}>
                                <span className={styles.bwhItemSpan}>Weight</span>
                                <div className={styles.bwhItemDiv}>{pokemon?.weight} KG</div>
                            </div>
                            <div className={styles.bwhItem}>
                                <span className={styles.bwhItemSpan}>Height</span>
                                <div className={styles.bwhItemDiv}>{pokemon?.height} M</div>
                            </div>
                        </div>

                        <div className={styles.abilitiesTypes}>
                            <div className={styles.abilitiesTypesItem}>
                                <span className={styles.abilitiesTypesSpan}>Abilities</span>
                                <div className={styles.abilitiesTypesDiv}>
                                    {pokemon?.abilities.map((ability , index)=>(
                                        <div className={styles.abilitiesTypeDivItem} key={index}>{ability.ability.name}</div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.abilitiesTypesItem}>
                                <span className={styles.abilitiesTypesSpan}>Types</span>
                                <div className={styles.abilitiesTypesDiv}>
                                    {pokemon?.types.map((type , index)=>(
                                        <div className={styles.abilitiesTypeDivItem} key={index}>{type.type.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                <div className={styles.statsContainer}>
                    <span className={styles.statsContainerHeader}>Stats</span>
                    <div className={styles.statsContainerWrapper}>
                        {pokemon?.stats.map((stat,index)=>(
                            <div key={index}>
                                <span className={styles.span1}>{stat.stat.name}</span>
                                <span className={styles.span2}>{stat.base_stat}</span>
                            </div>
                        ))}
                    </div>
                </div>
                </>
              </div>
        }
    </div>
  )
}

export default PokemonDetailed
