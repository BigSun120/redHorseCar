import React, { useEffect, useState, useRef } from 'react'
import { Button, Modal, } from 'antd'

import BigPage from '../../../components/bigPage/BigPageInput'
import BigPageAdd from '../../../components/bigPage/BigPageAdd'
import BigMoreOptions from '../../../components/bigPage/BigMoreOptions'
import BigPageTable from '../../../components/bigPage/BigPageTable'

import { downloadApi, getDeptApi, addDeptApi, changeDeptApi } from '../../../apis/dept'
import setImg from '../../../assets/images/icons/sets.png'


export default function Dept() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);// 多选框
  const [selectedName, setSelectedName] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);// 删除 对话框
  const [list, setList] = useState([])// 存储 修改后的 table 列表数据
  const [total, setTotal] = useState('0')// 总数

  // 搜索框
  const usealInput = { deptName: '部门名称', }
  // 调用子组件的方法React.forwardRef()
  const childRef = useRef()
  // const childRef = React.forwardRef(() => { })
  // 新增框
  const usealAdd = [
    { label: '部门名称', name: 'title', rules: true },
    { label: '排序', name: 'order', },
  ]
  const unUsalAdd = [
    { label: 'parentId', name: 'tableName', }
  ]

  // 获取列表基础数据
  async function getList(body) {
    const data = await getDeptApi(body)
    console.log('getList', data);
    setTotal(data.total)
    // 处理返回的 数据
    let o = [];
    if (data) {
      data.rows.children.map(a => {
        o.push({
          ...a,
        })
      })
    }
    setList(o)
  }
  console.log('list', list);
  // 新增
  function getChildAdd(val) {
    console.log('getChildAdd--dict', val);
    addDeptApi(val)
  }

  // 搜索
  function getChildSearch(val) {
    console.log('getChildSearch--dict', val);
  }


  // 改变多选框的 值 (子改变)
  function changeSelVal(val, b) {
    console.log('changeSelVal', val);
    setSelectedRowKeys(val)
    console.log(55555555, val, b);
    setSelectedName(b)
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
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '排序',
      dataIndex: 'order',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
    },
    {
      title: '设置',
      fixed: 'right',
      dataIndex: 'options',
      render: (a, items) => {
        console.log('items', items);
        return <BigPageAdd
          getList={getList}
          changeApi={changeDeptApi}
          usealAdd={usealAdd}
          unUsalAdd={unUsalAdd}
          list={list}
          type='set'
          oneVal={items}
        />
      }

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
          getChildAdd={getChildAdd}
          addApi={addDeptApi}
          usealAdd={usealAdd}
          unUsalAdd={unUsalAdd}
          list={list}
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
          {selectedName && selectedName.map((a, index) => {
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
