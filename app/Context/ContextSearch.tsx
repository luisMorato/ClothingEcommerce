'use client';
import { 
    createContext, 
    useState 
} from "react";

type searchContextProps = {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = createContext<searchContextProps>({
    search: '',
    setSearch: () => void 0
});

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState('');

    return(
        <SearchContext.Provider value={{search, setSearch}}>
            { children }
        </SearchContext.Provider>
    )
}