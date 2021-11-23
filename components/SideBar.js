import React from "react";
import Link from "next/link";
import sidebar from "../styles/sidebar.module.css"

class SideBar extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            selected : this.props.index
        }

    }

    sideBarChanged = this.props.changed

    handleClick = (i) => {
        this.setState({
            selected : i
        })
    }


    render() {
        return (
            <div className={sidebar.sidebar}>

                <div className={this.state.selected === 1 ? sidebar.selected : sidebar.unselect}>
                    <Link href={"/"} >
                        <a onClick={() => this.setState({selected : 1})}>Введение в теорему</a>
                    </Link>
                </div>

                <div className={this.state.selected === 2 ? sidebar.selected : sidebar.unselect}>
                    <Link href={"/lvl1"}>
                        <a onClick={() => this.setState({selected : 2})}>Критичесский граф</a>
                    </Link>
                </div>

                <div className={this.state.selected === 3 ? sidebar.selected : sidebar.unselect}>
                <Link href={"/"}>
                    <a onClick={() => this.setState({selected : 3})}>.................</a>
                </Link>
            </div>

            </div>
        );
    }
}

export default SideBar