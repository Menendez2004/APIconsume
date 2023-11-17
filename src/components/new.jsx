import React, { Component } from "react";
import Axios from "axios";
import { ApiUrl, headers } from "../services/apiRest";
import Header from "../template/header";

class Create extends Component {
    constructor(props) {//solo lo uso para pasar  datos al componente React.
        super(props);//hereda  las propiedades y métodos de su clase padre que es el constructor 

        this.state = {//nicializa el estado del componente nada más
            newProduct: {
                nombre: "",
                descripcion: "",
                peso: ""
            }
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newProduct: {
                ...prevState.newProduct,
                [name]: value
            }
        }));
    };

    createProduct = () => {
        const postUrl = ApiUrl + "/productos";
        Axios.post(postUrl, this.state.newProduct, { headers })
            .then(response => {
                console.log(response);
                // podes redirigir a la página del nuevo producto u otra que querras poner
                this.props.history.push("/dashboard");
            })
            .catch(error => {
                console.error("Error al crear el producto:", error);
            });
    };

    handleCancel = () => {

        this.props.history.push("/dashboard");
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="container" style={{ margin: "1rem" }}>
                    <h3>Crear Nuevo Producto</h3>
                </div>
                <div className="container" style={{ margin: "2rem" }}>
                    <form className="form-horizontal">
                        <div className="form-group row">
                            <label className="col-md-2 control-label text-left">Nombre</label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={this.state.newProduct.nombre}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label text-left">Descripción</label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="descripcion"
                                    placeholder="Descripción"
                                    value={this.state.newProduct.descripcion}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label text-left">Peso</label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="peso"
                                    placeholder="Peso"
                                    value={this.state.newProduct.peso}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group row" style={{ margin: "3rem" }}>
                            <div className="col-md-12">
                                <div className="container d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="btn btn-success px-3 mr-2" style={{ marginRight: "10px" }}
                                        onClick={this.createProduct}
                                    >
                                        CREAR NUEVO PRODUCTO
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary px-3"
                                        onClick={this.handleCancel}
                                    >
                                        CANCELAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Create;
