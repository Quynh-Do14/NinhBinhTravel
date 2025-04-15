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
import InputSelectCatrgoryAPI2 from '../../infrastructure/common/components/input/select-category2';
import danhMucAPIService from '../../infrastructure/repositories/api/api.service';
import dulieulopService from '../../infrastructure/repositories/dulieulop/dulieulop.service';

const SlugAPIManagement = () => {
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
        navigate(ROUTE_PATH.API_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (String(param.id)) {
            try {
                await danhMucAPIService.GetDanhMucAPIById(
                    String(param.id),
                    setLoading
                ).then((res) => {
                    setDetail(res.api)
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
                tenapi: detail.tenapi,
                uriapi: detail.uriapi,
                ngaytaoapi: detail.ngaytaoapi,
                gid: detail.iddulieulopbandonoi,
            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await danhMucAPIService.UpdateDanhMucAPI(
                String(param.id),
                {
                    tenapi: dataRequest.tenapi,
                    uriapi: dataRequest.uriapi,
                    ngaytaoapi: dataRequest.ngaytaoapi,
                    iddanhmucapinoi: 1,
                    iddulieulopbandonoi: dataRequest.gid,
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
            await dulieulopService.GetDulieulop(
                param,
                setLoading
            ).then((res) => {
                const newARR = res.data.dulieulopbandos?.map((item: any) => {
                    const result = {
                        gid: item.gid,
                        tendulieu: item.tendulieu
                    }
                    return result
                })
                setListDanhMuc(newARR);
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListAsync();
    }, [])
    console.log("listDanhMuc", listDanhMuc);
    console.log("dataRequest", dataRequest);
    console.log("detail", detail);

    return (
        <MainLayout
            title={'Chi tiết API'}
            breadcrumb={'API'}
            redirect={ROUTE_PATH.API_MANAGEMENT}
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
                                            label={"Tên API"}
                                            attribute={"tenapi"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.tenapi}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"URI"}
                                            attribute={"uriapi"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.uriapi}
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
                                            attribute={"ngaytaoapi"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.ngaytaoapi}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            disabledToDate={null}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputSelectCatrgoryAPI2
                                            label={"Loại dữ liệu"}
                                            attribute={"gid"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.gid}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            listDataOfItem={listDanhMuc} />
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

export default SlugAPIManagement