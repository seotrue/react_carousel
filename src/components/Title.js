
const Title = ({ tit, icon }) => {
    return (
        <div className={'pageTitleArea'}>
            <span className={'bul'}>{icon}</span>
            <span className={'tit'}>{tit}</span>
        </div>
    )
}

export default Title