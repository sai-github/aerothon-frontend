import { Component } from 'react';
// import { Container, Button, Link } from 'react-floating-action-button';
import './widget.css';
import FloatingMenuItem from './WidgetItem';
// import { Link, Router } from 'react-router-dom';

class FloatingMenu extends Component {
    constructor() {
        super();
        this.state = {
            toggled: false,
        };
    }

    toggleMenu() {
        this.setState({ toggled: !this.state.toggled });
    }

    render() {
        let buttons = [];
        let className = 'floating-menu';
        let icon = '+';
        if (this.state.toggled) {
            className += ' open';
            icon = '-';
            buttons.push(
                <FloatingMenuItem label="Item 1" icon="+" action="" key="i1" />
                // <Router>
                //     <Link to="/login">
                //         <button type="button">Click</button>
                //     </Link>
                // </Router>
            );
            buttons.push(
                <FloatingMenuItem label="Item 2" icon="+" action="" key="i2" />
            );
        }
        buttons.push(
            <FloatingMenuItem
                label=""
                icon={icon}
                action={this.toggleMenu.bind(this)}
                key="m"
            />
        );
        return (
            <div className="container">
                <div className={className}>{buttons}</div>
            </div>
        );
    }
}

export default FloatingMenu;
