export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "/auth/signup"
        static Logout = "/auth/logout"
    }
    static User = class {
        static Get = "/user"
        static GetById = "/user"
        static Create = "/user"
        static Update = "/user"
        static Delete = "/user/delete"
    }
    static News = class {
        static Get = "/tintuc"
        static GetById = "/tintuc"
        static Create = "/tintuc"
        static Update = "/tintuc"
        static Delete = "/tintuc/delete"
    }
    static ChuyenDe = class {
        static Get = "/bandochuyende"
        static GetById = "/bandochuyende"
        static Create = "/bandochuyende"
        static Update = "/bandochuyende/update"
        static Delete = "/bandochuyende/delete"
    }
    static DiemQuanTrac = class {
        static Get = "/bando/diemquantrac/diemQuanTrac"
        static GetById = "/bando/diemquantrac/diemQuanTrac"
        static Create = "/bando/diemquantrac/themDiemQuanTrac"
        static Update = "/bando/diemquantrac/updateDiemQuanTrac"
        static Delete = "/bando/diemquantrac/deleteDiemQuanTrac"
    }
    static Phananh = class {
        static Get = "/phananh"
        static Delete = "/phananh/delete"
    }
    static BaoCao = class {
        static Get = "/baocao"
        static GetById = "/baocao"
        static Create = "/baocao"
        static Update = "/baocao"
        static Delete = "/baocao/delete"
    }
    static Nhatki = class {
        static Get = "/nhatky"
        static GetById = "/nhatky"
        static Create = "/nhatky"
        static Update = "/nhatky"
        static Delete = "/nhatky/delete"
    }
    static ThongTinCapNhat = class {
        static Get = "/bando/diemquantrac/diemQuanTrac"
        static GetById = "/bando/diemquantrac/diemQuanTrac"
        static Create = "/bando/diemquantrac/themDiemQuanTrac"
        static Update = "/bando/diemquantrac/updateDiemQuanTrac"
        static Delete = "/bando/diemquantrac/deleteDiemQuanTrac"
    }
    static File = class {
        static Upload = "/bandochuyende/upanhbandochuyende"
    }
    static Danhmuc = class {
        static Get = "/danhmuclopbando"
        static GetById = "/danhmuclopbando"
        static Create = "/danhmuclopbando"
        static Update = "/danhmuclopbando"
        static Delete = "/danhmuclopbando"
    }
    static Anhvetinh = class {
        static Get = "/anhvetinh"
        static GetById = "/anhvetinh"
        static Create = "/anhvetinh"
        static Update = "/anhvetinh"
        static Delete = "/anhvetinh"
    }
    static Dulieulop = class {
        static Get = "/dulieulopbando"
        static GetById = "/dulieulopbando"
        static Create = "/dulieulopbando"
        static Update = "/dulieulopbando"
        static Delete = "/dulieulopbando"
        static Upload = "/dulieulopbando/upload"
        static DealeteDB = "/dulieulopbando/xoadb"

    }
    static DanhMucAPI = class {
        static Get = "/api"
        static GetById = "/api"
        static Create = "/api"
        static Update = "/api"
        static Delete = "/api"
    }
}