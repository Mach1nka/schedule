import React from 'react';
import { Form, Button, Row, Col, Switch, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import DateMy from './Date/Date';
import Organizer from './Organizer/Organizer';
import InputMy from './Input/Input';
import Color from './Color/Color'
import FormHeader from './FormHeader/FormHeader';
import TimeZone from './TimeZone/TimeZone';
import typeEvents from '../../data/typeEvents';
import zone from './utils/zone';
import { selectUserTimeZone, selectScheduleEventById, selectScheduleEventDraftData } from '../../selectors/selectors';
import {scheduleEventDraftSlice} from "../../slices/schedule-event-draft-slice/schedule-event-draft-slice";
import { RootState } from '../../store';
// interface IdEvent {
//   id?: string;
//   type?: string;
//   setForm: (val: boolean) => void;
//   setEvent: (val: any) => void;
// }

const FormMy = (): React.ReactElement => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = new URLSearchParams(useLocation().search);


  const id = search.get("id") || '';
  const type = search.get("type") || 'New';
  const isDraft = JSON.parse(search.get("draft"));

  const currentTimeZone = useSelector(selectUserTimeZone);
  const eventDraft = useSelector(selectScheduleEventDraftData);
  const eventState = useSelector((state: RootState) => selectScheduleEventById(state, id));
  
  const event = isDraft ? eventDraft : eventState;
 
  const typeEvent = typeEvents.find((e) => e.name === (event ? event?.type :  type));
  const initialValues = {
    type: typeEvent?.name,
    name: event?.name,
    organizers: event?.organizers ? [''].concat(JSON.parse(event?.organizers)) : [''],
    date: event?.startDateTime && [
      moment(event?.startDateTime, 'X').utcOffset(zone(currentTimeZone), false),
      moment(event?.endDateTime, 'X').utcOffset(zone(currentTimeZone), false),
    ],
    crossCheck: event?.startDateCrossCheck
      ? [
          [
            moment(event?.startDateCrossCheck, 'X').utcOffset(zone(currentTimeZone), false),
            moment(event?.endDateCrossCheck, 'X').utcOffset(zone(currentTimeZone), false),
          ],
        ]
      : [],
    place: event?.place ? event?.place : 'online',
    comment: event?.comment,
    color: event?.color,
    descriptionUrl: event?.descriptionUrl,
    link: event?.link,
    description: event?.description,
    timeZone: currentTimeZone,
    feedback: event?.feedback && JSON.parse(event?.feedback),
    linkComment: event?.linkComment,
  };
  const onFinish = (values) => {
    const eventNew = {
      id: event?.id,
      name: values.name,
      description: values.description,
      descriptionUrl: values.descriptionUrl,
      type: values.type,
      timeZone: values.timeZone,
      startDateTime: values.date[0]
        .utcOffset(zone(values.timeZone), true)
        .utcOffset(0, false)
        .format('X'),
      endDateTime: values.date[1]
        .utcOffset(zone(values.timeZone), true)
        .utcOffset(0, false)
        .format('X'),
      place: values.place,
      comment: values.comment,
      startDateCrossCheck:
        values.crossCheck &&
        values.crossCheck[0] &&
        values.crossCheck[0][0]
          .utcOffset(zone(values.timeZone), true)
          .utcOffset(0, false)
          .format('X'),
      endDateCrossCheck:
        values.crossCheck &&
        values.crossCheck[0] &&
        values.crossCheck[0][1]
          .utcOffset(zone(values.timeZone), true)
          .utcOffset(0, false)
          .format('X'),
      organizers: JSON.stringify(values.organizers.filter((e) => e !== '')),
      link: values.link,
      color: values.color,
      feedback: JSON.stringify(values.feedback),
      linkComment: values.linkComment,
    };
    console.log('eventNew', eventNew);
    dispatch(scheduleEventDraftSlice.actions.draftAdd(eventNew));
    history.push({
      pathname: "/Event",
      search: `?id=${event?.id}&draft=true`,
    })
  };

  return (
    <Row justify="center">
      {console.log(event?.organizers)}
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
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <FormHeader form={form}/>
          <Color form={form}/>
          <Organizer form={form}/>
          <DateMy type={typeEvent} />
          <TimeZone/>
          <InputMy type={typeEvent} form={form}/>
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

// FormMy.defaultProps = {
//   id: '',
//   type: 'New',
// };
