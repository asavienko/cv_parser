import React from "react";
import PropTypes from "prop-types";
import { StyledTable } from "./CvTable.styles";

function CvTable({
  cvList,
  loading,
  onRow,
  handleChange,
  rowSelection,
  pagination
}) {
  const columns = [
    {
      title: "Имя",
      dataIndex: "DisplayName",
      key: "displayName",
      width: 200
    },
    {
      title: "Возраст",
      dataIndex: "Age",
      key: "age",
      width: 120
    },
    {
      title: "Должность",
      dataIndex: "Speciality",
      key: "speciality"
      // render: speciality => <EllipsisTooltip title={speciality} />
    },
    {
      title: "Город",
      dataIndex: "CityName",
      key: "cityName",
      width: 180
    },
    {
      title: "Зарплата",
      dataIndex: "Salary",
      key: "salary",
      width: 150
    },
    {
      title: "Последнее изменение",
      dataIndex: "UpdatedDate",
      key: "lastModified",
      width: 150
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
      rowKey="ResumeId"
      scroll={{ x: 1000, y: "calc(100vh - 239px)" }}
      // scroll={{ x: 1000, y: "calc(100vh - 283px)" }}
      pagination={pagination}
    />
  );
}

CvTable.propTypes = {
  cvList: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onRow: PropTypes.func,
  handleChange: PropTypes.func,
  rowSelection: PropTypes.func
};
CvTable.defaultProps = {
  cvList: [],
  loading: false,
  onRow: () => {},
  handleChange: () => {},
  rowSelection: () => {}
};

export default CvTable;
