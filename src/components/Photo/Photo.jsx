import React, { Component } from 'react'
import classnames from 'classnames'

import './Photo.styl'
import HeartIcon from 'material-ui-icons/Favorite'

class Photo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false
        }

        this._onLoad = this._onLoad.bind(this)
    }

    _onLoad() {
        this.setState({ loaded: true })
    }

    render() {
        const {
            likes,
            images,
            caption } = this.props
        const { loaded } = this.state

        const { url } = images.thumbnail
        const style = {}
        const classes = classnames({
            Photo: true,
            loaded
        })

        if (loaded) {
            style.backgroundImage = `url(${url})`
        }

        return <div className={classes} style={style}>
            <img className='Photo__img' src={url} onLoad={this._onLoad}/>
            <div className='Photo__info'>
                <div className='Photo__likes'>
                    <HeartIcon className='Photo__likes-icon' color='contrast'/>
                    <HeartIcon className='Photo__likes-icon' color='disabled'/>
                    <div className='Photo__likes-count'>{likes.count}</div>
                </div>
                {caption && <div className='Photo__desc'>{caption.text}</div>}
            </div>
        </div>
    }
}

export default Photo
