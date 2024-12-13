import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import  '../../../assets/styles/page/MainLayout.css';
import NavbarComponent from './Navbar';
import HeaderAdminComponent from './Header-Admin';
import { useLocation } from 'react-router-dom';
import Constants from '../../../core/common/constants';

const { Content } = Layout;

const MainLayout = ({ title, breadcrumb, redirect, ...props }: any) => {

    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [dataProfile, setDataProfile] = useState<any>({});

    const { pathname } = useLocation();
    return (
        <div className="main-layout">
            <div onClick={() => setCollapsed(!collapsed)} className={`${collapsed ? "open" : "close"} overlay`}></div>
            <Layout>
                <Layout>
                    <NavbarComponent
                        collapsed={collapsed}
                        pathname={pathname}
                        classSider={'sider'}
                        listMenu={Constants.Menu.List}
                        isOpenMenuService={false}
                        setIsOpenMenuService={() => { }}
                        setlistChildren={() => { }}
                        serviceId={0}
                        setServiceId={() => { }}
                        setLink={() => { }}
                    />
                    <div className="bg-content-no-scroll">
                        <HeaderAdminComponent
                            title={title}
                            breadcrumb={breadcrumb}
                            redirect={redirect}
                        />
                        <Content className="bg-content-no-children">
                            {props.children}
                        </Content>
                    </div>

                </Layout>
            </Layout >
            {/* <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={closeModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            /> */}
        </div >
    )
}

export default MainLayout