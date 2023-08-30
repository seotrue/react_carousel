import {useEffect, useState} from "react";
import Title from "../components/Title";
import List from "../components/List";
import {find, isUndefined} from "lodash";
import Icon from "@mdi/react";
import {mdiBookOutline} from "@mdi/js";

const dummy = [
    {
        id: 201,
        userName: '홍길동',
        title: '아몬드',
        description: '아몬드 책 설명'
    }, {
        id: 202,
        userName: '홍길동',
        title: '아몬드',
        description: '아몬드 책 설명'
    },
    {
        id: 232,
        userName: '홍길동',
        title: '아몬드',
        description: '아몬드 책 설명'
    },
    {
        id: 232,
        userName: '홍길동',
        title: '아몬드',
        description: '아몬드 책 설명'
    },
    {
        id: 232,
        userName: '홍길동',
        title: '아몬드',
        description: '아몬드 책 설명'
    },
    {
        id: 232,
        userName: '홍길동',
        title: '아몬드',
        description: '아몬드 책 설명'
    },
    {
        id: 232,
        userName: '홍길동',
        title: '아몬드',
        description: '아몬드 책 설명'
    },


]
const MyLibraryPage = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        //getMyBookList();
    }, []);

    // const getMyBookList = async () => {
    //     try {
    //         const res = await getMyBookListApi();
    //         const updateState = await getBookMarkData(res)
    //         setList(updateState)
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    const getBookMarkData = (data) => {
        const bookMarkArr = JSON.parse(localStorage.getItem('bookMark'));
        let updateState = data.map((item) => {
            let target = find(bookMarkArr, {id: item.id})
            if (!isUndefined(target)) item.bookMark = target.bookMark;
            else item.bookMark = false

            return item
        })
        return updateState
    }

    return (
        <div className={'content'}>
            {/*<Title tit={'내서재'} icon={ <Icon path={mdiBookOutline} size={1} color={'#FF893C'}/>}/>*/}
            <List list={getBookMarkData(dummy)} title={{main:'리스트목록형', sub:'데이터'}}/>
        </div>
    )
}
export default MyLibraryPage