/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 */
 
if ( !window.requestAnimationFrame ) {
 
	window.requestAnimationFrame = ( function() {
 
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
 
			window.setTimeout( callback, 1000 / 60 );
 
		};
 
	} )();
 
}

/*!
 * isVis - v0.5.5 Aug 2011 - Page Visibility API Polyfill
 * Copyright (c) 2011 Addy Osmani
 * Dual licensed under the MIT and GPL licenses.
 */
(function () {

    window.visibly = {
        b: null,
        q: document,
        p: undefined,
        prefixes: ['webkit', 'ms'],
        props: ['VisibilityState', 'visibilitychange', 'Hidden'],
        m: ['focus', 'blur'],
        visibleCallbacks: [],
        hiddenCallbacks: [],
        _callbacks: [],

        onVisible: function ( _callback ) {
            this.visibleCallbacks.push(_callback);
        },
        onHidden: function ( _callback ) {
            this.hiddenCallbacks.push(_callback);
        },
        isSupported: function () {
            return (this._supports(0) || this._supports(1));
        },
        _supports: function ( index ) {
            return ((this.prefixes[index] + this.props[2]) in this.q);
        },
        runCallbacks: function ( index ) {
            if ( index ) {
                this._callbacks = (index == 1) ? this.visibleCallbacks : this.hiddenCallbacks;
                for (var i = 0; i < this._callbacks.length; i++) {
                    this._callbacks[i]();
                }
            }
        },
        _visible: function () {
            window.visibly.runCallbacks(1);
        },
        _hidden: function () {
            window.visibly.runCallbacks(2);
        },
        _nativeSwitch: function () {
            ((this.q[this.b + this.props[2]]) === true) ? this._hidden() : this._visible();
        },
        listen: function () {

            try { /*if no native page visibility support found..*/
                if (!(this.isSupported())) {
                    if (document.addEventListener) { /*for browsers without focusin/out support eg. firefox, opera use focus/blur*/
						/*window used instead of doc as Opera complains otherwise*/
                        window.addEventListener(this.m[0], this._visible, 1);
                        window.addEventListener(this.m[1], this._hidden, 1);
                    } else { /*IE <10s most reliable focus events are onfocusin/onfocusout*/
                        this.q.attachEvent('onfocusin', this._visible);
                        this.q.attachEvent('onfocusout', this._hidden);
                    }
                } else { /*switch support based on prefix*/
                    this.b =  (this._supports(0) == this.p) ? this.prefixes[1] : this.prefixes[0];
                    this.q.addEventListener(this.b + this.props[1], function () {
                        window.visibly._nativeSwitch.apply(window.visibly, arguments);
                    }, 1);
                }
            } catch (e) {}
        },
        init: function () {
            this.listen();
        }
    }

    this.visibly.init();

})();
