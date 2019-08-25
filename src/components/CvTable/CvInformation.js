import React from "react";
import { Button, Col, Drawer, Row, Timeline } from "antd";
import styled from "styled-components";

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-content-wrapper {
    width: 50% !important;
  }
`;
const StyledRow = styled(Row)`
  position: fixed;
  overflow: auto;
  padding: 24px;
  height: calc(100% - 108px);
`;
const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  display: flex;
  justify-content: space-around;
`;

const ColStyledSpeciality = styled(Col)`
  text-align: center;
  margin-top: 10px;
`;
const StyledSalary = styled.span`
  color: RGBA(208, 208, 208, 1);
  white-space: nowrap;
`;
const CenteredCol = styled(Col)`
  text-align: center;
`;
const StyledTitle = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-size: 17px;
  font-weight: 500;
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
  color: RGBA(208, 208, 208, 1);
`;
const StyledTimeline = styled(Timeline)`
  margin-top: 10px;
`;
const StyledDatesDiff = styled.span`
  white-space: nowrap;
`;
const StyledBoldSpan = styled.span`
  font-weight: 700;
`;

const DescrBlock = ({ description, name, location, yearOfEnding, comment }) => (
  <StyledDescrEl>
    {name ? (
      location ? (
        <React.Fragment>
          <StyledBoldSpan>{name}</StyledBoldSpan>
          <span> {location}</span>
        </React.Fragment>
      ) : (
        <StyledBoldSpan>{name}</StyledBoldSpan>
      )
    ) : null}
    {yearOfEnding && (
      <StyledAdditionalInfo>Год окончания: {yearOfEnding}</StyledAdditionalInfo>
    )}
    {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    {comment && <div dangerouslySetInnerHTML={{ __html: comment }} />}
  </StyledDescrEl>
);

function CvInformation({ cvInfo, onCvInformationClose }) {
  const {
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
  } = cvInfo && cvInfo.cvInformation && cvInfo;

  return (
    <StyledDrawer
      title={displayName}
      visible={visible}
      onClose={onCvInformationClose}
    >
      <StyledRow justify="centre">
        <Col span={24}>
          <Row>
            <Col span={10}>
              {photo && <img src={photo} alt="avatar" />}
            </Col>
            <Col span={14}>
              <p>
                <StyledBoldSpan>{`${surname} ${name}`}</StyledBoldSpan>
              </p>
              {birthDate && (
                <p>{`Дата рождения: ${new Date(
                  birthDate
                ).toLocaleDateString()}`}</p>
              )}
              {cityName && <p>Регион:{" "}{cityName}</p>}
              {phone && <p>Телефон:{" "}{phone}</p>}
              {email && <p>E-mail:{" "}{email}</p>}
            </Col>
          </Row>
        </Col>
        <ColStyledSpeciality span={24}>
          <StyledTitle level={4}>
            {speciality}{" "}<StyledSalary>{salary}</StyledSalary>
          </StyledTitle>
        </ColStyledSpeciality>
        {lastModified && (
          <CenteredCol span={24}>
            <StyledSalary>
              обновленно на работа.юа:{" "}
              {new Date(lastModified).toLocaleDateString()}
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
                    <StyledBoldSpan>
                      {item.Position[0].toUpperCase() + item.Position.slice(1)}
                    </StyledBoldSpan>
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
