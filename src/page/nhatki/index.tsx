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
import Constants from '../../core/common/constants';
import phananhService from '../../infrastructure/repositories/phananh/phananh.service';
import nhatkiService from '../../infrastructure/repositories/nhatki/nhatki.service';

let timeout: any
const ListNhatkiManagement = () => {
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
            await nhatkiService.GetNhatki(
                param,
                setLoading
            ).then((res) => {
                setListResponse(res.data.nhatkys)
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
            await nhatkiService.DeleteNhatki(
                idSelected,
                setLoading,
                () => {
                    setIsDeleteModal(false);
                    onSearch().then(() => { });
                },
            ).then((res) => { })
        }
        catch (error) {
            console.error(error)
        }
    };

    // Xóa bài
    return (
        <MainLayout
            title={'Danh sách nhật kí'}
            breadcrumb={'Nhật kí'}
            redirect={ROUTE_PATH.NHATKI_MANAGEMENT}
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
                                        title="Hành động ghi nhật kí"
                                        width={'200px'}
                                    />
                                }
                                key={"tennhatky"}
                                dataIndex={"tennhatky"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Nội dung"
                                        width={'300px'}
                                    />
                                }
                                key={"noidungnhatky"}
                                dataIndex={"noidungnhatky"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Ngày tạo"
                                        width={'150px'}
                                    />
                                }
                                key={"luotnguoitruycap"}
                                dataIndex={"luotnguoitruycap"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Người dùng có nhật kí"
                                        width={'150px'}
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
                                        onClickDetail={() => navigate(`${ROUTE_PATH.NHATKI_MANAGEMENT}/${record.idnhatky}`)}
                                        onClickDelete={() => onOpenModalDelete(record.idnhatky)}

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
                        message={"Bạn có muốn xóa nhật kí này ra khỏi hệ thống"}
                        titleCancel={"Bỏ qua"}
                        titleOk={"Xóa nhật kí"}
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

export default ListNhatkiManagement