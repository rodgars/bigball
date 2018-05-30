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
                    <li><Link key="1" to="/ranking"><i class="material-icons left">view_list</i>Ranking Geral</Link></li>,
                    <li><Link key="2" to="/game"><i class="material-icons left">create</i>Meu jogo</Link></li>,
                    <li><Link key="3" to="/rule">Regras</Link></li>,
                    <li><Link key="4" to="/payment">Como Pagar</Link></li>,
                    <li><Link key="5" to="/admin">Admin</Link></li>,
                    <li><Link key="6" to="/api/logout">Logout</Link></li>
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
