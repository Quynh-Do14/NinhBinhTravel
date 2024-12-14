import moment from "moment";
const baseURL = "http://103.130.212.145:42241/api"
export const validateFields = (isImplicitChange = false, key: any, isCheck: any, setError: Function, error: any, message: string) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const configImageURL = (image: string) => {
    if (image) {
        return `${baseURL}/public/${image}`
    }
    return ""
}

export const configImageURLSplit = (image: string) => {
    if (image) {
        const baseURLFile = `${baseURL}/files/preview/`
        const result = image.split(baseURLFile)[1];
        return result
    }
    return ""
}

export const convertStringToBoolean = (value: string) => {
    const booleanValue = value === 'true'; // Chuyển chuỗi 'true' và 'false' về boolean
    return booleanValue
};

export const convertDate = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD hh:mm:ss");
    } return null;

};
export const convertDateShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm:ss DD-MM-YYYY");
    } return null;

};

export const convertDateOnlyShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD-MM-YYYY");
    } return null;

};

export const convertDateOnly = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD");
    } return null;

};
export const convertDateBooking = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DDThh:mm:ss");
    } return null;
};

export const formatCurrencyVND = (amount: string) => {
    // Định dạng số với phân cách hàng nghìn
    let formattedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedAmount} ₫`;
}

export const splitTakeId = (route: string) => {
    if (route) {
        const word1 = route.split(".html");
        const word2 = word1[0].split("-");
        const wordResult = word2[word2.length - 1];
        return wordResult
    }
    return "";
}

export const formatDate = (date: any) => {
    const day = String(date.getDate()).padStart(2, '0') // Lấy ngày và thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, '0') // Lấy tháng (0-indexed) và thêm số 0
    const year = date.getFullYear() // Lấy năm

    return `${day}/${month}/${year}` // Ghép thành chuỗi theo định dạng
}