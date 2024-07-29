import React,{createContext,useState} from 'react'

export const SidbarContext = createContext()

export const SidbarContextState = ({children}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [theme, setTheme] = useState('light')
  return (
    <SidbarContext.Provider value={{showMenu,setShowMenu,theme,setTheme}}>
      {children}
    </SidbarContext.Provider>
  )
}

