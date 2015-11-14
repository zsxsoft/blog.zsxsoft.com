///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
class DuoshuoEmbedThread extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.DUOSHUO.EmbedThread(".ds-thread");
    }
    render() {
        let {
            id,
            duoshuoKey,
            url, 
            title,
            ...other,
        } = this.props;
        return (
            <div
                className="ds-thread"
                data-thread-id={id}
                data-thread-key={duoshuoKey}
                data-title={title}
                data-url={url}
				{...other}
            />
        );
    }
};

export default DuoshuoEmbedThread;
