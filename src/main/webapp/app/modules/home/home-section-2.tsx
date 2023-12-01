import React from 'react';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Col, Flex } from 'antd';
import { HomeSectionTwoData } from './home-data';
import { IHomeSectionTwoData } from 'app/shared/model/home-data.model';

export default function HomeSectionTwo() {
  const FlexWrapper = React.forwardRef((props: any, ref: React.Ref<any>) => <Flex {...props} ref={ref} />);

  const children = HomeSectionTwoData.map((d: IHomeSectionTwoData, i: number) => (
    <Col xs={24} sm={12} md={12} lg={6} xl={6} id="col" key={i.toString()}>
      <QueueAnim type="bottom" className="content-wrapper home-hover">
        <div key="image" className="image">
          {d.svg}
        </div>
        <h3 key="h3">{d.title}</h3>
        <p key="p">{d.content}</p>
      </QueueAnim>
    </Col>
  ));

  return (
    <div className="home-serve-wrapper" id="home-serve">
      <OverPack className="home-layout" location="home-serve" playScale={0.4}>
        <QueueAnim type="bottom" key="home-serve" ease="easeInQuart" leaveReverse>
          <h2 key="h2">Key Features</h2>
          <i key="i" className="line" />
          <QueueAnim
            key="content"
            component={FlexWrapper}
            type="bottom"
            componentProps={{ gap: 'large', wrap: 'wrap', justify: 'space-evenly' }}
          >
            {children}
          </QueueAnim>
        </QueueAnim>
      </OverPack>
    </div>
  );
}
