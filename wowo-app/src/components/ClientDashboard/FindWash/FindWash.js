import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Styled from "styled-components";

import WashMap from "./WashMap";
import WowoWordLogo from "../../../images/WowoWordLogo.js";
import NavButton from "../HamburgerNavMenu.js/NavButton.js";
import SideDrawer from "../HamburgerNavMenu.js/SideDrawer.js";
import Backdrop from "../HamburgerNavMenu.js/Backdrop.js";

import SelectAddress from "./WashSteps/SelectAddress.js";
import ChooseVehicle from "./WashSteps/ChooseVehicle.js";
import ScheduleWash from "./WashSteps/ScheduleWash.js";
import SelectService from "./WashSteps/SelectService.js";
import ConfirmWash from "./WashSteps/ConfirmWash.js";
import auth from "../../auth.js";

const MainContainer = Styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NavContainer = Styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 8%;
    width: 100%;
    padding: 0 2.5%;
    background: #00A8C5;
    z-index: 300;
`;

const LogoContainer = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;

    @media (min-width: 1800px) { // ##Device = Desktops ##Screen = 1800px to higher resolution desktops //
        height: 100%;
        width: 115px;
        left: 15%;
    }
`

const MapContainer = Styled.div`
    height: 92%;
    width: 100%;
    position: relative;
`;

const FormContainer = Styled.div`
    position: absolute;
    height: 500px;
    width: 350px;
    background: #ffffff;
    border: 1px solid grey;
    bottom: 10%;
    left 10%;
    padding: 15px;
    
    @media (min-width: 1800px) { // ##Device = Desktops ##Screen = 1800px to higher resolution desktops //
        height: 600px;
        bottom: 12%;
        left: 15%;
    }

    @media (max-width: 768px) {
        width: 100%
        bottom: 0%;
        left 0%;
    }
`

const UserInfoContainer = Styled.div`
    margin-bottom: 10px;
`

const P = Styled.p`
    font-size: 1.3rem;
    font-weight: 500;
`

const FormInputContainer = Styled.div`
`




class FindWash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            selectedAddress: "",
            vehicle: "",
            date:"",
            time: "",
            service: "",
            step: 1,
            sideDrawerOpen: false,
        };
    }

    //Go to the Next step
    nextStep = () => {
        const {step} = this.state;
        if(step < 5){
            this.setState({
                step: step + 1
            })
        }
    }

    //Go back to the previous step
    prevStep = () => {
        const {step} = this.state;
        if(step > 0) {
            this.setState({
                step: step - 1
            })
        }
    }
  
    inputHandler = input => event => {
      this.setState({
        [input]: event.target.value
      });
    };

    addressOnClick = event => {

    }
  
    vehicleOnClick = event => {
      event.preventDefault();
      if (this.state.show === false) {
        this.setState({ show: true });
      } else {
        this.setState({ show: false });
      }
    };

    serviceOnClick = event => {
        event.preventDefault();
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const { email, password } = this.state;
      this.props
        .loginUser(email, password)
        .then(() => {
          this.props.history.push("/userDash");
        })
        .catch(err => {
          throw new Error(err);
        });
    };

    //Logout
    logout = (evt) => {
        evt.preventDefault()

        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('id');
        auth.logout(() => {
            this.props.history.push('/login');
        })
    }

    //Nav Toggle
    NavToggleClickHandler = () => {
        this.setState((prevState) => {
            return{sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    }
  
    render() {
        let backDrop;
        if(this.state.sideDrawerOpen) {
            backDrop = <Backdrop clickHandler={this.backdropClickHandler}/>;
        }

        const { step } = this.state;
        const { address, selectedAddress, vehicle, date, time, service } = this.state;
        const  values = { address, selectedAddress, vehicle, date, time, service }

        return (
            <MainContainer>
                <NavContainer className="nav-container">
                        <LogoContainer className="logo-container">
                            <WowoWordLogo
                                className="wowo-logo"
                                width="100%"
                            />
                        </LogoContainer>
                        <NavButton clickHandler={this.NavToggleClickHandler}/>
                </NavContainer>
                <MapContainer>
                    <SideDrawer logout={this.logout} show={this.state.sideDrawerOpen}/>
                    {backDrop}
                    <WashMap />
                    <FormContainer>
                        <UserInfoContainer>
                            {/* <img src={this.props.profilePic} style={{width: 60 + "%"}} alt="Profile Img" /> */}
                            <svg width="100" height="100">
                                <circle cx="50" cy="50" r="30" fill="#00A8C5" />
                                <text x="50%" y="50%" alignmentBaseline="central" textAnchor="middle" fontFamily="sans-serif" fontSize="40" fill="#fff">T</text>
                            </svg>
                        <P>
                            {step === 1 ? `Welcome, Tony` : (step === 2 ? `Choose your vehicle` : (step === 3 ? `Select a Date & Time` : (step === 4 ? `Which service would you like` : `Confirm your wash`)))}
                        </P>
                        </UserInfoContainer>
                        <FormInputContainer>
                            {step === 1 ?
                                <SelectAddress
                                    next={this.nextStep}
                                    prev={this.prevStep}
                                    onClick={this.addressOnClick}
                                    inputHandler={this.inputHandler}
                                    values={values}
                                />
                            :
                                (step === 2 ?
                                    <ChooseVehicle
                                        next={this.nextStep}
                                        prev={this.prevStep}
                                        onClick={this.vehicleOnClick}
                                        inputHandler={this.inputHandler}
                                        values={values} 
                                    />
                                :
                                    (step === 3 ?
                                        <ScheduleWash 
                                            next={this.nextStep}
                                            prev={this.prevStep}
                                            inputHandler={this.inputHandler}
                                            values={values}
                                        />
                                    :
                                        (step === 4 ?
                                            <SelectService
                                                next={this.nextStep}
                                                prev={this.prevStep}
                                                onClick={this.serviceOnClick}
                                                inputHandler={this.inputHandler}
                                                values={values}
                                            />
                                        :
                                            <ConfirmWash />
                                        )
                                    )
                                )
                            }
                        </FormInputContainer>
                    </FormContainer>
                </MapContainer>
            </MainContainer>
        );
    }
}

  
const mapStateToProps = state => {
    return {
        user: state.user,
    };
};
  
const mapDispatchToProps = {
};
  
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FindWash)
);
