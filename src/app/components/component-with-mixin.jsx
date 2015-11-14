///<reference path="../../typings/tsd.d.ts" />
import React from 'react';
import {
	Mixins,
}
from 'material-ui';
let {
	StylePropable, 
	StyleResizable,
} = Mixins;
let ComponentWithMixin = React.createClass({
	mixins: [StylePropable, StyleResizable],
	render: () => {},
});
export default ComponentWithMixin;
