import { Endpoint } from "../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../common/components/toast/notificationToast";
import { RequestService } from "../../utils/response";

class FileService {

    async UploadFle(data: object, onBack: Function, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .postForm(Endpoint.File.Upload,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
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
    }
}

const fileService = new FileService();

export default fileService;