import React from 'react'
import { Layout, Menu } from 'antd';
import '../../../assets/styles/page/MainLayout.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg'

const { Sider } = Layout;

type Props = {
    collapsed: boolean,
    pathname: string,
    classSider: "sider" | "sider_public",
    listMenu: Array<any>;
    isOpenMenuService: boolean,
    setIsOpenMenuService: Function
    setlistChildren: Function
    serviceId: number
    setServiceId: Function,
    setLink: Function
}
const NavbarComponent = (props: Props) => {
    const {
        collapsed,
        pathname,
        classSider,
        listMenu,
        isOpenMenuService,
        setIsOpenMenuService,
        setlistChildren,
        serviceId,
        setServiceId,
        setLink
    } = props;


    const onOpenMenuService = (link: string, id: number, children: Array<any>) => {
        if (isOpenMenuService && id == serviceId) {
            setIsOpenMenuService(false);
        }
        else {
            setIsOpenMenuService(true);
        }
        setlistChildren(children);
        setLink(link)
        setServiceId(id);
    };

    return (
        <div className={`${collapsed ? "open" : "close"} ${classSider}`}>
            <Sider trigger={null}>
                <div className='flex flex-col gap-2'>
                    <div className="logo-container">
                        <Link to={"/"} className='flex justify-center'>
                            <img
                                alt='logo'
                                src={logo}
                                width={60}
                                height={60}
                            />
                        </Link>
                    </div>
                    <Menu className="menu">
                        {listMenu.map((it, index) => {
                            if (it.children) {
                                return (
                                    <div
                                        key={index}
                                        className={`${pathname.includes(it.link) && "active"} ${"menu"}`}
                                    >
                                        <Menu.Item
                                            className={`${pathname.includes(it.link) && "active"} ${"menu-title"}`}
                                            icon={<div dangerouslySetInnerHTML={{ __html: it.icon2 }} />}
                                        >
                                            <div onClick={() => onOpenMenuService(it.link, it.id, it.children)} className='cursor-pointer'>
                                                {it.label}
                                            </div>
                                        </Menu.Item>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div
                                        key={index}
                                        className={`${pathname.includes(it.link) && "active"} ${"menu"}`}
                                    >
                                        <Menu.Item
                                            className={`${pathname.includes(it.link) && "active"} ${"menu-title"}`}
                                            icon={<div dangerouslySetInnerHTML={{ __html: it.icon2 }} />}
                                        >
                                            <Link to={it.link}>
                                                {it.label}
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                )
                            }
                        })}
                    </Menu>
                </div>
            </Sider >
        </div >
    )
}

export default NavbarComponent