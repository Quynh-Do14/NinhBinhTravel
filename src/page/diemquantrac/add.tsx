import React, { useState } from 'react'
import '../../assets/styles/page/Management.css';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import MainLayout from '../../infrastructure/common/Layouts/Main-Layout';
import ButtonCommon from '../../infrastructure/common/components/button/button-common';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import UploadAvatar from '../../infrastructure/common/components/input/upload-avatar';
import InputTextAreaCommon from '../../infrastructure/common/components/input/text-area-common';
import InputDateCommon from '../../infrastructure/common/components/input/input-date';
import chuyenDeService from '../../infrastructure/repositories/chuyende/chuyende.service';
import UploadListImage from '../../infrastructure/common/components/input/upload-list-image';
import diemQuanTracService from '../../infrastructure/repositories/diemquantrac/diemquantrac.service';

const AddDiemQuanTracManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;
    const navigate = useNavigate();

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
        navigate(ROUTE_PATH.DIEMQUANTRAC_MANAGEMENT)
    }

    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await diemQuanTracService.CreateDiemQuanTrac(
                {
                    name: dataRequest.name,
                    pl: dataRequest.pl,
                    long: dataRequest.long,
                    lat: dataRequest.lat,
                    popupinfo: dataRequest.popupinfo,

                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <MainLayout
            title={'Thêm điểm quan trắc'}
            breadcrumb={'Điểm quan trắc'}
            redirect={ROUTE_PATH.DIEMQUANTRAC_MANAGEMENT}
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
                                            label={"Tên"}
                                            attribute={"name"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.name}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Phân loại"}
                                            attribute={"pl"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.pl}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Kinh độ"}
                                            attribute={"long"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.long}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Vĩ độ"}
                                            attribute={"lat"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.lat}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextAreaCommon
                                            label={"Nội dung"}
                                            attribute={"popupinfo"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.popupinfo}
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
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
export default AddDiemQuanTracManagement