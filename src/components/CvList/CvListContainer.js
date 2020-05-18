import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, message, Popconfirm, Row } from "antd";
import CvInformation from "../../views/CvInformation";
import CvTable from "../../views/CvTable";
import {
  setFiltersAction,
  setPaginationAction,
  setRawListAction
} from "../../actions/cvActions";
import openNotification from "../../views/NotificationComponent";
import { createCvList, getCvByRequest } from "../../services/cvRequests";
import FiltersSet from "./FiltersSet";
import { convertFiltersForRequest } from "../../utils/index";
import { DEFAULT_FILTERS } from "../../constants/filters";
import SaveResults from "./SaveResults/SaveResults";

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
    (newFilters = {}, mergeExistedStore = true) => {
      setLoading(true);
      getCvByRequest({
        ...convertFiltersForRequest(DEFAULT_FILTERS),
        ...convertFiltersForRequest(newFilters)
      })
        .then((response = {}) => {
          const { Documents: documents, Total: total } = response;
          const newPagination = {
            current: newFilters.pg || 1,
            total,
            pageSize: documents.length
          };

          setPagination(newPagination);
          setDisplayedCvList(documents);
          setRawList([
            ...(mergeExistedStore ? [...rawList] : []),
            {
              pagination: newPagination,
              documents
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
    [rawList, setRawList, setPagination]
  );

  const findTheSameRawListInStore = ({
    rawList: rawListFromStore = [],
    page
  }) =>
    rawListFromStore.length &&
    rawListFromStore.find(
      ({ pagination: { current } = {} }) => current === page
    );

  useEffect(() => {
    if (!renderCounter && !rawList.length) {
      newRequest(filters);
      setRenderCounter(1);
      return;
    }
    if (!renderCounter && rawList.length) {
      const foundResult = findTheSameRawListInStore({
        rawList,
        page: pagination.current
      });
      foundResult
        ? setDisplayedCvList(foundResult.documents) || setPagination(pagination)
        : newRequest(filters);
    }
  }, [filters, pagination, setPagination, rawList, newRequest, renderCounter]);

  const handleChange = newPagination => {
    const currentFilters = { ...filters, pg: newPagination.current };
    setPagination(newPagination);
    setFilters(currentFilters);
    const foundResult = findTheSameRawListInStore({
      rawList,
      page: newPagination.current
    });
    return foundResult
      ? setDisplayedCvList(foundResult.documents)
      : newRequest(currentFilters);
  };

  const lookResume = resumeIdFromRow => {
    setCvInfoVisible(!cvInfoVisible);
    setResumeId(resumeIdFromRow);
  };

  const onCvInformationClose = () => setCvInfoVisible(!cvInfoVisible);

  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelection, setRowSelection] = useState(undefined);
  const rowSelectionConfig = {
    onChange: (selectedRowKeys, selectedRowsFromTable) => {
      setSelectedRows(selectedRowsFromTable);
    }
  };
  const handleRowSelectionChange = (set = false) => {
    set
      ? setRowSelection(rowSelectionConfig)
      : setRowSelection(undefined) || setSelectedRows([]);
  };

  const [popconfirmVisible, setPopconfirmVisible] = useState(false);
  const onSave = () => {
    setPopconfirmVisible(true);
  };
  const cancelPopconfirm = () => {
    setPopconfirmVisible(false);
  };
  const [idState, setIdSate] = useState("");
  const confirmPopconfirm = () => {
    setPopconfirmVisible(false);
    const key = "loadingData";
    message.loading({ content: "Загрузка...", key });
    createCvList({
      selectedRows,
      filters: convertFiltersForRequest(filters)
    })
      .then(res => {
        !idState && setIdSate(res);
        setRowSelection(undefined);
        setSelectedRows([]);
        message.success({ content: "Сохранено!", key, duration: 3 });
      })
      .catch(() => {
        message.error({ content: "Что-то пошло не так", key, duration: 3 });
      });
  };

  return (
    <>
      <Row justify="space-between">
        <Col span={4}>
          <SaveResults
            loading={loading}
            handleRowSelectionChange={handleRowSelectionChange}
            selectedResultsNumber={selectedRows.length}
            onSave={onSave}
            rowSelection={!!rowSelection}
          />

          <Popconfirm
            title={`Подтвердите сохранение ${selectedRows.length} резюме.`}
            placement="bottomLeft"
            visible={popconfirmVisible}
            onConfirm={confirmPopconfirm}
            onCancel={cancelPopconfirm}
            okText="Да"
            cancelText="Отмена"
          />
        </Col>
        <Col span={20}>
          <FiltersSet disabled={loading} requestToServer={newRequest} />
        </Col>
      </Row>
      <CvTable
        cvData={displayedCvList}
        loading={loading}
        lookResume={lookResume}
        handleChange={handleChange}
        pagination={pagination}
        rowSelection={rowSelection}
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
  filters: PropTypes.shape({
    keywords: PropTypes.string,
    searchType: PropTypes.string,
    sort: PropTypes.string,
    period: PropTypes.number,
    pg: PropTypes.number,
    salaryFrom: PropTypes.number,
    salaryTo: PropTypes.number,
    ageFrom: PropTypes.number,
    ageTo: PropTypes.number,
    salarySlider: PropTypes.array,
    ageSlider: PropTypes.array
  }),
  setRawList: PropTypes.func,
  setPagination: PropTypes.func,
  setFilters: PropTypes.func
};

CvListContainer.defaultProps = {
  rawList: [],
  pagination: {},
  filters: {},
  setRawList: () => {},
  setPagination: () => {},
  setFilters: () => {}
};

const mapStateToProps = ({ cvReducer: { rawList, pagination, filters } }) => ({
  rawList,
  pagination,
  filters
});

const mapDispatchToProps = dispatch => ({
  setRawList: newList => dispatch(setRawListAction(newList)),
  setPagination: pagination => dispatch(setPaginationAction(pagination)),
  setFilters: filters => dispatch(setFiltersAction(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(CvListContainer);
