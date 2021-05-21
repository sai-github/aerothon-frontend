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
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {},
        };
        this._dragStart = this._dragStart.bind(this);
        this._dragging = this._dragging.bind(this);
        this._dragEnd = this._dragEnd.bind(this);
    }

    _dragStart(e) {
        this.setState({
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true,
        });
    }

    _dragging(e) {
        if (this.state.dragging) {
            var left = e.screenX - this.state.diffX;
            var top = e.screenY - this.state.diffY;

            this.setState({
                styles: {
                    left: left,
                    top: top,
                },
            });
        }
    }

    _dragEnd() {
        this.setState({ dragging: false });
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
            <div
                className="container"
                style={this.state.styles}
                onMouseDown={this._dragStart}
                onMouseMove={this._dragging}
                onMouseUp={this._dragEnd}
            >
                <div className={className}>{buttons}</div>
            </div>
        );
    }
}

export default FloatingMenu;
