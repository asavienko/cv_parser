import React, { useEffect, useState } from "react";
import { Input, Modal, Select } from "antd";
import { connect } from "react-redux";
import { setDictionaryCityAction } from "../../actions/cvActions";
import styled from "styled-components";

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
    regionid: 0,
    keywords: ""
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (!dictionaryCity.length) {
      fetch("/dictionary_city")
        .then(res => res.json())
        .then(json => {
          if (json.confirmation === "success") {
            setDictionaryCity(json.data);
          } else if (json.confirmation === "fail") {
            throw new Error();
          }
        })
        .catch(err => console.log(err));
    }
  }, [dictionaryCity, setDictionaryCity]);

  const onSelectFilter = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const onSelectChange = value => {
    const editedSearchRequest = searchRequest;
    editedSearchRequest.regionid = value;
    setSearchRequest(editedSearchRequest);
  };
  const onSearchPressed = searchValue => {
    const editedSearchRequest = searchRequest;
    editedSearchRequest.keywords = searchValue;
    setSearchRequest(editedSearchRequest);
    console.log(searchRequest);
    setModalLoading(true);
    setModalVisible(true);
    fetch("/cv_preparse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchRequest)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setModalData(json);
        setModalLoading(false);
      })
      .catch(err => console.log(err));
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

      <Modal
        title="Basic Modal"
        visible={modalVisible}
        onCancel={handleModalCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
