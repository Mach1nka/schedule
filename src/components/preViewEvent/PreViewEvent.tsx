import React, { useEffect, useState } from 'react';
import { Layout, PageHeader, Button, Descriptions, Tag, Space, Avatar, Typography } from 'antd';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import screenUrl from '../formForMentor/utils/screenUrl';
// import { ScheduleMockEvents } from '../../data/schedule';
import { selectUserTimeZone, selectScheduleEventsData } from '../../selectors/selectors';
import zone from '../formForMentor/utils/zone';
import Feedback from './Feedback/Feedback';
import SC from './sc';

// interface IdEvent {
//   event: ScheduleMockEvents;
// }

const PreViewEvent = (): React.ReactElement => {
  const [description, setDescription] = useState('');
  const currentTimeZone = useSelector(selectUserTimeZone);
  const search = new URLSearchParams(useLocation().search);
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  console.log(search.get("id"));
  const event = useSelector(selectScheduleEventsData)?.find((e) => e.id === search.get("id"));
  const { Link } = Typography;
  const { Content } = Layout;
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
  useEffect(() => {
    if (event) {
      markDown(event.descriptionUrl);
    }
  }, [event]);
  return (
    <>
      
      {event && (
        <>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={event.name}
            subTitle={<Tag color="blue">{event.type}</Tag>}
            tags={[
              <Button key="1" type="ghost" onClick={() => setVisible(true)}>
                Feedback
              </Button>,
            ]}
            extra={[
              <Button key="3">Save</Button>,
              <Button
                key="2"
                onClick={()=>history.push({
                pathname: "/formForMentor",
                search: `?id=${event.id}`,
              })}
              >Edit
              </Button>,
              <Button key="1" type="primary">
                Save New Event
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
            </Descriptions>
          </PageHeader>
          <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
              <SC.TITLE source={description} escapeHtml={false}/>
            </Content>
          </Layout>
          <Feedback visible={visible} setVisible={setVisible}/>
        </>
      )}
    </>
  );
};
export default PreViewEvent;
