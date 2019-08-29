import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { connect } from "react-redux";
import { setDictionaryCityAction } from "../../actions/cvActions";
import styled from "styled-components";
import { getRequest } from "../../services/CvServices";
import openNotification from "../ReusableComponents/Notification";
import SearchModal from "./SearchModal";

const { Search } = Input;
const { Option } = Select;

const StyledSelect = styled(Select)`
  width: 150px;
`;
const StyledSearch = styled(Search)`
  padding: 15px;
`;

function Home({ dictionaryCity, setDictionaryCity }) {
  const [searchRequest, setSearchRequest] = useState({
    regionId: 0,
    keywords: ""
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

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
        setModalData(response.data);
      } else {
        throw new Error();
      }
    } catch {
      openNotification({
        type: "error",
        message: "Не получить общее количство резюме"
      });
    }
    setModalLoading(false);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
    setModalLoading(false);
    setModalData({});
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
