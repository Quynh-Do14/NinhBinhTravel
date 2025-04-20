import React, { useState } from 'react'
import '../../assets/styles/page/Management.css';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import MainLayout from '../../infrastructure/common/Layouts/Main-Layout';
import ButtonCommon from '../../infrastructure/common/components/button/button-common';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import userService from '../../infrastructure/repositories/user/user.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';
import newsService from '../../infrastructure/repositories/news/news.service';
import UploadAvatar from '../../infrastructure/common/components/input/upload-avatar';
import InputTextAreaCommon from '../../infrastructure/common/components/input/text-area-common';
import InputDateCommon from '../../infrastructure/common/components/input/input-date';

const AddNewsManagement = () => {
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
        navigate(ROUTE_PATH.BLOG_MANAGEMENT)
    }

    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await newsService.CreateNews(
                {
                    tieude: dataRequest.tieude,
                    tieudecon: dataRequest.tieudecon,
                    motangan: dataRequest.motangan,
                    chitiet: dataRequest.chitiet,
                    ngaytaotintuc: dataRequest.ngaytaotintuc,
                    anhdaidien: dataRequest.anhdaidien,
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
            title={'Thêm Tin tức'}
            breadcrumb={'Tin tức'}
            redirect={ROUTE_PATH.BLOG_MANAGEMENT}
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
                            {/* <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={5} className={`border-add flex justify-center`}>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <div className="legend-title">Thêm ảnh mới</div>
                                        <UploadAvatar
                                            dataAttribute={dataRequest.imageAvatar}
                                            setData={setDataRequest}
                                            attribute={'imageAvatar'}
                                            label={'Ảnh'}
                                            listType={'picture-card'}
                                            shape={'card'} />
                                    </div>
                                </div>
                            </Col> */}
                            <Col span={24} className="border-add">
                                <div className="legend-title">Thêm thông tin mới</div>
                                <Row gutter={[30, 20]}>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Tiêu đề"}
                                            attribute={"tieude"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.tieude}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Tiêu đề phụ"}
                                            attribute={"tieudecon"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.tieudecon}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextAreaCommon
                                            label={"Mô tả ngắn"}
                                            attribute={"motangan"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.motangan}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextAreaCommon
                                            label={"Chi tiết"}
                                            attribute={"chitiet"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.chitiet}
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
                                            attribute={"ngaytaotintuc"}
                                            isRequired={true}
                                            setData={setDataRequest}
                                            dataAttribute={dataRequest.ngaytaotintuc}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            disabledToDate={false}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Ảnh đại diện"}
                                            attribute={"anhdaidien"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.anhdaidien}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            {/* <Col span={24}>
                                <TextEditorCommon
                                    label={"Nội dung"}
                                    attribute={"content"}
                                    isRequired={true}
                                    dataAttribute={dataRequest.content}
                                    setData={setDataRequest}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col> */}
                        </Row>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
export default AddNewsManagement