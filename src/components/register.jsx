import React, { Component } from "react";
import { ApiUrl } from '../services/apiRest';
import Axios from "axios";
import user from "../assets/imgs/userLogo.png";


class Register extends Component {
    state = {
        form: {
            "nombres": "",
            "apellidos": "",
            "correo": "",
            "password": "",
            "passwordConfirm": ""
        },
        error: false,
        errorMsg: "No se pudo completar el registro"
    };

    manageChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    manageSubmit = (e) => {
        e.preventDefault();

        // Validación básica de contraseñas
        if (this.state.form.password !== this.state.form.passwordConfirm) {
            this.setState({
                error: true,
                errorMsg: "Las contraseñas no coinciden"
            });
            return;
        }

        // Realizar la solicitud de registro
        let url = ApiUrl + "/auth/registro";
        Axios.post(url, this.state.form)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                console.log("Token almacenado");
                // Redirigir a la página de inicio de sesión 
                this.props.history.push("/login");
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                    errorMsg: "Error en el registro"
                });
            });
    };

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    {/* Icon */}
                    <div className="fadeIn first">
                        <img
                            src={user} // Reemplaza con la URL de tu icono
                            alt="icon user"
                            id="icon"
                        />
                    </div>
                    {/* Registro Formulario */}
                    <form onSubmit={this.manageSubmit}>
                    <input
                            type="text"
                            id="nombres"
                            className="fadeIn second"
                            name="nombres"
                            placeholder="Nombre"
                            onChange={this.manageChange}
                        />
                        
                        <input
                            type="text"
                            id="apellidos"
                            className="fadeIn second"
                            name="apellidos"
                            placeholder="Apellido"
                            onChange={this.manageChange}
                        />

                        <input
                            type="text"
                            id="correo"
                            className="fadeIn second"
                            name="correo"
                            placeholder="Correo"
                            onChange={this.manageChange}
                        />
                        <input
                            type="password"
                            id="password"
                            className="fadeIn third"
                            name="password"
                            placeholder="Contraseña"
                            onChange={this.manageChange}
                        />
                        <input
                            type="password"
                            id="passwordConfirm"
                            className="fadeIn fourth"
                            name="passwordConfirm"
                            placeholder="Confirmar Contraseña"
                            onChange={this.manageChange}
                        />
                        <input
                            type="submit"
                            className="fadeIn fifth"
                            value="registrar"
                        />
                    </form>

                    {/* Mostrar mensaje de error en caso de que haya alguno*/}
                    {this.state.error && (
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Register;
