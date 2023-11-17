import React from "react";
import Axios from "axios";
import { ApiUrl, headers } from "../services/apiRest";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
//TEMPLATE
import Header from "../template/header";
import axios from "axios";

class Edit extends React.Component {

    state = {
        form: {
            "productoId": "",
            "nombre": "",
            "descripcion": "",
            "peso": ""
        },
        error: false,
        errorMsg: ""
    }

    putProduct = ()=>{
        console.log(this.state.form)//para ver lo que se esta mandando :v   
        let productId = this.props.match.params.id;
        let putUrl = ApiUrl + "/productos/" + productId;
        axios.put(putUrl, this.state.form, {headers})
        .then(response =>{
            console.log(response)
        }) 
    }

    //manejar el submit :v
    manageSubmit = e=>{
        e.preventDefault();
    }

    componentDidMount() {
        let productId = this.props.match.params.id;
        let url = ApiUrl + "/productos/" + productId;
        console.log(url); //obtiene unicamente una url con el paciente el cual se clickea para poder editarlo

        Axios.get(url, { headers })
            .then(response => {
                const producto = response.data; // Obtiene el objeto del producto
                this.setState({
                    form: {
                        productoId: producto.productoId,
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        peso: producto.peso
                    }
                });
            })
            .catch(error => {
                console.error("Error al obtener datos del producto:", error); 
            });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [name]: value
            }
        }));//metodo para que pueda modificar los datos del producto :V
    }


    //metodo delete
    deleteProduct =()=>{
        let productId = this.props.match.params.id;
        let deleteUrl = ApiUrl + "/productos/" + productId;
        // console.log(datos)
        axios.delete(deleteUrl,{headers, productId})
        .then(response =>{
            // console.log(response)
            this.props.history.push("/dashboard")
        })
    }

    render() {
        //esto es para no poner el this.state.form. siempre y que se vea mejor
        const form = this.state.form;
        return (
            <React.Fragment>
                <Header />
                <div className="container" style={{ margin: "1rem" }}>
                    <h3>Editar Producto</h3>
                </div>
                <div className="container" style={{ margin: "2rem" }}>
                    <form className="form-horizontal" onSubmit={this.manageSubmit}>
                        <div className="form-group row">
                            <label className="col-md-2 control-label text-left">Nombre</label>
                            <div className="col-md-10">
                                <input className="form-control" 
                                type="text" name="nombre" 
                                placeholder="Nombre" 
                                value={form.nombre} 
                                onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label text-left">Descripción</label>
                            <div className="col-md-10">
                                <input className="form-control" 
                                type="text" name="descripcion" 
                                placeholder="Descripción"  
                                value={form.descripcion}
                                onChange={this.handleChange}/>
                                
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label text-left">Peso</label>
                            <div className="col-md-10">
                                <input className="form-control" 
                                type="text" name="peso" 
                                placeholder="Peso"  
                                value={form.peso} 
                                onChange={this.handleChange}/>
                                
                            </div>
                        </div>

                        <div className="form-group row" style={{ margin: "3rem" }}>
                            <div className="col-md-12">
                                <div className="container d-flex justify-content-center">
                                    <button type="submit" 
                                    className="btn btn-primary px-3 mr-2" 
                                    style={{ marginRight: "10px" }}
                                    onClick={()=>this.putProduct()}>
                                        EDITAR
                                    </button>
                                    <button type="submit" 
                                    className="btn btn-danger px-3" 
                                    style={{ marginRight: "10px" }}
                                    onClick={() => this.deleteProduct()}>
                                        ELIMINAR
                                    </button>
                                    <Link to="/dashboard" className="btn btn-primary px-3 ml-2">
                                        ATRAS
                                    </Link>
                                </div>


                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Edit;
