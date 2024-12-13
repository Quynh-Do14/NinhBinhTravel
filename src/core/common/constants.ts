import { ROUTE_PATH } from "./appRouter";


export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Người dùng",
                link: ROUTE_PATH.USER_MANAGEMENT,
            },
            {
                label: "Tin tức",
                link: ROUTE_PATH.BLOG_MANAGEMENT,
            },
            {
                label: "Bản đồ chuyên đề",
                link: ROUTE_PATH.CHUYENDE_MANAGEMENT,
            },
            {
                label: "Điểm quan trắc",
                link: ROUTE_PATH.DIEMQUANTRAC_MANAGEMENT,
            },
            {
                label: "Phản ánh",
                link: ROUTE_PATH.PHANANH_MANAGEMENT,
            },
            {
                label: "Văn bản, Báo cáo",
                link: ROUTE_PATH.BAOCAO_MANAGEMENT,
            },
            {
                label: "Nhật ký",
                link: ROUTE_PATH.NHATKI_MANAGEMENT,
            },
            {
                label: "Thông tin cập nhật",
                link: ROUTE_PATH.THONGTINCAPNHAT_MANAGEMENT,
            },
        ]

    };

    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static search = "search";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

    static PaginationClientConfigs = class {
        static Size = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "8", value: 8 },
            { label: "16", value: 16 },
            { label: "48", value: 48 },
        ]
    };

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }
};
