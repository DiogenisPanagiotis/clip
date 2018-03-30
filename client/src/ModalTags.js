import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from './actions/actions'
import { Creatable } from 'react-select';
import './App.css'
import 'react-select/dist/react-select.css';
// const getTitleAtUrl = require('get-title-at-url')

class ModalTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null
        }

        this.renderCreatable = this.renderCreatable.bind(this)
    }

    handleChange = selectedOption => {
    	const { addTag } = this.props.actions
		const { index } = this.props.exampleReducer.editingBookmark
        addTag({
        	index: Number(index),
        	elements: selectedOption
        })
    }

    renderCreatable() {
	    const { editingBookmark } = this.props.exampleReducer
	    const { bookmarks } = this.props.exampleReducer
	    if (Object.keys(editingBookmark).length > 0) {    	
		    const tags = bookmarks[editingBookmark.index].tags
	        return (
	            <Creatable 
	            	className="c"
	                multi={true}
	                value={tags}
	                onChange={this.handleChange}
	                // options={[
	                //     { value: '0', label: 'Article' },
	                //     { value: '1', label: 'News' },
	                //     { value: '2', label: 'Images' },
	                //     { value: '3', label: 'Miscellaneous' },
	                // ]}
	            />
	        )
	    }
    }

    render() {
    	const { editingBookmark } = this.props.exampleReducer
    	const bookmark = editingBookmark.bookmark ? editingBookmark.bookmark.title : 'No Title'
        return (
            <div className="modal fade" id="tagsModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="tagsModalLabel">{bookmark}</h5>
                            <button type="button" className="close no-glow" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        	{this.renderCreatable()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalTags)
