import React, {useState, useEffect, useCallback} from 'react';
import {List, Button, Skeleton, Collapse, Col, } from 'antd';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import {ScheduleMockEvents} from '../../data/schedule';
import {selectScheduleEventsData, selectUserTimeZone, selectScheduleTypesEvents} from "../../selectors/selectors";

import {ROUTE_PATHS as PATHS} from '../../data/paths';
import {scheduleListSC as SC} from "./sc";
import getTimeWithCorrectTimeZone from '../../utils/get-time/get-time-with-correct-timezone';
import formatTime from '../../utils/get-time/format-time';
import {DATE_FORMAT} from '../../data/typeEvents';
import sortEventTypes from '../../utils/sort-type-events/sort-type-events';

const ScheduleList: React.FC = () => {
  const { Panel } = Collapse;
  const defaultCountItemsInList = 2;
  const amountNewAdditionListItems = 2;
  const currentTimeZone = useSelector(selectUserTimeZone);
  const scheduleEvents = useSelector(selectScheduleEventsData) || [];
  const typeEvents = useSelector(selectScheduleTypesEvents) || [];
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [amountItemsInList, setCountItemsInList] = useState(defaultCountItemsInList);

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
    <SC.BUTTON_CONTAINER onClick={onLoadMore}>
      <Button>Loading More</Button>
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
            renderItem={(item:ScheduleMockEvents) => (
              <SC.LIST_ITEM color={sortEventTypes(item.type, typeEvents)}>
                <Skeleton loading={initLoading} active>
                  <SC.LIST_ITEM_CONTAINER>
                    <h2>{item.name}</h2>
                    <SC.DATE_TIME_CONTAINER>
                      <div>
                        <p className="start">{`Start: ${formatTime(getTimeWithCorrectTimeZone(item.startDateTime, currentTimeZone), DATE_FORMAT)}`}</p>
                        <p className="deadline">{`Deadline: ${formatTime(getTimeWithCorrectTimeZone(item.endDateTime, currentTimeZone), DATE_FORMAT)}`}</p>
                      </div>
                      {item.startDateCrossCheck && item.endDateCrossCheck ? (
                        <div>
                          <p className="start">{`Start Cross-Check: ${formatTime(getTimeWithCorrectTimeZone(item.startDateCrossCheck, currentTimeZone), DATE_FORMAT)}`}</p>
                          <p className="deadline">{`Deadline Cross-Check: ${formatTime(getTimeWithCorrectTimeZone(item.endDateCrossCheck, currentTimeZone), DATE_FORMAT)}`}</p>
                        </div>
                     ) : undefined}
                    </SC.DATE_TIME_CONTAINER>
                    <Collapse>
                      <Panel header="More information" key={item.id}>
                        <h3>{`Type: ${item.type.toUpperCase()}`}</h3>
                        <SC.COLLAPSE_CONTENT>
                          {item.place && <span className="collapse-content__event-place">{`Place: ${item?.place.toUpperCase()}`}</span>}
                          <span className="collapse-content__description-title">Description</span>
                          <p>{item.description}</p>
                          <Link
                            className="link-to-description-page"
                            to={{
                                pathname: `/${PATHS.event}`,
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
