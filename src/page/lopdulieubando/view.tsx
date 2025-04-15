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
import InputSelectCatrgoryAPI from '../../infrastructure/common/components/input/select-category';
import InputSelectCatrgoryCommon from '../../infrastructure/common/components/input/select-category-common';
import UploadSingleImage from '../../infrastructure/common/components/input/upload-img-single';
import dulieulopService from '../../infrastructure/repositories/dulieulop/dulieulop.service';

const listDataOfItem = [
    {
        value: "Điểm",
        label: "Điểm",
    },
    {
        value: "Đường",
        label: "Đường",
    },
    {
        value: "Vùng",
        label: "Vùng",
    },


]

const SlugLopDuLieuBanDoManagement = () => {
    const [listDanhMuc, setListDanhMuc] = useState<Array<any>>([])

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
        navigate(ROUTE_PATH.LOPBANDO_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (String(param.id)) {
            try {
                await dulieulopService.GetDulieulopById(
                    String(param.id),
                    setLoading
                ).then((res) => {
                    setDetail(res.dulieulopbando)
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
                tendulieu: detail.tendulieu,
                urishp: detail.urishp || "",
                iddanhmuclopbandonoi: detail.iddanhmuclopbandonoi,
                uriexcel: detail.uriexcel || "",
                uridbf: detail.uridbf || "",
                loaifile: detail.loaifile || "",
                hienthimacdinh: 1,
                loaidulieu: detail.loaidulieu
            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await dulieulopService.UpdateDulieulop(
                String(param.id),
                {
                    tendulieu: dataRequest.tendulieu,
                    urishp: dataRequest.urishp || "",
                    iddanhmuclopbandonoi: dataRequest.iddanhmuclopbandonoi,
                    uriexcel: dataRequest.uriexcel || "",
                    uridbf: dataRequest.uridbf || "",
                    loaifile: dataRequest.loaifile || "",
                    hienthimacdinh: 1,
                    loaidulieu: dataRequest.loaidulieu
                },
                onBack,
                setLoading
            )
        }
        else {
            alert("Nhập thiếu thông tin")
        };
    };

    const onGetListAsync = async () => {
        const param = {
            // page: 0,
            // size: size,
            // search: name,
        }
        try {
            await danhmucService.GetDanhmuc(
                param,
                setLoading
            ).then((res) => {
                setListDanhMuc(res.data.danhmuclopbandos)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListAsync();
    }, []);

    return (
        <MainLayout
            title={'Chi tiết lớp bản đồ'}
            breadcrumb={'Lớp bản đồ'}
            redirect={ROUTE_PATH.LOPBANDO_MANAGEMENT}
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
                                            label={"Tên dữ liệu"}
                                            attribute={"tendulieu"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.tendulieu}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputSelectCatrgoryAPI
                                            label={"Danh mục lớp bản đồ nội"}
                                            attribute={"iddanhmuclopbandonoi"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.iddanhmuclopbandonoi}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            listDataOfItem={listDanhMuc} />
                                    </Col>
                                    <Col span={24}>
                                        <InputSelectCatrgoryCommon
                                            label={"Loại dữ liệu"}
                                            attribute={"loaidulieu"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.loaidulieu}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            listDataOfItem={listDataOfItem} />
                                    </Col>
                                    <Col span={24}>
                                        <UploadSingleImage
                                            label={"Chọn file"}
                                            attribute={""}
                                            dataAttribute={dataRequest.f}
                                            setData={setDataRequest}
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

export default SlugLopDuLieuBanDoManagement