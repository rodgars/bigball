import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

const checkUser = (user) => {
    return typeof(user.name) != 'undefined';
};

class AdminUser extends Component {
    constructor(props, context){
        super(props, context);

        this.handleHide = this.handleHide.bind(this);
        this.selectUser = this.selectUser.bind(this);
    
        this.state = {
          user: {}
        };
   }

    handleHide() {
        this.setState({ user: {} });
    }

    selectUser(id,e){
        e.preventDefault();
        this.setState((state) => {
            return {user:{name:"Rodrigo Garcia",date:"20/03/2018",isAdmin:true,isPaid:false}};
        });
        
    }

    renderUsers() {
        let arr = [];
        for(let i=0; i< 30; i++){
            arr.push(
                <tr onClick={this.selectUser.bind(this, 1)}>
                    <td>1</td>
                    <td>Rodrigo Garcia</td>
                    <td>20/03/2018</td>
                    <td>Não</td>
                    <td>Não</td>
                    <td></td>
                </tr>
            );
        }
        return arr;
    }

    render(){
        return (
            <div>
            <br /><br />
            <table><tr><td>
            <div class="ui icon input">
                <input type="text" placeholder="Usuários..." />
                <i class="circular search link icon"></i>
            </div></td><td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pagou?</td><td> <select className="form-control">
                <option value="">Selecione um valor</option>
                <option value="">Sim</option>
                <option value="">Não</option>
            </select></td></tr></table>
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
                                <select className="form-control">
                                    <option value="">Sim</option>
                                    <option value="">Não</option>
                                </select>
                            </td></tr>
                            <tr><td>Admin?</td><td>
                                <select className="form-control">
                                    <option value="">Sim</option>
                                    <option value="">Não</option>
                                </select>
                                </td></tr>
                        </tbody>
                    </table>
                    <button className="ui blue button"><i className="ui icon save"></i>Salvar</button>
                </Modal.Body>
            </Modal>
            </div>
        );
    }
};

export default AdminUser;