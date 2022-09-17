
import { Card } from 'antd';
import { Col, Row, Button, Modal, Tabs } from 'antd';
import { useState } from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.user)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    console.log(key);
  };


  return (

    <div style={{ padding: '30px' }}>
      <Card
        title={<div>编辑资料</div>}
        bordered={true}
        style={{
          width: '100%',
        }}
      >
        <Row>
          <Col span={11}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              style={{ width: 200, borderRadius: '50%', marginRight: 20 }}
              src={"http://xawn.f3322.net:8002/distremote/static/avatar/" + user.avatar}
              alt="" />

            <Button style={{ margin: 10 }}
              type="primary"
              onClick={showModal}
            >
              <i className='iconfont icon-Write'></i>
              <span>修改头像</span>
            </Button>
            {/* 弹出框 */}
            <Modal
              title="选择头像"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              {/* 头像列表切换 */}
              <Tabs

                defaultActiveKey="1"
                onChange={onChange}
                items={[
                  {
                    label: `后田花子`,
                    key: '1',
                    children: `Content of Tab Pane 1`,
                  },
                  {
                    label: `阿里系`,
                    key: '2',
                    children: `Content of Tab Pane 2`,
                  },
                  {
                    label: `脸萌`,
                    key: '3',
                    children: `Content of Tab Pane 3`,
                  },
                ]}
              />
            </Modal>
          </Col>
          <Col span={13}>
            <ul >
              <li>账户：{user.username}</li>
              <li>角色：{user.roleName}</li>
              <li>性别：{user.ssex}</li>
              <li>电话：{user.mobile}</li>
              <li>邮箱：{user.email}</li>
              <li>部门：{user.deptName}</li>
              <li>描述：{user.description}</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div >
  )
};

export default Profile;