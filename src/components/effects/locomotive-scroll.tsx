/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext, useContext, type ReactNode } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

type LocomotiveScrollContextType = LocomotiveScroll | null

const LocomotiveScrollContext = createContext<LocomotiveScrollContextType>(null)

export const useLocomotiveScroll = () => useContext(LocomotiveScrollContext)

interface LocomotiveScrollProviderProps {
    children: ReactNode
}

export function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
    const [scroll, setScroll] = useState<LocomotiveScroll | null>(null)

    useEffect(() => {
        const scrollInstance = new LocomotiveScroll()
        const timeoutId = setTimeout(() => {
            setScroll(scrollInstance)
        }, 0)

        return () => {
            clearTimeout(timeoutId)
            scrollInstance.destroy()
            setScroll(null)
        }
    }, [])

    return (
        <LocomotiveScrollContext.Provider value={scroll}>
            {children}
        </LocomotiveScrollContext.Provider>
    )
}
