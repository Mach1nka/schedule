import * as React from "react"
import { Modal, Button } from 'antd';

const savePDF = () => {
  alert('download pdf..')
}

const SavingSchedule: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={()=>setVisible(true)}>
        Download
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={()=>setVisible(false)}
        onCancel={(e)=> {
          console.log(e.target)
          setVisible(false)
        }}
        footer={[
          <Button key="back" onClick={()=>savePDF()}>
            To PDF
          </Button>,
          <Button key="submit" type="primary" onClick={(e)=>console.log(e.target)}>
            To XXX
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default SavingSchedule;
