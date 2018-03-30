import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from './actions/actions'
import Modal from './Modal'
import ModalTags from './ModalTags'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleEditingBookmark = this.handleEditingBookmark.bind(this)
    }

    handleEditingBookmark(bookmark, i) {
        const { editingBookmark } = this.props.actions
        editingBookmark({
            bookmark: bookmark,
            index: i
        })
    }

    handleInput(e) {
        console.log(this.state)
        this.setState({ input: e.target.value })
    }

    renderLinks() {
        const { bookmarks } = this.props.exampleReducer
        const { input } = this.state

        if (bookmarks.length > 0) {
            return (
                <div>
                    {bookmarks.filter(bookmark => bookmark.title.indexOf(input) !== -1).map((bookmark, i) => {
                        return (
                            <div className="jumbotron bookmark" key={i} index={i}>
                                <a className="bookmarkTitle" href={bookmark.url} target="_blank"> {bookmark.title} </a>
                                <div></div>
                                <button 
                                    id="addTags" 
                                    type="button" 
                                    className="btn btn-sm btn-light" 
                                    onClick={() => this.handleEditingBookmark(bookmark, i)}
                                    data-toggle="modal" 
                                    data-target="#tagsModal">
                                    + Add Tag
                                    </button>
                                    {bookmark.tags.map((tag, i) => {
                                        return (
                                            <button 
                                                key={i}
                                                type="button" 
                                                className="btn btn-sm btn-light tags" 
                                                >
                                                {tag.label}
                                            </button>
                                        )
                                    })}
                                <div className="bookmarkUrl"> {bookmark.url} </div>
                                <div className="bookmarkTime"> {bookmark.date} </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div className="jumbotron bookmark"> No bookmarks yet! </div>
            )
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        <div id="left" className="col-md-3"></div>
                        <div id="search" className="col-md-6">
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control no-glow" 
                                    value={this.state.input}
                                    onChange={this.handleInput}
                                    placeholder="Search"/>
                            </div>
                            <button 
                                id="addLinkBtn" 
                                type="button" 
                                className="btn btn-md btn-primary" 
                                data-toggle="modal" 
                                data-target="#exampleModal">
                                Add Link
                                </button>
                                {this.renderLinks()}
                        </div>
                        <div id="right" className="col-md-3"></div>
                        <Modal />
                        <ModalTags />
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
