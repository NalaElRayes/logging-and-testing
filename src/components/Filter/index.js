import { React } from "react";
import { Checkbox } from "@material-ui/core";
import { string, array, func } from "prop-types";

const Filter = ({
  search,
  appliedFilter,
  appliedFilterType,
  onSearchChange,
  onCheckboxChanged,
  onCheckboxChangedType,
}) => {
  return (
    <>
      <label>errors</label>
      <Checkbox
        value="error"
        checked={appliedFilter.includes("error")}
        color="primary"
        onChange={onCheckboxChanged}
      ></Checkbox>
      <label>warnings</label>
      <Checkbox
        value="warning"
        checked={appliedFilter.includes("warning")}
        color="primary"
        onChange={onCheckboxChanged}
      ></Checkbox>
      <label>successes</label>
      <Checkbox
        value="success"
        checked={appliedFilter.includes("success")}
        color="primary"
        onChange={onCheckboxChanged}
      ></Checkbox>
      {/* 
          onChange for the search field:
          search state gets changed and therefore the second useEffect (filterSearch function) gets triggered 
          and filteredData gets updated
          */}
      <input
        type="text"
        placeholder="search here"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <label>cy</label>
      <Checkbox
        value="cy:"
        color="primary"
        checked={appliedFilterType.includes("cy:")}
        onChange={onCheckboxChangedType}
      ></Checkbox>
      <label>cons</label>
      <Checkbox
        value="cons:"
        color="primary"
        checked={appliedFilterType.includes("cons:")}
        onChange={onCheckboxChangedType}
      ></Checkbox>
    </>
  );
};

export default Filter;
