import { Col, Row, Tooltip, Upload, UploadProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from "@/assets/styles/components/input.module.css";
import type { RcFile } from 'antd/es/upload/interface';

type Props = {
    label: string;
    attribute: string;
    isRequired: boolean;
    setData: Function;
    dataAttribute: Array<string>;
    dataAttributeImageFiles?: Array<any>;
    disabled: boolean;
    validate: any;
    setValidate: Function;
    submittedTime: any;
    isUpdate?: boolean
};

// Helper to convert images to Base64 using Promises
const getBase64 = (img: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(img);
    });

function UploadListImage(props: Props) {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        dataAttributeImageFiles,
        disabled = false,
        validate,
        setValidate,
        submittedTime,
        isUpdate = false,
    } = props;

    const inputRef = useRef<HTMLDivElement>(null);
    const [listImg, setListImg] = useState<Array<any>>([]);
    const [hasUpdated, setHasUpdated] = useState<boolean>(false);

    const handleChange: UploadProps['onChange'] = async (info) => {
        const files = info.fileList.map((file) => file.originFileObj as RcFile);
        const updateArray: any[] = [];

        try {
            const base64List: any[] = await Promise.all(files.map((file) => getBase64(file)));

            if (isUpdate) {
                const concatArray: any[] = base64List.concat(listImg);
                const uniqueArray = Array.from(new Set(concatArray));
                setListImg(uniqueArray);
                setData({ [attribute]: info.fileList });
            }
            else {
                setListImg(base64List);
                setData({ [attribute]: info.fileList });
            }
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        if (isUpdate && !hasUpdated && dataAttribute) {
            setHasUpdated(true);
            setListImg(dataAttribute);
        }
    }, [isUpdate, dataAttribute, hasUpdated]);

    const onDeleteImage = (index: number) => {
        setListImg((prev) => prev.filter((_item, indexF) => indexF !== index));
        const filterArrayImageFileCodes = dataAttribute?.filter((_item, indexF) => (indexF + Number(dataAttributeImageFiles?.length)) !== index);
        const filterArrayImageFiles = dataAttributeImageFiles?.filter((_item, indexF) => indexF !== index);

        setData({ [attribute]: filterArrayImageFiles });

        if (isUpdate) {
            setData({ ["imageFileCodes"]: filterArrayImageFileCodes });
        }
    }

    return (
        <div className="upload-common" >
            <div className="title-content">
                <span>
                    <label className="label">{label}</label>
                    <span className="is-required">{isRequired ? "*" : ""}</span>
                </span>
            </div>

            <Row gutter={[10, 10]}>
                <Col span={24} className="p-1">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="card"
                        showUploadList={false}
                        beforeUpload={() => false} // Prevent upload to server
                        onChange={handleChange}
                        multiple
                        id="upload"
                    >
                        <div className="flex flex-col gap-1 items-center" ref={inputRef}>
                            <i className="fa fa-upload" aria-hidden="true"></i>
                            <div className="text-[14px] text-[#443b3b] font-bold uppercase">
                                Chọn hình ảnh từ thiết bị
                            </div>
                        </div>
                    </Upload>
                </Col>

                {listImg && listImg?.map((it, index) => (
                    <Col xs={12} sm={12} lg={12} xl={8} xxl={6} key={index}>
                        <div className="main-image">
                            <Tooltip title={"Xóa ảnh"}>
                                <div
                                    onClick={() => onDeleteImage(index)}
                                    className="close_btn">
                                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                                </div>
                            </Tooltip>

                            <img
                                src={it}
                                alt={`Image`}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </div >
    );
}

export default UploadListImage;
