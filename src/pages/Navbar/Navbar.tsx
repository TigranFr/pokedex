import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { type TypeListResponse, type IType } from '../../interfaces/pokemon.interface'
import styles from './Navbar.module.scss'

interface INavbarProps{
  handleOnClickPerPage: (pokemonPerPage:number) => void
  handleOnClickType: (pokemonType:IType | null) => void
  handleOnChange:(pokName:string) => void
  handleAtoZ:() => void
  handleZtoA:() => void
  selectedType:IType | null,
  pokemonPerPage:number
}

const Navbar = ({handleAtoZ , handleZtoA ,handleOnClickPerPage , handleOnClickType ,handleOnChange, selectedType , pokemonPerPage}:INavbarProps): JSX.Element => {
  const [isTypesOpen, setIsTypesOpen] = useState<boolean>(false)
  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false)
  const [isPaginationOpen, setIsPaginationOpen] = useState<boolean>(false)
  const [value , setValue] = useState<string>("");

  const typeRef = useRef<HTMLDivElement | null>(null)
  const sortRef = useRef<HTMLDivElement | null>(null)
  const paginationRef = useRef<HTMLDivElement | null>(null)

  const [pokemonTypes, setPokemonTypes] = useState<IType[]>([])

  const openTypes = (): void => {
    setIsTypesOpen(true)
  }

  const closeTypes = (): void => {
    setIsTypesOpen(false)
  }

  const openSorting = (): void => {
    setIsSortingOpen(true)
  }

  const closeSorting = (): void => {
    setIsSortingOpen(false)
  }

  const openPagination = (): void => {
    setIsPaginationOpen(true)
  }
  const closePagination = (): void => {
    setIsPaginationOpen(false)
  }

  useOnClickOutside(typeRef, closeTypes)
  useOnClickOutside(sortRef, closeSorting)
  useOnClickOutside(paginationRef, closePagination)

  useEffect(() => {
    const fetchPokemonTypes = async (): Promise<void> => {
      try {
        const response = await axios.get<TypeListResponse>('https://pokeapi.co/api/v2/type')
        const fetchedTypes = response.data.results.map((type: IType) => type)
        setPokemonTypes(fetchedTypes)
      } catch (error) {
        console.error('Error fetching Pokemon types:', error)
      }
    }

    void fetchPokemonTypes()
  }, [])


  return (
    <>
      <h1 className={styles.title}>Welcome to the Pokedex app </h1>
      <nav className={styles.navbar}>
        <form className={styles.searchField} onSubmit={(event)=>{
          event.preventDefault();
          handleOnChange(value);
        }}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Pokemon by name"
            value={value}
            onChange={(event)=>{
              setValue(event.target.value);
            }}
          />
          <i className={`${styles.bx_s} bx bx-search`}></i>
        </form>

        <div className={styles.filter}>
        <div className={styles.selectType} onClick={openTypes}>
          {(selectedType != null) ? (
            <span>{selectedType.name.charAt(0).toUpperCase() + selectedType.name.slice(1)}</span>
          ) : (
            <span>Select Type</span>
          )}
           <i className={`${styles.bx_bottom} bx bx-chevron-down`}></i>
        </div>
        
          {isTypesOpen ? (
            <div ref={typeRef} className={styles.filterByType}>
              {pokemonTypes.map((type, index) => (
                <button key={index} value={type.name} className={styles.btn} onClick={()=>{
                  handleOnClickType(type);
                }}>
                  {type.name}
                </button>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className={styles.sort}>
          <div className={styles.selectType} onClick={openSorting}>
            Sort By
            <i className={`${styles.bx_bottom} bx bx-chevron-down`}></i>
          </div>
          {isSortingOpen ? (
            <div ref={sortRef} className={styles.sortByCriteries}>
              <button className={styles.btn} onClick={()=>{
                handleAtoZ();
              }}>A-Z</button>
              <button className={styles.btn} onClick={()=>{
                handleZtoA();
              }}>Z-A</button>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className={styles.pagination}>
          <div className={styles.selectType} onClick={openPagination}>
            Per Page : {pokemonPerPage}
            <i className={`${styles.bx_bottom} bx bx-chevron-down`}></i>
          </div>
          {isPaginationOpen ? (
            <div ref={paginationRef} className={styles.setPaginationCount}>
              <button className={styles.btn} value={10} onClick={()=> {handleOnClickPerPage(10)}}>10</button>
              <button className={styles.btn} value={15} onClick={()=> {handleOnClickPerPage(15)}}>15</button>
              <button className={styles.btn} value={20} onClick={()=>{handleOnClickPerPage(20)}}>20</button>
            </div>
          ) : (
            ''
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
