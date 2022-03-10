import React, { Component } from "react";
import Button from "@material-ui/core/Button";
//import { makeStyles } from "@material-ui/core/styles";
//import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import InputForm from "../Input/Input";

const deg2rad = (deg) => {
  return (Math.PI * deg) / 180.0;
};

class PressCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Diameter: 10,
      Theta: 66.56,
      T_Crown: 15,

      Phi1_e: 30,
      Coh1_e: 0,
      Gamma1: 19.3336,
      Gamma1_e: 9.3336,
      Gamma1_min: 17,
      Gamma1_min_e: 7,

      Phi2_e: 30,
      Coh2_e: 0,
      Gamma2: 18,
      Gamma2_e: 8,
      Gamma2_min: 17,
      Gamma2_min_e: 7,

      D10: 0.15,
      Surcharge: 10, // in MPa
      Result: 0,
    };
  }

  Theta_rad = () => deg2rad(this.state.Theta); // in radian
  Phi1_e_rad = () => deg2rad(this.state.Phi1_e); // in radian
  Phi2_e_rad = () => deg2rad(this.state.Phi2_e); // in radian

  lateralCoeff1 = () => {
    let prad = deg2rad(45 - this.state.Phi1_e / 2);
    let tanp2 = Math.pow(Math.tan(prad), 2);
    let sinp = Math.sin(this.Phi1_e_rad());
    let res = (tanp2 + 1 - sinp) / 2;

    return res;
  };

  lateralCoeff2 = () => {
    let prad = deg2rad(45 - this.state.Phi2_e / 2);
    let tanp2 = Math.pow(Math.tan(prad), 2);
    let sinp = Math.sin(this.Phi2_e_rad());
    let res = (tanp2 + 1 - sinp) / 2;

    return res;
  };

  earthPress = () => {
    // E_re : face support pressure
    let g = this.selfWeight();
    let pv = this.verticalForce();
    let t = this.sideResist();
    let p = this.planeResist();
    let sint = Math.sin(this.Theta_rad());
    let cost = Math.cos(this.Theta_rad());
    let tanp = Math.tan(this.Phi2_e_rad());

    let div = sint * tanp + cost;
    if (Math.abs(div) < 1.0e-3) {
      throw Error("earthPress: division by zero");
    }
    let res = ((g + pv) * (sint - cost * tanp) - 2 * t - p) / div;

    return res;
  };

  planeResist = () => {
    // c*D^2/sin(e)
    let sint = Math.sin(this.Theta_rad());
    if (Math.abs(sint) < 1.0e-3) {
      throw Error("planeResist: theta is too small");
    }
    let res = (this.state.Coh2_e * Math.pow(this.state.Diameter, 2)) / sint;
    return res;
  };

  selfWeight = () => {
    // 0.5*D^3/tan(e)*gamma
    let tant = Math.tan(this.Theta_rad());
    let res =
      ((1 / 2) * Math.pow(this.state.Diameter, 3) * this.state.Gamma2_e) / tant;
    return res;
  };

  sideResist_c = () => {
    // c2*D^2/2/tan(e)
    let tant = Math.tan(this.Theta_rad());
    if (Math.abs(tant) < 1.0e-3) {
      throw Error("sideResist_c: theta is too small");
    }
    let res = (this.state.Coh2_e * Math.pow(this.state.Diameter, 2)) / 2 / tant;
    return res;
  };

  sideResist_f = () => {
    // tan(f2)*K2*(D^2*sv(t)/2/tan(e)+D^3*gamma2/6/tan(e))
    let tant = Math.tan(this.Theta_rad());
    let tanp = Math.tan(this.Phi2_e_rad());
    let sv = this.sigma_v_1(this.state.T_Crown);
    let A = (Math.pow(this.state.Diameter, 2) * sv) / 2 / tant;
    let B = (Math.pow(this.state.Diameter, 3) * this.state.Gamma2_e) / 6 / tant;
    let res = this.lateralCoeff2() * tanp * (A + B);
    return res;
  };

  sideResist = () => {
    return this.sideResist_f() + this.sideResist_c();
  };

  sigma_v_1 = (z) => {
    let res = this.state.Gamma1_e * z + this.state.Surcharge;
    return res;
  };

  sigma_v_2 = (z) => {
    let res = 0;
    return res;
  };

  verticalForce = () => {
    // Pv
    // diameter : diameter of tunnel in meter
    // theta : slope of imaginary failure plane in radian
    // t_crown : depth of the crown of tunnel in meter
    if (this.Theta_rad() < 0.0001) {
      throw Error("Theta_rad is too small");
    }
    let dia2 = Math.pow(this.state.Diameter, 2);
    let tant = Math.tan(this.Theta_rad());
    let res = (dia2 * this.sigma_v_1(this.state.T_Crown)) / tant;

    return res;
  };

  calculate = () => {
    this.setState({ Result: Math.round(10 * this.earthPress()) / 10 });
    console.log("calculate is clicked " + this.earthPress());
  };

  /*

      Diameter: 10,
      T_Crown: 15,

      Phi1_e: 30,
      Coh1_e: 0,
      Gamma1: 19.3336,
      Gamma1_e: 9.3336,
      Gamma1_min: 17,
      Gamma1_min_e: 7,

      Phi2_e: 30,
      Coh2_e: 0,
      Gamma2: 18,
      Gamma2_e: 8,
      Gamma2_min: 17,
      Gamma2_min_e: 7,

      D10: 0.15,
      Surcharge: 10, // in MPa

      <React.Fragment>
        <input>A</input>

        <p>res = {this.state.Result}</p>

        <Button onClick={this.calculate} variant="contained" color="primary">
          Calculate
        </Button>
      </React.Fragment>


*/

  setDiameter = (e) => {
    this.setState({ Diameter: e.target.value });
  };

  setT_Crown = (e) => {
    this.setState({ T_Crown: e.target.value });
  };

  setPhi1_e = (e) => {
    this.setState({ Phi1_e: e.target.value });
  };

  setCoh1_e = (e) => {
    this.setState({ Coh1_e: e.target.value });
  };

  setGamma1 = (e) => {
    this.setState({ Gamma1: e.target.value });
  };

  setGamma1_e = (e) => {
    this.setState({ Gamma1_e: e.target.value });
  };

  setGamma1_min = (e) => {
    this.setState({ Gamma1_min: e.target.value });
  };

  setGamma1_min_e = (e) => {
    this.setState({ Gamma1_min_e: e.target.value });
  };

  setPhi2_e = (e) => {
    this.setState({ Phi2_e: e.target.value });
  };

  setCoh2_e = (e) => {
    this.setState({ Coh2_e: e.target.value });
  };

  setGamma2 = (e) => {
    this.setState({ Gamma2: e.target.value });
  };

  setGamma2_e = (e) => {
    this.setState({ Gamma2_e: e.target.value });
  };

  setGamma2_min = (e) => {
    this.setState({ Gamma2_min: e.target.value });
  };

  setGamma2_min_e = (e) => {
    this.setState({ Gamma2_min_e: e.target.value });
  };

  setD10 = (e) => {
    this.setState({ D10: e.target.value });
  };

  setSurcharge = (e) => {
    this.setState({ Surcharge: e.target.value });
  };

  render = () => {
    return (
      <form>
        <h2>TBM Face Support Calculator</h2>

        <TextField
          defaultValue={this.state.Diameter}
          label="Diameter"
          onChange={this.setDiameter}
        />

        <TextField
          defaultValue={this.state.T_Crown}
          label="Depth of Tunnel Crown"
          onChange={this.setT_Crown}
        />

        <TextField
          defaultValue={this.state.Phi1_e}
          label="Friction angle of above layers"
          onChange={this.setPhi1_e}
        />
        <TextField
          defaultValue={this.state.Coh1_e}
          label="Cohesion of above layers"
          onChange={this.setCoh1_e}
        />

        <TextField
          defaultValue={this.state.Gamma1}
          label="Unit Weight of above layers"
          onChange={this.setGamma1}
        />
        <TextField
          defaultValue={this.state.Gamma1_e}
          label="Effective Unit Weight of above layers"
          onChange={this.setGamma1_e}
        />

        <TextField
          defaultValue={this.state.Gamma1_min}
          label="Minimum Unit Weight of above layers"
          onChange={this.setGamma1_min}
        />
        <TextField
          defaultValue={this.state.Gamma1_min_e}
          label="Minimum Effective Unit Weight of above layers"
          onChange={this.setGamma1_min_e}
        />

        <TextField
          defaultValue={this.state.Phi2_e}
          label="Friction angle of face layers"
          onChange={this.setPhi2_e}
        />
        <TextField
          defaultValue={this.state.Coh2_e}
          label="Cohesion of face layers"
          onChange={this.setCoh2_e}
        />

        <TextField
          defaultValue={this.state.Gamma2}
          label="Unit Weight of face layers"
          onChange={this.setGamma2}
        />
        <TextField
          defaultValue={this.state.Gamma2_e}
          label="Effective Unit Weight of face layers"
          onChange={this.setGamma2_e}
        />

        <TextField
          defaultValue={this.state.Gamma2_min}
          label="Minimum Unit Weight of face layers"
          onChange={this.setGamma2_min}
        />
        <TextField
          defaultValue={this.state.Gamma2_min_e}
          label="Minimum Effective Unit Weight of face layers"
          onChange={this.setGamma2_min_e}
        />
        <TextField
          defaultValue={this.state.D10}
          label="Particle weight of lower 10%"
          onChange={this.setD10}
        />
        <TextField
          defaultValue={this.state.Surcharge}
          label="Surcharge of the ground surface"
          onChange={this.setSurcharge}
        />
        <Box p="1rem" bgcolor="success.main" color="white">
          <Button onClick={this.calculate} variant="contained" color="primary">
            Calculate
          </Button>
          <h3>res = {this.state.Result}</h3>
        </Box>
      </form>
    );
  };
}

export default PressCalc;
