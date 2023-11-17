import React, { Component } from "react";
import Header from "../template/header";
import Axios from "axios";
import { Link } from "react-router-dom";
import { ApiUrl, headers } from '../services/apiRest';

class Dasboard extends Component {
    state = {
        productos: []
    };

    getIdPacient(id) {
        this.props.history.push("/Edit/" + id);
    }

    componentDidMount() {
        const url = ApiUrl + '/productos';
        Axios.get(url, {
            headers,
            params: {
                page: 0,
                size: 10,
            }
        })
            .then(response => {
                console.log("Datos completos de la respuesta:", response.data._embedded.data);
                this.setState({
                    productos: response.data._embedded.data
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="mt-4">
                    <table className="table mx-auto">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Peso</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.productos.map((value, i) => {
                                return (
                                    <tr key={i} onClick={() => this.getIdPacient(value.productoId)}>
                                        <td>{value.productoId}</td>
                                        <td>{value.nombre}</td>
                                        <td>{value.descripcion}</td>
                                        <td>{value.peso}</td>
                                        <td>
                                            <Link to={`/Edit/${value.productoId}`} className="btn btn-primary btn-sm mr-2">
                                                Editar
                                            </Link>
                                            {/* Agrega más botones o acciones según sea necesario */}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Botón para agregar un nuevo producto */}
                <div className="container text-center mt-4">
                    <Link to="/New" className="btn btn-success">
                        Agregar
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default Dasboard;
