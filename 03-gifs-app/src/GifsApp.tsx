import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviusSearches } from "./gifs/components/PreviusSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"

export const GifsApp = () => {

  const [previousTerms, setPrevious] = useState(['Goku', 'Naruto']);

  const handleTermClicked = (term: string) => {
    console.log({term});
  }

  return (
    <>
      <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />

      <SearchBar placeholder="Busca lo que quieras" />

      <PreviusSearches 
      searches={previousTerms} 
      onLabelClicked={(term: string) => handleTermClicked(term)}
      />

      <GifList gifs={mockGifs} />

    </>
  )
}
