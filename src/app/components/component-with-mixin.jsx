///<reference path="../../../typings/tsd.d.ts" />
import React from 'react';
import {
    Mixins,
}
from 'material-ui';
let {
    StylePropable,
    StyleResizable,
} = Mixins;
class ComponentWithMixin extends React.Component {
    mergeAndPrefix() { // for old support
        return Mixins.StylePropable.mergeStyles.apply(this, arguments);
    }
    isDeviceSize() {
        return Mixins.StyleResizable.isDeviceSize.apply(this, arguments);
    }
    prepareStyles() {
        return Mixins.StylePropable.prepareStyles.apply(this, arguments);
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
}

export default ComponentWithMixin;
