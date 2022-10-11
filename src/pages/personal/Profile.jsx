
import { Card, message } from 'antd';
import { Col, Row, Button, Modal, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { houTian, ali, face } from '../../assets/images/avator/houtianhuazi';
import { changeAvatarApi } from '../../apis/user';

import DrawerBtn from './components/DrawerBtn';

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

  // 渲染头像列表
  function avatarRender() {
    const list = [houTian, ali, face];
    const names = ['后田花子', '阿里系', '脸萌'];
    return names.map((a, indexA) => {
      return {
        label: a,
        key: indexA,
        children: <div>
          {list[indexA].map((a, index) => {
            return <img
              key={index}
              style={{ width: '100px', margin: 10 }}
              onClick={() => changeAvatar(a)}
              src={'http://xawn.f3322.net:8002/distremote/static/avatar/' + a}></img>
          })}
        </div>
      }
    })
  }

  // 切换头像
  async function changeAvatar(imgUrl) {
    const data = JSON.parse(localStorage.user)
    await changeAvatarApi({ username: data.username, avatar: imgUrl })
    message.success('修改成功')
    setIsModalOpen(false);

    // 修改本地
    data.avatar = imgUrl
    console.log('修改本地', data, imgUrl);
    localStorage.setItem('user', JSON.stringify(data))
    location.reload()
  }


  useEffect(() => {


  }, [])


  return (

    <div style={{ padding: '30px' }}>
      <Card
        title={<DrawerBtn></DrawerBtn>}
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
              width={800}
            >
              {/* 头像列表切换 */}
              <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                items={avatarRender()}
              />
            </Modal>
          </Col>
          <Col span={13}>
            <ul >
              <li>账户：{user.username}</li>
              <li>角色：{user.roleName}</li>
              <li>性别：{user.ssex == '0' ? '男' : user.ssex == '1' ? '女' : '保密'}</li>
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