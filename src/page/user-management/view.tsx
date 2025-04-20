import React, { useEffect, useState } from 'react'
import '../../assets/styles/page/Management.css';
import { Col, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import MainLayout from '../../infrastructure/common/Layouts/Main-Layout';
import ButtonCommon from '../../infrastructure/common/components/button/button-common';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import userService from '../../infrastructure/repositories/user/user.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';


const ViewUserManagement = () => {
    const [detail, setDetail] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;
    const navigate = useNavigate();
    const param = useParams();

    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setData({ ...dataRequest });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onBack = () => {
        navigate(ROUTE_PATH.USER_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (String(param.id)) {
            try {
                await userService.GetUserById(
                    String(param.id),
                    setLoading
                ).then((res) => {
                    setDetail(res.user)
                })
            }
            catch (error) {
                console.error(error)
            }
        }

    }
    useEffect(() => {
        onGetByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (detail) {
            setDataRequest({
                us: detail.us,
                email: detail.email,
                firstname: detail.firstname,
                lastname: detail.lastname,
                sdt: detail.sdt,
                pa: detail.password,

            });
        };
    }, [detail]);

    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await userService.UpdateUser(
                String(param.id),
                {
                    us: dataRequest.us,
                    email: dataRequest.email,
                    firstname: dataRequest.firstname,
                    lastname: dataRequest.lastname,
                    sdt: dataRequest.sdt,
                    pa: dataRequest.password,
                },
                onBack,
                setLoading
            )
        }
        else {
            alert("Nhập thiếu thông tin")
        };
    };

    return (
        <MainLayout
            title={'Thêm người dùng'}
            breadcrumb={'Nguời dùng'}
            redirect={ROUTE_PATH.USER_MANAGEMENT}
        >
            <div className="management-container">
                <div className="content">
                    <div className="btn-container">
                        <ButtonCommon
                            classColor={'cancel'}
                            onClick={onBack}
                            title={'Quay lại'}
                        />
                        <ButtonCommon
                            classColor={'red'}
                            onClick={onCreateAsync}
                            title={'Thêm mới'}
                        />
                    </div>
                    <div className="form-container">
                        <Row gutter={[30, 20]}>
                            <Col span={24} className="border-add">
                                <div className="legend-title">Thêm thông tin mới</div>
                                <Row gutter={[30, 20]}>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Tên người dùng"}
                                            attribute={"us"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.us}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Email"}
                                            attribute={"email"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.email}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Họ"}
                                            attribute={"firstname"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.firstname}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Tên"}
                                            attribute={"lastname"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.lastname}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"SĐT"}
                                            attribute={"sdt"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.sdt}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
export default ViewUserManagement