import * as React from "react"
import { Modal, Button } from 'antd';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

function printDocument(type: string, name: string): void {
  const elem= document.querySelector(name);
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

interface SavingScheduleProps {
  name: string;
}

const SavingSchedule: React.FC<SavingScheduleProps> = (props) => {
  const [visible, setVisible] = React.useState(false);

  const {
    name,
  } = props;

  const handleModalBtnClick = ()=> {
    setVisible(false);
  }

  const handleDownloadBtnClick = ()=> {
    setVisible(true);
  }

  const handlePdfBtnClick = ()=> {
    printDocument('pdf', name)
    setVisible(false);
  }

  const handlePngBtnClick = ()=> {
    printDocument('png', name)
    setVisible(false);
  }

  return (
    <>
      <Button type="primary" onClick={handleDownloadBtnClick}>
        Download
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleModalBtnClick}
        onCancel={handleModalBtnClick}
        footer={[
          <Button
            key="pdf"
            onClick={handlePdfBtnClick}
          >
            To PDF
          </Button>,
          <Button
            key="png"
            onClick={handlePngBtnClick}
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
