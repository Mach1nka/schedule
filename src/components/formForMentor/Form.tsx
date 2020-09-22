import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import DateMy from './Date/Date';
import Organizer from './Organizer/Organizer';
import InputMy from './Input/Input';
import FormHeader from './FormHeader/FormHeader';
import TimeZone from './TimeZone/TimeZone';
import typeEvents from '../../data/typeEvents';
import zone from './utils/zone';
import { selectUserTimeZone, selectScheduleEventsData } from '../../selectors/selectors';
import {scheduleEventDraftSlice} from "../../slices/schedule-event-draft-slice/schedule-event-draft-slice";

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
  const currentTimeZone = useSelector(selectUserTimeZone);
  const event = useSelector(selectScheduleEventsData)?.find((e) => e.id === search.get("id"));
  const typeEvent = typeEvents.find((e) => e.name === (event ? event?.type : 'New'));
  const initialValues = {
    type: typeEvent?.name,
    name: event?.name,
    organizers: event?.organizers ? [''].push(JSON.parse(event?.organizers)) : [''],
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
    place: event?.place,
    comment: event?.comment,
    color: event?.color,
    descriptionUrl: event?.descriptionUrl,
    link: event?.link,
    description: event?.description,
    timeZone: currentTimeZone,
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
        values.crossCheck[0] &&
        values.crossCheck[0][0]
          .utcOffset(zone(values.timeZone), true)
          .utcOffset(0, false)
          .format('X'),
      endDateCrossCheck:
        values.crossCheck[0] &&
        values.crossCheck[0][1]
          .utcOffset(zone(values.timeZone), true)
          .utcOffset(0, false)
          .format('X'),
      organizers: JSON.stringify(values.organizers.filter((e) => e !== '')),
      link: values.link,
      color: values.color,
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
          <FormHeader form={form} />
          <Organizer form={form} />
          <DateMy type={typeEvent} />
          <TimeZone />
          <InputMy type={typeEvent} />
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
