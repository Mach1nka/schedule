import React, { useEffect, useState, useContext } from 'react';
import { Layout, PageHeader, Button, Descriptions, Tag, Space, Avatar, Typography} from 'antd';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import screenUrl from '../formForMentor/utils/screenUrl';
import {MainDataContext} from "../../context/main-data-context";
import {dispatchEntityHelper} from "../../helpers/dispatch-entity-helper/dispatch-entity-helper";
import { selectUserTimeZone, selectScheduleEventById, selectScheduleEventDraftData, selectScheduleTypeEventByName } from '../../selectors/selectors';
import zone from '../formForMentor/utils/zone';
import Feedback from './Feedback/Feedback';
import SC from './sc';
import colorSC from '../formForMentor/Color/sc';
import { RootState } from '../../store';
import {ReduxStateEntities} from "../../reducers/reducers-config";
import {ScheduleMockTypesEvents} from "../../data/typeEvents";

const PreViewEvent = (): React.ReactElement => {
  const { Link } = Typography;
  const { Content } = Layout;

  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(false);
  const { putScheduleEvent, postScheduleEvent, removeScheduleEvent, putScheduleTypeEvent, postScheduleTypeEvent } = useContext(MainDataContext);

  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const id = search.get("id") || '';
  const isDraft = JSON.parse(search.get("draft"));
 
  const dispatch = useDispatch();
  const currentTimeZone = useSelector(selectUserTimeZone);
  const eventDraft = useSelector(selectScheduleEventDraftData);
  const eventState = useSelector((state: RootState) => selectScheduleEventById(state, id));

  const event = isDraft ? eventDraft : eventState;
  const typeEvent = useSelector((state: RootState) => selectScheduleTypeEventByName(state, (event ? event?.type :  'New')));

  const markDown = async (url: string) => {
    try {
      const response = await fetch(
        url.replace(/github.com/i, 'raw.githubusercontent.com').replace(/blob\//i, ''),
      );
      const text = await response.text();
      setDescription(
        screenUrl(
          text,
          url.replace(/github.com/i, 'raw.githubusercontent.com').replace(/blob\//i, ''),
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const postAndPutEvent = (data) => data.id ?
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_EVENT_CURRENT, fetchFn: putScheduleEvent(data.id), data , dispatch}) :
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_EVENT_CURRENT, fetchFn: postScheduleEvent, data , dispatch});

  const postAndPutTypeEvent = (data:ScheduleMockTypesEvents, color: string, type) => data.name === "New" ?
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_TYPE_EVENT_CURRENT, fetchFn: postScheduleTypeEvent, data:{...data, name: type} , dispatch}) :
    (data.color !== color 
      && dispatchEntityHelper({
        currentEntity: ReduxStateEntities.SCHEDULE_TYPE_EVENT_CURRENT, 
        fetchFn: putScheduleTypeEvent(data.id), data:{...data, color} , dispatch}));
    

  const removeEvent = (idEvent) => 
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_EVENT_CURRENT, fetchFn: removeScheduleEvent(idEvent), dispatch});
  
    useEffect(() => {
    if (event?.descriptionUrl) {
      markDown(event.descriptionUrl);
    } 
  }, [event]);

  return (
    <>
      
      {event && (
        <>
          <PageHeader
            ghost={false}
            onBack={() => history.push({
              pathname: "/formForMentor",
              // search: `?id=${event.id}&draft=${!!isDraft}`,
            })}
            title={event.name}
            subTitle={<Tag color="blue">{event.type}</Tag>}
            tags={[
              event?.feedback && JSON.parse(event.feedback) && (
              <Button key="1" type="ghost" onClick={() => setVisible(true)}>
                Feedback
              </Button>
              )
            ]}
            extra={[
              <Button
                type="primary"
                key="3"
                onClick={()=> {
                  postAndPutEvent(event);
                  postAndPutTypeEvent(typeEvent, event.color, event.type)
                }}
              >Save
              </Button>,
              <Button
                key="2"
                onClick={()=>history.push({
                pathname: "/formForMentor",
                search: `?id=${event.id}&draft=${!!isDraft}`,
              })}
              >Edit
              </Button>,
              <Button 
                key="1" 
                type="primary" 
                onClick={()=> removeEvent(event.id)}
                danger
              >Delete
              </Button>,
            ]}
          >
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Description">{event.description}</Descriptions.Item>
            </Descriptions>
            <Descriptions size="small" column={2}>
              {event.organizers &&
                JSON.parse(event.organizers).map((e) => {
                  return (
                    <Descriptions.Item label="Organizer" key={Math.random()}>
                      <Space>
                        <Avatar size="small" src={`https://github.com/${e}.png`}/>
                        <Link href={`https://github.com/${e}`} target="_blank" rel="noreferrer">
                          {e}
                        </Link>
                      </Space>
                    </Descriptions.Item>
                  );
                })}
            </Descriptions>
            <Descriptions size="small" column={2}>
              { event.place && (
              <Descriptions.Item label="Place">
                <Tag color="blue">{event.place}</Tag>
              </Descriptions.Item>
              )}
              <Descriptions.Item label="Color">
                <colorSC.DIV>
                  <colorSC.COLOR colorSet={event.color}/>
                </colorSC.DIV>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small" column={1}>
              <Descriptions.Item label={<Tag color="blue">Start Event</Tag>}>
                {moment(event.startDateTime, 'X')
                  .utcOffset(zone(currentTimeZone), false)
                  .format('YYYY-MM-DD HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item
                label={(
                  <Tag color={event.type === 'Task' ? 'red' : 'blue'}>
                    {event.type === 'Task' ? 'Deadline' : 'End Event'}
                  </Tag>
                )}
              >
                {moment(event.endDateTime, 'X')
                  .utcOffset(zone(currentTimeZone), false)
                  .format('YYYY-MM-DD HH:mm')}
              </Descriptions.Item>
              {event.startDateCrossCheck && (
                <>
                  <Descriptions.Item label={<Tag color="blue">Start CrossCheck</Tag>}>
                    {moment(event.startDateCrossCheck, 'X')
                      .utcOffset(zone(currentTimeZone), false)
                      .format('YYYY-MM-DD HH:mm')}
                  </Descriptions.Item>
                  <Descriptions.Item label={<Tag color="red">Deadline CrossCheck</Tag>}>
                    {moment(event.endDateCrossCheck, 'X')
                      .utcOffset(zone(currentTimeZone), false)
                      .format('YYYY-MM-DD HH:mm')}
                  </Descriptions.Item>
                </>
              )}
              {!event.descriptionUrl && (
                <>
                  <Descriptions.Item label="Commit">
                    {event.linkComment}
                  </Descriptions.Item>
                  <Descriptions.Item label="Link">
                    <Link href={event.link} target="_blank" rel="noreferrer">{event.link}</Link>
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          </PageHeader>
          {event.descriptionUrl && (
            <Layout className="layout">
              <Content style={{ padding: '0 50px' }}>
                <SC.TITLE source={description} escapeHtml={false}/> 
              </Content>
            </Layout>
          )}
          <Feedback visible={visible} setVisible={setVisible}/>
        </>
      )}
    </>
  );
};
export default PreViewEvent;
