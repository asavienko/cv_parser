import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import { RangeSlider } from "./RangeSlider";
import * as numeral from "numeral";
import { CvInformation } from "./CvInformation";
import { EllipsisTooltip } from "./EllipsisToolitp";
import styled from "styled-components";

const StyledTable = styled(Table)`
  .ant-table-body {
    overflow: scroll !important;
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

const showDate = date => (date ? new Date(date).toLocaleDateString() : "");

function CvTable() {
  const [cvList, setCvList] = useState([]);
  const [rawList, setRawList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [salaryFilterRange, setSalaryFilterRange] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);
  const [cvInfo, setCvInfo] = useState({ visible: false, cvInformation: {} });

  useEffect(() => {
    setLoading(true);
    fetch("/cvlist")
      .then(res => res.json())
      .then(obj => {
        if (obj.confirmation === "fail") {
          message.error(obj.message);
        }
        setCvList(obj.data);
        setRawList(obj.data);
        setLoading(false);
      })
      .catch(() => message.error("Не удается загрузить данные"));
  }, []);

  useEffect(() => {
    if (rawList && rawList.length) {
      const salary = rawList.map(({ salary }) => numeral(salary).value());
      const min = Math.min(...salary);
      const max = Math.max(...salary);
      setSalaryFilterRange([min, max]);
      setSalaryRange([min, max]);
    }
  }, [rawList]);
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const onRow = record => ({
    onClick: () => setCvInfo({ visible: true, cvInformation: record })
  });

  const onCvInformationClose = () =>
    setCvInfo({ visible: false, cvInformation: {} });
  const onSalaryRangeChange = range => {
    setSalaryRange(range);
  };
  const onSalaryRangeSet = () => {
    const [min, max] = salaryRange;
    console.log(salaryRange);
    const filteredArray = rawList.filter(({ salary }) => {
      console.log(min);
      return numeral(salary).value() >= min && numeral(salary).value() <= max;
    });
    setCvList(filteredArray);
  };
  const onSalaryRangeReset = () => {
    setCvList(rawList);
    setSalaryRange(salaryFilterRange);
  };
  const columns = [
    {
      width: 150,
      title: "Имя",
      dataIndex: "displayName",
      key: "displayName"
    },
    {
      width: 250,
      title: "email",
      dataIndex: "email",
      key: "email",
      filters: [{ text: "есть", value: true }, { text: "нет", value: false }],
      filteredValue: filteredInfo.email || null,
      onFilter: (value, { email }) => !!email === value,/*
      render: email => <EllipsisTooltip title={email} />*/
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
      width: 110,
      title: "Последнее изменение",
      dataIndex: "lastModified",
      key: "lastModified",
      render: showDate
    },
    {
      title: "Добавленно на работа юа",
      dataIndex: "addDate",
      key: "addDate",
      render: showDate
    }
  ];
  return (
    <React.Fragment>
      <StyledTable
        loading={loading}
        onRow={onRow}
        dataSource={cvList}
        onChange={handleChange}
        columns={columns}
        scroll={{ x: 1200, y: "65vh" }}
      />
      <CvInformation
        cvInfo={cvInfo}
        onCvInformationClose={onCvInformationClose}
      />
    </React.Fragment>
  );
}

export default CvTable;
