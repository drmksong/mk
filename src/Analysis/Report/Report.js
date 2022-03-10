import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const UseStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    maxWidth: "100ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

// test for git

const report = (props) => {
  const classes = UseStyles();
  return (
    <div>
      <React.Fragment>
        <form>
          <List className={classes.root}>
            {props.reps.map((rep, index) => {
              console.log("value is ", rep.Value);
              return (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={rep.Title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Value : {rep.Value}
                          </Typography>{" "}
                          {rep.Unit}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            })}
          </List>
        </form>
      </React.Fragment>
    </div>
  );
};

export default report;
