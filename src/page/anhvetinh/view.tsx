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
import newsService from '../../infrastructure/repositories/news/news.service';
import InputTextAreaCommon from '../../infrastructure/common/components/input/text-area-common';
import UploadAvatar from '../../infrastructure/common/components/input/upload-avatar';
import danhmucService from '../../infrastructure/repositories/danhmuc/danhmuc.service';
import InputDateCommon from '../../infrastructure/common/components/input/input-date';
import anhvetinhService from '../../infrastructure/repositories/anhvetinh/danhmuc.service';

const SlugAnhVeTinhManagement = () => {
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
        navigate(ROUTE_PATH.ANHVETINH_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (String(param.id)) {
            try {
                await anhvetinhService.GetAnhvetinhById(
                    String(param.id),
                    setLoading
                ).then((res) => {
                    setDetail(res.anhvetinh)
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
                tenanhvetinh: detail.tenanhvetinh,
                urianhvetinh: detail.urianhvetinh,
                ngaytaoanhvetinh: detail.ngaytaoanhvetinh,
            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await anhvetinhService.UpdateAnhvetinh(
                String(param.id),
                {
                    tenanhvetinh: dataRequest.tenanhvetinh,
                    urianhvetinh: dataRequest.urianhvetinh,
                    ngaytaoanhvetinh: dataRequest.ngaytaoanhvetinh,
                    idanhmucanhvetinhnoi: 1
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
            title={'Chi tiết ảnh vệ tinh'}
            breadcrumb={'Ảnh vệ tinh'}
            redirect={ROUTE_PATH.ANHVETINH_MANAGEMENT}
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
                            onClick={onUpdateAsync}
                            title={'Cập nhật'}
                        />
                    </div>
                    <div className="form-container">
                        <Row gutter={[30, 20]}>
                            <Col span={24} className="border-add">
                                <div className="legend-title">Cập nhật thông tin</div>
                                <Row gutter={[30, 20]}>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Tên ảnh"}
                                            attribute={"tenanhvetinh"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.tenanhvetinh}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"URI ảnh"}
                                            attribute={"urianhvetinh"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.urianhvetinh}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputDateCommon
                                            label={"Ngày tạo"}
                                            attribute={"ngaytaoanhvetinh"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.ngaytaoanhvetinh}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            disabledToDate={null}
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

export default SlugAnhVeTinhManagement