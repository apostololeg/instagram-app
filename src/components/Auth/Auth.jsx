import React, { Component } from 'react'

import Button from 'material-ui/Button'
import './Auth.styl'

import {
    clientID,
    redirectUrl } from '../../api'

const URL = `https://api.instagram.com/oauth/authorize/?client_id=${clientID}&redirect_uri=${redirectUrl}&response_type=token`

const Auth = () => (
    <div className='Auth'>
        <div className='Auth__button'>
            <Button raised href={URL} color='primary'>Authorize</Button>
        </div>
        <div className='Auth__hint'>
            Allow the widget to use your token to show instagram data
        </div>
    </div>
)

export default Auth
