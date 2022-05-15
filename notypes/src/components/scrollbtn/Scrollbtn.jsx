import React, { FC, useState, useEffect } from 'react'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import './scrollbtn.css';
/*type ScrollTopArrowProps = {
    showBelow?: number
}*/
const Scrollbtn /*: FC<ScrollTopArrowProps>*/ = ({ showBelow = 300 }) => {
    const [showScroll, setShowScroll] = useState /*<boolean>*/(false)
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
    })
    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > showBelow) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= showBelow) {
            setShowScroll(false)
        }
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <ArrowCircleUpIcon className="scrollTop" fontSize='large' onClick={scrollTop} style={{ display: showScroll ? 'flex' : 'none'}}/>
    )
}

export default Scrollbtn;