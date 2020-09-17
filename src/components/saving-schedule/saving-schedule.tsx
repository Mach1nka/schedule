import * as React from "react"
import { Modal, Button } from 'antd';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

function printDocument(type: string): void {
  const elem= document.querySelector('.ant-picker-calendar-full');
  elem.style.padding = '0 20px 0 20px';
  html2canvas(elem)
    .then((canvas) => {
      if(type==="pdf") {
        const imgData = canvas.toDataURL('image/png');
        elem.style.padding='0'
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        pdf.save("schedule.pdf");
      } else if(type==='png') {
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "schedule.png";
        elem.style.padding='0'
        link.href = canvas.toDataURL("image/png");
        link.target = '_blank';
        link.click();
      }
    })
  ;
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
          setVisible(false)
        }}
        footer={[
          <Button
            key="pdf"
            onClick={()=> {
              printDocument('pdf')
              setVisible(false)
            }}
          >
            To PDF
          </Button>,
          <Button
            key="png"
            onClick={()=>{
              printDocument('png')
              setVisible(false)
            }}
          >
            To PNG
          </Button>,
        ]}
      >
        <p>You can download schedule</p>
        <p>Choose best format for you...</p>
      </Modal>
    </>
  );
}

export default SavingSchedule;
