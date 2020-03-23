import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setDictionaryCityAction } from "../../actions/cvActions";
import openNotification from "../../views/NotificationComponent";
import SearchModal from "./SearchModal/SearchModal";
import InformationModal from "./SearchModal/InformationModal";
import { StyledBoldSpan } from "../../styles";
import { getTotalCv } from "../../services/cvRequests";
import Home from "./Home";
import { getCityDictionary } from "../../services/dictionaryService";

function HomeContainer({ dictionaryCity, setDictionaryCity }) {
  const modalBasicData = { totalCv: 0 };
  const [searchRequest, setSearchRequest] = useState({
    regionId: 0,
    keywords: ""
  });
  const [loadingSites, setLoadingSites] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(modalBasicData);
  const [okButtonLoading, setOkButtonLoading] = useState(false);

  useEffect(() => {
    if (!dictionaryCity.length) {
      setLoadingSites(true);
      getCityDictionary()
        .then(response => {
          setLoadingSites(false);
          response.length && setDictionaryCity(response);
        })
        .catch(() => {
          setLoadingSites(false);
          openNotification({
            type: "error",
            message: "Не удалось загрузить списко городов"
          });
        });
    }
  }, [dictionaryCity, setDictionaryCity]);

  const onSelectFilter = (input, option) =>
    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;

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
      const response = await getTotalCv(searchRequest);
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
        return InformationModal({
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
      }
      throw Error();
    } catch {
      openNotification({
        type: "error",
        title: "Что то пошло не так",
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
      <Home
        onSearchPressed={onSearchPressed}
        onSelectFilter={onSelectFilter}
        onSelectChange={onSelectChange}
        dictionaryCity={dictionaryCity}
        loadingSites={loadingSites}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
