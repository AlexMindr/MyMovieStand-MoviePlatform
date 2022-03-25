import React, { FC, useState, useEffect } from 'react'
import {FaArrowCircleUp} from 'react-icons/fa';
import './scrollbtn.css';
/*type ScrollTopArrowProps = {
    showBelow?: number
}*/
const Scrollbtn /*: FC<ScrollTopArrowProps>*/ = ({ showBelow = 400 }) => {
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
        <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}}/>
    )
}

export default Scrollbtn;