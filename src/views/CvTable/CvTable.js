import React from "react";
import PropTypes from "prop-types";
import { StyledTable } from "./CvTable.styles";
import EllipsisTooltip from "./EllipsisTooltip";

function CvTable({
  cvData,
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
      width: 80
    },
    {
      title: "Должность",
      dataIndex: "Speciality",
      key: "speciality",
      render: speciality => <EllipsisTooltip title={speciality} />
    },
    {
      title: "Город",
      dataIndex: "CityName",
      key: "cityName",
      width: 130
    },
    {
      title: "Зарплата",
      dataIndex: "Salary",
      key: "salary",
      width: 120
    },
    {
      title: "Последнее изменение",
      dataIndex: "UpdatedDate",
      key: "lastModified",
      width: 140
    }
  ];

  return (
    <StyledTable
      size="small"
      pagination={{ ...pagination }}
      loading={loading}
      onRow={onRow}
      dataSource={cvData}
      onChange={handleChange}
      columns={columns}
      rowSelection={rowSelection}
      rowKey="ResumeId"
      scroll={{ x: 1000 }}
      bordered
    />
  );
}

CvTable.propTypes = {
  cvData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  rowSelection: PropTypes.bool,
  onRow: PropTypes.func,
  handleChange: PropTypes.func,
  pagination: PropTypes.objectOf(PropTypes.number)
};
CvTable.defaultProps = {
  cvData: [{}],
  loading: false,
  rowSelection: false,
  onRow: () => {},
  handleChange: () => {},
  pagination: { total: 0, pageSize: 0, current: 1 }
};

export default CvTable;
