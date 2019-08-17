import React, { useEffect, useState } from "react";
import * as numeral from "numeral";
import { CvInformation } from "./CvInformation";
import { CvTable } from "../ReusableComponents/CvTable";
import { connect } from "react-redux";
import { setFavoriteList } from "../../actions/cvActions";
import { EditFavoriteListButton } from "../ReusableComponents/Buttons";

function CvList({
  rawList,
  fetchCvList,
  loading,
  setFavorites,
  favorites,
  favoriteCvList,
  setFavoriteList
}) {
  const [cvList, setCvList] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  /*
  todo use in request to api
  const [sortedInfo, setSortedInfo] = useState({});
  */
  const [salaryFilterRange, setSalaryFilterRange] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);
  const [cvInfo, setCvInfo] = useState({ visible: false, cvInformation: {} });

  useEffect(() => {
    (async function() {
      let cvList = rawList.length > 0 && rawList;
      if (!cvList) {
        cvList = await fetchCvList();
      }
      setCvList(cvList);
      if (rawList && rawList.length) {
        const salary = rawList.map(({ salary }) => numeral(salary).value());
        const min = Math.min(...salary);
        const max = Math.max(...salary);
        setSalaryFilterRange([min, max]);
        setSalaryRange([min, max]);
      }
    })();
  }, [rawList, fetchCvList]);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    /*
    todo use in request to api
    setSortedInfo(sorter);
    */
  };

  const onRow = record => ({
    onClick: () => setCvInfo({ visible: true, cvInformation: record })
  });

  const onCvInformationClose = () =>
    setCvInfo({ visible: false, cvInformation: {} });
  const onSalaryRangeChange = range => {
    setSalaryRange(range);
  };
  const onSalaryRangeSet = () => {
    const [min, max] = salaryRange;
    const filteredArray = rawList.filter(({ salary }) => {
      return numeral(salary).value() >= min && numeral(salary).value() <= max;
    });
    setCvList(filteredArray);
  };
  const onSalaryRangeReset = () => {
    setCvList(rawList);
    setSalaryRange(salaryFilterRange);
  };
  const [addToFavoriteActive, setAddToFavoriteActive] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const saveFavoriteList = () => {
    let selectedCvList = selectedRowKeys.map(key =>
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

  const rowSelection = addToFavoriteActive && rowSelectionConfig;
  return (
    <React.Fragment>
      <EditFavoriteListButton
        addToFavoriteDisabled={addToFavoriteDisabled}
        addToFavoriteActive={addToFavoriteActive}
        cvCounts={selectedRowKeys.length}
        onPrimaryClick={onAddToFavoriteButtonClick}
        onCancelClick={cancelAddingToFavorite}
      />
      <CvTable
        filteredInfo={filteredInfo}
        salaryFilterRange={salaryFilterRange}
        onSalaryRangeSet={onSalaryRangeSet}
        onSalaryRangeReset={onSalaryRangeReset}
        onSalaryRangeChange={onSalaryRangeChange}
        salaryRange={salaryRange}
        loading={loading}
        onRow={onRow}
        cvList={cvList}
        handleChange={handleChange}
        rowSelection={rowSelection}
      />
      <CvInformation
        cvInfo={cvInfo}
        onCvInformationClose={onCvInformationClose}
      />
    </React.Fragment>
  );
}

const mapStateToProps = ({ cvReducer: { favoriteCvList } }) => ({
  favoriteCvList
});

const mapDispatchToProps = dispatch => ({
  setFavoriteList: favoriteList => dispatch(setFavoriteList(favoriteList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CvList);
