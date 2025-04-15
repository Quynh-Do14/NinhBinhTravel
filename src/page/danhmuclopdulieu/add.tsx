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
import danhmucService from '../../infrastructure/repositories/danhmuc/danhmuc.service';

const AddDanhMucLopDuLieuManagement = () => {
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
        navigate(ROUTE_PATH.DANH_MUC_LOP_DU_LIEU_MANAGEMENT)
    }

    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await danhmucService.CreateDanhMuc(
                {
                    tendanhmuclopbando: dataRequest.tendanhmuclopbando,
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
            title={'Thêm Danh mục lớp dữ liệu'}
            breadcrumb={'Danh mục lớp dữ liệu'}
            redirect={ROUTE_PATH.DANH_MUC_LOP_DU_LIEU_MANAGEMENT}
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
                                            label={"Tên danh mục"}
                                            attribute={"tendanhmuclopbando"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.tendanhmuclopbando}
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
export default AddDanhMucLopDuLieuManagement