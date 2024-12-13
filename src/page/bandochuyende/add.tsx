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
import chuyenDeService from '../../infrastructure/repositories/chuyende/chuyende.service';
import fileService from '../../infrastructure/repositories/file/file.service';
import UploadSingleImage from '../../infrastructure/common/components/input/upload-img-single';

const AddChuyenDeManagement = () => {
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
        navigate(ROUTE_PATH.CHUYENDE_MANAGEMENT)
    }

    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        const formData = new FormData();
        formData.append('img', dataRequest.filename)
        if (isValidData()) {
            await fileService.UploadFle(
                formData,
                onBack,
                setLoading
            ).then((res) => {
                chuyenDeService.CreateChuyenDe(
                    {
                        ten: dataRequest.ten,
                        filename: res.res
                    },
                    onBack,
                    setLoading
                )
            })


        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <MainLayout
            title={'Thêm người dùng'}
            breadcrumb={'Nguời dùng'}
            redirect={ROUTE_PATH.CHUYENDE_MANAGEMENT}
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
                                            attribute={"ten"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.ten}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <UploadSingleImage
                                            dataAttribute={dataRequest.filename}
                                            setData={setDataRequest}
                                            attribute={'filename'}
                                            label={'Ảnh'}
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
export default AddChuyenDeManagement