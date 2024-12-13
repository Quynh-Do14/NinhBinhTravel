import { Button } from 'antd'
import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "blue" | "gradient" | "grey" | "black" | "orange" | "green",
    onClick: Function,
    htmlFor?: any,
    title: string,
}
export const ButtonLabelCommon = (props: Props) => {
    const {
        classColor,
        onClick,
        htmlFor,
        title,
    } = props;
    return (
        <div className='button-common'>
            <label
                htmlFor={htmlFor}
                className={classColor}
                onClick={() => onClick()}
            >
                {title}
            </label>
        </div>
    )
}
