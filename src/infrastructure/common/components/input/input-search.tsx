import { Input } from 'antd';
import "../../../../assets/styles/components/input.css";
import { useEffect, useState } from 'react';
type Props = {
    label: string,
    value: string,
    onChange: any,
    attribute: string

}
const InputSearch = (props: Props) => {
    const {
        label,
        value,
        onChange,
        attribute,

    } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onBlur = () => {
        if (value) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }

    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (value) {
            setIsFocused(true);
        }
    }, [value]);

    return (
        <div className={`input-common ${isFocused && "focused"}`}>
            <div className="title">
                <label htmlFor={`input-common-${attribute}`} className="label">{label}</label>
            </div>
            <Input
                className={`w-full input-common-search ${isFocused && "focused"}`}
                size={"middle"}
                value={value ? value : ""}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={handleFocus}
            />
        </div>
    )
}
export default InputSearch