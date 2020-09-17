import React, {useState, useEffect, useCallback} from 'react';
import { List, Button, Skeleton, Collapse, Row, Col, } from 'antd';
import {useSelector} from "react-redux";
import {selectScheduleEventsData} from "../../selectors/selectors";
import {loadMoreContainer as SC} from "./sc";

const ScheduleList: React.FC = () => {
  const { Panel } = Collapse;
  const defaultCountItemsInList = 2;
  const sum = 2;
  const scheduleEvents = useSelector(selectScheduleEventsData) || [];
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [countItemsInList, setCountItemsInList] = useState(defaultCountItemsInList);

  const DateTimeFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };

  const formatDateFromUnix = (unixDate, settings) => {
    return new Date(unixDate * 1000).toLocaleDateString('ru', settings);
  };

  const getCurrentList = useCallback((data, amountElements:number) => {
    return data.slice(0, amountElements);
  }, []);
  
  const onLoadMore = () => {
    setCountItemsInList((prev) => prev + sum);
  };

  useEffect(() => {
    if (scheduleEvents.length) {
      setInitLoading(false)
    }
  }, [scheduleEvents]);

  const loadMore = !initLoading ? (
    <SC.CONTAINER>
      <Button onClick={() => onLoadMore()}>Loading More</Button>
    </SC.CONTAINER>
    ) : null;

    return (
      <Row style={{justifyContent: 'center'}}>
        <Col xs={24} lg={14}>
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={getCurrentList(scheduleEvents, countItemsInList)}
            renderItem={item => (
              <List.Item
                actions={[<a key="list-loadmore-more">more</a>]}
              >
                <Skeleton loading={initLoading} active>
                  <div>
                    <h4>{item.name}</h4>
                    <span>{`Start: ${formatDateFromUnix(item.startDateTime, DateTimeFormat)}`}</span>
                    <span>{`Deadline: ${formatDateFromUnix(item.endDateTime, DateTimeFormat)}`}</span>
                    <Collapse>
                      <Panel header="More information" key={item.id}>
                        <h4>{`Type: ${item.type}`}</h4>
                        <p>
                          Description <br/>
                          {item.description}
                        </p>
                        <span><a href={item.descriptionUrl}>Ссылка на задание</a></span>
                        <span>{`Place: ${item.place}`}</span>
                      </Panel>
                    </Collapse>
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    );
}

export default ScheduleList;
