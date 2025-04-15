import { ROUTE_PATH } from "../../core/common/appRouter";
import ListAnhVeTinhManagement from "../../page/anhvetinh";
import AddAnhVeTinhManagement from "../../page/anhvetinh/add";
import SlugAnhVeTinhManagement from "../../page/anhvetinh/view";
import ListAPIManagement from "../../page/apibando";
import AddAPIManagement from "../../page/apibando/add";
import SlugAPIManagement from "../../page/apibando/view";
import LoginPage from "../../page/Auth/Login";
import ListBanDoManagement from "../../page/bandochuyende";
import AddChuyenDeManagement from "../../page/bandochuyende/add";
import ListBaoCaoManagement from "../../page/baocao";
import AddBaoCaoManagement from "../../page/baocao/add";
import ListDanhMucLopDuLieuManagement from "../../page/danhmuclopdulieu";
import AddDanhMucLopDuLieuManagement from "../../page/danhmuclopdulieu/add";
import SlugDanhMucLopDuLieuManagement from "../../page/danhmuclopdulieu/view";
import ListDiemQuanTracManagement from "../../page/diemquantrac";
import AddDiemQuanTracManagement from "../../page/diemquantrac/add";
import ListLopDuLieuBanDoManagement from "../../page/lopdulieubando";
import AddLopDuLieuBanDoManagement from "../../page/lopdulieubando/add";
import SlugLopDuLieuBanDoManagement from "../../page/lopdulieubando/view";
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

    {
        path: ROUTE_PATH.DANH_MUC_LOP_DU_LIEU_MANAGEMENT,
        component: ListDanhMucLopDuLieuManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_DANH_MUC_LOP_DU_LIEU_MANAGEMENT,
        component: AddDanhMucLopDuLieuManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_DANH_MUC_LOP_DU_LIEU_MANAGEMENT,
        component: SlugDanhMucLopDuLieuManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.ANHVETINH_MANAGEMENT,
        component: ListAnhVeTinhManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_ANHVETINH_MANAGEMENT,
        component: AddAnhVeTinhManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_ANHVETINH_MANAGEMENT,
        component: SlugAnhVeTinhManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.LOPBANDO_MANAGEMENT,
        component: ListLopDuLieuBanDoManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_LOPBANDO_MANAGEMENT,
        component: AddLopDuLieuBanDoManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_LOPBANDO_MANAGEMENT,
        component: SlugLopDuLieuBanDoManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.API_MANAGEMENT,
        component: ListAPIManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_API_MANAGEMENT,
        component: AddAPIManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_API_MANAGEMENT,
        component: SlugAPIManagement,
        private: true,
    }
]