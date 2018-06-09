import React,{Component} from 'react';
import {connect} from 'react-redux';

const renderUsers = () => {
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
};

class AdminPlayers extends Component {
    render(){
        return (
            <table className="ui compact small table">
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
        );
    }
}

export default connect()(AdminPlayers);