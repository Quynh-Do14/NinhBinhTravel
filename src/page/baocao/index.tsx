import React, { useEffect, useState } from 'react';
import '../../assets/styles/page/Management.css';
import { Col, Row, Table } from 'antd';
import Column from 'antd/es/table/Column'
import MainLayout from '../../infrastructure/common/Layouts/Main-Layout';
import { ActionCommon } from '../../infrastructure/common/components/action/action-common';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { TitleTableCommon } from '../../infrastructure/common/components/text/title-table-common';
import ButtonCommon from '../../infrastructure/common/components/button/button-common';
import { PaginationCommon } from '../../infrastructure/common/components/pagination/Pagination';
import DialogConfirmCommon from '../../infrastructure/common/components/modal/dialogConfirm';
import InputSearch from '../../infrastructure/common/components/input/input-search';
import { useNavigate } from 'react-router-dom';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import userService from '../../infrastructure/repositories/user/user.service';
import Constants from '../../core/common/constants';
import newsService from '../../infrastructure/repositories/news/news.service';
import chuyenDeService from '../../infrastructure/repositories/chuyende/chuyende.service';
import { configImageURL } from '../../infrastructure/helper/helper';
import baoCaoService from '../../infrastructure/repositories/baocao/baocao.service';

let timeout: any
const ListBaoCaoManagement = () => {
    const [listResponse, setListResponse] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");

    const [idSelected, setIdSelected] = useState<string>("");

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const onGetListAsync = async ({ name = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page - 1,
            size: size,
            search: name,
        }
        try {
            await baoCaoService.GetBaoCao(
                param,
                setLoading
            ).then((res) => {
                setListResponse(res.data.baocaos)
                setTotal(res.data.totalItems)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (name = "", size = pageSize, page = 1) => {
        await onGetListAsync({ name: name, size: size, page: page });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage,).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value,).then(_ => { });
    };

    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1,).then(_ => { });
    };
    // // Xóa bài
    const onOpenModalDelete = (id: any) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };

    const onDeleteAsync = async () => {
        try {
            await baoCaoService.DeleteBaoCao(
                idSelected,
                setLoading
            ).then((res) => {
                if (res) {
                    setIsDeleteModal(false);
                    onSearch().then(() => { });
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    };

    // Xóa bài
    return (
        <MainLayout
            title={'Danh sách văn bản, báo cáo'}
            breadcrumb={'Văn bản, báo cáo'}
            redirect={ROUTE_PATH.BAOCAO_MANAGEMENT}
        >
            <div className="management-container">
                <div className="content">
                    <Row gutter={[20, 20]}>
                        <Col xs={24} sm={6}>
                            <InputSearch
                                label={'Tìm kiếm'}
                                value={searchText}
                                onChange={onChangeSearchText}
                                attribute={'search'}
                            />
                        </Col>
                        <Col xs={24} sm={18} className='flex justify-end'>
                            <ButtonCommon
                                classColor={'red'}
                                onClick={() => navigate(ROUTE_PATH.ADD_BAOCAO_MANAGEMENT)}
                                title={'Thêm mới'}
                            />
                        </Col>
                    </Row>
                    <div className="table-container">
                        <Table
                            dataSource={listResponse}
                            pagination={false}
                            className='table-common'
                        >
                            <Column
                                title={"STT"}
                                dataIndex="stt"
                                key="stt"
                                width={"5%"}
                                render={(val, record, index) => (
                                    <div style={{ textAlign: "center" }}>
                                        {index + 1 + pageSize * (currentPage - 1)}
                                    </div>
                                )}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Tên báo cáo"
                                        width={'200px'}
                                    />
                                }
                                key={"tenbaocao"}
                                dataIndex={"tenbaocao"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="URI báo cáo"
                                        width={'200px'}
                                    />
                                }
                                key={"uribaocao"}
                                dataIndex={"uribaocao"}
                                render={(val) => {
                                    return (
                                        <a href={configImageURL(val)} target='_blank'>{val}</a>
                                    )
                                }}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Ngày báo cáo"
                                        width={'100px'}
                                    />
                                }
                                key={"ngaytaobaocao"}
                                dataIndex={"ngaytaobaocao"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Người báo cáo"
                                        width={'100px'}
                                    />
                                }
                                key={"firstname"}
                                dataIndex={"firstname"}
                            />
                            <Column
                                title="Thao tác"
                                fixed="right"
                                align='center'
                                width={60}
                                render={(action, record: any) => (
                                    <ActionCommon
                                        onClickDetail={() => navigate(`${ROUTE_PATH.CHUYENDE_MANAGEMENT}/${record.idbaocao}`)}
                                        onClickDelete={() => onOpenModalDelete(record.idbaocao)}

                                    />
                                )}
                            />
                        </Table>
                    </div>
                    <div className='flex flex-col'>
                        <PaginationCommon
                            total={total}
                            currentPage={currentPage}
                            onChangePage={onChangePage}
                            pageSize={pageSize}
                            onChangeSize={onPageSizeChanged}
                            disabled={false}
                        />
                    </div>
                    <DialogConfirmCommon
                        message={"Bạn có muốn xóa báo cáo này ra khỏi hệ thống"}
                        titleCancel={"Bỏ qua"}
                        titleOk={"Xóa báo cáo"}
                        visible={isDeleteModal}
                        handleCancel={onCloseModalDelete}
                        handleOk={onDeleteAsync}
                        title={"Xác nhận"}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ListBaoCaoManagement