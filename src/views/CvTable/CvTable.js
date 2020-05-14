import React from "react";
import PropTypes from "prop-types";
import { Button, Popover } from "antd";
import {
  DownloadOutlined,
  StarOutlined,
  ReadOutlined
} from "@ant-design/icons/lib/icons";
import { StyledButtonWrapper, StyledTable } from "./CvTable.styles";

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
        <StyledButtonWrapper>
          <Popover content="Просмотреть резюме">
            <Button
              onClick={() => lookResume(record.ResumeId)}
              type="dashed"
              shape="circle"
              size="small"
              icon={<ReadOutlined />}
            />
          </Popover>
          <Popover content="Скачать резюме">
            <Button
              href={`https://rabota.ua/service/cvexport?resumeId=${record.ResumeId}`}
              type="dashed"
              shape="circle"
              size="small"
              icon={<DownloadOutlined />}
            />
          </Popover>
          <Popover content="Добавить в избранные">
            <Button
              disabled
              onClick={() => console.log()}
              type="dashed"
              shape="circle"
              size="small"
              icon={<StarOutlined />}
            />
          </Popover>
        </StyledButtonWrapper>
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
