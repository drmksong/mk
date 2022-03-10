import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./Input.module.css";

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ visible: open });
  };

  render() {
    //console.log(this.props.data);
    return (
      <React.Fragment>
        <form className={classes.Input}>
          {this.props.textfields.map((tf) => {
            return (
              <TextField
                fullWidth
                key={tf.label}
                defaultValue={tf.defaultValue}
                label={tf.label}
                onChange={tf.change}
              />
            );
          })}
        </form>
      </React.Fragment>
    );
  }
}

export default InputForm;
