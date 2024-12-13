import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import "../../../../assets/styles/components/input.css";
import { validateFields } from '../../../helper/helper';
import { validateCMND, validateEmail, validatePhoneNumber } from '../../../helper/validate';
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
    autoFocus?: boolean
    handlePressEnter?: () => void,
}
const InputTextCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        validate,
        setValidate,
        submittedTime,
        autoFocus,
        handlePressEnter
    } = props;
    const [value, setValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };

    const labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        let checkValidate
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");

            if (attribute.includes("email")) {
                checkValidate = validateEmail(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
            }
            if (attribute.includes("phone")) {
                checkValidate = validatePhoneNumber(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
            }
            if (attribute.includes("cccd")) {
                checkValidate = validateCMND(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `${label} bao gồm 12 số` : `Vui lòng nhập ${labelLower}` : "");
            }
        }
        if (value) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }

    };

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime, onBlur]);

    const handleFocus = () => {
        setIsFocused(true);
    };
    useEffect(() => {
        if (value) {
            setIsFocused(true);
        }
    }, [value])
    return (
        <div className={`input-common ${isFocused && "focused"}`}>
            <div className="title">
                <span>
                    <label htmlFor={`input-common-${attribute}`} className="label">{label}</label>
                    <span className="is-required">{isRequired ? "*" : ""} </span>
                </span>
            </div>
            <div>
                <Input
                    id={`input-common-${attribute} `}
                    autoFocus={autoFocus}
                    size={"middle"}
                    value={value ? value : ""}
                    onChange={onChange}
                    onBlur={() => onBlur(false)}
                    onFocus={handleFocus}
                    disabled={disabled}
                    className={`${validate[attribute]?.isError && "input-error"} w-full input-common ${isFocused && "focused"} `}
                    onPressEnter={handlePressEnter}
                />
                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </div>
        </div>
    )
};
export default InputTextCommon;