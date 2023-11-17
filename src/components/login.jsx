import React, { Component } from "react";
//style
import "../assets/css/Login.css";
//icons
import user from "../assets/imgs/userLogo.png";
//services
import { ApiUrl } from '../services/apiRest';
//library
import Axios from "axios";



class Login extends Component {

    constructor(props){//este constructor hace que pueda usar props por toda la clase :v
        super(props);
    }

    state = {
        form: {
            "correo": "",
            "password": ""
        },
        error: false,
        errorMsg: "No tienes una cuenta"
    }

    manageChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form);
    }

    managesubmit = e => {
        e.preventDefault();
    }

    Buttonvalue = () => {
        let url = ApiUrl + "/auth/login"
        //url para poder hacer el method post (url obtenida de swagger)
        Axios.post(url, this.state.form)
            .then(response => {
                console.log(response.data)
                    localStorage.setItem('token', response.data.token);
                    console.log("Token stored ");
                    this.props.history.push("/dashboard")

            }).catch( error =>{
                console.log(error);
                this.setState({
                    error: true,
                    errorMsg: "Sin credenciales"
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <>
                    <link
                        href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                        rel="stylesheet"
                        id="bootstrap-css"
                    />
                    <div className="wrapper fadeInDown">
                        <div id="formContent">
                            {/* Tabs Titles */}
                            {/* Icon */}
                            <div className="fadeIn first">
                                <img
                                    src={user} width="25px" height="200px" alt='icon user'
                                    id="icon"
                                />
                            </div>
                            {/* Login Form */}
                            <form onSubmit={this.managesubmit}>
                                <input
                                    type="text"
                                    id="login"
                                    className="fadeIn second"
                                    name="correo"
                                    placeholder="login"
                                    onChange={this.manageChange}
                                />
                                <input
                                    type="password"
                                    id="password"
                                    className="fadeIn third"
                                    name="password"
                                    placeholder="password"
                                    onChange={this.manageChange}
                                />
                                <input type="submit"
                                    className="fadeIn fourth"
                                    value="Log In"
                                    onClick={this.Buttonvalue}
                                />

                            </form>

                            {
                                //este bloque es para definior el estado de la alerta, las llaves son para que se pueda programar dentro del "html" dentro de react
                                this.state.error === true && //doble ampersam para luego poder colocar lo que se va a mostrar
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errorMsg}
                                </div>

                            }

                        </div>
                    </div>
                </>


            </React.Fragment>

        );
    }

}

export default Login;