import React, { useEffect, useState } from "react";
import { Table } from "antd";
import cvData from "../mokData/cvData";
import Moment from "react-moment";
import 'moment/locale/ru';

const Column = { Table };

const showDate = date => <Moment format={"D-MM-YYYY"}>{date}</Moment>

function CvTable() {
  const [cvList, setCvList] = useState([]);
  useEffect(() => {
    /*fetch("../mokData/cvData.json")
      .then(result => result.json())
      .then(json => setCvList(json))
      .catch(e => console.log(e));
  */
    const data = JSON.parse(JSON.stringify(cvData));
    const dataWithKey = data.map(cv => {
      cv.key = cv._id;
      return cv;
    });
    setCvList(dataWithKey);
    console.log(data);
  }, []);
  return (
    <Table dataSource={cvList}>
      <Column title="Имя" dataIndex="displayName" key="displayName" />
      <Column
        title="URL"
        dataIndex="url"
        key="url"
        render={url => (
          <a href={url} target="_blank" rel="noopener noreferrer">
            перейти
          </a>
        )}
      />
      <Column title="email" dataIndex="email" key="email" />
      <Column title="Телефон" dataIndex="phone" key="phone" />
      <Column title="Возраст" dataIndex="age" key="age" />
      <Column title="Должность" dataIndex="speciality" key="speciality" />
      <Column title="Зарплата" dataIndex="salary" key="salary" />
      <Column title="Зарплата ФУЛ" dataIndex="salaryFull" key="salaryFull" />

      <Column
        title="Последнее изменение"
        dataIndex="lastModified"
        key="lastModified"
        render={showDate}
      />
      <Column
        title="Добавленно на работа юа"
        dataIndex="addDate"
        key="addDate"
        render={showDate}
      />
    </Table>
  );
}

export { CvTable };
