import { React } from "react";
import { Checkbox } from "@material-ui/core";
import { string, array, func } from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  checkBoxType: {
    margin: "auto",
  },
  checkBoxSeverity: {
    margin: "auto",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Filter = ({
  search,
  appliedFilter,
  appliedFilterType,
  onSearchChange,
  onCheckboxChanged,
  onCheckboxChangedType,
}) => {
  const classes = useStyles2();
  return (
    <>
      <div className={classes.checkBoxSeverity}>
        <label>errors</label>
        <Checkbox
          value="error"
          checked={appliedFilter.includes("error")}
          color="default"
          onChange={onCheckboxChanged}
        ></Checkbox>
        <label>warnings</label>
        <Checkbox
          value="warning"
          checked={appliedFilter.includes("warning")}
          color="default"
          onChange={onCheckboxChanged}
        ></Checkbox>
        <label>successes</label>
        <Checkbox
          value="success"
          checked={appliedFilter.includes("success")}
          color="default"
          onChange={onCheckboxChanged}
        ></Checkbox>
      </div>
      {/* 
          onChange for the search field:
          search state gets changed and therefore the second useEffect (filterSearch function) gets triggered 
          and filteredData gets updated
          */}

      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={classes.checkBoxType}>
        <label>cy</label>
        <Checkbox
          value="cy:"
          color="default"
          checked={appliedFilterType.includes("cy:")}
          onChange={onCheckboxChangedType}
        ></Checkbox>
        <label>cons</label>
        <Checkbox
          value="cons:"
          color="default"
          checked={appliedFilterType.includes("cons:")}
          onChange={onCheckboxChangedType}
        ></Checkbox>
      </div>
    </>
  );
};

export default Filter;
