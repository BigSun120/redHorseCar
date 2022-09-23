import React, { useEffect, useState, useRef } from 'react'
import { Button, Modal } from 'antd'

import BigPage from '../../../components/bigPage/BigPageInput'
import BigPageAdd from '../../../components/bigPage/BigPageAdd'
import BigMoreOptions from '../../../components/bigPage/BigMoreOptions'
import BigPageTable from '../../../components/bigPage/BigPageTable'

import { downloadApi, getDictApi, addDictApi, changeDictApi } from '../../../apis/dict'
import setImg from '../../../assets/images/icons/sets.png'


export default function Dict() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);// 多选框
  const [isModalOpen, setIsModalOpen] = useState(false);// 删除 对话框
  const [list, setList] = useState([])// 存储 修改后的 table 列表数据
  const [total, setTotal] = useState('0')// 总数

  // 搜索框
  const usealInput = { keyy: '键', valuee: '值', fieldName: '表名' }
  // 调用子组件的方法React.forwardRef()
  const childRef = useRef()
  // const childRef = React.forwardRef(() => { })
  // 新增框
  const usealAdd = [
    { label: '键', name: 'keyy', rules: true },
    { label: '值', name: 'valuee', rules: true },
    { label: '表名', name: 'fieldName', rules: true },
    { label: '字段', name: 'tableName', rules: true },
    { label: 'Id', name: 'dictId', disabled: true },
  ]

  // 获取列表基础数据
  async function getList(body) {
    const data = await getDictApi(body)
    console.log('getList', data);
    setTotal(data.total)
    // 处理返回的 数据
    let o = [];
    if (data) {
      data.rows.map(a => {
        o.push({
          ...a,
          key: a.dictId,
          value: a.valuee,
          options: <BigPageAdd
            getList={getList}
            changeApi={changeDictApi}
            usealAdd={usealAdd}
            type='set'
            oneVal={a}
          />
        })
      })
    }
    setList(o)
  }
  console.log('list', list);
  // 新增
  function getChildAdd(val) {
    console.log('getChildAdd--dict', val);
    addDictApi(val)
  }

  // 搜索
  function getChildSearch(val) {
    console.log('getChildSearch--dict', val);
  }


  // 改变多选框的 值 (子改变)
  function changeSelVal(val) {
    console.log('changeSelVal', val);
    setSelectedRowKeys(val)
  }

  // 点击删除打开 对话框
  function delSelVal() {
    setIsModalOpen(true);
  }
  // 对话框 两按钮  
  const handleOk = () => {
    console.log('handleOk', selectedRowKeys);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    console.log('handleCancel');
    setIsModalOpen(false);
  };


  // // 打开 新增 组件
  // function openAdd() {
  //   console.log('childRef', childRef);
  // }

  // 表头
  const columns = [
    {
      title: '键',
      dataIndex: 'keyy',
    },
    {
      title: '值',
      dataIndex: 'valuee',
    },
    {
      title: '表名',
      dataIndex: 'tableName',
    },
    {
      title: '字段',
      dataIndex: 'fieldName',
    },
    {
      title: '设置',
      fixed: 'right',
      dataIndex: 'options',
    },
  ];

  useEffect(() => {
    getList()
  }, [])

  // 页码改变
  const onchange = (a) => {
    console.log('onchange');
    getList({
      pageNum: a.current,
      pageSize: a.pageSize
    })
  }

  return (
    <>
      <div>
        {/* 搜索框 */}
        <BigPage usualInput={usealInput} getChildSearch={getChildSearch} />
      </div>
      <div style={{ display: 'flex' }}>

        {/* 新增框 */}
        <BigPageAdd
          getList={getList}
          usealAdd={usealAdd}
          getChildAdd={getChildAdd}
          addApi={addDictApi}
          type='add'
        />

        {/* 删除 */}
        <Button
          style={{ margin: '0 15px' }}
          onClick={delSelVal}
          disabled={selectedRowKeys.length > 0 ? false : true}
        >
          删除
        </Button>

        {/* 删除对话框 */}
        <Modal
          title="确认删除以下用户吗"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}>
          {selectedRowKeys.map((a, index) => {
            return <span key={index}>
              {a}；
            </span>
          })}
        </Modal>

        {/* 更多选项 */}
        <BigMoreOptions downloadApi={downloadApi} />
      </div>
      <div>
        {/* 表格展示 */}
        <BigPageTable
          rowSelectionBL={true}
          changeSelVal={changeSelVal}
          columns={columns}
          list={list}
          page={{
            total,
            onchange
          }}
        />
      </div>
    </>
  )
}
