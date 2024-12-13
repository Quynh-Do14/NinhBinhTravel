/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { validateFields } from '../../../helper/helper';
import styles from "@/assets/styles/components/input.module.css";
import { MessageError } from '../controls/MessageError';

const { TextArea } = Input

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
}
const InputTextAreaCommon = (props: Props) => {
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
    } = props;

    const [value, setValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };
    let labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
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
                <div>
                    <TextArea
                        id={`input-common-${attribute} `}
                        size={"middle"}
                        value={value ? value : ""}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        onFocus={handleFocus}
                        disabled={disabled}
                        style={{ borderRadius: "8px !important", height: 200 }}
                        className={`${validate[attribute]?.isError && "input-error"} w-full input-common ${isFocused && "focused"}`}
                    />
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    )
};
export default InputTextAreaCommon;