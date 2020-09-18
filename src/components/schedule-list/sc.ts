import styled from "styled-components";
import {Row, List} from "antd";

export const scheduleListSC = {
    BUTTON_CONTAINER: styled.div`
      text-align: center;
      margin-top: 12px;
      height: 32px;
      line-height: 32px;
    `,
    ROW: styled(Row)`
     justify-content: center;
    `,
    LIST_ITEM_CONTAINER: styled.div`
      width: 100%;
    `,
    DATE_TIME_CONTAINER: styled.div`
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      font-weight: 600;

      .start {
        color: #52c41a;
      }
      .deadline {
        color: #ff4d4f;
      }


      @media (max-width: 430px) {
        flex-direction: column;
      }
    `,
    LIST_ITEM: styled(List.Item)`
      border-radius: 5px;
      border: 2px solid #ffe58f;
      background-color: #fffbe6;
      padding: 15px;
      margin-bottom: 5px;
    `,
    COLLAPSE_CONTENT: styled.div`
      display: flex;
      flex-direction: column;

      .collapse-content__event-place {
        font-weight: 600;
      }

      .collapse-content__description-title {
        font-size: 15px;
        margin-top: 8px;
        font-weight: 600;
      }
      
      .link-to-description-page {
        width: 100%;
        text-align: center; 
        font-weight: 600;
        color: #e6f7ff;
        background-color: #1890ff;
        transition: .2s ease-in;
        border-radius: 2px;

        &:hover {
          background-color: #91d5ff;
          color: #0050b3;
        }
      }
    `,
  }