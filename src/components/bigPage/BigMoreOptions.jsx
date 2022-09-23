import { Button, Dropdown, Menu, Space } from 'antd';
import React from 'react'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';


/**
 * 接收的参数
 *  downloadApi():要下载的api
 * 
 * **/
export default function BigMoreOptions(props) {

  // 导出下载
  const download = () => {
    props.downloadApi()
  }

  // 下拉框
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <span onClick={download}>导出Excel</span>
          ),
        }
      ]}
    />
  );

  return (
    <div>
      {/* 更多操作 */}
      <Dropdown overlay={menu}>
        <Button>
          <Space>
            更多操作
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  )
}
