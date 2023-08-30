import SideBar from "./SideBar";
import {Outlet} from "react-router-dom";

const Layout = () => {

    return(
        <div>
            <div className={'container'}>
                <SideBar className={'sideBarMenu'} />
                <div className={'page'}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout