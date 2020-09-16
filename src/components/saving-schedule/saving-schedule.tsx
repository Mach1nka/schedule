import * as React from "react"
import { Modal, Button } from 'antd';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import CalendarView from '../calendar-view/calendar-view';



function printDocument() {
  const elem = document.querySelector('.ant-picker-calendar-full');
  // elem.style.padding = '200px 100px 400px 100px';
  html2canvas(elem)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    })
  ;
}

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
          <Button key="back" onClick={()=>printDocument()}>
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
