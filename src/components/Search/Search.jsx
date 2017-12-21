import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { throttle } from '../../utils'
import {
    setQuery,
    updateSearchData } from '../../actions'

import './Search.styl'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import SearchIcon from 'material-ui-icons/Search'
import Photo from '../Photo/Photo.jsx'

const SHOW_TIMEOUT = 100 // ms

@connect(({
    query,
    searchID,
    searchData,
    requestInProgress
}) => ({
    query,
    searchID,
    searchData,
    requestInProgress
}))
class Search extends Component {
    constructor(props) {
        super(props)

        this._query = props.query
        this._bindCtx()
    }

    _bindCtx() {
        [
            '_onQueryChange',
            '_update'
        ].map(fn => this[fn] = this[fn].bind(this))
    }

    _update() {
        const { dispatch } = this.props

        dispatch(setQuery(this._query))
        dispatch(updateSearchData())
    }

    _onQueryChange(e) {
        this._query = e.target.value
        throttle(this._update, 100)
    }

    _renderInput() {
        const { query } = this.props
        const inputProps = {
            style: {
                padding: '18px 30px 16px',
                boxSizing: 'border-box',
                fontSize: '120%'
            }
        }
        const inputLabelProps = {
            style: {
                display: 'flex',
                padding: '20px 30px',
                fontSize: '120%'
            }
        }

        return <div className='Search__input'>
            <TextField id='search'
                label={[<SearchIcon/>, 'search']}
                placeholder='start writing from @ or #'
                defaultValue={query}
                onChange={this._onQueryChange}
                InputProps={inputProps}
                InputLabelProps={inputLabelProps}
                fullWidth />
        </div>
    }

    _renderFound() {
        const {
            query,
            searchData,
            requestInProgress } = this.props

        const count = searchData.length
        const found = count
            ? `found ${count} items`
            : 'no results'
        const classes = classnames({
            Search__found: true,
            hidden: !query
        })

        const content = requestInProgress
            ? <CircularProgress color='accent' />
            : found

        return <div className={classes}>{content}</div>
    }

    _renderResults() {
        const { searchData } = this.props

            // {JSON.stringify(searchData)}
        return <div className='Search__results'>
            {searchData.map(data => <Photo {...data}/>)}
        </div>
    }

    render() {
        const inputProps = {
            style: {
                padding: '20px 30px',
                boxSizing: 'border-box',
                fontSize: '120%'
            }
        }
        const inputLabelProps = {
            style: {
                display: 'flex',
                padding: '0 20px',
                fontSize: '120%'
            }
        }

        return <div className='Search transition-item'>
            {this._renderInput()}
            {this._renderFound()}
            {this._renderResults()}
        </div>
    }
}

export default Search
