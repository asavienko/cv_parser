import React from "react";
import PropTypes from "prop-types";
import { Button, Popover } from "antd";
import ReadOutlined from "@ant-design/icons/lib/icons/ReadOutlined";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import SaveOutlined from "@ant-design/icons/lib/icons/SaveOutlined";
import StarOutlined from "@ant-design/icons/lib/icons/StarOutlined";
import { StyledTable } from "./CvTable.styles";
import EllipsisTooltip from "./EllipsisTooltip";

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
      ellipsis: true,
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
    },
    {
      title: "Действия",
      key: "action",
      width: 150,
      render: ({ ResumeId }) => (
        <>
          <Popover content="Просмотреть резюме">
            <Button
              onClick={() => lookResume(ResumeId)}
              type="dashed"
              shape="circle"
              icon={<ReadOutlined />}
            />
          </Popover>
          <Popover content="Скачать резюме">
            <Button
              href={`https://rabota.ua/service/cvexport?resumeId=${ResumeId}`}
              type="dashed"
              shape="circle"
              icon={<DownloadOutlined />}
            />
          </Popover>
          <Popover content="Сохранить">
            <Button
              disabled="true"
              onClick={() => console.log()}
              type="dashed"
              shape="circle"
              icon={<SaveOutlined />}
            />
          </Popover>
          <Popover content="Добавить в избранные">
            <Button
              disabled="true"
              onClick={() => console.log()}
              type="dashed"
              shape="circle"
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
      pagination={{ ...pagination }}
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
