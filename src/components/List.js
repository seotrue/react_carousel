import ImgCarousel from "./ImgCarousel";

const List = ({list, title}) => {
    return (
        <div className={'inner'}>
            <p className={'listTitle'}>{title.main} <span>{title.sub}</span></p>
            <ImgCarousel list={list}/>
        </div>
    )
}

export default List