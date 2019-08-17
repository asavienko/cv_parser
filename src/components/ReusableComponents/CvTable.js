import React from "react";
import { EllipsisTooltip } from "../CvTable/EllipsisToolitp";
import * as numeral from "numeral";
import { RangeSlider } from "../CvTable/RangeSlider";
import styled from "styled-components";
import { Table } from "antd";

const shownDate = date => (date ? new Date(date).toLocaleDateString() : "");

const StyledTable = styled(Table)`
  .ant-table-body {
    overflow: auto !important;
  }
  .ant-table-body::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  .ant-table-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0);
    border-radius: 10px;
    box-shadow: rgba(255, 255, 255, 0.3) 0 0 0 1px;
  }
  .ant-table-body:hover::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.45);
  }
  .ant-table-body::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.55);
  }
`;

function CvTable({
  filteredInfo = [],
  salaryFilterRange,
  onSalaryRangeSet,
  onSalaryRangeReset,
  onSalaryRangeChange,
  salaryRange,
  loading,
  onRow,
  cvList,
  handleChange,
  rowSelection
}) {
  const columns = [
    {
      width: 150,
      title: "Имя",
      dataIndex: "displayName",
      key: "displayName"
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      filters: [{ text: "есть", value: true }, { text: "нет", value: false }],
      filteredValue: filteredInfo.email || null,
      onFilter: (value, { email }) => !!email === value
    },
    {
      width: 150,
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
      filters: [{ text: "есть", value: true }, { text: "нет", value: false }],
      filteredValue: filteredInfo.phone || null,
      onFilter: (value, { phone }) => !!phone === value
    },
    {
      width: 85,
      title: "Возраст",
      dataIndex: "age",
      key: "age"
    },
    {
      width: 185,
      title: "Должность",
      dataIndex: "speciality",
      key: "speciality",
      render: speciality => <EllipsisTooltip title={speciality} />
    },
    {
      width: 130,
      title: "Зарплата",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => numeral(a.salary).value() - numeral(b.salary).value(),
      filterDropdown: (
        <RangeSlider
          salaryFilterRange={salaryFilterRange}
          onSalaryRangeSet={onSalaryRangeSet}
          onSalaryRangeReset={onSalaryRangeReset}
          onSalaryRangeChange={onSalaryRangeChange}
          salaryRang={salaryRange}
        />
      )
    },
    {
      width: 100,
      title: "Последнее изменение",
      dataIndex: "lastModified",
      key: "lastModified",
      render: shownDate
    },
    {
      width: 100,
      title: "Добавленно на работа юа",
      dataIndex: "addDate",
      key: "addDate",
      render: shownDate
    }
  ];
  return (
    <StyledTable
      size="small"
      loading={loading}
      onRow={onRow}
      dataSource={cvList}
      onChange={handleChange}
      columns={columns}
      rowSelection={rowSelection}
      scroll={{ x: 1200, y: "calc(100vh - 258px)" }}
    />
  );
}

export { CvTable };
