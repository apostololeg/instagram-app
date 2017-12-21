import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    createMuiTheme,
    MuiThemeProvider } from 'material-ui/styles'
import { pink } from 'material-ui/colors'

import { request } from '../../utils'
import { setPeoples } from '../../actions'

import './App.styl'
import Auth from '../Auth/Auth.jsx'
import Search from '../Search/Search.jsx'

const theme = createMuiTheme({
    palette: {
        primary: pink
    }
})

@connect(({ token }) => ({ token }))
class App extends Component {
    render() {
        const { token } = this.props

        return <MuiThemeProvider theme={theme}>
            <div className='App'>
                {token ? <Search/> : <Auth/>}
            </div>
        </MuiThemeProvider>
    }
}

export default App
