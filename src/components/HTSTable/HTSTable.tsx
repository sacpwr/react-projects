import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Style from "./HTSTable.module.css";
import Chance from "chance";

const chance = new Chance();

export default function HTSTable() {
  enum headerStateEnum {
    "default",
    "up",
    "down",
  }

  const defaultHeaderState = {
    id: headerStateEnum.default,
    cell1: headerStateEnum.default,
    cell2: headerStateEnum.default,
    cell3: headerStateEnum.default,
    cell4: headerStateEnum.default,
    cell5: headerStateEnum.default,
  };

  const [searchText, setSearchText] = useState("");
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [tableHeaderState, setTableHeaderState] = useState(defaultHeaderState);

  const generateData = (count) => {
    return Array.from(Array(count).keys()).map((k, i) => {
      return {
        id: i + 1,
        cell1: chance.word(),
        cell2: chance.word(),
        cell3: chance.word(),
        cell4: chance.word(),
        cell5: chance.word(),
      };
    });
  };
  const [records, setRecords] = useState(generateData(40));

  const [filterRecords, setFilterRecords] = useState([] as Array<object>);

  useEffect(() => {
    const filteredRecords = [] as Array<object>;
    if (searchText) {
      records.forEach((record) => {
        const rowStr = `${record.id}${record.cell1}${record.cell2} ${record.cell3}${record.cell4}${record.cell5}`;
        if (rowStr.includes(searchText)) {
          filteredRecords.push(record);
        }
      });
      setIsDataFiltered(true);
    } else {
      setIsDataFiltered(false);
    }
    setFilterRecords(filteredRecords);
    setTableHeaderState((tableHeaderState) => {
      tableHeaderState = defaultHeaderState;
      return tableHeaderState;
    });
    setPaginationNumber(1);
  }, [searchText]);

  useEffect(() => {
    const maxPageNumber = getMaxPageNumber();
    if (maxPageNumber < activePage) {
      setActivePage(maxPageNumber);
    }
  }, [records, filterRecords]);

  const clearSearchText = () => {
    setSearchText("");
  };

  const handlePageSize = (e) => {
    const maxPageNumber = getMaxPageNumber(e.target.value);
    if (maxPageNumber < activePage) {
      setActivePage(maxPageNumber);
    }
    setPageSize(e.target.value);
  };

  const getMaxPageNumber = (pageSizePar?: number) => {
    const div = String(
      (isDataFiltered ? filterRecords : records).length /
        (pageSizePar ?? pageSize)
    );
    const isFloat = div.includes(".");
    return isFloat ? parseInt(div) + 1 : Number(div) == 0 ? 1 : Number(div);
  };

  const getPaginationItems = () => {
    let pageNumberToShow = [];
    const items = [];
    const maxPageNumber = getMaxPageNumber();
    if (activePage < 3) {
      if (maxPageNumber < 3) {
        pageNumberToShow = [
          ...Array.from(Array(maxPageNumber).keys()).map((e) => e + 1),
        ];
      } else {
        pageNumberToShow = [1, 2, 3];
      }
    } else if (activePage > maxPageNumber - 2) {
      pageNumberToShow = [maxPageNumber - 2, maxPageNumber - 1, maxPageNumber];
    } else {
      pageNumberToShow = [activePage - 1, activePage, activePage + 1];
    }
    for (let i = 0; i < pageNumberToShow.length; i++) {
      items.push(
        <li className="page-item" key={pageNumberToShow[i]}>
          <a
            className={`page-link ${Style.pageLinkColor} ${
              activePage == pageNumberToShow[i] ? Style.activePageNumber : ""
            }`}
            onClick={() => setPaginationNumber(pageNumberToShow[i])}
          >
            {pageNumberToShow[i]}
          </a>
        </li>
      );
    }
    return items;
  };

  const handlePaginationNext = () => {
    const maxPageNumber = getMaxPageNumber();
    if (activePage == maxPageNumber) {
      return;
    }
    setActivePage(activePage + 1);
  };

  const handlePaginationPrevious = () => {
    if (activePage == 1) {
      return;
    }
    setActivePage(activePage - 1);
  };

  const setPaginationNumber = (pageNum) => setActivePage(pageNum);

  const handleHeaderClick = (headerName) => {
    setIsDataFiltered(true);
    let newData = [];
    if (
      tableHeaderState[headerName] == headerStateEnum.default ||
      tableHeaderState[headerName] == headerStateEnum.down
    ) {
      newData = [...records].sort((a, b) =>
        a[headerName] > b[headerName] ? 1 : -1
      );
      setTableHeaderState((tableHeaderState) => {
        tableHeaderState = defaultHeaderState;
        tableHeaderState[headerName] = headerStateEnum.up;
        return tableHeaderState;
      });
    } else if (tableHeaderState[headerName] == headerStateEnum.up) {
      newData = [...records].sort((a, b) =>
        a[headerName] < b[headerName] ? 1 : -1
      );
      setTableHeaderState((tableHeaderState) => {
        tableHeaderState = defaultHeaderState;
        tableHeaderState[headerName] = headerStateEnum.down;
        return tableHeaderState;
      });
    }
    setPaginationNumber(1);
    setFilterRecords(newData);
  };

  const getHeaderSortStyle = (headerName) => {
    switch (tableHeaderState[headerName]) {
      case headerStateEnum.up:
        return Style.headerCellUp;
      case headerStateEnum.down:
        return Style.headerCellDown;
      default: //default
        return Style.headerCellDefault;
    }
  };

  return (
    <div className={Style.htsContainer}>
      <div className="mt-5">
        <Table responsive="sm" bordered>
          <thead>
            <tr>
              <th colSpan={3} className={Style.thRightBorderRemove}>
                <div className={`${Style.showRecord}`}>
                  <span className={Style.showRecordText}>Show</span>
                  <select name="ShowRecord" onChange={handlePageSize}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                  <span className={Style.showRecordText}>Entries</span>
                </div>
              </th>
              <th colSpan={4}>
                <div className={Style.searchBar}>
                  <span className={Style.searchIconSpan}>
                    <i className={`bi bi-search ${Style.searchIcon}`} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search HTS..."
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    className={Style.searchText}
                  />
                  {searchText && (
                    <button
                      className={Style.clearButton}
                      onClick={clearSearchText}
                    >
                      X
                    </button>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th
                className={getHeaderSortStyle("id")}
                onClick={() => handleHeaderClick("id")}
              >
                Sr.
              </th>
              <th
                className={getHeaderSortStyle("cell1")}
                onClick={() => handleHeaderClick("cell1")}
              >
                Table heading
              </th>
              <th
                className={getHeaderSortStyle("cell2")}
                onClick={() => handleHeaderClick("cell2")}
              >
                Table heading
              </th>
              <th
                className={getHeaderSortStyle("cell3")}
                onClick={() => handleHeaderClick("cell3")}
              >
                Table heading
              </th>
              <th
                className={getHeaderSortStyle("cell4")}
                onClick={() => handleHeaderClick("cell4")}
              >
                Table heading
              </th>
              <th
                className={getHeaderSortStyle("id")}
                onClick={() => handleHeaderClick("cell5")}
              >
                Table heading
              </th>
            </tr>
          </thead>
          <tbody>
            {(isDataFiltered ? filterRecords : records)
              .slice(activePage * pageSize - pageSize, activePage * pageSize)
              .map((record, index) => {
                return (
                  <tr key={index}>
                    <td className={`${index % 2 == 0 ? Style.oddTr : ""}`}>
                      {record.id}
                    </td>
                    <td className={`${index % 2 == 0 ? Style.oddTr : ""}`}>
                      {record.cell1}
                    </td>
                    <td className={`${index % 2 == 0 ? Style.oddTr : ""}`}>
                      {record.cell2}
                    </td>
                    <td className={`${index % 2 == 0 ? Style.oddTr : ""}`}>
                      {record.cell3}
                    </td>
                    <td className={`${index % 2 == 0 ? Style.oddTr : ""}`}>
                      {record.cell4}
                    </td>
                    <td className={`${index % 2 == 0 ? Style.oddTr : ""}`}>
                      {record.cell5}
                    </td>
                  </tr>
                );
              })}
            {isDataFiltered && filterRecords.length == 0 && (
              <tr>
                <td colSpan={7}>No Record Found</td>
              </tr>
            )}
            <tr>
              <td colSpan={7}>
                <div className={`${Style.pagination}`}>
                  <ul className={`pagination`}>
                    <li className="page-item">
                      <a
                        className={`page-link ${Style.pageLinkColor}`}
                        aria-label="Previous"
                        onClick={handlePaginationPrevious}
                      >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only"></span>
                      </a>
                    </li>
                    {getPaginationItems()}
                    <li className="page-item">
                      <a
                        className={`page-link ${Style.pageLinkColor}`}
                        aria-label="Next"
                        onClick={handlePaginationNext}
                      >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
