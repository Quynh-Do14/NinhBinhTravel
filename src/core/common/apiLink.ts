export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "/auth/signup"
        static Logout = "/auth/logout"
    }
    static User = class {
        static Get = "/user"
        static GetById = "/auth/get"
        static Create = "/user"
        static Update = "/auth/admin/update-account"
        static Delete = "/auth/admin/delete"
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
        static Update = "/bandochuyende/upanhbandochuyende"
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
}