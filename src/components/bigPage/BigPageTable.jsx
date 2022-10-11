import { Button, Table } from 'antd';
import React, { useState } from 'react';



/**
 * 接收的参数：
 * 1. rowSelectionBL（布尔值）：判断是否未 多选框 
 * 2. changeSelVal（函数）：传递 多选框的值
 * 3. list（数组）：表格数据
 * 4. page（对象）：{ total，onChange：页码改变}
 * 
 * **/
export default function BigPageTable(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedName, setSelectedName] = useState([]);


  // 多选框
  const onSelectChange = (newSelectedRowKeys, b) => {
    let arr = [];
    b.map(a => arr.push(a))
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedName(arr);
    props.changeSelVal(newSelectedRowKeys, arr)
    console.log(4444444, newSelectedRowKeys, arr,);
  };

  const rowSelection = {
    selectedRowKeys,
    selectedName,
    onChange: onSelectChange,
  };
  // const hasSelected = selectedRowKeys.length > 0;



  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >

      </div>
      {props && props.columns && props.page &&
        <Table
          rowSelection={props.rowSelectionBL ? rowSelection : null}
          columns={props.columns}
          dataSource={props.list}
          onChange={props.page.onchange}
          pagination={{
            total: props.page.total
          }}
        />
      }
    </div>
  );
};

