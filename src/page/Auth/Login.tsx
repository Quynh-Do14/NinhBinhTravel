import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import "../../assets/styles/page/Login.css"
import { useNavigate } from 'react-router-dom';
import { isTokenStoraged } from '../../infrastructure/utils/storage';
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import { ROUTE_PATH } from '../../core/common/appRouter';

const LoginPage = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataLogin = _data;

    const navigate = useNavigate();

    const setDataLogin = (data: any) => {
        Object.assign(dataLogin, { ...data });
        _setData({ ...dataLogin });
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

    const storage = isTokenStoraged()
    useEffect(() => {
        if (storage) {
            navigate(ROUTE_PATH.MAIN_LAYOUT);
        };
    }, [storage])

    const onLogin = async () => {
        await setSubmittedTime(new Date())
        if (isValidData()) {
            try {
                await authService.login(
                    {
                        email: dataLogin.email,
                        password: dataLogin.password,
                    },
                    setLoading
                ).then((response) => {
                    if (response) {
                        navigate(ROUTE_PATH.MAIN_LAYOUT)
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    return (
        <div>
            <div className='login'>
                <div className={"container"} id="container">
                    <div className="form-container sign-in-container">
                        <div className='form-flex'>
                            <h1 className='mb-4 uppercase'>Đăng nhập</h1>
                            <Row gutter={[10, 10]} justify={"end"}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên đăng nhập"}
                                        attribute={"email"}
                                        isRequired={true}
                                        dataAttribute={dataLogin.email}
                                        setData={setDataLogin}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputPasswordCommon
                                        label={"Mật khẩu"}
                                        attribute={"password"}
                                        isRequired={true}
                                        dataAttribute={dataLogin.password}
                                        setData={setDataLogin}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                            <button onKeyPress={onLogin} className='w-full cursor-pointer' onClick={onLogin}>Đăng nhập</button>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                        </div>
                    </div>
                </div>

            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}

export default LoginPage