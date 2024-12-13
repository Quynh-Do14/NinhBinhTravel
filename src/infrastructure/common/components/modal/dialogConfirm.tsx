import { Button, Col, Modal, Row } from 'antd';
import styles from "../../../../assets/styles/components/modal.module.css";
type Props = {
    title: string,
    message: string,
    titleCancel: string,
    titleOk: string,
    handleOk: Function,
    handleCancel: Function,
    visible: boolean,
    isLoading?: boolean,
}
const DialogConfirmCommon = (props: Props) => {
    const { title, message, titleCancel, titleOk, handleOk, handleCancel, visible, isLoading = false } = props;

    return (
        <div>
            <Modal
                key={"f-0"}
                centered
                visible={visible}
                closable={false}
                footer={false}
                onCancel={() => handleCancel()}
                style={{
                    borderRadius: 0
                }}
            >
                <div className={styles.modal_confirm_common}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.message}>{message}</div>
                    <Row justify={"end"}>
                        <Col>
                            <Button className={styles.btn_Cancel} type='text' key="f-2" onClick={() => handleCancel()}>{titleCancel}</Button>
                        </Col>
                        <Col>
                            <Button disabled={isLoading} type='text' className={styles.btn_ok} key="f-1" onClick={() => handleOk()}>{titleOk}</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
}
export default DialogConfirmCommon;