import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { RequestService } from "../../../utils/response";

class AuthService {
    async login(data: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Auth.Login, {
                    ...data
                })
                .then(response => {
                    if (response) {
                        const userData: any = response.data.token
                        localStorage.setItem('token', JSON.stringify(userData))
                    }
                    setLoading(false)
                    SuccessMessage("Đăng nhập thành công", "")
                    return response;
                });
        } catch (error: any) {
            console.error(error)
            FailMessage("Đăng nhập không thành công", '')
        } finally {
            setLoading(false);
        }
    }
    async logout(setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Auth.Logout)
                .then(response => {
                    localStorage.removeItem("token");
                    
                    setLoading(false)
                    SuccessMessage("Đăng nhập thành công", "")
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            // window.location.reload()
            // window.location.href(config.routes.web.home)
        };
    };
}

const authService = new AuthService();

export default authService;
