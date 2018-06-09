import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminMatchs from './AdminMatchs';
import AdminUser from './AdminUser';
import AdminPlayers from './AdminPlayers'
import * as actions from '../../actions';
import {Tabs,Tab} from 'react-bootstrap';

class Admin extends Component{

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
            <p><i className="cog icon"></i>  <u><b>Admin</b></u></p>
            <br />

            <Tabs defaultActiveKey={1} id="tabAdmin">
                <Tab eventKey={1} title="Usuários">
                    <AdminUser />
                </Tab>
                <Tab eventKey={2} title="Artilheiros">
                    <AdminPlayers />
                </Tab>
                <Tab eventKey={3} title="Jogos">
                    <AdminMatchs />
                </Tab>
            </Tabs>
            </div>
        );
    }
}

export default connect(null, actions)(Admin);