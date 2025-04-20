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
import anhvetinhService from '../../infrastructure/repositories/anhvetinh/danhmuc.service';
import dulieulopService from '../../infrastructure/repositories/dulieulop/dulieulop.service';

let timeout: any
const ListLopDuLieuBanDoManagement = () => {
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
            await dulieulopService.GetDulieulop(
                param,
                setLoading
            ).then((res) => {
                setListResponse(res.data.dulieulopbandos)
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
            await dulieulopService.DeleteDulieulop(
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

    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.VIEW_LOPBANDO_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }


    // Xóa bài
    return (
        <MainLayout
            title={'Danh sách lớp bản đồ dữ liệu'}
            breadcrumb={'Lớp bản đồ dữ liệu'}
            redirect={ROUTE_PATH.LOPBANDO_MANAGEMENT}
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
                                onClick={() => navigate(ROUTE_PATH.ADD_LOPBANDO_MANAGEMENT)}
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
                                        title="Tên dữ liệu"
                                        width={'150px'}
                                    />
                                }
                                key={"tendulieu"}
                                dataIndex={"tendulieu"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Loại dữ liệu"
                                        width={'150px'}
                                    />
                                }
                                key={"loaidulieu"}
                                dataIndex={"loaidulieu"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Danh mục"
                                        width={'150px'}
                                    />
                                }
                                key={"iddanhmuclopbandonoi"}
                                dataIndex={"iddanhmuclopbandonoi"}
                            />
                            {/* <Column
                                title={
                                    <TitleTableCommon
                                        title="URI SHP"
                                        width={'150px'}
                                    />
                                }
                                key={"urishp"}
                                dataIndex={"urishp"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="URI DBF"
                                        width={'150px'}
                                    />
                                }
                                key={"uridbf"}
                                dataIndex={"uridbf"}
                            /> */}
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="URI EXCEL"
                                        width={'150px'}
                                    />
                                }
                                key={"uriexcel"}
                                dataIndex={"uriexcel"}
                            />
                            <Column
                                title="Thao tác"
                                fixed="right"
                                align='center'
                                width={60}
                                render={(action, record: any) => (
                                    <ActionCommon
                                        onClickDetail={() => onNavigate(record.gid)}
                                        onClickDelete={() => onOpenModalDelete(record.gid)}

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
                        message={"Bạn có muốn xóa lớp dữ liệu dữ liệu này ra khỏi hệ thống"}
                        titleCancel={"Bỏ qua"}
                        titleOk={"Xóa ảnh vệ tinh dữ liệu"}
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

export default ListLopDuLieuBanDoManagement