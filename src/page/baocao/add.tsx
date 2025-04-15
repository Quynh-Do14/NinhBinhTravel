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
import InputDateCommon from '../../infrastructure/common/components/input/input-date';
import UploadSingleFile from '../../infrastructure/common/components/input/upload-single-file';
import baoCaoService from '../../infrastructure/repositories/baocao/baocao.service';

const AddBaoCaoManagement = () => {
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
        navigate(ROUTE_PATH.BAOCAO_MANAGEMENT)
    }

    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        const formData = new FormData();
        formData.append('tenbaocao', dataRequest.tenbaocao)
        formData.append('ngaytaobaocao', dataRequest.ngaytaobaocao)
        formData.append('baocao', dataRequest.baocao)
        if (isValidData()) {
            await baoCaoService.CreateBaoCao(
                formData,
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
            redirect={ROUTE_PATH.BAOCAO_MANAGEMENT}
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
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Tiêu đề"}
                                            attribute={"tenbaocao"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.tenbaocao}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputDateCommon
                                            label={"Ngày tạo báo cáo"}
                                            attribute={"ngaytaobaocao"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.ngaytaobaocao}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            disabledToDate={false} />
                                    </Col>
                                    <Col span={24}>
                                        <UploadSingleFile
                                            dataAttribute={dataRequest.baocao}
                                            setData={setDataRequest}
                                            attribute={'baocao'}
                                            label={'File báo cáo pdf'}
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
export default AddBaoCaoManagement