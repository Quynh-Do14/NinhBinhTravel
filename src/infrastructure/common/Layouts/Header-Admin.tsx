import React, { useState } from 'react'
import '../../../assets/styles/page/MainLayout.css';
import BreadcrumbCommon from '../components/controls/Breadcumb';
import { Col, Dropdown, Menu, Row, Space } from 'antd';
import DialogConfirmCommon from '../components/modal/dialogConfirm';
import authService from '../../repositories/auth/service/auth.service';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import avatar from '../../../assets/images/avatar.png'

type Props = {
    title: string,
    breadcrumb: string,
    redirect: string
}
const HeaderAdminComponent = (props: Props) => {
    const { title, breadcrumb, redirect } = props;
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const closeModalLogout = () => {
        setIsOpenModalLogout(false);
    };

    const onLogOut = async () => {
        setIsOpenModalLogout(false);
        try {
            await authService.logout(
                setLoading
            ).then(() => {
                navigate(ROUTE_PATH.LOGIN);
                window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    }

    const listAction = () => {
        return (
            <Menu className='action-admin'>
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex align-middle hover:text-[#fc5a5a]' >
                        <svg className='mr-1-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Đăng xuất
                    </div>
                </Menu.Item>
            </Menu>
        )
    };
    const username = JSON.parse(String(localStorage.getItem("userData")))?.data?.us;

    return (
        <div>
            <div className="header-admin">
                <BreadcrumbCommon
                    title={title}
                    breadcrumb={breadcrumb}
                    redirect={redirect}
                    isAdmin={true}
                />


                <Row align={"middle"} >
                    <Col className='mr-2 flex flex-col align-bottom'>
                        <div className='text-[14px] text-[#FFF] font-bold'>
                            {username}
                        </div>
                        {/* <div className='role'>
                                {dataProfile.roles[0]?.name}
                            </div> */}
                    </Col>
                    <Col>
                        <Dropdown overlay={listAction} trigger={['click']} className='flex justify-end'>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <div className="img">
                                        <img src={avatar} width={40} height={40} alt={''} />
                                    </div>
                                </Space>
                            </a>

                        </Dropdown>
                    </Col>
                </Row>

            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={closeModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
        </div>
    )
}

export default HeaderAdminComponent