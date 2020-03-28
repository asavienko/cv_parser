import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CvInformation from "../../views/CvInformation";
import CvTable from "../../views/CvTable";
import {
  setFavoriteListAction,
  setRawListAction
} from "../../actions/cvActions";
import EditFavoriteListButton from "../../views/EditFavoriteListButton";
import openNotification from "../../views/NotificationComponent";
import { getCvByRequest } from "../../services/cvRequests";

function CvListContainer({
  rawList,
  setRawList,
  favoriteCvList,
  setFavoriteList
}) {
  const [displayedCvList, setDisplayedCvList] = useState([]);
  const [cvInfo, setCvInfo] = useState({ visible: false, cvInformation: {} });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 20,
    pageSize: 20,
    current: 1
  });

  const [filters, setFilters] = useState({
    keywords: "",
    period: 6,
    searchType: "everywhere",
    sort: "date",
    pg: 1
  });

  const newRequest = useCallback(
    (newFilters = {}) => {
      setLoading(true);
      getCvByRequest(newFilters)
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
    newFilters
  }) =>
    rawListFromStore.length &&
    rawList.find(obj => obj.filters.pg === newFilters.pg);

  const [renderCounter, setRenderCounter] = useState(0);

  useEffect(() => {
    if (!renderCounter && !rawList.length) {
      newRequest();
      setRenderCounter(1);
    }
  }, [rawList, newRequest]);

  const handleChange = newPagination => {
    const newFilters = { ...filters, pg: newPagination.current };
    setPagination(newPagination);
    setFilters(newFilters);
    const foundResult = findTheSameRawListInStore({ rawList, newFilters });
    return foundResult
      ? setDisplayedCvList(foundResult.documents)
      : newRequest(newFilters);
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
  const onAddToFavoriteButtonClick = () => {
    addToFavoriteActive ? saveFavoriteList() : editFavoriteList();
  };
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
      <EditFavoriteListButton
        addToFavoriteDisabled={addToFavoriteDisabled}
        addToFavoriteActive={addToFavoriteActive}
        cvCounts={selectedRowKeys.length}
        onPrimaryClick={onAddToFavoriteButtonClick}
        onCancelClick={cancelAddingToFavorite}
      />
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
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CvListContainer);
