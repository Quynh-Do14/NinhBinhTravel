import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class NewsService {
    async GetNews(param: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.News.Get, {
                    ...param
                })
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    async GetNewsById(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.News.GetById}/${id}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async CreateNews(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.News.Create,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Thêm dữ liệu mới thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Thêm dữ liệu mới không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }


    async UpdateNews(id: string, data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.News.Update}/${id}`,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Cập nhật thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Cập nhật không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async DeleteNews(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(`${Endpoint.News.Delete}/${id}`,)
                .then(response => {
                    if (response) {
                        SuccessMessage("Xóa thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Xóa không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

const newsService = new NewsService();

export default newsService;