import React from 'react';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col } from 'antd';
import { sectionOneData } from './home-data';
import { IHomeSectionOneData } from 'app/shared/model/home-data.model';

export const HomeSectionOne = () => {
  const ColWrapper = React.forwardRef((props: any, ref: React.Ref<any>) => <Col {...props} ref={ref} />);
  const RowWrapper = React.forwardRef((props: any, ref: React.Ref<any>) => <Row {...props} ref={ref} />);

  const children = sectionOneData.map((d: IHomeSectionOneData, i: number) => (
    <QueueAnim component={ColWrapper} key={i} type="bottom" id="col" componentProps={{ xxs: 24, xs: 24, sm: 24, md: 12, lg: 8, xl: 8 }}>
      <div key="image" className="image" style={{ backgroundImage: `url(${d.src})` }} />
      <h3 key="h3">{d.title}</h3>
      <p key="p">{d.content}</p>
    </QueueAnim>
  ));

  return (
    <div className="home-func-wrapper" id="home-func">
      <h2>Why Archipad?</h2>
      <i className="line" />
      <OverPack location="home-func" playScale={0.4}>
        <QueueAnim type="bottom" key="home-func" ease="easeOutQuart" leaveReverse>
          <QueueAnim key="content" component={RowWrapper} type="bottom" componentProps={{ gutter: 50 }}>
            {children}
          </QueueAnim>
        </QueueAnim>
      </OverPack>
    </div>
  );
};

export default HomeSectionOne;
