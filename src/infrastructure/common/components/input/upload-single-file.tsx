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

function UploadSingleFile(props: Props) {
    const {
        label,
        dataAttribute,
        setData,
        attribute,
    } = props;
    const [value, setValue] = useState<string>("")
    const inputRef = useRef(null);

    const handleChange = (event: any) => {
        console.log(event);

        setData({
            [attribute]: event.file || '',
        });
        setValue(event.file.name)
    };

    useEffect(() => {
        if (value) {
            setValue(value)
        }
        else if (dataAttribute) {
            setValue(dataAttribute)
        }
    }, [value, dataAttribute])
    console.log(value);

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
                Chọn File từ thiết bị
            </Upload>
            {
                value ?
                    <div className="text-[14px] font-bold text-[#0c4a6e]">{value} </div>
                    :
                    <div> </div>
            }
        </div >
    )
}

export default UploadSingleFile;
