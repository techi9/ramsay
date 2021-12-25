import React from "react";
import Link from "next/link";
import sidebar from "../styles/sidebar.module.css"

class SideBar extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            selected : this.props.selected
        }

    }


    handleClick = (i) => {
        this.setState({
            selected : i
        })
    }


    render() {
        return (
            <div className={sidebar.sidebar}>

                <div className={this.state.selected === 1 ? sidebar.selected : sidebar.unselect}>
                    <Link href={"/lvl0"} >
                        <a onClick={() => this.setState({selected : 1})}>Введение</a>
                    </Link>
                </div>

                <div className={this.state.selected === 2 ? sidebar.selected : sidebar.unselect}>
                    <Link href={"/lvl1"}>
                        <a onClick={() => this.setState({selected : 2})}>Уровень 1</a>
                    </Link>
                </div>

                <div className={this.state.selected === 3 ? sidebar.selected : sidebar.unselect}>
                <Link href={"/lvl2"}>
                    <a onClick={() => this.setState({selected : 3})}>Уровень 2</a>
                </Link>
                </div>


                <div className={this.state.selected === 4 ? sidebar.selected : sidebar.unselect}>
                    <Link href={"/lvl3"}>
                        <a onClick={() => this.setState({selected : 4})}>Уровень 3</a>
                    </Link>
                </div>

                <div className={this.state.selected === 5 ? sidebar.selected : sidebar.unselect}>
                    <Link href={"/lvl4"}>
                        <a onClick={() => this.setState({selected : 5})}>Уровень 4</a>
                    </Link>
                </div>

                <div className={this.state.selected === 6 ? sidebar.selected : sidebar.unselect}>
                    <Link href={"/lvl5"}>
                        <a onClick={() => this.setState({selected : 6})}>Уровень 5</a>
                    </Link>
                </div>

                <div className={this.state.selected === 99 ? sidebar.selected : sidebar.unselect}>
                    <Link href={"/"}>
                        <a onClick={() => this.setState({selected : 99})}>Вернуться в меню</a>
                    </Link>
                </div>


            </div>
        );
    }
}

export default SideBar