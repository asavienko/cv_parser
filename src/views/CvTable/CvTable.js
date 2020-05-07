import React from "react";
import PropTypes from "prop-types";
import {Popover} from "antd";
import ReadOutlined from "@ant-design/icons/lib/icons/ReadOutlined";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import StarOutlined from "@ant-design/icons/lib/icons/StarOutlined";
import {StyledButton, StyledTable} from "./CvTable.styles";

function CvTable({
  cvData,
  loading,
  lookResume,
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
      ellipsis: true
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
    },
    {
      title: "Действия",
      key: "action",
      width: 110,
      render: record => (
        <>
          <Popover content="Просмотреть резюме">
            <StyledButton
              onClick={() => lookResume(record.ResumeId)}
              type="dashed"
              shape="circle"
              size="small"
              icon={<ReadOutlined />}
            />
          </Popover>
          <Popover content="Скачать резюме">
            <StyledButton
              href={`https://rabota.ua/service/cvexport?resumeId=${record.ResumeId}`}
              type="dashed"
              shape="circle"
              size="small"
              icon={<DownloadOutlined />}
            />
          </Popover>
          <Popover content="Добавить в избранные">
            <StyledButton
              disabled
              onClick={() => console.log()}
              type="dashed"
              shape="circle"
              size="small"
              icon={<StarOutlined />}
            />
          </Popover>
        </>
      )
    }
  ];

  return (
    <StyledTable
      size="small"
      pagination={{
        ...pagination,
        showTotal: (total, range) =>
          total ? `${range[1] - range[0]} из ${total}` : ""
      }}
      loading={loading}
      // lookResume={lookResume}
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
  lookResume: PropTypes.func,
  handleChange: PropTypes.func,
  pagination: PropTypes.objectOf(PropTypes.number)
};
CvTable.defaultProps = {
  cvData: [{}],
  loading: false,
  rowSelection: false,
  lookResume: () => {},
  handleChange: () => {},
  pagination: { total: 0, pageSize: 0, current: 1 }
};

export default CvTable;
