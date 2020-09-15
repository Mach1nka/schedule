import React, {useState} from 'react';
import { List, Button, Skeleton, Collapse, Row, Col, } from 'antd';
import {useSelector} from "react-redux";
import {selectScheduleEventsData} from "../../selectors/selectors";

const LoadMoreList: React.FC = () => {
  const { Panel } = Collapse;
  const count:number = 3;
  const scheduleEvents = useSelector(selectScheduleEventsData);
  const [initLoading, setInitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState(scheduleEvents);
  console.log(list);

  // const onLoadMore = () => {
    // setLoading(true);
    //    setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))));
    //    setLoading(false);
  // };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={() => {onLoadMore()}}>Loading More</Button>
      </div>
    ) : null;
    return (
      <div>
        <Row>
          <Col xs={24} lg={12} >
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[<a key="list-loadmore-more">more</a>]}
                >
                  <Skeleton loading={item.loading} active>
                    <div>
                      <h4>Task Name</h4>
                      <p>Deadline:00.00.0000</p>
                      <Collapse>
                        <Panel header="More information" key={item.id}>
                          <h4>Type Task</h4>
                          <p>
                            Task Description <br/>
                            We supply a series of design principles, practical patterns and high quality design
                            resources (Sketch and Axure), to help people create their product prototypes
                            beautifully and efficiently.
                          </p>
                        </Panel>
                      </Collapse>
                    </div>
                  </Skeleton>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
}

export default LoadMoreList;
