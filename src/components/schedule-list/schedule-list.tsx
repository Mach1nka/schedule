import React, {useState, useEffect, useCallback} from 'react';
import {List, Button, Skeleton, Collapse, Col, } from 'antd';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectScheduleEventsData} from "../../selectors/selectors";
import {scheduleListSC as SC} from "./sc";


const ScheduleList: React.FC = () => {
  const { Panel } = Collapse;
  const defaultCountItemsInList = 2;
  const amountNewAdditionListItems = 2;
  const scheduleEvents = useSelector(selectScheduleEventsData) || [];
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [amountItemsInList, setCountItemsInList] = useState(defaultCountItemsInList);

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
    setCountItemsInList((prev) => prev + amountNewAdditionListItems);
  };

  useEffect(() => {
    if (scheduleEvents.length) {
      setInitLoading(false)
    }
  }, [scheduleEvents]);

  const loadMore = !initLoading ? (
    <SC.BUTTON_CONTAINER>
      <Button onClick={onLoadMore}>Loading More</Button>
    </SC.BUTTON_CONTAINER>
    ) : null;

    return (
      <SC.ROW>
        <Col xs={24} lg={14}>
          <List
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={getCurrentList(scheduleEvents, amountItemsInList)}
            renderItem={item => (
              <SC.LIST_ITEM>
                <Skeleton loading={initLoading} active>
                  <SC.LIST_ITEM_CONTAINER>
                    <h2>{item.name}</h2>
                    <SC.DATE_TIME_CONTAINER>
                      <span className="start">{`Start: ${formatDateFromUnix(item.startDateTime, DateTimeFormat)}`}</span>
                      <span className="deadline">{`Deadline: ${formatDateFromUnix(item.endDateTime, DateTimeFormat)}`}</span>
                    </SC.DATE_TIME_CONTAINER>
                    <Collapse>
                      <Panel header="More information" key={item.id}>
                        <h3>{`Type: ${item.type.toUpperCase()}`}</h3>
                        <SC.COLLAPSE_CONTENT>
                          <span className="collapse-content__event-place">{`Place: ${item.place.toUpperCase()}`}</span>
                          <span className="collapse-content__description-title">Description</span>
                          <p>{item.description}</p>
                          <Link
                            className="link-to-description-page"
                            to={{
                                pathname: "/Event",
                                search: `?id=${item.id}`,
                              }}
                          >Link
                          </Link>
                        </SC.COLLAPSE_CONTENT>
                      </Panel>
                    </Collapse>
                  </SC.LIST_ITEM_CONTAINER>
                </Skeleton>
              </SC.LIST_ITEM>
            )}
          />
        </Col>
      </SC.ROW>
    );
}

export default ScheduleList;
