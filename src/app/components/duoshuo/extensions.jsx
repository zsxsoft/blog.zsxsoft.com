///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
class DuoshuoExtensions extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let duoshuoType = "ds-" + this.props.type;
        setTimeout(() => {
            window.DUOSHUO.initSelector("." + duoshuoType, window.DUOSHUO.selectors['.' + duoshuoType]);
        }, 1000);
    }
    render() {
        let {
            element,
            type, 
            id,
            duoshuoKey,
            url, 
            title,
            content,
            ...other,
        } = this.props;
        let duoshuoType = "ds-" + type;
        let props = {
            className: duoshuoType, 
            "data-thread-id": id, 
            "data-thread-key": duoshuoKey, 
            "data-title": title, 
            "data-content": content,
            "data-url": url,
            ...other,
        }
        if (element === "div") {
            return (<div {...props}/>);
        } 
        return (<span {...props}/>);
    }
};

export default DuoshuoExtensions;
