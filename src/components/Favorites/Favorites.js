import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CvTable from "../../views/CvTable";
import EditFavoriteListButton from "../../views/EditFavoriteListButton";
import * as numeral from "numeral";
import CvInformation from "../../views/CvInformation";
import { setFavoriteListAction } from "../../actions/cvActions";

function Favorites({ favoriteCvList, setFavoriteList }) {
  const [addToFavoriteActive, setAddToFavoriteActive] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);
  const [salaryFilterRange, setSalaryFilterRange] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cvInfo, setCvInfo] = useState({ visible: false, cvInformation: {} });
  const [cvList, setCvList] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  useEffect(() => {
    if (favoriteCvList.length) {
      const salary = favoriteCvList.map(({ salary }) =>
        numeral(salary).value()
      );
      const min = Math.min(...salary);
      const max = Math.max(...salary);
      setSalaryFilterRange([min, max]);
      setSalaryRange([min, max]);
    }
  }, [favoriteCvList]);
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
    const filteredArray = favoriteCvList.filter(({ salary }) => {
      return numeral(salary).value() >= min && numeral(salary).value() <= max;
    });
    setCvList(filteredArray);
  };

  const onSalaryRangeReset = () => {
    setCvList(favoriteCvList);
    setSalaryRange(salaryFilterRange);
  };
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    /*
    todo use in request to api
    setSortedInfo(sorter);
    */
  };
  const saveFavoriteList = () => {
    let editedCvList = favoriteCvList.filter(cv => {
      const hasSelectedKey = selectedRowKeys.some(key => cv.key === key);
      return !hasSelectedKey;
    });
    setSelectedRowKeys([]);
    setFavoriteList(editedCvList);
    setAddToFavoriteActive(false);
  };
  const editFavoriteList = () => {
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
        type="danger"
        buttonName="Удалить"
        mainButtonText="Удалить"
      />
      <CvTable
        cvList={favoriteCvList}
        salaryFilterRange={salaryFilterRange}
        onSalaryRangeSet={onSalaryRangeSet}
        onSalaryRangeReset={onSalaryRangeReset}
        onSalaryRangeChange={onSalaryRangeChange}
        salaryRange={salaryRange}
        loading={loading}
        onRow={onRow}
        handleChange={handleChange}
        rowSelection={rowSelection}
        filteredInfo={filteredInfo}
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
  setFavoriteList: favoriteList => dispatch(setFavoriteListAction(favoriteList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
