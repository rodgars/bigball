import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

class Header extends Component{
    renderAdminLink(isAdmin){
        if(isAdmin)
            return (<NavItem key="5" componentClass={Link} href="/admin" to="/admin"><i className="cog icon"></i> Admin</NavItem>);
    }

    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return [
                    <NavItem key="3" href="/rule"><i className="file icon"></i> Regras</NavItem>,
                    <NavItem key="7" href="/auth/google"><i className="google icon"></i> Login with Google</NavItem>
                ];
            default:
                const myGameUrl = `/game/${this.props.auth._id}`;
                return [
                    <NavItem key="1" componentClass={Link} href="/ranking" to="/ranking"><i className="trophy icon"></i> Ranking</NavItem>,
                    <NavItem key="2" href={myGameUrl}><i className="futbol icon"></i> Meu jogo</NavItem>,
                    <NavItem key="4" componentClass={Link} href="/payment" to="/payment"><i className="dollar sign icon"></i> Como Pagar</NavItem>,
                    <NavItem key="3" componentClass={Link} href="/rule" to="/rule"><i className="file icon"></i> Regras</NavItem>,
                    this.renderAdminLink(this.props.auth.isAdmin),
                    <NavItem key="6" href="/api/logout">Logout&nbsp;&nbsp;&nbsp;<img className="ui avatar image" src={this.props.auth.urlImg}  /></NavItem>
                ];
        }
    }

    render(){
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/ranking"><img src="/assets/logo1.png" /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.renderContent()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps)(Header);
