import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Input from "../Input/Input";
import PureCalc from "./PureCalc";
import Report from "../Report/Report";

class PressCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCalculated: false,
      Diameter: 10,
      Theta: 1,
      Theta_Crit: 1,
      T_Crown: 15,
      h_Crown: 13,

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

      Gamma_s: 12,

      D10: 0.15,
      Surcharge: 10, // in MPa

      SF_ep: 1.5,
      SF_wt: 1.05,

      Result: 0,

      Ere: 0,
      Emax_ci: 0,
      Wre: 0,
      Wci: 0,
      Sci: 0,
      Se_ci: 0,
      Sw_ci: 0,
      Scrown_min: 0,
      Scrown_adv_min: 0,
      Scrown_max: 0,
      Scrown_adv_max: 0,
    };

    this.repArray = [
      {
        Title: "Earth Pressure Force",
        Value: this.state.Ere,
        Unit: "MN",
      },
      {
        Title: "Earth Pressure Force on Circular Face",
        Value: this.state.Emax_ci,
        Unit: "MN",
      },
      {
        Title: "Acting water pressure force on rectangular face",
        Value: this.state.Wre,
        Unit: "MN",
      },
      {
        Title: "Acting water pressure force on circular face",
        Value: this.state.Wci,
        Unit: "MN",
      },
      {
        Title: "Total support force considering safety factors",
        Value: this.state.Sci,
        Unit: "MN",
      },
      {
        Title:
          "Support force to counter earth pressue considering safety factor",
        Value: this.state.Se_ci,
        Unit: "MN",
      },
      {
        Title:
          "Support force to counter water pressure considering safety factor",
        Value: this.state.Sw_ci,
        Unit: "MN",
      },
      {
        Title: "Minimal support prssure for the tunnel crown",
        Value: this.state.Scrown_min,
        Unit: "MPa",
      },
      {
        Title:
          "Support pressure at the tunnel crown for regular advance with support deviation 10",
        Value: this.state.Scrown_adv_min,
        Unit: "MPa",
      },
      {
        Title:
          "Maximal allowable support pressure at tunnel crown due to creak-up safety",
        Value: this.state.Scrown_max,
        Unit: "MPa",
      },
      {
        Title: "Highest support pressure due to face pressure deviation",
        Value: this.state.Scrown_adv_max,
        Unit: "MPa",
      },
    ];

    this.tfArray = [
      {
        defaultValue: this.state.Diameter,
        label: "Diameter",
        change: this.setDiameter,
      },
      {
        defaultValue: this.state.T_Crown,
        label: "Depth of Tunnel Crown",
        change: this.setT_Crown,
      },
      {
        defaultValue: this.state.h_Crown,
        label: "GW Level above Tunnel Crown",
        change: this.seth_Crown,
      },

      {
        defaultValue: this.state.Phi1_e,
        label: "Friction angle of above soil",
        change: this.setPhi1_e,
      },
      {
        defaultValue: this.state.Coh1_e,
        label: "Cohesion of above soil",
        change: this.setCoh1_e,
      },
      {
        defaultValue: this.state.Gamma1,
        label: "Unit Weight of above soil",
        change: this.setGamma1,
      },
      {
        defaultValue: this.state.Gamma1_e,
        label: "Eff. Unit Weight of above soil",
        change: this.setGamma1_e,
      },
      {
        defaultValue: this.state.Gamma1_min,
        label: "Min. Unit Weight of above soil",
        change: this.setGamma1_min,
      },
      {
        defaultValue: this.state.Gamma1_min_e,
        label: "Min. Eff. Unit Weight of above soil",
        change: this.setGamma1_min_e,
      },
      {
        defaultValue: this.state.Phi2_e,
        label: "Friction angle at face",
        change: this.setPhi2_e,
      },
      {
        defaultValue: this.state.Coh2_e,
        label: "Cohesion at face",
        change: this.setCoh2_e,
      },
      {
        defaultValue: this.state.Gamma2,
        label: "Unit Weight at face",
        change: this.setGamma2,
      },
      {
        defaultValue: this.state.Gamma2_e,
        label: "Eff. Unit Weight of face",
        change: this.setGamma2_e,
      },
      {
        defaultValue: this.state.Gamma2_min,
        label: "Min. Unit Weight at face",
        change: this.setGamma2_min,
      },
      {
        defaultValue: this.state.Gamma2_min_e,
        label: "Min. Eff. Unit Weight at face",
        change: this.setGamma2_min_e,
      },
      {
        defaultValue: this.state.Gamma_s,
        label: "Unit Weight of excavated medium",
        change: this.setGamma_s,
      },
      {
        defaultValue: this.state.D10,
        label: "Particle size of lower 10%",
        change: this.setD10,
      },
      {
        defaultValue: this.state.Surcharge,
        label: "Surcharge",
        change: this.setSurcharge,
      },
      {
        defaultValue: this.state.SF_ep,
        label: "Safety Factor for Earth Pressure",
        change: this.setSF_ep,
      },
      {
        defaultValue: this.state.SF_wt,
        label: "Safety Factor for Water Pressure",
        change: this.setSF_wt,
      },
    ];
  }

  update_rep = () => {
    console.log(
      "update_rep is called, earth pressure force is ",
      this.state.Ere
    );
    this.repArray = [
      {
        Title: "Earth Pressure Force",
        Value: PureCalc.Ere,
        Unit: "MN",
      },
      {
        Title: "Earth Pressure Force on Circular Face",
        Value: PureCalc.Emax_ci,
        Unit: "MN",
      },
      {
        Title: "Acting water pressure force on rectangular face",
        Value: PureCalc.Wre,
        Unit: "MN",
      },
      {
        Title: "Acting water pressure force on circular face",
        Value: PureCalc.Wci,
        Unit: "MN",
      },
      {
        Title: "Total support force considering safety factors",
        Value: PureCalc.Sci,
        Unit: "MN",
      },
      {
        Title:
          "Support force to counter earth pressue considering safety factor",
        Value: PureCalc.Se_ci,
        Unit: "MN",
      },
      {
        Title:
          "Support force to counter water pressure considering safety factor",
        Value: PureCalc.Sw_ci,
        Unit: "MN",
      },
      {
        Title: "Minimal support prssure for the tunnel crown",
        Value: PureCalc.Scrown_min,
        Unit: "MPa",
      },
      {
        Title:
          "Support pressure at the tunnel crown for regular advance with support deviation 10",
        Value: PureCalc.Scrown_adv_min,
        Unit: "MPa",
      },
      {
        Title:
          "Maximal allowable support pressure at tunnel crown due to creak-up safety",
        Value: PureCalc.Scrown_max,
        Unit: "MPa",
      },
      {
        Title: "Highest support pressure due to face pressure deviation",
        Value: PureCalc.Scrown_adv_max,
        Unit: "MPa",
      },
    ];
  };

  update_tf = () => {
    this.tfArray = [
      {
        defaultValue: this.state.Diameter,
        label: "Diameter",
        change: this.setDiameter,
        unit: "m",
      },
      {
        defaultValue: this.state.T_Crown,
        label: "Depth of Tunnel Crown",
        change: this.setT_Crown,
        unit: "m",
      },
      {
        defaultValue: this.state.h_Crown,
        label: "GW Level above Tunnel Crown",
        change: this.seth_Crown,
      },
      {
        defaultValue: this.state.Phi1_e,
        label: "Friction angle of above soil",
        change: this.setPhi1_e,
        unit: "degree",
      },
      {
        defaultValue: this.state.Coh1_e,
        label: "Cohesion of above soil",
        change: this.setCoh1_e,
        unit: "kPa",
      },
      {
        defaultValue: this.state.Gamma1,
        label: "Unit Weight of above soil",
        change: this.setGamma1,
        unit: "kN/m3",
      },
      {
        defaultValue: this.state.Gamma1_e,
        label: "Eff. Unit Weight of above soil",
        change: this.setGamma1_e,
        unit: "kN/m3",
      },
      {
        defaultValue: this.state.Gamma1_min,
        label: "Min. Unit Weight of above soil",
        change: this.setGamma1_min,
        unit: "kN/m3",
      },
      {
        defaultValue: this.state.Gamma1_min_e,
        label: "Min. Eff. Unit Weight of above soil",
        change: this.setGamma1_min_e,
        unit: "kN/m3",
      },
      {
        defaultValue: this.state.Phi2_e,
        label: "Friction angle at face",
        change: this.setPhi2_e,
        unit: "degree",
      },
      {
        defaultValue: this.state.Coh2_e,
        label: "Cohesion at face",
        change: this.setCoh2_e,
        unit: "kPa",
      },
      {
        defaultValue: this.state.Gamma2,
        label: "Unit Weight at face",
        change: this.setGamma2,
        unit: "kN/m3",
      },
      {
        defaultValue: this.state.Gamma2_e,
        label: "Eff. Unit Weight of face",
        change: this.setGamma2_e,
        unit: "kN/m3",
      },
      {
        defaultValue: this.state.Gamma2_min,
        label: "Min. Unit Weight at face",
        change: this.setGamma2_min,
        unit: "kN/m3",
      },
      {
        defaultValue: this.state.Gamma2_min_e,
        label: "Min. Eff. Unit Weight at face",
        change: this.setGamma2_min_e,
        unit: "kN/m3",
      },
      {
        defaultValue: this.state.Gamma_s,
        label: "Unit Weight of excavated medium",
        change: this.setGamma_s,
      },
      {
        defaultValue: this.state.D10,
        label: "Particle size of lower 10%",
        change: this.setD10,
        unit: "mm",
      },
      {
        defaultValue: this.state.Surcharge,
        label: "Surcharge",
        change: this.setSurcharge,
        unit: "kPa",
      },
      {
        defaultValue: this.state.SF_ep,
        label: "Safety Factor for Earth Pressure",
        change: this.setSF_ep,
      },
      {
        defaultValue: this.state.SF_wt,
        label: "Safety Factor for Water Pressure",
        change: this.setSF_wt,
      },
    ];
  };

  setDiameter = (e) => {
    console.log("e before setState ", e);
    this.setState({ Diameter: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setT_Crown = (e) => {
    this.setState({ T_Crown: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setPhi1_e = (e) => {
    this.setState({ Phi1_e: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setCoh1_e = (e) => {
    this.setState({ Coh1_e: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma1 = (e) => {
    this.setState({ Gamma1: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma1_e = (e) => {
    this.setState({ Gamma1_e: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma1_min = (e) => {
    this.setState({ Gamma1_min: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma1_min_e = (e) => {
    this.setState({ Gamma1_min_e: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setPhi2_e = (e) => {
    this.setState({ Phi2_e: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setCoh2_e = (e) => {
    this.setState({ Coh2_e: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma2 = (e) => {
    this.setState({ Gamma2: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma2_e = (e) => {
    this.setState({ Gamma2_e: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma2_min = (e) => {
    this.setState({ Gamma2_min: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma2_min_e = (e) => {
    this.setState({ Gamma2_min_e: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setGamma_s = (e) => {
    this.setState({ Gamma_s: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setD10 = (e) => {
    this.setState({ D10: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setSurcharge = (e) => {
    this.setState({ Surcharge: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setSF_ep = (e) => {
    this.setState({ SF_ep: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  setSF_wt = (e) => {
    this.setState({ SF_wt: e.target.value });
    this.update_tf();
    this.setState({ isCalculated: false });
  };

  feed_pc() {
    PureCalc.Diameter = this.state.Diameter;
    console.log(
      "feed_pc: pc.dia",
      PureCalc.Diameter,
      " state.dia is",
      this.state.Diameter
    );
    PureCalc.Theta = this.state.Theta;
    PureCalc.Theta_Crit = this.state.Theta_Crit;
    PureCalc.T_Crown = this.state.T_Crown;
    PureCalc.h_Crown = this.state.h_Crown;

    PureCalc.Phi1_e = this.state.Phi1_e;
    PureCalc.Coh1_e = this.state.Coh1_e;
    PureCalc.Gamma1 = this.state.Gamma1;
    PureCalc.Gamma1_e = this.state.Gamma1_e;
    PureCalc.Gamma1_min = this.state.Gamma1_min;
    PureCalc.Gamma1_min_e = this.state.Gamma1_min_e;

    PureCalc.Phi2_e = this.state.Phi2_e;
    PureCalc.Coh2_e = this.state.Coh2_e;
    PureCalc.Gamma2 = this.state.Gamma2;
    PureCalc.Gamma2_e = this.state.Gamma2_e;
    PureCalc.Gamma2_min = this.state.Gamma2_min;
    PureCalc.Gamma2_min_e = this.state.Gamma2_min_e;
    PureCalc.Gamma_s = this.state.Gamma_s;

    PureCalc.D10 = this.state.D10;
    PureCalc.Surcharge = this.state.Surcharge; // in MPa
    PureCalc.Result = this.state.Result;
    PureCalc.SF_ep = this.state.SF_ep;
    PureCalc.SF_wt = this.state.SF_wt;
  }

  feed_back = () => {
    this.setState({ Ere: PureCalc.Ere });
    this.setState({ Emax_ci: PureCalc.Emax_ci });
    this.setState({ Wre: PureCalc.Wre });
    this.setState({ Wci: PureCalc.Wci });
    this.setState({ Sci: PureCalc.Sci });
    this.setState({ Se_ci: PureCalc.Se_ci });
    this.setState({ Sw_ci: PureCalc.Sw_ci });
    this.setState({ Scrown_min: PureCalc.Scrown_min });
    this.setState({ Scrown_adv_min: PureCalc.Scrown_adv_min });
    this.setState({ Scrown_max: PureCalc.Scrown_max });
    this.setState({ Scrown_adv_max: PureCalc.Scrown_adv_max });
  };

  find_crit_ang = () => {
    let ang_crit = PureCalc.find_crit_ang();
    this.setState({ Theta: ang_crit });
    this.setState({ Theta_Crit: ang_crit });
    this.setState({ isCalculated: false });
  };
  calculate = () => {
    this.feed_pc();
    PureCalc.calculate();
    this.setState({ Result: PureCalc.Result }); // Math.round(10 * PureCalc.earthPress()) / 10
    console.log("calculate is clicked " + PureCalc.Result);
    this.feed_back();
    this.setState({ isCalculated: true });
    this.update_rep();
  };

  render = () => {
    const display = (
      <React.Fragment>
        <h3> results </h3>
        <p>Earth Pressure Force = {this.state.Ere}</p>
        <p>Earth Pressure Force on Circular Face = {this.state.Emax_ci}</p>
        <p>
          Acting water pressure force on rectangular face = {this.state.Wre}
        </p>
        <p>Acting water pressure force on circular face = {this.state.Wci}</p>
        <p>Total support force considering safety factors = {this.state.Sci}</p>
        <p>
          Support force to counter earth pressue considering safety factor =
          {this.state.Se_ci}
        </p>
        <p>
          Support force to counter water pressure considering safety factor =
          {this.state.Sw_ci}
        </p>
        <p>
          Minimal support prssure for the tunnel crown ={this.state.Scrown_min}
        </p>

        <p>
          Support pressure at the tunnel crown for regular advance with support
          deviation 10 = {this.state.Scrown_adv_min}
        </p>
        <p>
          Maximal allowable support pressure at tunnel crown due to creak-up
          safety = {this.state.Scrown_max}
        </p>
        <p>
          Highest support pressure due to face pressure deviation =
          {this.state.Scrown_adv_max}
        </p>
      </React.Fragment>
    );
    return (
      <div>
        {this.props.page === 1 && (
          <Input width="100%" textfields={this.tfArray} />
        )}
        {this.props.page === 2 && (
          <React.Fragment>
            <form>
              <Box p="1rem">
                <Button
                  onClick={this.find_crit_ang}
                  variant="contained"
                  color="primary"
                >
                  Find Critical Anagle
                </Button>
                <p>Critical Angle is {this.state.Theta_Crit}</p>
              </Box>
            </form>

            <form>
              <Box p="1rem" width="100%" bgcolor="success.main" color="white">
                <Button
                  onClick={this.calculate}
                  variant="contained"
                  color="primary"
                >
                  Calculate
                </Button>
                <h3>Earth Pressure Force = {this.state.Result}</h3>
              </Box>
              {/* {this.state.isCalculated ? <div>{display} </div> : null} */}
            </form>
          </React.Fragment>
        )}
        {this.props.page === 3 && <Report reps={this.repArray} />}
      </div>
    );
  };
}

export default PressCalc;
