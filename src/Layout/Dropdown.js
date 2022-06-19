import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

const useStyles = makeStyles((theme) => ({
  formControl: {
    "& .MuiInputBase-root": {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "100px",
      minWidth: "120px",
      justifyContent: "center"
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px"
    }
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent"
    }
  },
  selectIcon: {
    position: "relative",
    color: theme.palette.secondary.main,
    fontSize: "14px"
  },
  paper: {
    borderRadius: 12,
    marginTop: 8
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "12px"
    },
    "& li.Mui-selected": {
      color: "#FFF",
      background: theme.palette.primary.main,
    },
    "& li.Mui-selected:hover": {
      background: theme.palette.primary.main,
    }
  }
}));

const Dropdown = ({ value, handleChange, items }) => {
  const classes = useStyles();
  const menuProps = {
    classes: {
      list: classes.list,
      paper: classes.paper
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    getContentAnchorEl: null
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={value}
        onChange={handleChange}
        disableUnderline
        IconComponent={ExpandMoreRoundedIcon}
        MenuProps={menuProps}
        classes={{
          select: classes.select,
          icon: classes.selectIcon
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
