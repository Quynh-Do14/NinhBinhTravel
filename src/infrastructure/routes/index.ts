import { ROUTE_PATH } from "../../core/common/appRouter";
import LoginPage from "../../page/Auth/Login";
import ListBanDoManagement from "../../page/bandochuyende";
import AddChuyenDeManagement from "../../page/bandochuyende/add";
import ListBaoCaoManagement from "../../page/baocao";
import AddBaoCaoManagement from "../../page/baocao/add";
import ListDiemQuanTracManagement from "../../page/diemquantrac";
import AddDiemQuanTracManagement from "../../page/diemquantrac/add";
import ListNewsManagement from "../../page/news-management";
import AddNewsManagement from "../../page/news-management/add";
import ListNhatkiManagement from "../../page/nhatki";
import ListPhananhManagement from "../../page/phananh";
import ListThongTinCapNhatManagement from "../../page/thongtincapnhat";
import AddThongTinCapNhatManagement from "../../page/thongtincapnhat/add";
import ListUserManagement from "../../page/user-management";
import AddUserManagement from "../../page/user-management/add";
import MainLayout from "../common/Layouts/Main-Layout";

export const privateRoutes = [
    {
        path: ROUTE_PATH.MAIN_LAYOUT,
        component: MainLayout,
        private: true,
    },
    {
        path: ROUTE_PATH.LOGIN,
        component: LoginPage,
        private: false,
    },
    {
        path: ROUTE_PATH.USER_MANAGEMENT,
        component: ListUserManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_USER_MANAGEMENT,
        component: AddUserManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.BLOG_MANAGEMENT,
        component: ListNewsManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_BLOG_MANAGEMENT,
        component: AddNewsManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.CHUYENDE_MANAGEMENT,
        component: ListBanDoManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_CHUYENDE_MANAGEMENT,
        component: AddChuyenDeManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.DIEMQUANTRAC_MANAGEMENT,
        component: ListDiemQuanTracManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_DIEMQUANTRAC_MANAGEMENT,
        component: AddDiemQuanTracManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.PHANANH_MANAGEMENT,
        component: ListPhananhManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.BAOCAO_MANAGEMENT,
        component: ListBaoCaoManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_BAOCAO_MANAGEMENT,
        component: AddBaoCaoManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.NHATKI_MANAGEMENT,
        component: ListNhatkiManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.THONGTINCAPNHAT_MANAGEMENT,
        component: ListThongTinCapNhatManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_THONGTINCAPNHAT_MANAGEMENT,
        component: AddThongTinCapNhatManagement,
        private: true,
    },
]