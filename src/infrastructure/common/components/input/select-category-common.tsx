import React, { useEffect, useState } from "react";
import { Select } from "antd";
import "../../../../assets/styles/components/input.css"
import { validateFields } from '../../../helper/helper';
import { MessageError } from '../controls/MessageError';

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    listDataOfItem: Array<any>,
}
const InputSelectCatrgoryCommon = (props: Props) => {
    const {
        dataAttribute,
        setData,
        attribute,
        disabled,
        listDataOfItem,
        setValidate,
        validate,
        submittedTime,
        isRequired,
        label
    } = props;

    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onChange = async (val: any) => {
        setValue(val || "");
        setData({
            [attribute]: val
        });
    };

    let labelLower = label.toLowerCase();
    const validateBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng chọn ${labelLower}` : "");
    };

    const onBlur = () => {
        validateBlur(false);
    };

    useEffect(() => {
        if (dataAttribute) {
            setValue(dataAttribute);
        }
        if (typeof dataAttribute == "boolean") {
            setValue(String(dataAttribute))
        }
    }, [dataAttribute]);


    useEffect(() => {
        if (submittedTime != null) {
            validateBlur(true);
        }
    }, [submittedTime]);

    const handleFocus = () => {
        setIsFocused(true);
    };
    useEffect(() => {
        if (value) {
            setIsFocused(true);
        }
    }, [value])

    return (
        <div>
            <div className={`input-common ${isFocused && "focused"}`}>
                <div className='title'>
                    <span>
                        <label htmlFor={`input-common-${attribute}`} className="label">{label}</label>
                        <span className="is-required">{isRequired ? "*" : ""} </span>
                    </span>
                </div>
                <div>
                    <Select
                        showSearch
                        allowClear={false}
                        showArrow
                        disabled={disabled}
                        value={value}
                        listHeight={120}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={handleFocus}
                        placeholder={`Chọn ${label}`}
                        getPopupContainer={trigger => trigger.parentNode}
                        className={`${validate[attribute]?.isError ? "input-error" : ""} w-full text-left`}
                    >
                        {
                            listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={item.value}
                                        title={item.label}
                                    >
                                        {item.label}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    );
}
export default InputSelectCatrgoryCommon;