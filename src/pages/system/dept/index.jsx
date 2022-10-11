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
    { label: '部门名称', name: 'deptName', rules: true },
    { label: '排序', name: 'orderNum', },
    { label: 'deptId', name: 'deptId', disabled: true },
  ]
  const unUsalAdd = [
    { label: 'parentId', name: 'tableName', }
  ]


  // 添加属性
  function add(rows) {
    if (rows) {
      rows.map((a, index) => {
        rows[index] = {
          ...a,
          deptId: a.id,
          deptName: a.title,
          orderNum: String(a.order),
        }
        if (a.hasChildren) {
          add(a.children)
        }
      })
    }
    return rows
  }

  // 获取列表基础数据
  async function getList(body) {
    const data = await getDeptApi(body)
    // console.log('getList', data);
    let rows = data.rows.children;
    setTotal(data.total)
    // 处理返回的 数据
    setList(add(rows))
    console.log('list', list);
  }
  // console.log('list', list);
  // 新增
  async function getChildAdd(val) {
    console.log('getChildAdd--dept', val);
    await addDeptApi(val)
    getList()
  }
  // 改变
  async function changeApi(val) {
    console.log('changeApi--dept', val);
    await changeDeptApi(val)
    getList()
  }

  // 搜索
  function getChildSearch(val) {
    console.log('getChildSearch--dept', val);
    getList(val)
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
    getList()
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
        // console.log('items', items);
        return <BigPageAdd
          getList={getList}
          changeApi={changeApi}
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

  // 重置
  function onReset() {
    getList()
  }

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
        <BigPage onReset={onReset} usualInput={usealInput} getChildSearch={getChildSearch} />
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
        {/* <Button
          style={{ margin: '0 15px' }}
          onClick={delSelVal}
          disabled={selectedRowKeys.length > 0 ? false : true}
        >
          删除
        </Button> */}

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
