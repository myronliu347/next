import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp2;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { checkMomentObj } from '../utils';

function scrollTo(element, to, duration) {
    var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
        return setTimeout(arguments.length <= 0 ? undefined : arguments[0], 10);
    };

    if (duration <= 0) {
        element.scrollTop = to;
        return;
    }

    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    requestAnimationFrame(function () {
        element.scrollTop = element.scrollTop + perTick;

        if (element.scrollTop === to) {
            return;
        }

        scrollTo(element, to, duration - 10);
    });
}

var noop = function noop() {};

var TimeMenu = (_temp2 = _class = function (_React$Component) {
    _inherits(TimeMenu, _React$Component);

    function TimeMenu() {
        var _temp, _this, _ret;

        _classCallCheck(this, TimeMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._menuRefHandler = function (ref) {
            _this.menu = ref;
        }, _this.createTimeMenuItem = function (index) {
            var _classnames;

            var _this$props = _this.props,
                prefix = _this$props.prefix,
                mode = _this$props.mode,
                activeIndex = _this$props.activeIndex,
                disabled = _this$props.disabled,
                disabledItems = _this$props.disabledItems,
                onSelect = _this$props.onSelect;

            var isDisabled = disabled || disabledItems(index);
            var itemCls = classnames((_classnames = {}, _classnames[prefix + 'time-picker-menu-item'] = true, _classnames[prefix + 'disabled'] = isDisabled, _classnames[prefix + 'selected'] = index === activeIndex, _classnames));
            var handleClick = isDisabled ? noop : function () {
                return onSelect(index, mode);
            };

            return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                React.createElement(
                    'li',
                    {
                        role: 'option',
                        'aria-selected': String(index === activeIndex),
                        key: index,
                        title: index,
                        className: itemCls,
                        onClick: handleClick
                    },
                    index
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    TimeMenu.prototype.componentDidMount = function componentDidMount() {
        this.scrollToSelected(0);
    };

    TimeMenu.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (prevProps.activeIndex !== this.props.activeIndex) {
            this.scrollToSelected(120);
        }
    };

    TimeMenu.prototype.scrollToSelected = function scrollToSelected() {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _props = this.props,
            activeIndex = _props.activeIndex,
            step = _props.step;

        var targetIndex = Math.floor((activeIndex || 0) / step);
        var firstItem = this.menu.children[targetIndex];
        var offsetTo = firstItem.offsetTop;
        scrollTo(this.menu, offsetTo, duration);
    };

    TimeMenu.prototype.render = function render() {
        var _props2 = this.props,
            prefix = _props2.prefix,
            title = _props2.title,
            mode = _props2.mode,
            step = _props2.step,
            value = _props2.value;

        var total = mode === 'hour' ? 24 : 60;
        var list = [];
        var last = 0;
        for (var i = 0; i < total; i++) {
            if (i % step === 0) {
                last = i;
                list.push(this.createTimeMenuItem(i));
            }
        }

        if (last < total - 1 && value && moment.isMoment(value) && value.hour() === 23) {
            list.push(this.createTimeMenuItem(total - 1));
        }

        var menuTitle = title ? React.createElement(
            'div',
            { className: prefix + 'time-picker-menu-title' },
            title
        ) : null;

        return React.createElement(
            'div',
            { className: prefix + 'time-picker-menu' },
            menuTitle,
            React.createElement(
                'ul',
                {
                    role: 'listbox',
                    className: prefix + 'time-picker-menu-' + mode,
                    ref: this._menuRefHandler
                },
                list
            )
        );
    };

    return TimeMenu;
}(React.Component), _class.propTypes = {
    prefix: PropTypes.string,
    title: PropTypes.node,
    mode: PropTypes.oneOf(['hour', 'minute', 'second']),
    step: PropTypes.number,
    activeIndex: PropTypes.number,
    disabledItems: PropTypes.func,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    value: checkMomentObj
}, _class.defaultProps = {
    step: 1,
    disabledItems: function disabledItems() {
        return false;
    },
    onSelect: function onSelect() {},
    disabled: false
}, _temp2);
TimeMenu.displayName = 'TimeMenu';


export default TimeMenu;