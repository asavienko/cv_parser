import React from 'react';
import PropTypes from 'prop-types';
import EllipsisTooltip from './EllipsisTooltip';
import { StyledTable } from './CvTable.styles';

function CvTable({
  cvList,
  loading,
  onRow,
  handleChange,
  rowSelection,
  pagination,
}) {
  const columns = [
    {
      width: 150,
      title: 'Имя',
      dataIndex: 'DisplayName',
      key: 'displayName',
    },
    {
      width: 85,
      title: 'Возраст',
      dataIndex: 'Age',
      key: 'age',
    },
    {
      width: 185,
      title: 'Должность',
      dataIndex: 'Speciality',
      key: 'speciality',
      render: (speciality) => <EllipsisTooltip title={speciality} />,
    },
    {
      width: 130,
      title: 'Город',
      dataIndex: 'CityName',
      key: 'cityName',
    },
    {
      width: 130,
      title: 'Зарплата',
      dataIndex: 'Salary',
      key: 'salary',
    },
    {
      width: 100,
      title: 'Последнее изменение',
      dataIndex: 'UpdatedDate',
      key: 'lastModified',
    },
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
      scroll={{ x: 1200, y: 'calc(100vh - 258px)' }}
      pagination={pagination}
    />
  );
}


CvTable.propTypes = {
  cvList: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onRow: PropTypes.func,
  handleChange: PropTypes.func,
  rowSelection: PropTypes.func,
};
CvTable.defaultProps = {
  cvList: [],
  loading: false,
  onRow: () => {},
  handleChange: () => {},
  rowSelection: () => {},
};

export default CvTable;
