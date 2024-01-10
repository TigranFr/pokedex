import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import styles from './Navbar.module.scss'

interface INavbarProps{
  handleOnClick: (pokemonPerPage:number) => void
}

const Navbar = ({handleOnClick}:INavbarProps): JSX.Element => {
  const [isTypesOpen, setIsTypesOpen] = useState<boolean>(false)
  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false)
  const [isPaginationOpen, setIsPaginationOpen] = useState<boolean>(false)

  const typeRef = useRef<HTMLDivElement | null>(null)
  const sortRef = useRef<HTMLDivElement | null>(null)
  const paginationRef = useRef<HTMLDivElement | null>(null)

  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])

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
        const response = await axios.get('https://pokeapi.co/api/v2/type')
        const fetchedTypes = response.data.results.map((type: any) => type.name)
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
        <div className={styles.searchField}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search pokemon"
          />
          <i className={`${styles.bx_s} bx bx-search`}></i>
        </div>

        <div className={styles.filter}>
          <div className={styles.selectType} onClick={openTypes}>
            Select Type
            <i className={`${styles.bx_bottom} bx bx-chevron-down`}></i>
          </div>
          {isTypesOpen ? (
            <div ref={typeRef} className={styles.filterByType}>
              {pokemonTypes.map((type, index) => (
                <button key={index} value={type} className={styles.btn}>
                  {type}
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
              <button className={styles.btn}>A-Z</button>
              <button className={styles.btn}>Z-A</button>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className={styles.pagination}>
          <div className={styles.selectType} onClick={openPagination}>
            Per Page
            <i className={`${styles.bx_bottom} bx bx-chevron-down`}></i>
          </div>
          {isPaginationOpen ? (
            <div ref={paginationRef} className={styles.setPaginationCount}>
              <button className={styles.btn} value={10} onClick={()=> { handleOnClick(10)}}>10</button>
              <button className={styles.btn} value={15} onClick={()=> {handleOnClick(15)}}>15</button>
              <button className={styles.btn} value={20} onClick={()=>{handleOnClick(20)}}>20</button>
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
