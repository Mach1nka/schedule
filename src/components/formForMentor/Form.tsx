import React from 'react';
import { Form, Button, Row, Col, Switch, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import DateMy from './Date/Date';
import Organizer from './Organizer/Organizer';
import InputMy from './Input/Input';
import Color from './Color/Color'
import FormHeader from './FormHeader/FormHeader';
import TimeZone from './TimeZone/TimeZone';
import getTimeWithCorrectTimeZone from '../../utils/get-time/get-time-with-correct-timezone';
import prepareDateForBackend from '../../utils/get-time/prepare-date-for-backend';
import { selectUserTimeZone, selectScheduleEventById, selectScheduleEventDraftData, selectScheduleTypeEventByName } from '../../selectors/selectors';
import {scheduleEventDraftSlice} from "../../slices/schedule-event-draft-slice/schedule-event-draft-slice";
import { RootState } from '../../store';

const FormMy = (): React.ReactElement => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = new URLSearchParams(useLocation().search);


  const id = search.get("id") || '';
  const type = search.get("type") || 'New';
  const isDraft =  JSON.parse(search.get("draft"));

  const currentTimeZone = useSelector(selectUserTimeZone);
  const eventDraft = useSelector(selectScheduleEventDraftData);
  const eventState = useSelector((state: RootState) => selectScheduleEventById(state, id));
  
  const event = isDraft ? eventDraft : eventState;
  const typeEvent = useSelector((state: RootState) => selectScheduleTypeEventByName(state, (event ? event?.type :  type)));
  
  const initialValues = {
    type: typeEvent?.name,
    name: event?.name,
    organizers: event?.organizers ? [''].concat(JSON.parse(event?.organizers)) : [''],
    date: event?.startDateTime && [
      getTimeWithCorrectTimeZone(event?.startDateTime, currentTimeZone),
      getTimeWithCorrectTimeZone(event?.endDateTime, currentTimeZone),
    ],
    crossCheck: event?.startDateCrossCheck
      ? [
          [
            getTimeWithCorrectTimeZone(event?.startDateCrossCheck, currentTimeZone),
            getTimeWithCorrectTimeZone(event?.endDateCrossCheck, currentTimeZone),
          ],
        ]
      : [],
    place: event?.place ? event?.place : 'online',
    comment: event?.comment,
    color: typeEvent?.color,
    descriptionUrl: event?.descriptionUrl,
    link: event?.link,
    description: event?.description,
    timeZone: currentTimeZone,
    feedback: event?.feedback && JSON.parse(event?.feedback),
    linkComment: event?.linkComment,
  };
  const onFinish = (values, eventId) => { 
    const eventNew = {
      id: eventId,
      name: values.name,
      description: values.description,
      descriptionUrl: values.descriptionUrl,
      type: values.type,
      timeZone: values.timeZone,
      startDateTime: prepareDateForBackend(values.date[0], values.timeZone),
      endDateTime: prepareDateForBackend(values.date[1], values.timeZone),
      place: values.place,
      comment: values.comment,
      startDateCrossCheck:
        values.crossCheck &&
        values.crossCheck[0] &&
        prepareDateForBackend(values.crossCheck[0][0], values.timeZone),
      endDateCrossCheck:
        values.crossCheck &&
        values.crossCheck[0] &&
        prepareDateForBackend(values.crossCheck[0][1], values.timeZone),
      organizers: JSON.stringify(values.organizers.filter((e) => e !== '')),
      link: values.link,
      color: values.color,
      feedbackComment: event?.feedbackComment,
      feedback: JSON.stringify(values.feedback),
      linkComment: values.linkComment,
    };
    dispatch(scheduleEventDraftSlice.actions.draftAdd(eventNew));
    history.push({
      pathname: "/event",
      search: `?id=${event?.id}&draft=true`,
    })
  };

  return (
    <Row justify="center">
      <Col span={20}>
        <Form
          form={form}
          layout="horizontal"
          name="validate_other"
          labelCol={{ span: 5 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 2 },
          }}
          onFinish={(value) => onFinish(value, event?.id)}
          initialValues={initialValues}
        >
          <FormHeader form={form}/>
          <Color form={form}/>
          <Organizer form={form}/>
          <DateMy type={typeEvent} />
          <TimeZone/>
          <InputMy type={typeEvent}/>
          <Form.Item name="place" label="Place">
            <Input/>
          </Form.Item>
          <Form.Item name="feedback" label="Feedback" valuePropName="checked">
            <Switch/>
          </Form.Item>
          <Form.Item name="submit">
            <Button type="primary" htmlType="submit">
              PreView
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default FormMy;
