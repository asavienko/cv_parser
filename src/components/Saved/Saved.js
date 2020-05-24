import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as numeral from "numeral";
import PropTypes from "prop-types";
import CvTable from "../../views/CvTable";
import SaveResultsButton from "../CvList/SaveResults/SaveResultsButton";
import CvInformation from "../../views/CvInformation";
import { setSavedListAction } from "../../actions/cvActions";

function Saved({ savedCvList, setSavedList }) {
  const [saveActive, setSaveActive] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);
  const [salaryFilterRange, setSalaryFilterRange] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [cvInfo, setCvInfo] = useState({ visible: false, cvInformation: {} });
  // const [cvData, setCvList] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  useEffect(() => {
    if (savedCvList.length) {
      const salary = savedCvList.map(({ salary: fromList }) =>
        numeral(fromList).value()
      );
      const min = Math.min(...salary);
      const max = Math.max(...salary);
      setSalaryFilterRange([min, max]);
      setSalaryRange([min, max]);
    }
  }, [savedCvList]);
  const onRow = record => ({
    onClick: () => setCvInfo({ visible: true, cvInformation: record })
  });

  const onCvInformationClose = () =>
    setCvInfo({ visible: false, cvInformation: {} });
  const onSalaryRangeChange = range => {
    setSalaryRange(range);
  };
  const onSalaryRangeSet = () => {
    /* const [min, max] = salaryRange;
  const filteredArray = savedCvList.filter(({ salary }) => {
     return numeral(salary).value() >= min && numeral(salary).value() <= max;
   });
   setCvList(filteredArray);
 */
  };

  const onSalaryRangeReset = () => {
    // setCvList(savedCvList);
    setSalaryRange(salaryFilterRange);
  };
  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
    /*
    todo use in request to api
    setSortedInfo(sorter);
    */
  };
  /*
  const saveResultsList = () => {
    const editedCvList = savedCvList.filter(cv => {
      const hasSelectedKey = selectedRowKeys.some(key => cv.key === key);
      return !hasSelectedKey;
    });
    setSelectedRowKeys([]);
    setSavedList(editedCvList);
    setSaveActive(false);
  };
  */
  const editSavedList = () => {
    setSaveActive(true);
  };
  const onAddSaveButtonClick = () => {
    saveActive ? setSavedList() : editSavedList();
  };
  const cancelSaving = () => {
    setSaveActive(false);
    setSelectedRowKeys([]);
  };
  const onSelectChange = value => {
    setSelectedRowKeys(value);
  };
  const rowSelectionConfig = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const saveDisabled = selectedRowKeys.length === 0 && saveActive;
  // loading || (selectedRowKeys.length === 0 && saveActive);

  const rowSelection = saveActive && rowSelectionConfig;
  return (
    <>
      <SaveResultsButton
        saveDisabled={saveDisabled}
        saveActive={saveActive}
        cvCounts={selectedRowKeys.length}
        onStartSelectClick={onAddSaveButtonClick}
        onCancelClick={cancelSaving}
        type="danger"
        buttonName="Удалить"
        mainButtonText="Удалить"
      />
      <CvTable
        cvData={savedCvList}
        salaryFilterRange={salaryFilterRange}
        onSalaryRangeSet={onSalaryRangeSet}
        onSalaryRangeReset={onSalaryRangeReset}
        onSalaryRangeChange={onSalaryRangeChange}
        salaryRange={salaryRange}
        // loading={loading}
        onRow={onRow}
        handleChange={handleChange}
        rowSelection={rowSelection}
        filteredInfo={filteredInfo}
      />
      <CvInformation
        cvInfo={cvInfo}
        onCvInformationClose={onCvInformationClose}
      />
    </>
  );
}

Saved.propTypes = {
  savedCvList: PropTypes.arrayOf(PropTypes.object),
  setSavedList: PropTypes.func
};

Saved.defaultProps = {
  savedCvList: [],
  setSavedList: () => {}
};

const mapStateToProps = ({ cvReducer: { savedCvList } }) => ({
  savedCvList
});

const mapDispatchToProps = dispatch => ({
  setSavedList: savedList => dispatch(setSavedListAction(savedList))
});

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
