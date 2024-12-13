/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import styles from "@/assets/styles/components/input.module.css";
import { MessageError } from '../controls/MessageError';

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: string,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    disabledToDate: any,
    showTime?: boolean,
    showHour?: boolean,
}
const InputDateCommon = (props: Props) => {
    const {
        label,
        attribute,
        setData,
        validate,
        setValidate,
        isRequired,
        disabled = false,
        dataAttribute,
        submittedTime,
        disabledToDate = null,
        showTime = false,
        showHour = false,
    } = props;
    const [value, setValue] = useState<Dayjs | null>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const disabledDate = (current: any) => {
        if (disabledToDate == true) {
            return current && current < moment().startOf('day');
        }
        else if (disabledToDate == false) {
            return current && current >= moment().startOf('day');
        }
        else {
            return
        }
    };

    const onChange = async (date: any, dateString: any) => {
        setValue(date || null);
        setData({
            [attribute]: dateString || ''
        });
    }
    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        // if (isRequired) {
        //     validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        // }
        if (value) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }
    }
    useEffect(() => {
        if (dataAttribute) {
            const parsedDate = dayjs(dataAttribute);
            if (parsedDate.isValid()) {
                setValue(parsedDate);
            } else {
                console.error('Invalid date format:', dataAttribute);
            }
        }
    }, [dataAttribute]);
    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
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
        <div className="input-common">
            <div className="title-content">
                <span>
                    <label className="label">{label}</label>
                    <span className="is-required">{isRequired ? "*" : ""} </span>
                </span>
            </div>
            <div>
                <DatePicker
                    allowClear={false}
                    size="middle"
                    className={`${validate[attribute]?.isError && "input-error"} w-full input-date-common ${isFocused && "focused"}`}
                    value={value}
                    // placeholder={`Chọn ${label}`}
                    // onChange={(values) => setValue(values)}
                    onChange={onChange}
                    onFocus={handleFocus}
                    disabledDate={disabledDate}
                    disabled={disabled}
                    format={`${showHour ? "DD/MM/YYYY hh:mm:ss" : "YYYY-MM-DD"}`}
                    onBlur={() => onBlur(false)}
                    showTime={showTime}
                />

                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </div>
        </div>
    );

};
export default InputDateCommon;