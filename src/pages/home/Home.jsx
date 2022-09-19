import React, { useEffect, useRef } from 'react'
import { Layout, Menu, Col, Row, Dropdown, message, Space, Breadcrumb, Card } from 'antd';
import * as echarts from 'echarts';



export default function Home() {
  // 本地用户信息
  const { username, avatar, deptName, roleName, lastLoginTime } = JSON.parse(localStorage.user)

  const lineRef = useRef(null);
  const myChartRef = useRef(null);
  const initChart = () => {
    myChartRef.current = echarts.init(lineRef.current);
    let option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    myChartRef.current && myChartRef.current.setOption(option, true);
  }

  const list = [1, 2, 3, 4, 1, 1, 1]

  useEffect(() => {
    initChart();
  }, []);


  return (
    <div>
      <Card>
        <Row>
          <Col span={16}>
            <ul>
              <li><img
                width={80}
                src={"http://xawn.f3322.net:8002/distremote/static/avatar/" + avatar} alt="" />
              </li>
              <li style={{ color: 'gray' }}><span style={{ fontSize: 20, color: '#595959' }}>
                你好，\(@^0^@)/！{username}
              </span></li>
              <li style={{ color: 'gray' }}>{deptName} | {roleName}</li>
              <li style={{ color: 'gray' }}>上次登录时间：{lastLoginTime}</li>
            </ul>
          </Col>
          <Col span={8}>
            <Row>
              <Col style={{ color: 'gray' }} span={8}>今日IP</Col>
              <Col style={{ color: 'gray' }} span={8}>今日访问</Col>
              <Col style={{ color: 'gray' }} span={8}>访问量</Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col span={11} style={{ marginRight: 15 }}>
          <Card style={{ marginTop: 15 }}>
            <span>近7日系统访问记录</span>
            <div ref={lineRef} style={{ width: 300, height: 300 }}></div>

          </Card>
        </Col>
        <Col span={12} style={{ overflowY: 'scroll', maxHeight: 400 }}>
          <Card style={{ marginTop: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>进行中的项目</span>
              <span>所有项目</span>
            </div>
          </Card>
          {
            list.map((a, index) => {
              return <Card key={index} >
                {a}
              </Card>
            })
          }
        </Col>
      </Row>

    </div >
  )
}
