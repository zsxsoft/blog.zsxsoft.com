///<reference path="../../../../typings/tsd.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import Extension from './Extensions';
export default class Share extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Extension {...this.props}>
            <div id="ds-reset">
			<ul className="ds-share-icons-32">
                <li style={{top: 8, position: "relative"}}>分享到：</li>
                <li> <a className="ds-weibo" href="javascript:void(0);" data-service="weibo"></a> </li> 
                <li> <a className="ds-qzone" href="javascript:void(0);" data-service="qzone"></a> </li>
                <li> <a className="ds-qq" href="javascript:void(0);" data-service="qq"></a> </li> 
                <li> <a className="ds-wechat" href="javascript:void(0);" data-service="wechat"></a> </li> 
                <li> <a className="ds-youdao" href="javascript:void(0);" data-service="youdao"></a> </li> 
                <li> <a className="ds-facebook" href="javascript:void(0);" data-service="facebook"></a> </li> 
                <li> <a className="ds-twitter" href="javascript:void(0);" data-service="twitter"></a> </li> 
            </ul></div>
			</Extension>
        );
    }
};