import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="auth/google"><i class="material-icons left">vpn_key</i>Login with Google</a></li>;
            default:
                return [
                    <li key="1"><a href="/ranking"><i class="material-icons left">view_list</i>Ranking Geral</a></li>,
                    <li key="2"><a href="/game"><i class="material-icons left">create</i>Meu jogo</a></li>,
                    <li key="2"><a href="/rule">Regras</a></li>,
                    <li key="2"><a href="/payment">Como pagar</a></li>,
                    <li key="2"><a href="/admin">Admin</a></li>,
                    <li key="3"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper orange darken-4">
                    <Link to="/" className="left brand-logo"><img src="assets/logo1.png" className="responsive-img" alt=""/> </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps)(Header);