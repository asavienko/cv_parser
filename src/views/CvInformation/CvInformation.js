import React from "react";
import { Button, Col, Row, Timeline } from "antd";
import { StyledBoldSpan } from "../../styles";
import {
  CenteredCol,
  ColStyledSpeciality,
  StyledAdditionalInfo,
  StyledBlockTitle,
  StyledDatesDiff,
  StyledDescrEl,
  StyledDrawer,
  StyledFooter,
  StyledRow,
  StyledSalary,
  StyledTimeline,
  StyledTitle
} from "./CvInforvation.styles";

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
            <Col span={10}>{photo && <img src={photo} alt="avatar" />}</Col>
            <Col span={14}>
              <p>
                <StyledBoldSpan>{`${surname} ${name}`}</StyledBoldSpan>
              </p>
              {birthDate && (
                <p>{`Дата рождения: ${new Date(
                  birthDate
                ).toLocaleDateString()}`}</p>
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

export default CvInformation;