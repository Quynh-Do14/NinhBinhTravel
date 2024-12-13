import { Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import "../../../../assets/styles/components/input.css";
import { UploadListType } from 'antd/es/upload/interface';

type Props = {
    label: string,
    dataAttribute: any,
    setData: Function,
    attribute: string,
}

const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
function UploadSingleImage(props: Props) {
    const {
        label,
        dataAttribute,
        setData,
        attribute,
    } = props;
    const [value, setValue] = useState<string>("")
    const inputRef = useRef(null);

    const handleChange = (event: any) => {
        getBase64(event.file, (url: any) => {
            setData({
                [attribute]: event.file || '',
            });
            setValue(url)
        });
    };

    useEffect(() => {
        if (value) {
            setValue(value)
        }
        else if (dataAttribute) {
            setValue(dataAttribute)
        }
    }, [value, dataAttribute])

    return (
        <div className="upload-common" >
            <div className="title-content">
                <span>
                    <label className="label">{label}</label>
                </span>
            </div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="card mb-2"
                showUploadList={false}
                beforeUpload={() => false} // Prevent upload to server
                onChange={handleChange}
                id="upload"
            >
                Chọn hình ảnh từ thiết bị
            </Upload>
            {
                value ?
                    <div className="main-image">
                        <img
                            src={value}
                            alt={`Image`}
                        />
                    </div>
                    :
                    null
            }
        </div >
    )
}

export default UploadSingleImage;
