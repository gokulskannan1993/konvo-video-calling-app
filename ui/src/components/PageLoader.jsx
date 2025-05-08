import React from 'react'
import { LoaderCircle } from 'lucide-react'
import { useThemeStore } from '../store/useThemeStore.js'

const PageLoader = () => {

    const { theme } = useThemeStore()


    return (
        <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
            <LoaderCircle className='animate-spin text-primary size-11' />
        </div>
    )
}

export default PageLoader