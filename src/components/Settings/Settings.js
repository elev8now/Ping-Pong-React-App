import React, { Component } from "react";
import Player from "./../Player/Player.wrap";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            winningScore: 11,
            errorName: false,
            errorTournament: false,
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleNameError = this.handleNameError.bind(this);
        this.handleSubmitName = this.handleSubmitName.bind(this);
        this.handleChangeScore = this.handleChangeScore.bind(this);
        this.handleTournamentError = this.handleTournamentError.bind(this);
        this.handleSubmitTournament = this.handleSubmitTournament.bind(this);
    };

    handleChangeName(e) {
        this.setState({ name: e.currentTarget.value });
    };

    handleNameError(e) {
        e.preventDefault();
        this.setState({
            errorName: true,
            name: "",
        });
        setTimeout(() => this.setState({ errorName: false }), 4000);
    };

    handleSubmitName(e) {
        e.preventDefault();
        this.setState({ name: "" });
        this.props.handleName(this.state);
    };

    handleChangeScore(e) {
        this.setState({ winningScore: e.currentTarget.value });
    };
    
    handleTournamentError(e) {
        e.preventDefault();
        this.setState({ errorTournament: true });
        setTimeout(() => this.setState({ errorTournament: false }), 4000);
    };

    handleSubmitTournament(e) {
        e.preventDefault();
        this.props.handleTournament(this.state);
        this.setState({ errorTournament: false });
    };
    
    render() {
        let { name, winningScore, errorTournament, errorName } = this.state;
        let { players } = this.props;

        const isName = name => RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$", "g").test(name);

        const isPowerOf2 = n => {
            for (let i = 1; i < 10; i += 1) {
                if (Math.pow(2, i) === n) {
                    return true;
                };
            }
            return false;
        };

        return (
            <>
                <div className="p-5 overflow-auto col-md-12">
                    <h3 className="text-center mb-3">New Tournament</h3>
                    <h5 className="text-center mb-3">Please add the names of all your players</h5>
                    <div className="container-settings">
                        <div>
                            <form onSubmit={ isName(name) ? this.handleSubmitName : this.handleNameError } className="clearfix">
                                <div>
                                    <label htmlFor="names" className="help-block">Add Player</label>
                                    <input onChange={ this.handleChangeName } id="names" className="form-control" value={ name } />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Add</button>
                                { !errorName ? null : <p className="alert alert-danger mt-3">Please enter a valid name.</p> }
                            </form>

                            <form onSubmit={ isPowerOf2(players.length) ? this.handleSubmitTournament : this.handleTournamentError } className="form mt-3 p-0">
                                <label className="help-block">Select winning score</label>
                                <select onChange={ this.handleChangeScore } className="custom-select" value={ winningScore }>
                                    <option value="11">11</option>
                                    <option value="21">21</option>
                                </select>

                                <input type="submit" className="btn btn-success mt-3" value="Start" />
                                { !errorTournament ? null : <p className="alert alert-danger mt-3">The number of players must be n<sup>2</sup> (4, 8, 16, 32 etc)</p> }
                            </form>
                        </div>
                        
                        {
                            players.length === 0 ? null :
                                <div>
                                    <ul className="list-group mt-3">
                                        {
                                            players.map((player, count) => (
                                                <Player key={ player.id } id={ player.id } name={ player.name } editMode={ player.editMode } count={ count } />
                                            ))
                                        }
                                    </ul>
                                </div>
                        }
                        
                    </div>
                </div>
            </>
        );
    }
};

export default Settings;