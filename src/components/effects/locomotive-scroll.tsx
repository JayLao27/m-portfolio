import { useEffect, useRef, createContext, useContext, type ReactNode } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

type LocomotiveScrollContextType = LocomotiveScroll | null

const LocomotiveScrollContext = createContext<LocomotiveScrollContextType>(null)

export const useLocomotiveScroll = () => useContext(LocomotiveScrollContext)

interface LocomotiveScrollProviderProps {
    children: ReactNode
}

export function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
    const scrollRef = useRef<LocomotiveScroll | null>(null)

    useEffect(() => {
        const scroll = new LocomotiveScroll()
        scrollRef.current = scroll

        return () => {
            scroll.destroy()
            scrollRef.current = null
        }
    }, [])

    return (
        <LocomotiveScrollContext.Provider value={scrollRef.current}>
            {children}
        </LocomotiveScrollContext.Provider>
    )
}
