import React from "react";
import EllipsisTooltip from "./EllipsisTooltip";
import * as numeral from "numeral";
import RangeSlider from "./RangeSlider";
import { StyledTable } from "./CvTable.styles";

const shownDate = date => (date ? new Date(date).toLocaleDateString() : "");

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
      filteredValue: filteredInfo.email || "",
      onFilter: (value, { email }) => !!email === value
    },
    {
      width: 150,
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
      filters: [{ text: "есть", value: true }, { text: "нет", value: false }],
      filteredValue: filteredInfo.phone || "",
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

export default CvTable;
