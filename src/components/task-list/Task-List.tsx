import React, {useState, useEffect} from 'react';
import { List, Button, Skeleton, Collapse } from 'antd';
import reqwest from 'reqwest';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const LoadMoreList: React.FC = () => {
  const { Panel } = Collapse;
  const count:number = 3;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  useEffect(() => {
    getData(res => {
      setInitLoading(false),
      setData(res.results),
      setList(res.results)
    });
  });

  // componentDidMount() {
  //   this.getData(res => {
  //     this.setState({
  //       initLoading: false,
  //       data: res.results,
  //       list: res.results,
  //     });
  //   });
  // }

  //  onLoadMore = () => {
  //   this.setState({
  //     loading: true,
  //     list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
  //   });
  //   this.getData(res => {
  //     const data = this.state.data.concat(res.results);
  //     this.setState(
  //       {
  //         data,
  //         list: data,
  //         loading: false,
  //       },
  //       () => {
  //         // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
  //         // In real scene, you can using public method of react-virtualized:
  //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
  //         window.dispatchEvent(new Event('resize'));
  //       },
  //     );
  //   });
  // };

  const onLoadMore = () => {
    setLoading(true);
    setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))));
    getData(res => {
      const newData = data.concat(res.results);
      setData(newData),
      setList(newData),
      setLoading(false),
      useEffect(() => {
        window.dispatchEvent(new Event('resize'))
      });
    });
  };

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
                  <Panel header="More information">
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
    );
}

export default LoadMoreList;
