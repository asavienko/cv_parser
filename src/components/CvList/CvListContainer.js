import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import CvInformation from "../../views/CvInformation";
import CvTable from "../../views/CvTable";
import {
  setFavoriteListAction,
  setRawListAction
} from "../../actions/cvActions";
import EditFavoriteListButton from "../../views/EditFavoriteListButton";
import openNotification from "../../views/NotificationComponent";
import { getCvByRequest } from "../../services/cvRequests";
import { defaultFilterParamsForCvList } from "../../constants/filters";
import FiltersSet from "./FiltersSet/FiltersSet";
import { preventEmptyValues } from "../../utils/index";

const CvListContainer = ({
  rawList,
  setRawList,
  favoriteCvList,
  setFavoriteList
}) => {
  const [displayedCvList, setDisplayedCvList] = useState([]);
  const [cvInfo, setCvInfo] = useState({ visible: false, cvInformation: {} });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(defaultFilterParamsForCvList);
  const [renderCounter, setRenderCounter] = useState(0);
  const [pagination, setPagination] = useState({
    total: 20,
    pageSize: 20,
    current: 1
  });

  const newRequest = useCallback(
    (newFilters = {}) => {
      setLoading(true);
      getCvByRequest(preventEmptyValues(newFilters))
        .then((response = {}) => {
          const { Documents, Total, Raw } = response;
          const { Count } = JSON.parse(Raw);
          setPagination(prevState => ({
            ...prevState,
            total: Total,
            pageSize: Count
          }));
          setDisplayedCvList(Documents);
          setRawList([
            ...rawList,
            { filters: { ...filters, ...newFilters }, documents: Documents }
          ]);
        })
        .catch(() =>
          openNotification({
            type: "error",
            message: "Не удалось загрузить данные"
          })
        )
        .finally(() => {
          setLoading(false);
        });
    },
    [filters, rawList, setRawList]
  );

  const findTheSameRawListInStore = ({
    rawList: rawListFromStore = [],
    filters: currentFilters
  }) =>
    rawListFromStore.length &&
    rawListFromStore.find(obj => obj.filters.pg === currentFilters.pg);

  useEffect(() => {
    if (!renderCounter && !rawList.length) {
      newRequest(filters);
      setRenderCounter(1);
      return;
    }
    if (!renderCounter && rawList.length) {
      const foundResult = findTheSameRawListInStore({
        rawList,
        filters
      });
      foundResult
        ? setDisplayedCvList(foundResult.documents)
        : newRequest(filters);
    }
  }, [rawList, newRequest, filters, renderCounter]);

  const handleChange = newPagination => {
    const currentFilters = { ...filters, pg: newPagination.current };
    setPagination(newPagination);
    setFilters(currentFilters);
    const foundResult = findTheSameRawListInStore({
      rawList,
      filters: currentFilters
    });
    return foundResult
      ? setDisplayedCvList(foundResult.documents)
      : newRequest(currentFilters);
  };

  const onRow = record => ({
    onClick: () => setCvInfo({ visible: true, cvInformation: record })
  });

  const onCvInformationClose = () =>
    setCvInfo({ visible: false, cvInformation: {} });

  const [addToFavoriteActive, setAddToFavoriteActive] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const saveFavoriteList = () => {
    const selectedCvList = selectedRowKeys.map(key =>
      rawList.find(cv => cv.key === key)
    );
    setFavoriteList(selectedCvList);
    setAddToFavoriteActive(false);
  };
  const editFavoriteList = () => {
    const favoriteKeys = favoriteCvList.map(cv => cv.key);
    setSelectedRowKeys(favoriteKeys);
    setAddToFavoriteActive(true);
  };
  const onAddToFavoriteButtonClick = () =>
    addToFavoriteActive ? saveFavoriteList() : editFavoriteList();
  const cancelAddingToFavorite = () => {
    setAddToFavoriteActive(false);
    setSelectedRowKeys([]);
  };
  const onSelectChange = value => {
    setSelectedRowKeys(value);
  };

  const rowSelectionConfig = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const addToFavoriteDisabled =
    loading || (selectedRowKeys.length === 0 && addToFavoriteActive);

  const rowSelection = addToFavoriteActive ? rowSelectionConfig : null;
  return (
    <>
      <Row align={"space-between"}>
        <Col>
          <EditFavoriteListButton
            addToFavoriteDisabled={addToFavoriteDisabled}
            addToFavoriteActive={addToFavoriteActive}
            cvCounts={selectedRowKeys.length}
            onPrimaryClick={onAddToFavoriteButtonClick}
            onCancelClick={cancelAddingToFavorite}
          />
        </Col>
        <FiltersSet />
      </Row>
      <CvTable
        cvData={displayedCvList}
        loading={loading}
        onRow={onRow}
        handleChange={handleChange}
        rowSelection={rowSelection}
        pagination={pagination}
      />
      <CvInformation
        cvInfo={cvInfo}
        onCvInformationClose={onCvInformationClose}
      />
    </>
  );
};

CvListContainer.propTypes = {
  rawList: PropTypes.arrayOf(PropTypes.object),
  favoriteCvList: PropTypes.arrayOf(PropTypes.object),
  setRawList: PropTypes.func,
  setFavoriteList: PropTypes.func
};

CvListContainer.defaultProps = {
  rawList: [],
  favoriteCvList: [],
  setRawList: () => {},
  setFavoriteList: () => {}
};

const mapStateToProps = ({ cvReducer: { favoriteCvList, rawList } }) => ({
  favoriteCvList,
  rawList
});

const mapDispatchToProps = dispatch => ({
  setRawList: rawList => dispatch(setRawListAction(rawList)),
  setFavoriteList: favoriteList => dispatch(setFavoriteListAction(favoriteList))
});

export default connect(mapStateToProps, mapDispatchToProps)(CvListContainer);
