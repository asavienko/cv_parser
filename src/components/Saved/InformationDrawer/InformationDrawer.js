import React, { useEffect, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Timeline } from "antd";
import PropTypes from "prop-types";
import { StyledBoldSpan } from "../../styles";
import {
  CenteredCol,
  ColStyledSpeciality,
  StyledAdditionalInfo,
  StyledBlockTitle,
  StyledDatesDiff,
  StyledDrawer,
  StyledFooter,
  StyledRow,
  StyledSalary,
  StyledTimeline,
  StyledTitle
} from "./CvInforvation.styles";
import DescriptionBlock from "../CvTable/DescriptionBlock";
import { getCvInfo } from "../../services/cvRequests";

function CvInformation({ visible, onCvInformationClose, resumeId }) {
  const [cvInfo, setCvInfo] = useState({});

  useEffect(() => {
    if (resumeId !== 0) {
      getCvInfo(resumeId)
        .then(response => {
          console.log(response);
          setCvInfo(response);
        })
        .catch(e => console.log(e));
    }
    return setCvInfo({});
  }, [resumeId]);

  const {
    name,
    surname,
    fatherName,
    birthDate,
    cityId,
    link,
    salary,
    photo,
    phone,
    email,
    speciality,
    lastModified,
    additionals,
    educations,
    experiences = [],
    skills,

    salaryFull = "6000 грн",
    addDate,
    currencyId = 1,
    currencySign = "грн.",
    sex = 0,
    educationId = 0,
    stateMode = "Active",
    isAnonymous = false,
    searchState = "Active",
    language = "Russian",

    profLevelId = 3,
    activeLevelId = "Public",
    notebookIds = "",
    branchIds = "",
    isOpenResumeInfo = false,
    isHasTextPartition = false,
    blockingReasonIds = null,
    showResumeInfo = true,
    isInBlackList = false,
    customBlockingReason26_Text = "",
    openContact_ViewDate = "0001-01-01T00:00:00",
    isConfirmed = false,
    skype = "",
    offerDate = "0001-01-01T00:00:00",
    offerPerson = null,
    lastActivityDate = "2020-04-16T19:02:24.27",
    isOnline = true,
    languageSkills = [],
    subRubrics = [],
    relocations = [],
    seoTags = [],
    contacts = null,
    vacancyLinks = null,
    isFromCvDb = false,
    isSelectedToNotepad = false,
    notes = null,
    serviceExists = false,
    hasPhone = true,
    openContact_MultiUserName = "",
    isPhoneConfirmed = true,
    isViewed = false
  } = cvInfo;

  return (
    <StyledDrawer visible={visible} onClose={onCvInformationClose}>
      <iframe
        src={`https://rabota.ua/cv/${link}`}
        width={"100%"}
        height={"100%"}
      />
      {/*<StyledRow justify="centre">
        <Col span={24}>
          <Row>
            <Col span={10}>{photo && <img src={photo} alt="avatar" />}</Col>
            <Col span={14}>
              <p>
                <StyledBoldSpan>
                  {`${surname || ""} ${name || ""} ${fatherName || ""}`}
                </StyledBoldSpan>
              </p>
              {birthDate && (
                <p>
                  {`Дата рождения: ${new Date(birthDate).toLocaleDateString()}`}
                </p>
              )}
              {cityId && (
                <p>
                  Регион:
                  {cityId}
                </p>
              )}
              {phone && (
                <p>
                  Телефон:
                  {phone}
                </p>
              )}
              {email && (
                <p>
                  E-mail:
                  {email}
                </p>
              )}
            </Col>
          </Row>
        </Col>
        <ColStyledSpeciality span={24}>
          <StyledTitle level={4}>
            {`${speciality} `}
            <StyledSalary>{salary}</StyledSalary>
          </StyledTitle>
        </ColStyledSpeciality>
        {lastModified && (
          <CenteredCol span={24}>
            <StyledSalary>
              {`обновленно на работа.юа: ${new Date(
                lastModified
              ).toLocaleDateString()}`}
            </StyledSalary>
          </CenteredCol>
        )}
        {experiences && experiences.length > 0 && (
          <Col span={24}>
            <StyledBlockTitle>Опыт работы</StyledBlockTitle>
            <StyledTimeline mode="alternate">
              {experiences.map(
                ({
                  position,
                  company = "Хинкальня / Шагаева Н.А., ФЛП",
                  startWork = "2017-09-01T00:00:00",
                  endWork = null,
                  id = 11512412,
                  branchId = 26,
                  description = "",
                  notebookCompanyId = 0,
                  period = "2 {1} 8 {0}",
                  companySite = "",
                  countEmployeeId = 0,
                  recommendation = []
                }) => (
                  <Timeline.Item>
                    <Row>
                      <StyledBoldSpan>
                        {position[0].toUpperCase() + position.slice(1)}
                      </StyledBoldSpan>
                    </Row>
                    <Row>
                      <StyledAdditionalInfo>
                        {`
                      ${startWork} -${endWork} `}
                        <StyledDatesDiff>{endWork - startWork}</StyledDatesDiff>
                      </StyledAdditionalInfo>
                    </Row>
                    <Row>{company.toUpperCase()}</Row>
                  </Timeline.Item>
                )
              )}
            </StyledTimeline>
          </Col>
        )}
        {educations && educations.length > 0 && (
          <Col span={24}>
            <StyledBlockTitle>Образование</StyledBlockTitle>
            {educations.map(item => (
              <DescriptionBlock
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
              <DescriptionBlock description={item.description} />
            ))}
          </Col>
        )}
        {additionals && additionals.length > 0 && (
          <Col span={24}>
            <StyledBlockTitle>Дополнительная информация</StyledBlockTitle>
            {additionals.map(item => (
              <DescriptionBlock
                name={item.name}
                description={item.description}
              />
            ))}
          </Col>
        )}
      </StyledRow>

      <StyledFooter>
        <Button target="_blank" rel="noopener noreferref" href={link}>
          URL
        </Button>
        <Button icon={<DownloadOutlined />} download>
          Скачать PDF
        </Button>
      </StyledFooter>*/}
    </StyledDrawer>
  );
}

CvInformation.propTypes = {
  visible: PropTypes.bool,
  resumeId: PropTypes.number,
  cvInfo: PropTypes.shape({
    cvInformation: PropTypes.object
  }),
  onCvInformationClose: PropTypes.func
};

CvInformation.defaultProps = {
  visible: false,
  resumeId: 0,
  cvInfo: {
    cvInformation: {
      salary: 0,
      displayName: "displayName",
      surname: "surname",
      name: "name"
    }
  },
  onCvInformationClose: () => {}
};

export default CvInformation;
