import React, { useEffect, useState } from 'react'
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
import InputTextAreaCommon from '../../infrastructure/common/components/input/text-area-common';
import UploadAvatar from '../../infrastructure/common/components/input/upload-avatar';

type Props = {
    params: { slug: string };
};

const SlugBlogManagement = ({ params }: Props) => {
    const [detail, setDetail] = useState<any>({});
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

    const onGetByIdAsync = async () => {
        if (params.slug) {
            try {
                await newsService.GetNewsById(
                    params.slug,
                    setLoading
                ).then((res) => {
                    setDetail(res)
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
                title: detail.title,
                sortDescription: detail.sortDescription,
                content: detail.content,
                categoryId: detail?.category?.id,
                mainBlog: detail.mainBlog,
                show: detail.show

            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await newsService.UpdateNews(
                params.slug,
                {
                    title: dataRequest.title,
                    sortDescription: dataRequest.sortDescription,
                    content: dataRequest.content,
                    categoryId: dataRequest.categoryId,
                    mainBlog: dataRequest.mainBlog,
                    show: dataRequest.show

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
            title={'Chi tiết tin tức'}
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
                            onClick={onUpdateAsync}
                            title={'Cập nhật'}
                        />
                    </div>
                    <div className="form-container">
                        <Row gutter={[30, 20]}>
                            <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={5} className={`border-add flex justify-center`}>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <div className="legend-title">Thêm thông tin mới</div>
                                        <UploadAvatar
                                            dataAttribute={dataRequest.imageAvatar}
                                            setData={setDataRequest}
                                            attribute={'imageAvatar'}
                                            label={'Ảnh'}
                                            listType={'picture-card'}
                                            shape={'card'} />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={14} lg={16} xl={18} xxl={19} className="border-add">
                                <div className="legend-title">Thêm thông tin mới</div>
                                <Row gutter={[30, 20]}>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Tiêu đề"}
                                            attribute={"title"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.title}
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
                                            attribute={"sortDescription"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.sortDescription}
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

export default SlugBlogManagement