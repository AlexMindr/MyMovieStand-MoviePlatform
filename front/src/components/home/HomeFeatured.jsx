import React,{useState,useEffect,useRef} from 'react'
import './homefeatured.css'

const HomeFeatured = ({slides = [], speed = 3000, transitionSpeed = 500,  slideWidth = 300,  slideHeight = 300, autoScroll, manualMode }) => {
  
    // const [visibleSlide, setVisibleSlide] = useState(1)
    // const [hasTransitionClass, setHasTransitionClass] = useState(true)
    // const [stateSlides, setStateSlides] = useState(slides)
    // const [leftAndRightDisabled, setLeftAndRightDisabled] = useState(false)
    // const intervalId = useRef(null)
   
    // const start = () => {
    //     if (intervalId.current != null) {
    //       return
    //   }
    //   intervalId.current = setInterval(() => {
    //     setVisibleSlide(prevVisibleSlide => {
    //       if (prevVisibleSlide + 1 === stateSlides.length) {
    //           return 0
    //       }
    //         return prevVisibleSlide + 1
    //     })
    //   }, speed)
    // }
    // // useEffect with an empty array as the second parameter
    // // will run only once, when the component mounts 
    // // this makes it an ideal place to trigger this functionality
    
    // useEffect(() => {
    //     function start2() {
    //         if (intervalId.current != null) {
    //           return
    //       }
    //       intervalId.current = setInterval(() => {
    //         setVisibleSlide(prevVisibleSlide => {
    //           if (prevVisibleSlide + 1 === stateSlides.length) {
    //               return 0
    //           }
    //             return prevVisibleSlide + 1
    //         })
    //       }, speed)
    //     }
        
    //   const slidesWithClones = [...slides]
    //   slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1])
    //   slidesWithClones.push(slidesWithClones[1])
    //     setStateSlides(slidesWithClones)
    
    //   if (!!autoScroll) {
    //       start2()
    //   }
    // }, [autoScroll,slides,speed,stateSlides])
    
    // // Monitor changes for the visibleSlide value and react accordingly
    // // We need to loop back to the first slide when scrolling right
    // // from the last slide (and vice-versa for the other direction)
    // // And we also need to disable the animations (by removing the
    // // transition class from the relevant element) in order to give
    // // the impression that the carousel is scrolling infinitely 
    // // during our slide-cloning/swapping mechanism
    // useEffect(() => {
    //   if (visibleSlide === stateSlides.length - 1) {
    //       setLeftAndRightDisabled(true)
    //       setTimeout(() => {
    //         setHasTransitionClass(false)
    //         setVisibleSlide(1)
    //     }, transitionSpeed)
    //   }
      
    //   if (visibleSlide === 1) {
    //       setTimeout(() => {
    //         setHasTransitionClass(true)
    //     }, transitionSpeed)
    //   }
      
    //   if (visibleSlide === 0) {
    //       setLeftAndRightDisabled(true)
    //       setTimeout(() => {
    //         setHasTransitionClass(false)
    //       setVisibleSlide(stateSlides.length - 2)
    //     }, transitionSpeed)
    //   }
      
    //   if (visibleSlide === stateSlides.length - 2) {
    //          setTimeout(() => {
    //         setHasTransitionClass(true)
    //     }, transitionSpeed)
    //   }
    // }, [visibleSlide,stateSlides,transitionSpeed])
    
    // // Whenever the left and right arrows are disabled
    // // We want to enable them again after a specific 
    // // period of time, this is to prevent problematic
    // // spamming of these controls during our clone 
    // // slide-cloning/swapping mechanism
    // // Probably a better way to handle this though
    //   useEffect(() => {
    //   if (leftAndRightDisabled) {
    //     setTimeout(() => {
    //       setLeftAndRightDisabled(false)
    //     }, transitionSpeed * 2)
    //   }
    // }, [leftAndRightDisabled])
  
    
    
    // const stop = () => {
    //     clearInterval(intervalId.current)
    // }
    
    // const calculateLeftMargin = () => {
    //     return "-" + (visibleSlide * slideWidth) + "px"
    // }
    
    // const slideDimensionStyles = () => {
    //        return { width: slideWidth + "px", height: slideHeight + "px" }
    // }
    
    // const scrollLeft = () => {
    //     setVisibleSlide(visibleSlide - 1)
    // }
    
    // const scrollRight = () => {
    //     setVisibleSlide(visibleSlide + 1)
    // }
    
    // const dotIsActive = (index) => {
    //     return (
    //     index === visibleSlide || 
    //       (index === 1 && visibleSlide === stateSlides.length - 1) || 
    //     (index === stateSlides.length - 2 && visibleSlide === 0)
    //   )
    // }
  

    // if (slides.length < 2) {
    //     console.error("Please provide more slides")
    //   return null
    // }
    //   return (
    //     <div className="carousel">
    //      {!autoScroll && !manualMode && (
    //         <div className="controls">
    //         <button onClick={start} >Start</button>
    //         <button onClick={stop} >Stop</button>
    //       </div>
    //     )}
          
    //     <div className="slidesContainer" style={slideDimensionStyles()}>
    //       {!!manualMode && (
    //           <>
    //           <button 
    //             onClick={!leftAndRightDisabled ? scrollLeft : null} 
    //             className={`scrollLeft ${leftAndRightDisabled ? "disabled" : ""}`}>
    //               Left
    //           </button>
    //           <button 
    //             onClick={!leftAndRightDisabled ? scrollRight : null} 
    //             className={`scrollRight ${leftAndRightDisabled ? "disabled" : ""}`}>
    //               Right
    //           </button>
    //         </>
    //         )}
          
    //       <div className="slideIndicator">
    //         {stateSlides.map((slide, index) => {
    //             if (index === 0 || index === stateSlides.length - 1) {
    //               return null
    //           }
    //             return (
    //               <div 
    //               key={index} 
    //               onClick={() => setVisibleSlide(index)} 
    //               className={`dot ${dotIsActive(index) ? "active" : ""}`}
    //             />
    //           )
    //         })}
    //       </div>
          
    //       <div 
    //         id="slides" 
    //         className={`slides ${hasTransitionClass ? "transition" :""}`} 
    //         style={{ left: calculateLeftMargin() }}>
    //         {stateSlides.map((slide, index) => {
    //           return (
    //               <div key={index} className="slide" style={slideDimensionStyles()}>
    //               {!!slide.title && <div className="title">{slide.title}</div>}
    //               <div className="slideInner">
    //                 {slide.content()}
    //               </div>
    //             </div>
    //           )
    //         })}
    //       </div>
    //     </div>
        
    //     </div>
    // )
    return (<>homefeatured</>)
  }
  

export default HomeFeatured