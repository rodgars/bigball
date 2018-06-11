import React, {Component} from 'react';
import {connect} from 'react-redux';
import AdminMatchs from './AdminMatchs';
import AdminUser from './AdminUser';
import AdminPlayers from './AdminPlayers'
import * as actions from '../../actions';
import {Tabs,Tab} from 'react-bootstrap';

class Admin extends Component{

    componentDidMount(){
        this.props.fetchSituation();
        this.props.fetchStatus();
    }

    render(){
        if(this.props.auth.isAdmin){
            return (
                <div>
                <p><i className="cog icon"></i>  <u><b>Admin</b></u></p>
                <br />
    
                <Tabs defaultActiveKey={3} id="tabAdmin">
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
        }else{
            return (<div><h2>Você não tem autorização para acessar esse conteúdo.</h2><br /><br/></div>);
        }

    }
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps, actions)(Admin);