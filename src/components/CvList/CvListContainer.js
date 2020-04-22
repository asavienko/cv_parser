import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import CvInformation from "../../views/CvInformation";
import CvTable from "../../views/CvTable";
import {
  setFiltersAction,
  setPaginationAction,
  setRawListAction
} from "../../actions/cvActions";
import openNotification from "../../views/NotificationComponent";
import { getCvByRequest } from "../../services/cvRequests";
import FiltersSet from "./FiltersSet/FiltersSet";
import { preventEmptyValues } from "../../utils/index";

const CvListContainer = ({
  rawList,
  setRawList,
  pagination,
  setPagination,
  filters,
  setFilters
}) => {
  const [displayedCvList, setDisplayedCvList] = useState([]);
  const [cvInfoVisible, setCvInfoVisible] = useState(false);
  const [resumeId, setResumeId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [renderCounter, setRenderCounter] = useState(0);

  const newRequest = useCallback(
    (newFilters = {}) => {
      setLoading(true);
      getCvByRequest(preventEmptyValues(newFilters))
        .then((response = {}) => {
          const { Documents, Total, Raw } = response;
          const { Count } = JSON.parse(Raw);
          let newPagination;

          setPagination(state => {
            newPagination = {
              ...state,
              current: newFilters.pg,
              total: Total,
              pageSize: Count
            };
            return newPagination;
          });
          setPagination(newPagination);

          setFilters(newFilters);
          setDisplayedCvList(Documents);
          setRawList([
            ...rawList,
            {
              filters: { ...filters, ...newFilters },
              documents: Documents
            }
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
        ? setDisplayedCvList(foundResult.documents) ||
          setFilters(filters) ||
          setPagination(pagination)
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
      ? setDisplayedCvList(foundResult.documents) ||
          setFilters(filters) ||
          setPagination(pagination)
      : newRequest(currentFilters);
  };

  const onRow = ({ ResumeId: resumeIdFromRow }) => ({
    onClick: () => {
      setCvInfoVisible(true);
      setResumeId(resumeIdFromRow);
    }
  });

  const onCvInformationClose = () => setCvInfoVisible(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = value => {
    setSelectedRowKeys(value);
  };

  const rowSelectionConfig = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <>
      <Row justify="space-between">
        <Col span={4}></Col>
        <Col span={20}>
          <FiltersSet
            disabled={loading}
            requestToServer={newRequest}
            setFilters={setFilters}
          />
        </Col>
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
        visible={cvInfoVisible}
        onCvInformationClose={onCvInformationClose}
        resumeId={resumeId}
      />
    </>
  );
};

CvListContainer.propTypes = {
  rawList: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.objectOf(PropTypes.number),
  filters: PropTypes.objectOf(PropTypes.string, PropTypes.number),
  setRawList: PropTypes.func,
  setPagination: PropTypes.func,
  setFiltersAction: PropTypes.func
};

CvListContainer.defaultProps = {
  rawList: [],
  pagination: {},
  filters: {},
  setRawList: () => {},
  setPagination: () => {},
  setFiltersAction: () => {}
};

const mapStateToProps = ({ cvReducer: { rawList, pagination, filters } }) => ({
  rawList,
  pagination,
  filters
});

const mapDispatchToProps = dispatch => ({
  setRawList: rawList => dispatch(setRawListAction(rawList)),
  setPagination: pagination => dispatch(setPaginationAction(pagination)),
  setFilters: filters => dispatch(setFiltersAction(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(CvListContainer);
