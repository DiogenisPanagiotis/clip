import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from './actions/actions'
import './App.css'
// const getTitleAtUrl = require('get-title-at-url')
// const getTitle = require('get-title');
// const hyperquest = require('hyperquest');
const getTitle = require('url-to-title')

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            link: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(e) {
        this.setState({
            link: e.target.value
        })
    }

    handleClick() {
        const { link } = this.state 
        const { addLink } = this.props.actions

        getTitle(`https://crossorigin.me/${link}`, (err, title) => {
            console.log(title)
            console.log(err)
            addLink({
                url: link,
                title: err ? 'No Title' : title.includes("Error") ? "No Title" : title,
                tags: [],
                date: new Date().toLocaleString()
            })
        })

        this.setState({ link: '' })
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Link</h5>
                            <button type="button" className="close no-glow" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div id="search-modal" className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control no-glow" 
                                    placeholder="https://example.com"
                                    value={this.state.link}
                                    onChange={this.handleChange}
                                />
                                <button 
                                    id="modalSubmitButton"
                                    type="button" 
                                    className="btn btn-md btn-primary"
                                    onClick={this.handleClick}
                                    data-dismiss="modal"
                                    >
                                    Add Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ exampleReducer }) => ({
    exampleReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
