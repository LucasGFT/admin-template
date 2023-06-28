import { createContext, useEffect, useState } from "react";


interface AppProviderProps {
    tema?: string
    alternarTema?: () => void
    children?: React.ReactNode
}

const AppContext = createContext<AppProviderProps>({})


export function AppProvider(props: AppProviderProps) {

    const [tema, setTema] = useState('dark')

    function alternarTema() {
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo ? temaSalvo : '')
    }, [])

    return (
        <AppContext.Provider value={{
            tema,
            alternarTema,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext