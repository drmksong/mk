const deg2rad = (deg) => {
  return (Math.PI * deg) / 180.0;
};

class PureCalc {
  constructor() {
    this.Diameter = 10;
    this.Theta = 1;
    this.Theta_Crit = 1;
    this.T_Crown = 15;
    this.h_Crown = 13; // gw level above t_crown;

    this.Phi1_e = 30;
    this.Coh1_e = 0;
    this.Gamma1 = 19.3336;
    this.Gamma1_e = 9.3336;
    this.Gamma1_min = 17;
    this.Gamma1_min_e = 7;

    this.Phi2_e = 30;
    this.Coh2_e = 0;
    this.Gamma2 = 18;
    this.Gamma2_e = 8;
    this.Gamma2_min = 17;
    this.Gamma2_min_e = 7;
    this.Gamma_s = 12;

    this.D10 = 0.15;
    this.Surcharge = 10; // in MPa
    this.Result = 0;
    this.SF_ep = 0;
    this.SF_wt = 0;

    this.Ere = 0;
    this.Emax_ci = 0;
    this.Wre = 0;
    this.Wci = 0;
    this.Sci = 0;
    this.Se_ci = 0;
    this.Sw_ci = 0;
    this.Scrown_min = 0;
    this.Scrown_adv_min = 0;
    this.Scrown_max = 0;
    this.Scrown_adv_max = 0;
    this.Sigma_v_cr_min = 0;
  }

  Theta_rad = () => deg2rad(this.Theta); // in radian
  Phi1_e_rad = () => deg2rad(this.Phi1_e); // in radian
  Phi2_e_rad = () => deg2rad(this.Phi2_e); // in radian

  lateralCoeff1 = () => {
    let prad = deg2rad(45 - this.Phi1_e / 2);
    let tanp2 = Math.pow(Math.tan(prad), 2);
    let sinp = Math.sin(this.Phi1_e_rad());
    let res = (tanp2 + 1 - sinp) / 2;

    return res;
  };

  lateralCoeff2 = () => {
    let prad = deg2rad(45 - this.Phi2_e / 2);
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
    let res = (this.Coh2_e * Math.pow(this.Diameter, 2)) / sint;
    return res;
  };

  selfWeight = () => {
    // 0.5*D^3/tan(e)*gamma
    let tant = Math.tan(this.Theta_rad());
    let res = ((1 / 2) * Math.pow(this.Diameter, 3) * this.Gamma2_e) / tant;
    return res;
  };

  sideResist_c = () => {
    // c2*D^2/2/tan(e)
    let tant = Math.tan(this.Theta_rad());
    if (Math.abs(tant) < 1.0e-3) {
      throw Error("sideResist_c: theta is too small");
    }
    let res = (this.Coh2_e * Math.pow(this.Diameter, 2)) / 2 / tant;
    return res;
  };

  sideResist_f = () => {
    // tan(f2)*K2*(D^2*sv(t)/2/tan(e)+D^3*gamma2/6/tan(e))
    let tant = Math.tan(this.Theta_rad());
    let tanp = Math.tan(this.Phi2_e_rad());
    let sv = this.sigma_v_1(this.T_Crown);
    let A = (Math.pow(this.Diameter, 2) * sv) / 2 / tant;
    let B = (Math.pow(this.Diameter, 3) * this.Gamma2_e) / 6 / tant;
    let res = this.lateralCoeff2() * tanp * (A + B);
    return res;
  };

  sideResist = () => {
    return this.sideResist_f() + this.sideResist_c();
  };

  sigma_v_1 = (z) => {
    let res = this.Gamma1_e * z + this.Surcharge;
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
    let dia2 = Math.pow(this.Diameter, 2);
    let tant = Math.tan(this.Theta_rad());
    let res = (dia2 * this.sigma_v_1(this.T_Crown)) / tant;

    return res;
  };

  calculate = () => {
    const Gamma_w = 10;
    this.Result = Math.round(10 * this.earthPress()) / 10;
    console.log("calculate is clicked " + this.earthPress());
    this.Ere = Math.round(10 * this.earthPress()) / 10;
    this.Emax_ci = Math.round((10 * (this.Ere * Math.PI)) / 4) / 10;
    this.Wre =
      (Gamma_w *
        Math.round(
          10 * (this.h_Crown + this.Diameter / 2) * Math.pow(this.Diameter, 2)
        )) /
      10;
    this.Wci = Math.round((10 * this.Wre * Math.PI) / 4) / 10;
    this.Se_ci = this.SF_ep * this.Emax_ci;
    this.Sw_ci = this.SF_wt * this.Wci;
    this.Sci = Math.round(10 * (this.Se_ci + this.Sw_ci)) / 10;
    this.Scrown_min =
      (this.Sci * 4) / Math.PI / Math.pow(this.Diameter, 2) -
      (this.Gamma_s * this.Diameter) / 2;
    this.Scrown_adv_min = this.Scrown_min + 10;
    this.Sigma_v_cr_min =
      (((this.T_Crown - this.h_Crown) * this.Gamma1_min +
        this.h_Crown * this.Gamma1_min_e) /
        this.T_Crown) *
        this.T_Crown +
      Gamma_w * this.h_Crown;
    this.Scrown_max = 0.9 * this.Sigma_v_cr_min;
    this.Scrown_adv_max = this.Scrown_max - 10;
  };

  find_crit_ang = () => {
    let ang;
    let ang_max = -1e10;
    let pmax = -1e10;
    let p;

    for (let i = 1; i <= 1000; i++) {
      ang = (90 * i) / 1000;
      this.Theta = ang;
      p = this.earthPress();
      console.log(
        "theta is ",
        this.Theta,
        " earthSupport is",
        this.earthPress()
      );

      if (p > pmax) {
        ang_max = ang;
        pmax = p;
      }
      console.log(
        "ang = ",
        ang,
        ", p = ",
        p,
        "ang_max = ",
        ang_max,
        ", pmax = ",
        pmax
      );
    }
    return ang_max;
  };
}

const pureCalc = new PureCalc();
export default pureCalc;
