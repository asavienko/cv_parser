import React from "react";
import { Button, Col, Drawer, Row, Timeline } from "antd";
import styled from "styled-components";

const StyledDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .ant-drawer-body {
    padding: 0;
  }
`;
const StyledRow = styled(Row)`
  position: fixed;
  overflow: hidden;
  overflow-y: auto;
  padding: 24px;
  height: calc(100% - 108px);
`;
const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  display: flex;
  justify-content: space-around;
`;

const ColStyledSpeciality = styled(Col)`
  text-align: center;
  margin-top: 10px;
`;
const StyledSalary = styled.span`
  color: #d0d0d0;
  white-space: nowrap;
`;
const CenteredCol = styled(Col)`
  text-align: center;
`;
const StyledTitle = styled.h3`
  margin: 0;
`;
const StyledBlockTitle = styled.div`
  border-bottom: 1px solid #e9e9e9;
  width: 100%;
  margin-top: 10px;
  font-weight: 500;
  font-size: 18px;
`;
const StyledDescrEl = styled.div`
  margin-top: 10px;
`;
const StyledAdditionalInfo = styled.span`
  display: block;
  font-size: 12px;
  color: #d0d0d0;
`;
const StyledTimeline = styled(Timeline)`
  margin-top: 10px;
`;
const StyledDatesDiff = styled.span`
  white-space: nowrap;
`;

const DescrBlock = ({ description, name, location, yearOfEnding, comment }) => (
  <StyledDescrEl>
    {(name || location) && (
      <span>
        <b>{name}</b> {location && `(${location})`}
      </span>
    )}
    {yearOfEnding && (
      <StyledAdditionalInfo>Год окончания: {yearOfEnding}</StyledAdditionalInfo>
    )}
    {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    {comment && <div dangerouslySetInnerHTML={{ __html: comment }} />}
  </StyledDescrEl>
);

function CvInformation({
  cvInfo,
  cvInfo: {
    visible,
    cvInformation: {
      displayName,
      url,
      salary,
      photo,
      surname,
      name,
      birthDate,
      cityName,
      phone,
      email,
      speciality,
      lastModified,
      additionals,
      educations,
      experience,
      skills
    }
  },
  onCvInformationClose
}) {
  return (
    <StyledDrawer
      title={displayName}
      visible={visible}
      onClose={onCvInformationClose}
      width="50%"
    >
      <StyledRow justify="centre">
        <Col span={24}>
          <Row>
            <Col span={10}>{photo && <img src={photo} />}</Col>
            <Col span={14}>
              <p>
                <b>
                  {surname} {name}
                </b>
              </p>
              {birthDate && (
                <p>Дата рождения: {new Date(birthDate).toLocaleDateString()}</p>
              )}
              {cityName && <p>Регион: {cityName}</p>}
              {phone && <p>Телефон: {phone}</p>}
              {email && <p>E-mail: {email}</p>}
            </Col>
          </Row>
        </Col>
        <ColStyledSpeciality span={24}>
          <StyledTitle level={4}>
            {speciality} <StyledSalary>{salary}</StyledSalary>
          </StyledTitle>
        </ColStyledSpeciality>
        {lastModified && (
          <CenteredCol span={24}>
            <StyledSalary>
              (обновленно на работа.юа:{" "}
              {new Date(lastModified).toLocaleDateString()})
            </StyledSalary>
          </CenteredCol>
        )}
        {experience && experience.length > 0 && (
          <Col span={24}>
            <StyledBlockTitle>Опыт работы</StyledBlockTitle>
            <StyledTimeline mode="alternate">
              {experience.map(item => (
                <Timeline.Item>
                  <Row>
                    <b>
                      {item.Position[0].toUpperCase() + item.Position.slice(1)}
                    </b>
                  </Row>
                  <Row>
                    <StyledAdditionalInfo>
                      {item.StartDate} - {item.EndDate}{" "}
                      <StyledDatesDiff>({item.DatesDiff})</StyledDatesDiff>
                    </StyledAdditionalInfo>
                  </Row>
                  <Row>{item.Company.toUpperCase()}</Row>
                </Timeline.Item>
              ))}
            </StyledTimeline>
          </Col>
        )}
        {educations && educations.length > 0 && (
          <Col span={24}>
            <StyledBlockTitle>Образование</StyledBlockTitle>
            {educations.map(item => (
              <DescrBlock
                name={item.name}
                location={item.location}
                description={item.speciality}
                yearOfEnding={item.yearOfGraduation}
                comment={item.comment}
              />
            ))}
          </Col>
        )}
        {skills && skills.length > 0 && (
          <Col span={24}>
            <StyledBlockTitle>Навыки</StyledBlockTitle>
            {skills.map(item => (
              <DescrBlock description={item.description} />
            ))}
          </Col>
        )}
        {additionals && additionals.length > 0 && (
          <Col span={24}>
            <StyledBlockTitle>Дополнительная информация</StyledBlockTitle>
            {additionals.map(item => (
              <DescrBlock name={item.name} description={item.description} />
            ))}
          </Col>
        )}
      </StyledRow>

      <StyledFooter>
        <Button target="_blank" rel="noopener noreferref" href={url}>
          URL
        </Button>
        <Button icon="download" download>
          Скачать PDF
        </Button>
      </StyledFooter>
    </StyledDrawer>
  );
}

export { CvInformation };
