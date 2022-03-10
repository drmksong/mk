import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import InputIcon from "@material-ui/icons/Input";
import ComputerIcon from "@material-ui/icons/Computer";
import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles({
  title: {
    backgroundColor: "yellow",
    margin: "auto",
  },
  root: {
    width: "100%",
    bottom: 100,
    margin: "auto",
    backgroundColor: "lightblue",
  },
});

const Header = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <React.Fragment>
      <h2 className={classes.title}>TBM Face Support </h2>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log("new value is ", newValue);
          props.change(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Input" icon={<InputIcon />} value={10} />
        <BottomNavigationAction
          label="Compute"
          icon={<ComputerIcon />}
          value={20}
        />
        <BottomNavigationAction
          label="Report"
          icon={<AssessmentIcon />}
          value={30}
        />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default Header;
