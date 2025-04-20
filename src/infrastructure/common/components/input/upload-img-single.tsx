import { Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import "../../../../assets/styles/components/input.css";
import { WarningMessage } from '../toast/notificationToast';

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

    const [value, setValue] = useState<string>("");
    const [filename, setFilename] = useState<string>("");
    const inputRef = useRef(null);

    const handleChange = (event: any) => {
        const fullName = event.file.name;
        const nameWithoutExtension = fullName.replace(/\.[^/.]+$/, ''); // loại bỏ đuôi

        getBase64(event.file, (url: any) => {
            setData({
                [attribute]: event.file || '',
                ["uriexcel"]: fullName
            });
            setValue(url);
            setFilename(nameWithoutExtension); // cập nhật tên file
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
                Chọn file từ thiết bị
            </Upload>

            {/* Hiển thị tên file */}
            {filename && (
                <div style={{ marginTop: '8px', fontStyle: 'italic', color: '#333' }}>
                    <strong>File đã chọn:</strong> {filename}
                </div>
            )}
        </div >
    )
}

export default UploadSingleImage;
