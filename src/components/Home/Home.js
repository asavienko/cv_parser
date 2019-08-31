import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { connect } from "react-redux";
import { setDictionaryCityAction } from "../../actions/cvActions";
import styled from "styled-components";
import { getRequest } from "../../services/fetchUtils";
import openNotification from "../ReusableComponents/Notification";
import SearchModal from "./SearchModal";
import InformationModal from "../ReusableComponents/InformationModal";
import { StyledBoldSpan } from "../ReusableComponents/StyledComponents";
import getTotalCv from "../../services/cvRequests";

const { Search } = Input;
const { Option } = Select;

const StyledSelect = styled(Select)`
  width: 150px;
`;
const StyledSearch = styled(Search)`
  padding: 15px;
`;

function Home({ dictionaryCity, setDictionaryCity }) {
  const modalBasicData = { totalCv: 0 };
  const [searchRequest, setSearchRequest] = useState({
    regionId: 0,
    keywords: ""
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(modalBasicData);
  const [okButtonLoading, setOkButtonLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!dictionaryCity.length) {
        try {
          const response = await getRequest("/dictionary-city");
          if (response.confirmation === "success") {
            setDictionaryCity(response.data);
          } else {
            throw new Error();
          }
        } catch {
          openNotification({
            type: "error",
            message: "Не удалось загрузить списко городов"
          });
        }
      }
    })();
  }, [dictionaryCity, setDictionaryCity]);

  const onSelectFilter = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const onSelectChange = value => {
    const editedSearchRequest = searchRequest;
    editedSearchRequest.regionId = value;
    setSearchRequest(editedSearchRequest);
  };
  const onSearchPressed = async searchValue => {
    const editedSearchRequest = searchRequest;
    editedSearchRequest.keywords = searchValue;
    setSearchRequest(editedSearchRequest);
    setModalLoading(true);
    setModalVisible(true);
    try {
      const response = await getRequest(
        `/total-cvs?regionid=${searchRequest.regionId}&keywords=${
          searchRequest.keywords
        }`
      );
      if (response.confirmation === "success") {
        const editedModalDate = modalData;
        editedModalDate.totalCv = response.data;
        setModalData(editedModalDate);
      } else {
        throw new Error();
      }
    } catch {
      openNotification({
        type: "error",
        message: "Не удалось получить общее количство резюме"
      });
    }
    setModalLoading(false);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
    setModalLoading(false);
    setModalData(modalBasicData);
  };
  const handleModalOk = async () => {
    try {
      setOkButtonLoading(true);
      const response = await getTotalCv(searchRequest);
      setModalVisible(false);
      if (response.confirmation === "success") {
        InformationModal({
          type: "info",
          title: "Вы начали сканировать резюме",
          content: (
            <div>
              <p>
                Это займет окколо{" "}
                <StyledBoldSpan>{response.minutes}мин.</StyledBoldSpan>
              </p>
              <p>Вы можете посмотреть уже отсканированные резюме в списке</p>
              <p>
                Когда будут отсканированны все резюме вы получите уведомление
              </p>
            </div>
          )
        });
      } else {
        throw new Error();
      }
    } catch (e) {
      setModalVisible(false);
      InformationModal({
        type: "error",
        title: "Что то пошло не так :(",
        content: (
          <div>
            Повторите попытку позже. Если ошибка повторится, обратитесь к
            системному администратору
          </div>
        )
      });
    }
    setOkButtonLoading(false);
  };
  return (
    <React.Fragment>
      <StyledSearch
        placeholder="Введите ключивые слова"
        onSearch={onSearchPressed}
        enterButton
        size="large"
        addonBefore={
          <StyledSelect
            defaultValue={0}
            showSearch
            filterOption={onSelectFilter}
            onChange={onSelectChange}
          >
            <Option value={0} key={0}>
              Вся Украина
            </Option>
            {dictionaryCity.map(record => (
              <Option value={record.id} key={record.id}>
                {record.ru}
              </Option>
            ))}
          </StyledSelect>
        }
      />
      <SearchModal
        handleModalCancel={handleModalCancel}
        modalVisible={modalVisible}
        modalData={modalData}
        modalLoading={modalLoading}
        handleModalOk={handleModalOk}
        okButtonLoading={okButtonLoading}
      />
    </React.Fragment>
  );
}

const mapStateToProps = ({ cvReducer: { dictionaryCity } }) => ({
  dictionaryCity
});

const mapDispatchToProps = dispatch => ({
  setDictionaryCity: dictionaryCity =>
    dispatch(setDictionaryCityAction(dictionaryCity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
