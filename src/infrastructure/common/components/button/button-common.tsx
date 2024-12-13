import { Button } from "antd";
import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "blue" | "grey" | "black" | "orange" | "green" | "red" | "cancel",
    onClick: () => void,
    icon?: any,
    title: string,
    disabled?: boolean
}
const ButtonCommon = (props: Props) => {
    const {
        classColor,
        onClick,
        icon,
        title,
        disabled = false
    } = props;
    return (
        <div className={`button-custom ${classColor}`} onClick={onClick}>
            {title}
        </div>
    )
}
export default ButtonCommon