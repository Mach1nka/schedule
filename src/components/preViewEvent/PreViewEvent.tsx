import React, { useEffect, useState, useContext } from 'react';
import { Layout, PageHeader, Button, Descriptions, Tag, Space, Avatar, Typography} from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import screenUrl from '../formForMentor/utils/screenUrl';
import {MainDataContext} from "../../context/main-data-context";
import {dispatchEntityHelper} from "../../helpers/dispatch-entity-helper/dispatch-entity-helper";
import { selectUserTimeZone, 
  selectScheduleEventById, 
  selectScheduleEventDraftData, 
  selectScheduleTypeEventByName,
  selectUserRole
 } from '../../selectors/selectors';
 import getTimeWithCorrectTimeZone from '../../utils/get-time/get-time-with-correct-timezone';
 import formatTime from '../../utils/get-time/format-time';
import Feedback from './Feedback/Feedback';
import SC from './sc';
import colorSC from '../formForMentor/Color/sc';
import { RootState } from '../../store';
import {ReduxStateEntities} from "../../reducers/reducers-config";
import {ScheduleMockTypesEvents, DATE_FORMAT} from "../../data/typeEvents";
import {ScheduleMockEvents} from "../../data/schedule";
import {ROUTE_PATHS as PATHS} from '../../data/paths';

const PreViewEvent = (): React.ReactElement => {
  const { Link } = Typography;

  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(false);
  const {
    getScheduleEvents, 
    putScheduleEvent, 
    postScheduleEvent, 
    removeScheduleEvent, 
    putScheduleTypeEvent, 
    postScheduleTypeEvent,
    getScheduleTypesEvents 
  } = useContext(MainDataContext);

  const history = useHistory();
  const search = new URLSearchParams(useLocation().search);
  const id = search.get("id") || '';
  const isDraft = JSON.parse(search.get("draft"));
 
  const dispatch = useDispatch();
  const currentTimeZone = useSelector(selectUserTimeZone);
  const eventDraft = useSelector(selectScheduleEventDraftData);
  const eventState = useSelector((state: RootState) => selectScheduleEventById(state, id));
  const role = useSelector(selectUserRole);
  const event = isDraft ? eventDraft : eventState;
  const type = useSelector((state: RootState) => selectScheduleTypeEventByName(state, (event ? event?.type : '')));
  const typeNew = useSelector((state: RootState) => selectScheduleTypeEventByName(state, 'New'));
  const typeEvent = type ||  typeNew;
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
  const postAndPutEvent = (data:ScheduleMockEvents, color: string) => data.id ?
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_EVENT_CURRENT, fetchFn: putScheduleEvent(data.id), data:{...data, color} , dispatch}) :
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_EVENT_CURRENT, fetchFn: postScheduleEvent, data , dispatch});

  const updateSchedule = () => {
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_EVENTS, fetchFn: getScheduleEvents, dispatch});
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_TYPES_EVENTS, fetchFn: getScheduleTypesEvents, dispatch});
  };
  const postAndPutTypeEvent = (data:ScheduleMockTypesEvents, eventData:ScheduleMockEvents) => data.name === "New" ?
    dispatchEntityHelper({
      currentEntity: ReduxStateEntities.SCHEDULE_TYPE_EVENT_CURRENT, 
      fetchFn: postScheduleTypeEvent, 
      data:{
        name: eventData.type,
        crossCheck: JSON.stringify(!!eventData.startDateCrossCheck),
        descriptionUrl: JSON.stringify(!!eventData.descriptionUrl),
        link: JSON.stringify(!!eventData.link),
        color: eventData.color,
      } , 
      dispatch
    }) :
    (data.color !== eventData.color 
      && dispatchEntityHelper({
        currentEntity: ReduxStateEntities.SCHEDULE_TYPE_EVENT_CURRENT, 
        fetchFn: putScheduleTypeEvent(data.id), 
        data:{
          ...data,
          color: eventData.color,
        }, 
        dispatch}));

  const saveButton = async(typeSave:ScheduleMockTypesEvents, eventSave:ScheduleMockEvents) => {
    await postAndPutEvent(eventSave, typeSave.color);
    if(typeSave) {
      await postAndPutTypeEvent(typeSave, eventSave);
    }
    updateSchedule();
    history.push(`/${PATHS.calendar}`)
  }

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
            onBack={() => role === 'mentor' ?  history.push({
              pathname:`/${PATHS.formForMentor}`,
              search:`?id=${event.id}&draft=${!!isDraft}`,
            }) : window.history.back()}
            title={event.name}
            subTitle={<Tag color="blue">{event.type}</Tag>}
            tags={[
              event?.feedback && JSON.parse(event.feedback) && (
              <Button key="1" type="ghost" onClick={() => setVisible(true)}>
                Feedback
              </Button>
              )
            ]}
            extra={role === 'mentor' && [
              <Button
                type="primary"
                key="3"
                onClick={()=> saveButton(typeEvent, event)}
              >Save
              </Button>,
              <Button
                key="2"
                onClick={()=>history.push({
                pathname: `/${PATHS.formForMentor}`, 
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
                  <colorSC.COLOR colorSet={isDraft ? event.color : typeEvent?.color}/>
                </colorSC.DIV>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small" column={1}>
              <Descriptions.Item label={<Tag color="blue">Start Event</Tag>}>
                {formatTime(getTimeWithCorrectTimeZone(event.startDateTime, currentTimeZone), DATE_FORMAT)}
              </Descriptions.Item>
              <Descriptions.Item
                label={(
                  <Tag color={event.type === 'Task' ? 'red' : 'blue'}>
                    {event.type === 'Task' ? 'Deadline' : 'End Event'}
                  </Tag>
                )}
              >
                {formatTime(getTimeWithCorrectTimeZone(event.endDateTime, currentTimeZone), DATE_FORMAT)}
              </Descriptions.Item>
              {event.startDateCrossCheck && (
                <>
                  <Descriptions.Item label={<Tag color="blue">Start CrossCheck</Tag>}>
                    {formatTime(getTimeWithCorrectTimeZone(event.startDateCrossCheck, currentTimeZone), DATE_FORMAT)}
                  </Descriptions.Item>
                  <Descriptions.Item label={<Tag color="red">Deadline CrossCheck</Tag>}>
                    {formatTime(getTimeWithCorrectTimeZone(event.endDateCrossCheck, currentTimeZone), DATE_FORMAT)}
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
              <SC.CONTENT style={{ padding: '0 50px' }}>
                <SC.MARKDOWN source={description} escapeHtml={false}/> 
              </SC.CONTENT>
            </Layout>
          )}
          <Feedback visible={visible} setVisible={setVisible} event={event}/>
        </>
      )}
    </>
  );
};
export default PreViewEvent;
