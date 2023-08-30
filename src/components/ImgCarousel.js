import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight, mdiBookmark } from '@mdi/js';
import {cloneDeep} from "lodash";
const ImgCarousel = ({list = []}) => {
    const [bookList, setBookList] = useState(list)
    const [currentPosition, setCurrentPosition] = useState(0)
    const [slideEnd, setSlideEnd] = useState(false)
    const carouselRef = useRef(null);
    const bookRef = useRef(null);

    useEffect(()=>{
        setBookList(list)
    },[list])

    useEffect(()=>{
        // 랜더 시 prev, next 비활성화 여부
        let listWidth = carouselRef.current.getBoundingClientRect().width + 16
        let listNode = bookList.length > 0 ?bookRef.current.getBoundingClientRect().width : 0
        let hiddenSlideWidth =  (listNode * bookList.length) - listWidth
        let flag;
        if (hiddenSlideWidth - Math.abs(currentPosition) <= listWidth) {
            flag= true
        }else {
            flag=false
        }
        setSlideEnd(flag)
    },[carouselRef, bookList])

    const handleClickPrev = () =>{
        // padding-left(16)과 해당 너비 합산
        let listWidth = carouselRef.current.getBoundingClientRect().width + 16
        if (Math.abs(currentPosition) < listWidth){
            setCurrentPosition(0)
            setSlideEnd(false)
        }else {
            setCurrentPosition(currentPosition + listWidth)
            setSlideEnd(false)
        }
    }

    const handleClickNext = () =>{
        // padding-left(16)과 해당 너비 합산
        let listWidth = carouselRef.current.getBoundingClientRect().width + 16
        let listNode = bookList.length > 0 ?bookRef.current.getBoundingClientRect().width : 0
        let hiddenSlideWidth =  (listNode * bookList.length) - listWidth
        let moveToDistance;
        if (hiddenSlideWidth - Math.abs(currentPosition) <= listWidth){
            moveToDistance = currentPosition - (hiddenSlideWidth-Math.abs(currentPosition))
            setSlideEnd(true)
        }else {
            moveToDistance = currentPosition - listWidth;
        }
        setCurrentPosition(moveToDistance)
    }

    const handleBookMark = (target) => {
        // 1. list 데이터 값 변경
        const findIdx = bookList.findIndex(item =>item.id === target.id)
        let updateState = cloneDeep(bookList)
        updateState[findIdx].bookMark = !updateState[findIdx].bookMark
        setBookList(updateState);

        // 2. 로컬스토리지 값 변경
        const prevItems = JSON.parse(localStorage.getItem('bookMark')) || []
        const findPrevIdx = prevItems.findIndex(ls =>ls.id === target.id)
        if (findPrevIdx > -1) {
            prevItems[findPrevIdx].bookMark = !prevItems[findPrevIdx].bookMark
        } else {
            target.bookMark = !target.bookMark;
            prevItems.push(target)
        }
        localStorage.setItem('bookMark',JSON.stringify(prevItems))
    }

    return (
        <div className={'carouselWrap'}>
            <div className={'bookBoxWrap'}>
                <div className={'bookBox'}
                     style={{
                         transform: `translateX(${currentPosition}px)`,
                         transition: "0.5s ease",
                     }}
                     ref={carouselRef}
                >
                { bookList.map((item, idx) => {
                    return (
                        <div key={idx} className={'bookItem'} ref={bookRef}>
                            <div className={'bookInner'}>
                                <span onClick={()=> handleBookMark(item)}>
                                    <Icon path={mdiBookmark} size={1} color={item.bookMark ? '#FF893C' : '#B2B2B2'}/>
                                </span>
                                <p className={'bookTit'}>{item.title}</p>
                                <p className={'bookSub'}>{item.description}</p>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
            <button className={'btn btnPrev'} onClick={handleClickPrev} disabled={currentPosition === 0}>
                <Icon path={mdiChevronLeft} size={1}/>
            </button>
            <button className={'btn btnNext'}  onClick={handleClickNext} disabled={slideEnd}>
                <Icon path={mdiChevronRight} size={1}/>
            </button>
        </div>
    )
}

export default ImgCarousel