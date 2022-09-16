import React from 'react'
import { Layout, Menu, Col, Row, Dropdown, message, Space, Breadcrumb, Card } from 'antd';

export default function Home() {

  // 本地用户信息
  const { username, avatar, deptName, roleName, lastLoginTime } = JSON.parse(localStorage.user)

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
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ marginTop: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>进行中的项目</span>
              <span>所有项目</span>
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  )
}
