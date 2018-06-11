import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import _ from 'lodash';
import * as actions from '../../actions/AdminActions';

const checkUser = (user) => {
    return typeof(user.name) != 'undefined';
};

class AdminUser extends Component {
    constructor(props, context){
        super(props, context);

        this.handleHide = this.handleHide.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.findUsersByPaid = this.findUsersByPaid.bind(this);
    
        this.state = {
          user: {}
        };
   }

   componentDidMount(){
       this.props.fetchUserList("");
   }

    handleHide() {
        this.setState({ user: {} });
    }

    selectUser(id,e){
        e.preventDefault();

        const user = _.find(this.props.users, {userId:id});

        this.setState((state) => {
            return {
                user:
                {
                    _id:user._id,
                    name:user.name,
                    date:user.registerDate,
                    isAdmin:user.isAdmin,
                    isPaid:user.isPaid
                }
            };
        });
        
    }

    renderUsers() {
        return _.map(this.props.users, user => {
            return (
                <tr key={user.userId} onClick={this.selectUser.bind(this, user.userId)}>
                    <td>{user.userId}</td>
                    <td>{user.name}</td>
                    <td>{user.registerDate}</td>
                    <td>{user.isPaid ? "Sim" : "Não"}</td>
                    <td>{user.isAdmin ? "Sim" : "Não"}</td>
                    <td></td>
                </tr>
            );
        });
    }

    findUsersByPaid(e){
        let value = e.target.value;
        if(value != "") value = "?isPaid=" + value;

        this.props.fetchUserList(value);
        this.setState({ user: {} });
    }

    saveUser(id){
        let values = {
            isPaid:this.ddlIsPaid.value, 
            isAdmin:this.ddlIsAdmin.value
        };

        this.props.saveUser(id, values);
        let value = this.ddlFindPaid.value;
        if(value != "") value = "?isPaid=" + value;
        
        this.props.fetchUserList(value);
        this.handleHide();
        alert("Usuário alterado!");
    }

    render(){
        return (
            <div>
            <br /><br />
            <b>Pagou?</b>
            <select ref={ddl => this.ddlFindPaid = ddl} style={{width:"200px"}} className="form-control" onChange={this.findUsersByPaid}>
                <option value="">Selecione um valor</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
            </select>
            <br /><br />
            <table className="ui compact small table">
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
            <br /><br />
            <Modal
                {...this.props}
                show={checkUser(this.state.user)}
                onHide={this.handleHide}
                dialogClassName="custom-modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                    <i className="icon user"></i>Atualizar usuário
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="ui small compact definition table">
                        <tbody>
                            <tr><td>Nome</td><td>{this.state.user.name}</td></tr>
                            <tr><td>Cadastro</td><td>{this.state.user.date}</td></tr>
                            <tr><td>Pagou?</td><td>
                                <select ref={ddl => this.ddlIsPaid = ddl} defaultValue={this.state.user.isPaid} className="form-control">
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </select>
                            </td></tr>
                            <tr><td>Admin?</td><td>
                                <select ref={ddl => this.ddlIsAdmin = ddl} defaultValue={this.state.user.isAdmin} className="form-control">
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </select>
                                </td></tr>
                        </tbody>
                    </table>
                    <button className="ui blue button" onClick={this.saveUser.bind(this, this.state.user._id)}><i className="ui icon save"></i>Salvar</button>
                </Modal.Body>
            </Modal>
            </div>
        );
    }
}

function mapStateToProps({users}){
    return {users};
}

export default connect(mapStateToProps, actions)(AdminUser);