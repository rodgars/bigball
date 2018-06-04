import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminMatchs from './AdminMatchs';
import * as actions from '../../actions';

class Admin extends Component{

    componentDidMount(){
        this.props.fetchWorldCup();
    }
    
    renderUsers(){
        let arr = [];
        for(let i=0; i< 30; i++){
            arr.push(
                <tr>
                            <td>1</td>
                            <td>Rodrigo Garcia</td>
                            <td>20/03/2018</td>
                            <td>
                                <select>
                                    <option value="">Sim</option>
                                    <option value="">Não</option>
                                </select>
                            </td>
                            <td>
                                <select>
                                    <option value="">Sim</option>
                                    <option value="">Não</option>
                                </select>
                            </td>
                            <td><button className="ui icon blue button"><i className="save icon"></i></button></td>
                        </tr>
            );
        }
        return arr;
    }

    renderGames(){
        let arr = [];
        for(let i=0;i<64;i++){
            arr.push(
                <tr>
                            <td>1</td>
                            <td>Grupo A</td>
                            <td>15/08/2018</td>
                            <td>
                                <select>
                                    <option></option>
                                    <option>Argentina</option>
                                    <option>Brasil</option>
                                    <option>Alemanha</option>
                                </select>
                            </td>
                            <td>
                                <input style={{width:"40px"}} type="text" />
                            </td>
                            <td>
                            <select>
                                    <option></option>
                                    <option>Argentina</option>
                                    <option>Brasil</option>
                                    <option>Alemanha</option>
                                </select>
                            </td>
                            <td>
                                <input style={{width:"40px"}} type="text" />
                            </td>
                            <td><button className="ui icon blue button"><i className="save icon"></i></button></td>
                        </tr>
            );
        }

        return arr;
    }

    render(){
        return (
            <div>
            <p><i class="cog icon"></i>  <u><b>Admin</b></u></p>
            <br />
            <div className="ui segment">
                <p><b>Usuários</b></p>
                <hr />
                <table className="ui collapsing compact small table">
                    <thead>
                        <tr>
                           <th>Id</th>
                           <th>Nome</th>
                           <th>Data cadastro</th>
                           <th>Pagou?</th>
                           <th>Admin?</th>
                           <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </table>
            </div>
            <br />
            <div className="ui segment">
                <p><b>Artilheiros</b></p>
                <hr />
                <table className="ui collapsing compact small table">
                    <thead>
                        <tr>
                           <th>Nome</th>
                           <th>Gols</th>
                           <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Leonel Messi</td>
                            <td><input style={{width:"40px"}} type="text" /></td>
                            <td><button className="ui icon blue button"><i className="save icon"></i></button></td>
                        </tr>
                        <tr>
                            <td>Cristiano Ronaldo</td>
                            <td><input style={{width:"40px"}} type="text" /></td>
                            <td><button className="ui icon blue button"><i className="save icon"></i></button></td>
                        </tr>
                        <tr>
                            <td>Neymar</td>
                            <td><input style={{width:"40px"}} type="text" /></td>
                            <td><button className="ui icon blue button"><i className="save icon"></i></button></td>
                        </tr>
                        <tr>
                            <td>Gabriel Jesus</td>
                            <td><input style={{width:"40px"}} type="text" /></td>
                            <td><button className="ui icon blue button"><i className="save icon"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <AdminMatchs />
            <br /><br />
            </div>
        );
    }
}

export default connect(null, actions)(Admin);