import React, { useEffect, useState } from "react";
import "../../assets/styles/page/Management.css";
import { Col, Row, Table } from "antd";
import Column from "antd/es/table/Column";
import MainLayout from "../../infrastructure/common/Layouts/Main-Layout";
import { ActionCommon } from "../../infrastructure/common/components/action/action-common";
import { ROUTE_PATH } from "../../core/common/appRouter";
import { TitleTableCommon } from "../../infrastructure/common/components/text/title-table-common";
import ButtonCommon from "../../infrastructure/common/components/button/button-common";
import { PaginationCommon } from "../../infrastructure/common/components/pagination/Pagination";
import DialogConfirmCommon from "../../infrastructure/common/components/modal/dialogConfirm";
import InputSearch from "../../infrastructure/common/components/input/input-search";
import { useNavigate } from "react-router-dom";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import userService from "../../infrastructure/repositories/user/user.service";
import Constants from "../../core/common/constants";
import newsService from "../../infrastructure/repositories/news/news.service";
import chuyenDeService from "../../infrastructure/repositories/chuyende/chuyende.service";
import { configImageURL } from "../../infrastructure/helper/helper";
import diemQuanTracService from "../../infrastructure/repositories/diemquantrac/diemquantrac.service";
import phananhService from "../../infrastructure/repositories/phananh/phananh.service";

let timeout: any;
const ListPhananhManagement = () => {
  const [listResponse, setListResponse] = useState<Array<any>>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");

  const [idSelected, setIdSelected] = useState<string>("");

  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onGetListAsync = async ({
    name = "",
    size = pageSize,
    page = currentPage,
  }) => {
    const param = {
      page: page,
      size: size,
      search: name,
    };
    try {
      await phananhService.GetPhananh(param, setLoading).then((res) => {
        setListResponse(res.data.phananhs);
        setTotal(res.data.totalItems);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const onSearch = async (name = "", size = pageSize, page = 1) => {
    await onGetListAsync({ name: name, size: size, page: page });
  };

  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onSearch(e.target.value, pageSize, currentPage).then((_) => {});
    }, Constants.DEBOUNCE_SEARCH);
  };

  useEffect(() => {
    onSearch().then((_) => {});
  }, []);

  const onChangePage = async (value: any) => {
    setCurrentPage(value);
    await onSearch(searchText, pageSize, value).then((_) => {});
  };

  const onPageSizeChanged = async (value: any) => {
    setPageSize(value);
    setCurrentPage(1);
    await onSearch(searchText, value, 1).then((_) => {});
  };
  // // Xóa bài
  const onOpenModalDelete = (id: any) => {
    setIsDeleteModal(true);
    setIdSelected(id);
  };

  const onCloseModalDelete = () => {
    setIsDeleteModal(false);
  };

  const onDeleteAsync = async () => {
    try {
      await phananhService.DeletePhananh(idSelected, setLoading).then((res) => {
        if (res) {
          setIsDeleteModal(false);
          onSearch().then(() => {});
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Xóa bài
  return (
    <MainLayout
      title={"Danh sách phản ánh"}
      breadcrumb={"Phản ánh"}
      redirect={ROUTE_PATH.DIEMQUANTRAC_MANAGEMENT}
    >
      <div className="management-container">
        <div className="content">
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={6}>
              <InputSearch
                label={"Tìm kiếm"}
                value={searchText}
                onChange={onChangeSearchText}
                attribute={"search"}
              />
            </Col>
          </Row>
          <div className="table-container">
            <Table
              dataSource={listResponse}
              pagination={false}
              className="table-common"
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
                  <TitleTableCommon title="Ảnh phản ánh" width={"100px"} />
                }
                key={"anhphananh"}
                dataIndex={"anhphananh"}
                render={(val, record, index) => (
                  <img src={"http://103.130.212.145:42241/api/public/" + val} style={{
                    maxWidth: 100
                  }} />
                )}
              />
              <Column
                title={<TitleTableCommon title="Nội dung" width={"200px"} />}
                key={"noidung"}
                dataIndex={"noidung"}
              />
              <Column
                title={<TitleTableCommon title="Trạng thái" width={"50px"} />}
                key={"trangthai"}
                dataIndex={"trangthai"}
              />
              <Column
                title={<TitleTableCommon title="Thời gian" width={"50px"} />}
                key={"ngaytaophananh"}
                dataIndex={"ngaytaophananh"}
              />
              <Column
                title={<TitleTableCommon title="Kinh độ" width={"50px"} />}
                key={"long"}
                dataIndex={"long"}
              />
              <Column
                title={<TitleTableCommon title="Vỹ độ" width={"50px"} />}
                key={"lat"}
                dataIndex={"lat"}
              />
              {/* <Column
                                title="Thao tác"
                                fixed="right"
                                align='center'
                                width={60}
                                render={(action, record: any) => (
                                    <ActionCommon
                                        onClickDetail={() => navigate(`${ROUTE_PATH.DIEMQUANTRAC_MANAGEMENT}/${record.gid}`)}
                                        onClickDelete={() => onOpenModalDelete(record.gid)}

                                    />
                                )}
                            /> */}
            </Table>
          </div>
          <div className="flex flex-col">
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
            message={"Bạn có muốn xóa phản ánh này ra khỏi hệ thống"}
            titleCancel={"Bỏ qua"}
            titleOk={"Xóa phản ánh"}
            visible={isDeleteModal}
            handleCancel={onCloseModalDelete}
            handleOk={onDeleteAsync}
            title={"Xác nhận"}
          />
        </div>
      </div>
      <FullPageLoading isLoading={loading} />
    </MainLayout>
  );
};

export default ListPhananhManagement;
