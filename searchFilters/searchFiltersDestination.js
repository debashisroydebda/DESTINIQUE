function InfoBox(n) {
    n = n || {};
    google.maps.OverlayView.apply(this, arguments);
    this.content_ = n.content || "";
    this.disableAutoPan_ = n.disableAutoPan || !1;
    this.maxWidth_ = n.maxWidth || 0;
    this.pixelOffset_ = n.pixelOffset || new google.maps.Size(0, 0);
    this.position_ = n.position || new google.maps.LatLng(0, 0);
    this.zIndex_ = n.zIndex || null;
    this.boxClass_ = n.boxClass || "infoBox";
    this.boxStyle_ = n.boxStyle || {};
    this.closeBoxMargin_ = n.closeBoxMargin || "2px";
    this.closeBoxURL_ = n.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
    n.closeBoxURL === "" && (this.closeBoxURL_ = "");
    this.infoBoxClearance_ = n.infoBoxClearance || new google.maps.Size(1, 1);
    typeof n.visible == "undefined" && (n.visible = typeof n.isHidden == "undefined" ? !0 : !n.isHidden);
    this.isHidden_ = !n.visible;
    this.alignBottom_ = n.alignBottom || !1;
    this.pane_ = n.pane || "floatPane";
    this.enableEventPropagation_ = n.enableEventPropagation || !1;
    this.div_ = null;
    this.closeListener_ = null;
    this.moveListener_ = null;
    this.contextListener_ = null;
    this.eventListeners_ = null;
    this.fixedWidthSet_ = null
}

function Swipe(n, t) {
    "use strict";

    function k() {
        var s, h;
        for (f = u.children, it = f.length, f.length < 2 && (t.continuous = !1), a.transitions && t.continuous && f.length < 3 && (u.appendChild(f[0].cloneNode(!0)), u.appendChild(u.children[1].cloneNode(!0)), f = u.children), l = new Array(f.length), r = n.getBoundingClientRect().width || n.offsetWidth, u.style.width = f.length * r + "px", s = f.length; s--;) h = f[s], h.style.width = r + "px", h.setAttribute("data-index", s), a.transitions && (h.style.left = s * -r + "px", o(s, i > s ? -r : i < s ? r : 0, 0));
        t.continuous && a.transitions && (o(e(i - 1), -r, 0), o(e(i + 1), r, 0));
        a.transitions || (u.style.left = i * -r + "px");
        n.style.visibility = "visible"
    }

    function ut() {
        t.continuous ? b(i - 1) : i && b(i - 1)
    }

    function tt() {
        t.continuous ? b(i + 1) : i < f.length - 1 && b(i + 1)
    }

    function e(n) {
        return (f.length + n % f.length) % f.length
    }

    function b(n, u) {
        var s, v, h;
        if (i != n) {
            if (a.transitions) {
                for (s = Math.abs(i - n) / (i - n), t.continuous && (v = s, s = -l[e(n)] / r, s !== v && (n = -s * f.length + n)), h = Math.abs(i - n) - 1; h--;) o(e((n > i ? n : i) - h - 1), r * s, 0);
                n = e(n);
                o(i, r * s, u || c);
                o(n, 0, u || c);
                t.continuous && o(e(n - s), -(r * s), 0)
            } else n = e(n), ft(i * -r, n * -r, u || c);
            i = n;
            d(t.callback && t.callback(i, f[i]))
        }
    }

    function o(n, t, i) {
        v(n, t, i);
        l[n] = t
    }

    function v(n, t, i) {
        var u = f[n],
            r = u && u.style;
        r && (r.webkitTransitionDuration = r.MozTransitionDuration = r.msTransitionDuration = r.OTransitionDuration = r.transitionDuration = i + "ms", r.webkitTransform = "translate(" + t + "px,0)translateZ(0)", r.msTransform = r.MozTransform = r.OTransform = "translateX(" + t + "px)")
    }

    function ft(n, r, e) {
        if (!e) {
            u.style.left = r + "px";
            return
        }
        var o = +new Date,
            s = setInterval(function() {
                var h = +new Date - o;
                if (h > e) {
                    u.style.left = r + "px";
                    p && nt();
                    t.transitionEnd && t.transitionEnd.call(event, i, f[i]);
                    clearInterval(s);
                    return
                }
                u.style.left = (r - n) * (Math.floor(h / e * 100) / 100) + n + "px"
            }, 4)
    }

    function nt() {
        rt = setTimeout(tt, p)
    }

    function y() {
        p = 0;
        clearTimeout(rt)
    }
    var et = function() {},
        d = function(n) {
            setTimeout(n || et, 0)
        },
        a = {
            addEventListener: !!window.addEventListener,
            touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: function(n) {
                var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"],
                    i;
                for (i in t)
                    if (n.style[t[i]] !== undefined) return !0;
                return !1
            }(document.createElement("swipe"))
        },
        u, f, l, r, it, i, c, p, rt;
    if (n) {
        u = n.children[0];
        t = t || {};
        i = parseInt(t.startSlide, 10) || 0;
        c = t.speed || 300;
        t.continuous = t.continuous !== undefined ? t.continuous : !0;
        p = t.auto || 0;
        var g = {},
            s = {},
            w, h = {
                handleEvent: function(n) {
                    switch (n.type) {
                        case "touchstart":
                            this.start(n);
                            break;
                        case "touchmove":
                            this.move(n);
                            break;
                        case "touchend":
                            d(this.end(n));
                            break;
                        case "webkitTransitionEnd":
                        case "msTransitionEnd":
                        case "oTransitionEnd":
                        case "otransitionend":
                        case "transitionend":
                            d(this.transitionEnd(n));
                            break;
                        case "resize":
                            d(k)
                    }
                    t.stopPropagation && n.stopPropagation()
                },
                start: function(n) {
                    var t = n.touches[0];
                    g = {
                        x: t.pageX,
                        y: t.pageY,
                        time: +new Date
                    };
                    w = undefined;
                    s = {};
                    u.addEventListener("touchmove", this, !1);
                    u.addEventListener("touchend", this, !1)
                },
                move: function(n) {
                    if (!(n.touches.length > 1) && (!n.scale || n.scale === 1)) {
                        t.disableScroll && n.preventDefault();
                        var u = n.touches[0];
                        s = {
                            x: u.pageX - g.x,
                            y: u.pageY - g.y
                        };
                        typeof w == "undefined" && (w = !!(w || Math.abs(s.x) < Math.abs(s.y)));
                        w || (n.preventDefault(), y(), t.continuous ? (v(e(i - 1), s.x + l[e(i - 1)], 0), v(i, s.x + l[i], 0), v(e(i + 1), s.x + l[e(i + 1)], 0)) : (s.x = s.x / (!i && s.x > 0 || i == f.length - 1 && s.x < 0 ? Math.abs(s.x) / r + 1 : 1), v(i - 1, s.x + l[i - 1], 0), v(i, s.x + l[i], 0), v(i + 1, s.x + l[i + 1], 0)))
                    }
                },
                end: function() {
                    var v = +new Date - g.time,
                        y = Number(v) < 250 && Math.abs(s.x) > 20 || Math.abs(s.x) > r / 2,
                        n = !i && s.x > 0 || i == f.length - 1 && s.x < 0,
                        a;
                    t.continuous && (n = !1);
                    a = s.x < 0;
                    w || (y && !n ? (a ? (t.continuous ? (o(e(i - 1), -r, 0), o(e(i + 2), r, 0)) : o(i - 1, -r, 0), o(i, l[i] - r, c), o(e(i + 1), l[e(i + 1)] - r, c), i = e(i + 1)) : (t.continuous ? (o(e(i + 1), r, 0), o(e(i - 2), -r, 0)) : o(i + 1, r, 0), o(i, l[i] + r, c), o(e(i - 1), l[e(i - 1)] + r, c), i = e(i - 1)), t.callback && t.callback(i, f[i])) : t.continuous ? (o(e(i - 1), -r, c), o(i, 0, c), o(e(i + 1), r, c)) : (o(i - 1, -r, c), o(i, 0, c), o(i + 1, r, c)));
                    u.removeEventListener("touchmove", h, !1);
                    u.removeEventListener("touchend", h, !1)
                },
                transitionEnd: function(n) {
                    parseInt(n.target.getAttribute("data-index"), 10) == i && (p && nt(), t.transitionEnd && t.transitionEnd.call(n, i, f[i]))
                }
            };
        return k(), p && nt(), a.addEventListener ? (a.touch && u.addEventListener("touchstart", h, !1), a.transitions && (u.addEventListener("webkitTransitionEnd", h, !1), u.addEventListener("msTransitionEnd", h, !1), u.addEventListener("oTransitionEnd", h, !1), u.addEventListener("otransitionend", h, !1), u.addEventListener("transitionend", h, !1)), window.addEventListener("resize", h, !1)) : window.onresize = function() {
            k()
        }, {
            setup: function() {
                k()
            },
            slide: function(n, t) {
                y();
                b(n, t)
            },
            prev: function() {
                y();
                ut()
            },
            next: function() {
                y();
                tt()
            },
            stop: function() {
                y()
            },
            getPos: function() {
                return i
            },
            getNumSlides: function() {
                return it
            },
            kill: function() {
                var n, t;
                for (y(), u.style.width = "", u.style.left = "", n = f.length; n--;) t = f[n], t.style.width = "", t.style.left = "", a.transitions && v(n, 0, 0);
                a.addEventListener ? (u.removeEventListener("touchstart", h, !1), u.removeEventListener("webkitTransitionEnd", h, !1), u.removeEventListener("msTransitionEnd", h, !1), u.removeEventListener("oTransitionEnd", h, !1), u.removeEventListener("otransitionend", h, !1), u.removeEventListener("transitionend", h, !1), window.removeEventListener("resize", h, !1)) : window.onresize = null
            }
        }
    }
}

function inherits(n, t) {
    function i() {}
    i.prototype = t.prototype;
    n.superClass_ = t.prototype;
    n.prototype = new i;
    n.prototype.constructor = n
}

function MarkerLabel_(n, t) {
    this.marker_ = n;
    this.handCursorURL_ = n.handCursorURL;
    this.labelDiv_ = document.createElement("div");
    this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;";
    this.eventDiv_ = document.createElement("div");
    this.eventDiv_.style.cssText = this.labelDiv_.style.cssText;
    this.eventDiv_.setAttribute("onselectstart", "return false;");
    this.eventDiv_.setAttribute("ondragstart", "return false;");
    this.crossDiv_ = MarkerLabel_.getSharedCross(t)
}

function MarkerWithLabel(n) {
    n = n || {};
    n.labelContent = n.labelContent || "";
    n.labelAnchor = n.labelAnchor || new google.maps.Point(0, 0);
    n.labelClass = n.labelClass || "markerLabels";
    n.labelStyle = n.labelStyle || {};
    n.labelInBackground = n.labelInBackground || !1;
    typeof n.labelVisible == "undefined" && (n.labelVisible = !0);
    typeof n.raiseOnDrag == "undefined" && (n.raiseOnDrag = !0);
    typeof n.clickable == "undefined" && (n.clickable = !0);
    typeof n.draggable == "undefined" && (n.draggable = !1);
    typeof n.optimized == "undefined" && (n.optimized = !1);
    n.crossImage = n.crossImage || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";
    n.handCursor = n.handCursor || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";
    n.optimized = !1;
    this.label = new MarkerLabel_(this, n.crossImage, n.handCursor);
    google.maps.Marker.apply(this, arguments)
}

function ClusterIcon(n, t) {
    n.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);
    this.cluster_ = n;
    this.className_ = n.getMarkerClusterer().getClusterClass();
    this.styles_ = t;
    this.center_ = null;
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = !1;
    this.setMap(n.getMap())
}

function Cluster(n) {
    this.markerClusterer_ = n;
    this.map_ = n.getMap();
    this.gridSize_ = n.getGridSize();
    this.minClusterSize_ = n.getMinimumClusterSize();
    this.averageCenter_ = n.getAverageCenter();
    this.markers_ = [];
    this.center_ = null;
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(this, n.getStyles())
}

function MarkerClusterer(n, t, i) {
    this.extend(MarkerClusterer, google.maps.OverlayView);
    t = t || [];
    i = i || {};
    this.markers_ = [];
    this.clusters_ = [];
    this.listeners_ = [];
    this.activeMap_ = null;
    this.ready_ = !1;
    this.gridSize_ = i.gridSize || 60;
    this.minClusterSize_ = i.minimumClusterSize || 2;
    this.maxZoom_ = i.maxZoom || null;
    this.styles_ = i.styles || [];
    this.title_ = i.title || "";
    this.zoomOnClick_ = !0;
    i.zoomOnClick !== undefined && (this.zoomOnClick_ = i.zoomOnClick);
    this.averageCenter_ = !1;
    i.averageCenter !== undefined && (this.averageCenter_ = i.averageCenter);
    this.ignoreHidden_ = !1;
    i.ignoreHidden !== undefined && (this.ignoreHidden_ = i.ignoreHidden);
    this.enableRetinaIcons_ = !1;
    i.enableRetinaIcons !== undefined && (this.enableRetinaIcons_ = i.enableRetinaIcons);
    this.imagePath_ = i.imagePath || MarkerClusterer.IMAGE_PATH;
    this.imageExtension_ = i.imageExtension || MarkerClusterer.IMAGE_EXTENSION;
    this.imageSizes_ = i.imageSizes || MarkerClusterer.IMAGE_SIZES;
    this.calculator_ = i.calculator || MarkerClusterer.CALCULATOR;
    this.batchSize_ = i.batchSize || MarkerClusterer.BATCH_SIZE;
    this.batchSizeIE_ = i.batchSizeIE || MarkerClusterer.BATCH_SIZE_IE;
    this.clusterClass_ = i.clusterClass || "cluster";
    navigator.userAgent.toLowerCase().indexOf("msie") !== -1 && (this.batchSize_ = this.batchSizeIE_);
    this.setupStyles_();
    this.addMarkers(t, !0);
    this.setMap(n)
}
var app;
! function(n) {
    function t(n, t) {
        if (!(n.originalEvent.touches.length > 1)) {
            n.preventDefault();
            var i = n.originalEvent.changedTouches[0],
                r = document.createEvent("MouseEvents");
            r.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null);
            n.target.dispatchEvent(r)
        }
    }
    if (n.support.touch = "ontouchend" in document, n.support.touch) {
        var r, i = n.ui.mouse.prototype,
            u = i._mouseInit,
            f = i._mouseDestroy;
        i._touchStart = function(n) {
            var i = this;
            !r && i._mouseCapture(n.originalEvent.changedTouches[0]) && (r = !0, i._touchMoved = !1, t(n, "mouseover"), t(n, "mousemove"), t(n, "mousedown"))
        };
        i._touchMove = function(n) {
            r && (this._touchMoved = !0, t(n, "mousemove"))
        };
        i._touchEnd = function(n) {
            r && (t(n, "mouseup"), t(n, "mouseout"), this._touchMoved || t(n, "click"), r = !1)
        };
        i._mouseInit = function() {
            var t = this;
            t.element.bind({
                touchstart: n.proxy(t, "_touchStart"),
                touchmove: n.proxy(t, "_touchMove"),
                touchend: n.proxy(t, "_touchEnd")
            });
            u.call(t)
        };
        i._mouseDestroy = function() {
            var t = this;
            t.element.unbind({
                touchstart: n.proxy(t, "_touchStart"),
                touchmove: n.proxy(t, "_touchMove"),
                touchend: n.proxy(t, "_touchEnd")
            });
            f.call(t)
        }
    }
}(jQuery);
InfoBox.prototype = new google.maps.OverlayView;
InfoBox.prototype.createInfoBoxDiv_ = function() {
    var n, t, i, r = this,
        u = function(n) {
            n.cancelBubble = !0;
            n.stopPropagation && n.stopPropagation()
        },
        f = function(n) {
            n.returnValue = !1;
            n.preventDefault && n.preventDefault();
            r.enableEventPropagation_ || u(n)
        };
    if (!this.div_) {
        if (this.div_ = document.createElement("div"), this.setBoxStyle_(), typeof this.content_.nodeType == "undefined" ? this.div_.innerHTML = this.getCloseBoxImg_() + this.content_ : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(this.content_)), this.getPanes()[this.pane_].appendChild(this.div_), this.addClickHandler_(), this.div_.style.width ? this.fixedWidthSet_ = !0 : this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_ ? (this.div_.style.width = this.maxWidth_, this.div_.style.overflow = "auto", this.fixedWidthSet_ = !0) : (i = this.getBoxWidths_(), this.div_.style.width = this.div_.offsetWidth - i.left - i.right + "px", this.fixedWidthSet_ = !1), setTimeout(function() {
                r.panBox_(r.disableAutoPan_)
            }, 100), !this.enableEventPropagation_) {
            for (this.eventListeners_ = [], t = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"], n = 0; n < t.length; n++) this.eventListeners_.push(google.maps.event.addDomListener(this.div_, t[n], u));
            this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function() {
                this.style.cursor = "default"
            }))
        }
        this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", f);
        google.maps.event.trigger(this, "domready")
    }
};
InfoBox.prototype.getCloseBoxImg_ = function() {
    var n = "";
    return this.closeBoxURL_ !== "" && (n = "<img", n += " src='" + this.closeBoxURL_ + "'", n += " align=right", n += " style='", n += " position: relative;", n += " cursor: pointer;", n += " margin: " + this.closeBoxMargin_ + ";", n += "'>"), n
};
InfoBox.prototype.addClickHandler_ = function() {
    var n;
    this.closeBoxURL_ !== "" ? (n = this.div_.firstChild, this.closeListener_ = google.maps.event.addDomListener(n, "click", this.getCloseClickHandler_())) : this.closeListener_ = null
};
InfoBox.prototype.getCloseClickHandler_ = function() {
    var n = this;
    return function(t) {
        t.cancelBubble = !0;
        t.stopPropagation && t.stopPropagation();
        google.maps.event.trigger(n, "closeclick");
        n.close()
    }
};
InfoBox.prototype.panBox_ = function(n) {
    var i, y, e = 0,
        f = 0,
        p;
    if (!n && (i = this.getMap(), i instanceof google.maps.Map)) {
        i.getBounds().contains(this.position_) || i.setCenter(this.position_);
        y = i.getBounds();
        var l = i.getDiv(),
            a = l.offsetWidth,
            o = l.offsetHeight,
            s = this.pixelOffset_.width,
            r = this.pixelOffset_.height,
            v = this.div_.offsetWidth,
            h = this.div_.offsetHeight,
            c = this.infoBoxClearance_.width,
            u = this.infoBoxClearance_.height,
            t = this.getProjection().fromLatLngToContainerPixel(this.position_);
        t.x < -s + c ? e = t.x + s - c : t.x + v + s + c > a && (e = t.x + v + s + c - a);
        this.alignBottom_ ? t.y < -r + u + h ? f = t.y + r - u - h : t.y + r + u > o && (f = t.y + r + u - o) : t.y < -r + u ? f = t.y + r - u : t.y + h + r + u > o && (f = t.y + h + r + u - o);
        e === 0 && f === 0 || (p = i.getCenter(), i.panBy(e, f))
    }
};
InfoBox.prototype.setBoxStyle_ = function() {
    var n, t;
    if (this.div_) {
        this.div_.className = this.boxClass_;
        this.div_.style.cssText = "";
        t = this.boxStyle_;
        for (n in t) t.hasOwnProperty(n) && (this.div_.style[n] = t[n]);
        this.div_.style.WebkitTransform = "translateZ(0)";
        typeof this.div_.style.opacity != "undefined" && this.div_.style.opacity !== "" && (this.div_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + this.div_.style.opacity * 100 + ')"', this.div_.style.filter = "alpha(opacity=" + this.div_.style.opacity * 100 + ")");
        this.div_.style.position = "absolute";
        this.div_.style.visibility = "hidden";
        this.zIndex_ !== null && (this.div_.style.zIndex = this.zIndex_)
    }
};
InfoBox.prototype.getBoxWidths_ = function() {
    var i, n = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        t = this.div_;
    return document.defaultView && document.defaultView.getComputedStyle ? (i = t.ownerDocument.defaultView.getComputedStyle(t, ""), i && (n.top = parseInt(i.borderTopWidth, 10) || 0, n.bottom = parseInt(i.borderBottomWidth, 10) || 0, n.left = parseInt(i.borderLeftWidth, 10) || 0, n.right = parseInt(i.borderRightWidth, 10) || 0)) : document.documentElement.currentStyle && t.currentStyle && (n.top = parseInt(t.currentStyle.borderTopWidth, 10) || 0, n.bottom = parseInt(t.currentStyle.borderBottomWidth, 10) || 0, n.left = parseInt(t.currentStyle.borderLeftWidth, 10) || 0, n.right = parseInt(t.currentStyle.borderRightWidth, 10) || 0), n
};
InfoBox.prototype.onRemove = function() {
    this.div_ && (this.div_.parentNode.removeChild(this.div_), this.div_ = null)
};
InfoBox.prototype.draw = function() {
    this.createInfoBoxDiv_();
    var n = this.getProjection().fromLatLngToDivPixel(this.position_);
    this.div_.style.left = n.x + this.pixelOffset_.width + "px";
    this.alignBottom_ ? this.div_.style.bottom = -(n.y + this.pixelOffset_.height) + "px" : this.div_.style.top = n.y + this.pixelOffset_.height + "px";
    this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible"
};
InfoBox.prototype.setOptions = function(n) {
    typeof n.boxClass != "undefined" && (this.boxClass_ = n.boxClass, this.setBoxStyle_());
    typeof n.boxStyle != "undefined" && (this.boxStyle_ = n.boxStyle, this.setBoxStyle_());
    typeof n.content != "undefined" && this.setContent(n.content);
    typeof n.disableAutoPan != "undefined" && (this.disableAutoPan_ = n.disableAutoPan);
    typeof n.maxWidth != "undefined" && (this.maxWidth_ = n.maxWidth);
    typeof n.pixelOffset != "undefined" && (this.pixelOffset_ = n.pixelOffset);
    typeof n.alignBottom != "undefined" && (this.alignBottom_ = n.alignBottom);
    typeof n.position != "undefined" && this.setPosition(n.position);
    typeof n.zIndex != "undefined" && this.setZIndex(n.zIndex);
    typeof n.closeBoxMargin != "undefined" && (this.closeBoxMargin_ = n.closeBoxMargin);
    typeof n.closeBoxURL != "undefined" && (this.closeBoxURL_ = n.closeBoxURL);
    typeof n.infoBoxClearance != "undefined" && (this.infoBoxClearance_ = n.infoBoxClearance);
    typeof n.isHidden != "undefined" && (this.isHidden_ = n.isHidden);
    typeof n.visible != "undefined" && (this.isHidden_ = !n.visible);
    typeof n.enableEventPropagation != "undefined" && (this.enableEventPropagation_ = n.enableEventPropagation);
    this.div_ && this.draw()
};
InfoBox.prototype.setContent = function(n) {
    this.content_ = n;
    this.div_ && (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.fixedWidthSet_ || (this.div_.style.width = ""), typeof n.nodeType == "undefined" ? this.div_.innerHTML = this.getCloseBoxImg_() + n : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(n)), this.fixedWidthSet_ || (this.div_.style.width = this.div_.offsetWidth + "px", typeof n.nodeType == "undefined" ? this.div_.innerHTML = this.getCloseBoxImg_() + n : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(n))), this.addClickHandler_());
    google.maps.event.trigger(this, "content_changed")
};
InfoBox.prototype.setPosition = function(n) {
    this.position_ = n;
    this.div_ && this.draw();
    google.maps.event.trigger(this, "position_changed")
};
InfoBox.prototype.setZIndex = function(n) {
    this.zIndex_ = n;
    this.div_ && (this.div_.style.zIndex = n);
    google.maps.event.trigger(this, "zindex_changed")
};
InfoBox.prototype.setVisible = function(n) {
    this.isHidden_ = !n;
    this.div_ && (this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible")
};
InfoBox.prototype.getContent = function() {
    return this.content_
};
InfoBox.prototype.getPosition = function() {
    return this.position_
};
InfoBox.prototype.getZIndex = function() {
    return this.zIndex_
};
InfoBox.prototype.getVisible = function() {
    return typeof this.getMap() == "undefined" || this.getMap() === null ? !1 : !this.isHidden_
};
InfoBox.prototype.show = function() {
    this.isHidden_ = !1;
    this.div_ && (this.div_.style.visibility = "visible")
};
InfoBox.prototype.hide = function() {
    this.isHidden_ = !0;
    this.div_ && (this.div_.style.visibility = "hidden")
};
InfoBox.prototype.open = function(n, t) {
    var r = this,
        i;
    t && (i = t.getPosition ? t.getPosition() : t.getCenter(), this.position_ = i, this.moveListener_ = google.maps.event.addListener(t, "position_changed", function() {
        r.setPosition(i)
    }));
    this.setMap(n);
    this.div_ && setTimeout(function() {
        r.panBox_()
    }, 100)
};
InfoBox.prototype.close = function() {
    var n;
    if (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.eventListeners_) {
        for (n = 0; n < this.eventListeners_.length; n++) google.maps.event.removeListener(this.eventListeners_[n]);
        this.eventListeners_ = null
    }
    this.moveListener_ && (google.maps.event.removeListener(this.moveListener_), this.moveListener_ = null);
    this.contextListener_ && (google.maps.event.removeListener(this.contextListener_), this.contextListener_ = null);
    this.setMap(null)
};
app = app || {};
app.sort = function() {
    var t = {},
        i = [],
        r = [{
            Id: "3",
            Name: "Bedrooms (Min - Max)"
        }, {
            Id: "4",
            Name: "Bedrooms (Max - Min)"
        }, {
            Id: "1",
            Name: "Price (Min - Max)"
        }, {
            Id: "2",
            Name: "Price (Max - Min)"
        }, {
            Id: "6",
            Name: "Most Reviewed"
        }],
        n = {
            Id: "5",
            Name: "Featured"
        },
        u = $("#resultsNumber"),
        f = function(i, f) {
            t = i;
            typeof f == "object" && (n = $.extend(n, f));
            t.dropdown({
                enableTabletNative: !0,
                val: {
                    Id: n.Id,
                    Name: n.Name
                },
                defaultVal: {
                    Id: "5",
                    Name: "Featured"
                },
                list: r,
                onChange: function(t) {
                    n = t;
                    h(t);
                    mix.click({
                        Id: "511637",
                        Label: "Sort",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        "Results Count": u.text(),
                        Result: "Successful",
                        Value: t.Name
                    })
                },
                onOpen: function() {
                    mix.click({
                        Id: "511637",
                        Label: "Sort",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        "Results Count": u.text(),
                        Result: "Original"
                    })
                }
            })
        },
        e = function(i) {
            $.each(r, function(r, u) {
                u.Id == i && (t.dropdownUpdate({
                    val: u
                }), n = u)
            })
        },
        o = function(t) {
            switch (n.Id) {
                case "5":
                    t = _.sortBy(t, "TotalPropertyRank").reverse();
                    break;
                case "1":
                    t = _.sortBy(t, function(n) {
                        return n.PricePerWhat === "perBedroom" ? n.MinRate / n.Maxbedrooms : n.MinRate
                    });
                    break;
                case "2":
                    t = _.sortBy(t, function(n) {
                        return n.PricePerWhat === "perBedroom" ? n.MaxRate / n.Maxbedrooms : n.MaxRate
                    }).reverse();
                    break;
                case "3":
                    t = _.sortBy(t, "Bedrooms");
                    break;
                case "4":
                    t = _.sortBy(t, "Bedrooms").reverse();
                    break;
                case "6":
                    t = _.sortBy(t, "ReviewCount").reverse()
            }
            return t
        },
        s = function(n) {
            i.push(n)
        },
        h = function(n) {
            $.each(i, function(t, i) {
                i(n)
            })
        };
    return {
        init: f,
        update: e,
        onChange: s,
        sort: o
    }
}();
(window.jQuery || window.Zepto) && function(n) {
    n.fn.Swipe = function(t) {
        return this.each(function() {
            n(this).data("Swipe", new Swipe(n(this)[0], t))
        })
    }
}(window.jQuery || window.Zepto);
inherits(MarkerLabel_, google.maps.OverlayView);
MarkerLabel_.getSharedCross = function(n) {
    var t;
    return typeof MarkerLabel_.getSharedCross.crossDiv == "undefined" && (t = document.createElement("img"), t.style.cssText = "position: absolute; z-index: 1000002; display: none;", t.style.marginLeft = "-8px", t.style.marginTop = "-9px", t.src = n, MarkerLabel_.getSharedCross.crossDiv = t), MarkerLabel_.getSharedCross.crossDiv
};
MarkerLabel_.prototype.onAdd = function() {
    var n = this,
        r = !1,
        t = !1,
        o, s, h, f, i, c, l, u = 20,
        a = "url(" + this.handCursorURL_ + ")",
        e = function(n) {
            n.preventDefault && n.preventDefault();
            n.cancelBubble = !0;
            n.stopPropagation && n.stopPropagation()
        },
        v = function() {
            n.marker_.setAnimation(null)
        };
    this.getPanes().overlayImage.appendChild(this.labelDiv_);
    this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);
    typeof MarkerLabel_.getSharedCross.processed == "undefined" && (this.getPanes().overlayImage.appendChild(this.crossDiv_), MarkerLabel_.getSharedCross.processed = !0);
    this.listeners_ = [google.maps.event.addDomListener(this.eventDiv_, "mouseover", function(t) {
        (n.marker_.getDraggable() || n.marker_.getClickable()) && (this.style.cursor = "pointer", google.maps.event.trigger(n.marker_, "mouseover", t))
    }), google.maps.event.addDomListener(this.eventDiv_, "mouseout", function(i) {
        (n.marker_.getDraggable() || n.marker_.getClickable()) && !t && (this.style.cursor = n.marker_.getCursor(), google.maps.event.trigger(n.marker_, "mouseout", i))
    }), google.maps.event.addDomListener(this.eventDiv_, "mousedown", function(i) {
        t = !1;
        n.marker_.getDraggable() && (r = !0, this.style.cursor = a);
        (n.marker_.getDraggable() || n.marker_.getClickable()) && (google.maps.event.trigger(n.marker_, "mousedown", i), e(i))
    }), google.maps.event.addDomListener(document, "mouseup", function(e) {
        var s;
        if (r && (r = !1, n.eventDiv_.style.cursor = "pointer", google.maps.event.trigger(n.marker_, "mouseup", e)), t) {
            if (i) {
                s = n.getProjection().fromLatLngToDivPixel(n.marker_.getPosition());
                s.y += u;
                n.marker_.setPosition(n.getProjection().fromDivPixelToLatLng(s));
                try {
                    n.marker_.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(v, 1406)
                } catch (h) {}
            }
            n.crossDiv_.style.display = "none";
            n.marker_.setZIndex(o);
            f = !0;
            t = !1;
            e.latLng = n.marker_.getPosition();
            google.maps.event.trigger(n.marker_, "dragend", e)
        }
    }), google.maps.event.addListener(n.marker_.getMap(), "mousemove", function(f) {
        var e;
        r && (t ? (f.latLng = new google.maps.LatLng(f.latLng.lat() - s, f.latLng.lng() - h), e = n.getProjection().fromLatLngToDivPixel(f.latLng), i && (n.crossDiv_.style.left = e.x + "px", n.crossDiv_.style.top = e.y + "px", n.crossDiv_.style.display = "", e.y -= u), n.marker_.setPosition(n.getProjection().fromDivPixelToLatLng(e)), i && (n.eventDiv_.style.top = e.y + u + "px"), google.maps.event.trigger(n.marker_, "drag", f)) : (s = f.latLng.lat() - n.marker_.getPosition().lat(), h = f.latLng.lng() - n.marker_.getPosition().lng(), o = n.marker_.getZIndex(), c = n.marker_.getPosition(), l = n.marker_.getMap().getCenter(), i = n.marker_.get("raiseOnDrag"), t = !0, n.marker_.setZIndex(1e6), f.latLng = n.marker_.getPosition(), google.maps.event.trigger(n.marker_, "dragstart", f)))
    }), google.maps.event.addDomListener(document, "keydown", function(r) {
        t && r.keyCode === 27 && (i = !1, n.marker_.setPosition(c), n.marker_.getMap().setCenter(l), google.maps.event.trigger(document, "mouseup", r))
    }), google.maps.event.addDomListener(this.eventDiv_, "click", function(t) {
        (n.marker_.getDraggable() || n.marker_.getClickable()) && (f ? f = !1 : (google.maps.event.trigger(n.marker_, "click", t), e(t)))
    }), google.maps.event.addDomListener(this.eventDiv_, "dblclick", function(t) {
        (n.marker_.getDraggable() || n.marker_.getClickable()) && (google.maps.event.trigger(n.marker_, "dblclick", t), e(t))
    }), google.maps.event.addListener(this.marker_, "dragstart", function() {
        t || (i = this.get("raiseOnDrag"))
    }), google.maps.event.addListener(this.marker_, "drag", function() {
        t || i && (n.setPosition(u), n.labelDiv_.style.zIndex = 1e6 + (this.get("labelInBackground") ? -1 : 1))
    }), google.maps.event.addListener(this.marker_, "dragend", function() {
        t || i && n.setPosition(0)
    }), google.maps.event.addListener(this.marker_, "position_changed", function() {
        n.setPosition()
    }), google.maps.event.addListener(this.marker_, "zindex_changed", function() {
        n.setZIndex()
    }), google.maps.event.addListener(this.marker_, "visible_changed", function() {
        n.setVisible()
    }), google.maps.event.addListener(this.marker_, "labelvisible_changed", function() {
        n.setVisible()
    }), google.maps.event.addListener(this.marker_, "title_changed", function() {
        n.setTitle()
    }), google.maps.event.addListener(this.marker_, "labelcontent_changed", function() {
        n.setContent()
    }), google.maps.event.addListener(this.marker_, "labelanchor_changed", function() {
        n.setAnchor()
    }), google.maps.event.addListener(this.marker_, "labelclass_changed", function() {
        n.setStyles()
    }), google.maps.event.addListener(this.marker_, "labelstyle_changed", function() {
        n.setStyles()
    })]
};
MarkerLabel_.prototype.onRemove = function() {
    if (this.labelDiv_.childElementCount !== 0) {
        var n;
        for (this.labelDiv_.parentNode.removeChild(this.labelDiv_), this.eventDiv_.parentNode.removeChild(this.eventDiv_), n = 0; n < this.listeners_.length; n++) google.maps.event.removeListener(this.listeners_[n])
    }
};
MarkerLabel_.prototype.draw = function() {
    this.setContent();
    this.setTitle();
    this.setStyles()
};
MarkerLabel_.prototype.setContent = function() {
    var n = this.marker_.get("labelContent");
    typeof n.nodeType == "undefined" ? (this.labelDiv_.innerHTML = n, this.eventDiv_.innerHTML = this.labelDiv_.innerHTML) : (this.labelDiv_.innerHTML = "", this.labelDiv_.appendChild(n), n = n.cloneNode(!0), this.eventDiv_.appendChild(n))
};
MarkerLabel_.prototype.setTitle = function() {
    this.eventDiv_.title = this.marker_.getTitle() || ""
};
MarkerLabel_.prototype.setStyles = function() {
    var n, t;
    this.labelDiv_.className = this.marker_.get("labelClass");
    this.eventDiv_.className = this.labelDiv_.className;
    this.labelDiv_.style.cssText = "";
    this.eventDiv_.style.cssText = "";
    t = this.marker_.get("labelStyle");
    for (n in t) t.hasOwnProperty(n) && (this.labelDiv_.style[n] = t[n], this.eventDiv_.style[n] = t[n]);
    this.setMandatoryStyles()
};
MarkerLabel_.prototype.setMandatoryStyles = function() {
    this.labelDiv_.style.position = "absolute";
    this.labelDiv_.style.overflow = "hidden";
    typeof this.labelDiv_.style.opacity != "undefined" && this.labelDiv_.style.opacity !== "" && (this.labelDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=' + this.labelDiv_.style.opacity * 100 + ')"', this.labelDiv_.style.filter = "alpha(opacity=" + this.labelDiv_.style.opacity * 100 + ")");
    this.eventDiv_.style.position = this.labelDiv_.style.position;
    this.eventDiv_.style.overflow = this.labelDiv_.style.overflow;
    this.eventDiv_.style.opacity = .01;
    this.eventDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"';
    this.eventDiv_.style.filter = "alpha(opacity=1)";
    this.setAnchor();
    this.setPosition();
    this.setVisible()
};
MarkerLabel_.prototype.setAnchor = function() {
    var n = this.marker_.get("labelAnchor");
    this.labelDiv_.style.marginLeft = -n.x + "px";
    this.labelDiv_.style.marginTop = -n.y + "px";
    this.eventDiv_.style.marginLeft = -n.x + "px";
    this.eventDiv_.style.marginTop = -n.y + "px"
};
MarkerLabel_.prototype.setPosition = function(n) {
    var t = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
    typeof n == "undefined" && (n = 0);
    this.labelDiv_.style.left = Math.round(t.x) + "px";
    this.labelDiv_.style.top = Math.round(t.y - n) + "px";
    this.eventDiv_.style.left = this.labelDiv_.style.left;
    this.eventDiv_.style.top = this.labelDiv_.style.top;
    this.setZIndex()
};
MarkerLabel_.prototype.setZIndex = function() {
    var n = this.marker_.get("labelInBackground") ? -1 : 1;
    typeof this.marker_.getZIndex() == "undefined" ? (this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + n, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex) : (this.labelDiv_.style.zIndex = this.marker_.getZIndex() + n, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex)
};
MarkerLabel_.prototype.setVisible = function() {
    this.labelDiv_.style.display = this.marker_.get("labelVisible") ? this.marker_.getVisible() ? "block" : "none" : "none";
    this.eventDiv_.style.display = this.labelDiv_.style.display
};
inherits(MarkerWithLabel, google.maps.Marker);
MarkerWithLabel.prototype.setMap = function(n) {
    google.maps.Marker.prototype.setMap.apply(this, arguments);
    this.label.setMap(n)
};
ClusterIcon.prototype.onAdd = function() {
    var n = this,
        t, i;
    this.div_ = document.createElement("div");
    this.div_.className = this.className_;
    this.visible_ && this.show();
    this.getPanes().overlayMouseTarget.appendChild(this.div_);
    this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function() {
        i = t
    });
    google.maps.event.addDomListener(this.div_, "mousedown", function() {
        t = !0;
        i = !1
    });
    google.maps.event.addDomListener(this.div_, "click", function(r) {
        if (t = !1, !i) {
            var e, f, u = n.cluster_.getMarkerClusterer();
            google.maps.event.trigger(u, "click", n.cluster_);
            google.maps.event.trigger(u, "clusterclick", n.cluster_);
            u.getZoomOnClick() && (f = u.getMaxZoom(), e = n.cluster_.getBounds(), u.getMap().fitBounds(e), setTimeout(function() {
                u.getMap().fitBounds(e);
                f !== null && u.getMap().getZoom() > f && u.getMap().setZoom(f + 1)
            }, 100));
            r.cancelBubble = !0;
            r.stopPropagation && r.stopPropagation()
        }
    });
    google.maps.event.addDomListener(this.div_, "mouseover", function() {
        var t = n.cluster_.getMarkerClusterer();
        google.maps.event.trigger(t, "mouseover", n.cluster_)
    });
    google.maps.event.addDomListener(this.div_, "mouseout", function() {
        var t = n.cluster_.getMarkerClusterer();
        google.maps.event.trigger(t, "mouseout", n.cluster_)
    })
};
ClusterIcon.prototype.onRemove = function() {
    this.div_ && this.div_.parentNode && (this.hide(), google.maps.event.removeListener(this.boundsChangedListener_), google.maps.event.clearInstanceListeners(this.div_), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
};
ClusterIcon.prototype.draw = function() {
    if (this.visible_) {
        var n = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = n.y + "px";
        this.div_.style.left = n.x + "px"
    }
};
ClusterIcon.prototype.hide = function() {
    this.div_ && (this.div_.style.display = "none");
    this.visible_ = !1
};
ClusterIcon.prototype.show = function() {
    if (this.div_) {
        var n = "",
            r = this.backgroundPosition_ && this.backgroundPosition_.split ? this.backgroundPosition_.split(" ") : ["0", "0"],
            t = parseInt(r[0].replace(/^\s+|\s+$/g, ""), 10),
            i = parseInt(r[1].replace(/^\s+|\s+$/g, ""), 10),
            u = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(u);
        n = "<img src='" + this.url_ + "' style='position: absolute; top: " + i + "px; left: " + t + "px; ";
        this.cluster_.getMarkerClusterer().enableRetinaIcons_ || (n += "clip: rect(" + -1 * i + "px, " + (-1 * t + this.width_) + "px, " + (-1 * i + this.height_) + "px, " + -1 * t + "px);");
        n += "'>";
        this.div_.innerHTML = n + "<div style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + this.sums_.text + "<\/div>";
        this.div_.title = typeof this.sums_.title == "undefined" || this.sums_.title === "" ? this.cluster_.getMarkerClusterer().getTitle() : this.sums_.title;
        this.div_.style.display = ""
    }
    this.visible_ = !0
};
ClusterIcon.prototype.useStyle = function(n) {
    var i, t;
    this.sums_ = n;
    i = Math.max(0, n.index - 1);
    i = Math.min(this.styles_.length - 1, i);
    t = this.styles_[i];
    this.url_ = t.url;
    this.height_ = t.height;
    this.width_ = t.width;
    this.anchorText_ = t.anchorText || [0, 0];
    this.anchorIcon_ = t.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)];
    this.textColor_ = t.textColor || "black";
    this.textSize_ = t.textSize || 11;
    this.textDecoration_ = t.textDecoration || "none";
    this.fontWeight_ = t.fontWeight || "bold";
    this.fontStyle_ = t.fontStyle || "normal";
    this.fontFamily_ = t.fontFamily || "Arial,sans-serif";
    this.backgroundPosition_ = t.backgroundPosition || "0 0"
};
ClusterIcon.prototype.setCenter = function(n) {
    this.center_ = n
};
ClusterIcon.prototype.createCss = function(n) {
    var t = [];
    return t.push("cursor: pointer;"), t.push("position: absolute; top: " + n.y + "px; left: " + n.x + "px;"), t.push("width: " + this.width_ + "px; height: " + this.height_ + "px;"), t.join("")
};
ClusterIcon.prototype.getPosFromLatLng_ = function(n) {
    var t = this.getProjection().fromLatLngToDivPixel(n);
    return t.x -= this.anchorIcon_[1], t.y -= this.anchorIcon_[0], t.x = parseInt(t.x, 10), t.y = parseInt(t.y, 10), t
};
Cluster.prototype.getSize = function() {
    return this.markers_.length
};
Cluster.prototype.getMarkers = function() {
    return this.markers_
};
Cluster.prototype.getCenter = function() {
    return this.center_
};
Cluster.prototype.getMap = function() {
    return this.map_
};
Cluster.prototype.getMarkerClusterer = function() {
    return this.markerClusterer_
};
Cluster.prototype.getBounds = function() {
    var n, i = new google.maps.LatLngBounds(this.center_, this.center_),
        t = this.getMarkers();
    if (t instanceof Array && t.length > 0)
        for (n = 0; n < t.length; n++) i.extend(t[n].getPosition());
    else return;
    return i
};
Cluster.prototype.remove = function() {
    this.clusterIcon_.setMap(null);
    this.markers_ = [];
    delete this.markers_
};
Cluster.prototype.addMarker = function(n) {
    var t, i, u;
    if (this.isMarkerAlreadyAdded_(n)) return !1;
    if (this.center_) {
        if (this.averageCenter_) {
            var r = this.markers_.length + 1,
                f = (this.center_.lat() * (r - 1) + n.getPosition().lat()) / r,
                e = (this.center_.lng() * (r - 1) + n.getPosition().lng()) / r;
            this.center_ = new google.maps.LatLng(f, e);
            this.calculateBounds_()
        }
    } else this.center_ = n.getPosition(), this.calculateBounds_();
    if (n.isAdded = !0, this.markers_.push(n), i = this.markers_.length, u = this.markerClusterer_.getMaxZoom(), u !== null && this.map_.getZoom() > u) n.getMap() !== this.map_ && n.setMap(this.map_);
    else if (i < this.minClusterSize_) n.getMap() !== this.map_ && n.setMap(this.map_);
    else if (i === this.minClusterSize_)
        for (t = 0; t < i; t++) this.markers_[t].setMap(null);
    else n.setMap(null);
    return this.updateIcon_(), !0
};
Cluster.prototype.isMarkerInClusterBounds = function(n) {
    return this.bounds_.contains(n.getPosition())
};
Cluster.prototype.calculateBounds_ = function() {
    var n = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(n)
};
Cluster.prototype.updateIcon_ = function() {
    var t, n, i, r;
    if (this.markers_ && this.markers_.length) {
        if (t = this.markers_.length, n = this.markerClusterer_.getMaxZoom(), n !== null && this.map_.getZoom() > n) {
            this.clusterIcon_.hide();
            return
        }
        if (t < this.minClusterSize_) {
            this.clusterIcon_.hide();
            return
        }
        i = this.markerClusterer_.getStyles().length;
        r = this.markerClusterer_.getCalculator()(this.markers_, i);
        this.clusterIcon_.setCenter(this.center_);
        this.clusterIcon_.useStyle(r);
        this.clusterIcon_.show()
    }
};
Cluster.prototype.isMarkerAlreadyAdded_ = function(n) {
    var t;
    if (this.markers_.indexOf) return this.markers_.indexOf(n) !== -1;
    for (t = 0; t < this.markers_.length; t++)
        if (n === this.markers_[t]) return !0;
    return !1
};
MarkerClusterer.prototype.onAdd = function() {
    var n = this;
    this.activeMap_ = this.getMap();
    this.ready_ = !0;
    this.repaint();
    this.listeners_ = [google.maps.event.addListener(this.getMap(), "zoom_changed", function() {
        n.resetViewport_(!1);
        (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) && google.maps.event.trigger(this, "idle")
    }), google.maps.event.addListener(this.getMap(), "idle", function() {
        n.redraw_()
    })]
};
MarkerClusterer.prototype.onRemove = function() {
    for (var n = 0; n < this.markers_.length; n++) this.markers_[n].getMap() !== this.activeMap_ && this.markers_[n].setMap(this.activeMap_);
    for (n = 0; n < this.clusters_.length; n++) this.clusters_[n].remove();
    for (this.clusters_ = [], n = 0; n < this.listeners_.length; n++) google.maps.event.removeListener(this.listeners_[n]);
    this.listeners_ = [];
    this.activeMap_ = null;
    this.ready_ = !1
};
MarkerClusterer.prototype.draw = function() {};
MarkerClusterer.prototype.setupStyles_ = function() {
    var n, t;
    if (!(this.styles_.length > 0))
        for (n = 0; n < this.imageSizes_.length; n++) t = this.imageSizes_[n], this.styles_.push({
            url: this.imagePath_ + (n + 1) + "." + this.imageExtension_,
            height: t,
            width: t
        })
};
MarkerClusterer.prototype.fitMapToMarkers = function() {
    for (var t = this.getMarkers(), i = new google.maps.LatLngBounds, n = 0; n < t.length; n++) i.extend(t[n].getPosition());
    this.getMap().fitBounds(i)
};
MarkerClusterer.prototype.getGridSize = function() {
    return this.gridSize_
};
MarkerClusterer.prototype.setGridSize = function(n) {
    this.gridSize_ = n
};
MarkerClusterer.prototype.getMinimumClusterSize = function() {
    return this.minClusterSize_
};
MarkerClusterer.prototype.setMinimumClusterSize = function(n) {
    this.minClusterSize_ = n
};
MarkerClusterer.prototype.getMaxZoom = function() {
    return this.maxZoom_
};
MarkerClusterer.prototype.setMaxZoom = function(n) {
    this.maxZoom_ = n
};
MarkerClusterer.prototype.getStyles = function() {
    return this.styles_
};
MarkerClusterer.prototype.setStyles = function(n) {
    this.styles_ = n
};
MarkerClusterer.prototype.getTitle = function() {
    return this.title_
};
MarkerClusterer.prototype.setTitle = function(n) {
    this.title_ = n
};
MarkerClusterer.prototype.getZoomOnClick = function() {
    return this.zoomOnClick_
};
MarkerClusterer.prototype.setZoomOnClick = function(n) {
    this.zoomOnClick_ = n
};
MarkerClusterer.prototype.getAverageCenter = function() {
    return this.averageCenter_
};
MarkerClusterer.prototype.setAverageCenter = function(n) {
    this.averageCenter_ = n
};
MarkerClusterer.prototype.getIgnoreHidden = function() {
    return this.ignoreHidden_
};
MarkerClusterer.prototype.setIgnoreHidden = function(n) {
    this.ignoreHidden_ = n
};
MarkerClusterer.prototype.getEnableRetinaIcons = function() {
    return this.enableRetinaIcons_
};
MarkerClusterer.prototype.setEnableRetinaIcons = function(n) {
    this.enableRetinaIcons_ = n
};
MarkerClusterer.prototype.getImageExtension = function() {
    return this.imageExtension_
};
MarkerClusterer.prototype.setImageExtension = function(n) {
    this.imageExtension_ = n
};
MarkerClusterer.prototype.getImagePath = function() {
    return this.imagePath_
};
MarkerClusterer.prototype.setImagePath = function(n) {
    this.imagePath_ = n
};
MarkerClusterer.prototype.getImageSizes = function() {
    return this.imageSizes_
};
MarkerClusterer.prototype.setImageSizes = function(n) {
    this.imageSizes_ = n
};
MarkerClusterer.prototype.getCalculator = function() {
    return this.calculator_
};
MarkerClusterer.prototype.setCalculator = function(n) {
    this.calculator_ = n
};
MarkerClusterer.prototype.getBatchSizeIE = function() {
    return this.batchSizeIE_
};
MarkerClusterer.prototype.setBatchSizeIE = function(n) {
    this.batchSizeIE_ = n
};
MarkerClusterer.prototype.getClusterClass = function() {
    return this.clusterClass_
};
MarkerClusterer.prototype.setClusterClass = function(n) {
    this.clusterClass_ = n
};
MarkerClusterer.prototype.getMarkers = function() {
    return this.markers_
};
MarkerClusterer.prototype.getTotalMarkers = function() {
    return this.markers_.length
};
MarkerClusterer.prototype.getClusters = function() {
    return this.clusters_
};
MarkerClusterer.prototype.getTotalClusters = function() {
    return this.clusters_.length
};
MarkerClusterer.prototype.addMarker = function(n, t) {
    this.pushMarkerTo_(n);
    t || this.redraw_()
};
MarkerClusterer.prototype.addMarkers = function(n, t) {
    for (var i in n) n.hasOwnProperty(i) && this.pushMarkerTo_(n[i]);
    t || this.redraw_()
};
MarkerClusterer.prototype.pushMarkerTo_ = function(n) {
    if (n.getDraggable()) {
        var t = this;
        google.maps.event.addListener(n, "dragend", function() {
            t.ready_ && (this.isAdded = !1, t.repaint())
        })
    }
    n.isAdded = !1;
    this.markers_.push(n)
};
MarkerClusterer.prototype.removeMarker = function(n, t) {
    var i = this.removeMarker_(n);
    return !t && i && this.repaint(), i
};
MarkerClusterer.prototype.removeMarkers = function(n, t) {
    for (var u, i = !1, r = 0; r < n.length; r++) u = this.removeMarker_(n[r]), i = i || u;
    return !t && i && this.repaint(), i
};
MarkerClusterer.prototype.removeMarker_ = function(n) {
    var t, i = -1;
    if (this.markers_.indexOf) i = this.markers_.indexOf(n);
    else
        for (t = 0; t < this.markers_.length; t++)
            if (n === this.markers_[t]) {
                i = t;
                break
            } return i === -1 ? !1 : (n.setMap(null), this.markers_.splice(i, 1), !0)
};
MarkerClusterer.prototype.clearMarkers = function() {
    this.resetViewport_(!0);
    this.markers_ = []
};
MarkerClusterer.prototype.repaint = function() {
    var n = this.clusters_.slice();
    this.clusters_ = [];
    this.resetViewport_(!1);
    this.redraw_();
    setTimeout(function() {
        for (var t = 0; t < n.length; t++) n[t].remove()
    }, 0)
};
MarkerClusterer.prototype.getExtendedBounds = function(n) {
    var t = this.getProjection(),
        e = new google.maps.LatLng(n.getNorthEast().lat(), n.getNorthEast().lng()),
        o = new google.maps.LatLng(n.getSouthWest().lat(), n.getSouthWest().lng()),
        r = t.fromLatLngToDivPixel(e),
        i, u, f;
    return r.x += this.gridSize_, r.y -= this.gridSize_, i = t.fromLatLngToDivPixel(o), i.x -= this.gridSize_, i.y += this.gridSize_, u = t.fromDivPixelToLatLng(r), f = t.fromDivPixelToLatLng(i), n.extend(u), n.extend(f), n
};
MarkerClusterer.prototype.redraw_ = function() {
    this.createClusters_(0)
};
MarkerClusterer.prototype.resetViewport_ = function(n) {
    for (var i, t = 0; t < this.clusters_.length; t++) this.clusters_[t].remove();
    for (this.clusters_ = [], t = 0; t < this.markers_.length; t++) i = this.markers_[t], i.isAdded = !1, n && i.setMap(null)
};
MarkerClusterer.prototype.distanceBetweenPoints_ = function(n, t) {
    var i = (t.lat() - n.lat()) * Math.PI / 180,
        r = (t.lng() - n.lng()) * Math.PI / 180,
        u = Math.sin(i / 2) * Math.sin(i / 2) + Math.cos(n.lat() * Math.PI / 180) * Math.cos(t.lat() * Math.PI / 180) * Math.sin(r / 2) * Math.sin(r / 2),
        f = 2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u));
    return 6371 * f
};
MarkerClusterer.prototype.isMarkerInBounds_ = function(n, t) {
    return t.contains(n.getPosition())
};
MarkerClusterer.prototype.addToClosestCluster_ = function(n) {
    for (var r, t, u, e = 4e4, i = null, f = 0; f < this.clusters_.length; f++) t = this.clusters_[f], u = t.getCenter(), u && (r = this.distanceBetweenPoints_(u, n.getPosition()), r < e && (e = r, i = t));
    i && i.isMarkerInClusterBounds(n) ? i.addMarker(n) : (t = new Cluster(this), t.addMarker(n), this.clusters_.push(t))
};
MarkerClusterer.prototype.createClusters_ = function(n) {
    var i, t, u, e = this,
        f, r;
    if (this.ready_) {
        for (n === 0 && (google.maps.event.trigger(this, "clusteringbegin", this), typeof this.timerRefStatic != "undefined" && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), u = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.020707717434718, -178.48388434375), new google.maps.LatLng(-85.081364443845445, 178.00048865625)), f = this.getExtendedBounds(u), r = Math.min(n + this.batchSize_, this.markers_.length), i = n; i < r; i++) t = this.markers_[i], !t.isAdded && this.isMarkerInBounds_(t, f) && (!this.ignoreHidden_ || this.ignoreHidden_ && t.getVisible()) && this.addToClosestCluster_(t);
        r < this.markers_.length ? this.timerRefStatic = setTimeout(function() {
            e.createClusters_(r)
        }, 0) : (delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this))
    }
};
MarkerClusterer.prototype.extend = function(n, t) {
    return function(n) {
        for (var t in n.prototype) this.prototype[t] = n.prototype[t];
        return this
    }.apply(n, [t])
};
MarkerClusterer.CALCULATOR = function(n, t) {
    for (var i = 0, u = n.length.toString(), r = u; r !== 0;) r = parseInt(r / 10, 10), i++;
    return i = Math.min(i, t), {
        text: u,
        index: i,
        title: ""
    }
};
MarkerClusterer.BATCH_SIZE = 2e3;
MarkerClusterer.BATCH_SIZE_IE = 500;
MarkerClusterer.IMAGE_PATH = "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/images/m";
MarkerClusterer.IMAGE_EXTENSION = "png";
MarkerClusterer.IMAGE_SIZES = [53, 56, 66, 78, 90];
var app = app || {},
    pageId = pageId || $("body").attr("id"),
    $body = $("body");
String.prototype.YYYYMMDDtoDate = function() {
    var n = parseInt(this.slice(0, 4)),
        t = parseInt(this.slice(4, 6)) - 1,
        i = parseInt(this.slice(6, 8));
    return new Date(n, t, i)
};
Number.prototype.YYYYMMDDtoDate = function() {
    var n = this.toString(),
        t = parseInt(n.slice(0, 4)),
        i = parseInt(n.slice(4, 6)) - 1,
        r = parseInt(n.slice(6, 8));
    return new Date(t, i, r)
};
Date.prototype.DateToYYYMMDD = function() {
    var n = this,
        t = n.getFullYear() + "",
        i = (n.getMonth() + 1).toString().length == 1 ? "0" + (n.getMonth() + 1).toString() : (n.getMonth() + 1).toString(),
        r = n.getDate().toString().length == 1 ? "0" + n.getDate().toString() : n.getDate().toString();
    return parseInt(t + i + r)
};
app.resetFilter = function() {
    var n, t = [],
        i = function(t) {
            n = t.el;
            n.on("click", r)
        },
        r = function() {
            _.each(t, function(n) {
                n()
            })
        },
        u = function(n) {
            n instanceof Function && t.push(n)
        };
    return {
        init: i,
        onReset: u
    }
}();
app.regionBanner = function() {
    var n = {},
        i = function(n, t, i, u) {
            var f = {},
                e;
            n ? f.RegionId = n instanceof Array ? n.join(",") : n : f.ChooseRandom = !0;
            u && (f.Collections = {
                HasBeach: u.HasBeach,
                HasSki: u.HasSki,
                CityLife: u.CityLife
            });
            r(f, function(n) {
                var t = "Luxury Retreats",
                    i = "//static.luxuryretreats.com/images/banners/";
                if (n != null) {
                    t = f.ChooseRandom === !0 ? "Luxury Retreats" : n.Title;
                    var r = n.PictureName.lastIndexOf("."),
                        u = n.PictureName.substr(0, r),
                        e = n.PictureName.substr(r);
                    i += u + "_dBanner" + e;
                    $("#heroImage").css("background-image", 'linear-gradient(rgba(0, 0, 0, .25) 50%, rgba(0, 0, 0, 0)), url("' + i + '")');
                    $("#heroImage .title").html(t)
                }
            });
            e = {
                RegionId: f.RegionId,
                CheckIn: t,
                CheckOut: i
            };
            statsRepository.getRegionStats(e).then(function(n) {
                var t = $("#confidenceMessage"),
                    i = $("#confidenceMessageWithDate"),
                    r = $("#confidenceMessageWithRegion");
                t.hide().find("span").html(n.NumberOfOpenRequests);
                t.show()
            })
        },
        r = function(n, t, i) {
            return $.ajax({
                type: "POST",
                url: SERVICECONNNECTION + "/SearchEngine.svc/GetRegionBanner",
                data: JSON.stringify(n),
                contentType: "application/json",
                success: function(n) {
                    var i = null;
                    n && n.Data && n.Data.length > 0 && (i = n.Data[0]);
                    t instanceof Function && t(i)
                },
                error: function(n, t, r) {
                    regions = [];
                    i instanceof Function && i(r)
                }
            })
        },
        u = function() {
            var n = $.sessionStorage.get("hideHeroBanner");
            return n === null || n === "no"
        },
        t = function() {
            if (u()) {
                var t = n.getQuery(),
                    r = t && t.collections ? t.collections : null,
                    f = t && t.RegionIds && t.RegionIds.length > 0 ? t.RegionIds : null;
                i(f, t.CheckIn, t.CheckOut, r)
            } else $(".gridResults #searchResults").css("margin-top", "120px"), $(".heroImage").hide()
        };
    return {
        init: function(i) {
            n = i;
            t()
        },
        update: function() {
            t()
        }
    }
}();
app.findVillaInquiry = function() {
    var n = $("#findVillaInquiry"),
        t = $("#findVillaInquiryForm"),
        i = function() {
            n.find(".title").addClass("hidden");
            n.find(".subTitle").addClass("hidden")
        },
        r = function() {
            n.find(".title").removeClass("hidden");
            n.find(".subTitle").removeClass("hidden")
        },
        u = function() {
            t.removeClass("hidden");
            n.find(".inquireThanksModal").addClass("hidden");
            r()
        },
        f = function() {
            var n = app.inquire.init({
                template: $("#findVillaInquiryTemplate").detach().html(),
                modal: !1,
                hideFormShowThanksMsg: !0,
                container: t,
                inquireType: "Search General",
                defaultTrackingSettings: "start_planning_form",
                templateVariables: {
                    inquireForm: "findVillaInquireForm",
                    inquireFormId: "formId",
                    inquireFormVersion: "formVersion",
                    inquireFirstName: "findVillaInquireFirstName",
                    inquireLastName: "findVillaInquireLastName",
                    inquireEmail: "findVillaInquireEmail",
                    inquireTel: "findVillaInquireTel",
                    inquireCountry: "findVillaInquireCountry",
                    inquireRegion: "findVillaInquireRegion",
                    inquireCheckIn: "findVillaInquireCheckIn",
                    inquireCheckOut: "findVillaInquireCheckOut",
                    inquireQuestions: "findVillaInquireQuestions",
                    inquirePriceSlider: "findVillaInquirePriceSlider",
                    inquireMarketing: "findVillaInquireMarketing",
                    inquireSubmit: "findVillaInquireSubmit",
                    inquireLoading: "findVillaInquireLoading",
                    inquireError: "findVillaInquireError"
                },
                onSuccess: function() {
                    i();
                    app.dataLayer.virtualPage("Search Inquiry Form Success", "/virtual/form/success/inquiry/search");
                    app.dataLayer.event("GDN - InquireSuccess", "search", 0)
                }
            });
            n.show()
        };
    return {
        init: f,
        hideTitle: i,
        showTitle: r,
        reset: u
    }
}();
app.amenitySelector = function() {
    var i = {},
        u = [],
        n = {
            HasBeach: !1,
            IsUnderPromotion: !1,
            LargeGroups: !1,
            HasSki: !1,
            CityLife: !1,
            Honeymoon: !1,
            NewVillas: !1,
            InstantBook: !1
        },
        f = function(u, f) {
            i = u;
            typeof f == "object" && $.extend(n, f);
            t(n);
            i.on("click", function(t) {
                var i = $(this).children("input"),
                    u = $(this).attr("data-amenity"),
                    f = $("#regionName").val(),
                    e = $("#continentName").val(),
                    s = $("#regionIds").val(),
                    o = e + ", " + f,
                    h = o.split(",");
                t.target.nodeName !== "INPUT" && i.prop("checked", !i.prop("checked"));
                i.is(":checked") ? (n[u] = !0, $(this).addClass("active")) : ($(this).removeClass("active"), n[u] = !1);
                r(n)
            })
        },
        t = function(t) {
            i.each(function() {
                var i = $(this).attr("data-amenity");
                t[i] === !0 ? ($(this).find("input").prop("checked", !0), $(this).addClass("active"), n[i] = !0) : ($(this).find("input").prop("checked", !1), $(this).removeClass("active"), n[i] = !1)
            })
        },
        e = function() {
            return n
        },
        o = function(i) {
            t(i);
            r(n)
        },
        s = function() {
            return n.HasPool == !0 || n.HasBeach == !0 || n.HasGolf == !0 || n.IsUnderPromotion == !0
        },
        h = function(i) {
            var r = ["1|1|1", "1|1|244", "1|1|245", "1|1|246", "1|1|247", "1|1|256", "1|1|173", "1|1|198", "1|14|128", "2|16|88", "1|14|74", "2|25|216", "2|7|136"],
                u = ["1|1|237", "1|1|213|1345", "2|7|113", "2|7|113", "2|12|190|1201", "2|13|218", "1|1|101|712"];
            return i = _.filter(i, function(t) {
                if (t.Hidden) return !1;
                var i = !0;
                return (n.HasBeach == !0 && t.HasBeach != !0 && (i = !1), n.IsUnderPromotion == !0 && t.IsUnderPromotion != !0 && (i = !1), n.NewVillas == !0 && t.IsNewProperty != !0 && (i = !1), n.LargeGroups == !0 && t.Maxbedrooms < 8 && (i = !1), n.HasSki == !0 && i != !1 && $.each(r, function(n, r) {
                    if (t.RegionId.indexOf(r) === -1 || t.RegionId.indexOf("1|1|101") !== -1) i = !1;
                    else return i = !0, !1
                }), n.CityLife == !0 && i != !1 && $.each(u, function(n, r) {
                    if (t.RegionId.indexOf(r) === -1) i = !1;
                    else return i = !0, !1
                }), n.Honeymoon == !0 && t.Maxbedrooms > 2 && (i = !1), n.InstantBook == !0 && t.InstantBook == !1) ? !1 : i ? t : void 0
            }), n.NewVillas == !0 && (n.NewVillas = !1, t(n)), i
        },
        c = function(n) {
            u.push(n)
        },
        r = function(n) {
            $.each(u, function(t, i) {
                i(n)
            })
        },
        l = function(i) {
            (i === "HasBeach" || i === undefined) && (n.HasBeach = !1);
            (i === "IsUnderPromotion" || i === undefined) && (n.IsUnderPromotion = !1);
            (i === "LargeGroups" || i === undefined) && (n.LargeGroups = !1);
            (i === "HasSki" || i === undefined) && (n.HasSki = !1);
            (i === "CityLife" || i === undefined) && (n.CityLife = !1);
            (i === "Honeymoon" || i === undefined) && (n.Honeymoon = !1);
            (i === "InstantBook" || i === undefined) && (n.InstantBook = !1);
            t(n);
            r(n)
        };
    return {
        onChange: c,
        update: t,
        init: f,
        filter: h,
        clear: l,
        hasValue: s,
        setValue: o,
        getValue: e
    }
}();
app.priceSlider = function() {
    var n, i = [],
        t = !1,
        f = {
            min: 100,
            max: 5e3,
            lowerPrice: 100,
            upperPrice: 5e3,
            pricePerWhat: "perNight"
        },
        r = function(t, i) {
            n = this;
            this.config = $.extend({}, f, i);
            this.el = t;
            this.init()
        };
    (function(r) {
        r.onChange = function(n) {
            i.push(n)
        };
        r.update = function(n) {
            typeof n == "object" && $.extend(this.config, n);
            var e = this.config.max,
                o = this.config.upperPrice || this.config.max,
                s = this.config.lowerPrice || this.config.min;
            this.el.slider("values", [s, o]);
            var t = $(this.el.find(".ui-slider-handle")[0]),
                i = $(this.el.find(".ui-slider-handle")[1]),
                f = this.el.slider("option"),
                e = f.max,
                h = e === this.el.slider("values")[1] ? "+" : "",
                r = e === this.el.slider("values")[1] ? this.el.slider("values")[1] + "+/nt" : this.el.slider("values")[1] + "/nt";
            if ($("#searchSubMenu").find(".price .filter .title").html("$" + this.el.slider("values")[0] + " USD - $" + this.el.slider("values")[1] + " USD" + h), u(this.config), this.el.slider("values")[0] != f.min) t.html("<div class='sliderPrice Min'>$" + this.el.slider("values")[0] + "/nt<\/div>"), t.next(".Min").remove();
            else {
                if (t.next(".Min").hasClass("fixed")) {
                    if (t.next(".Min").text("$" + this.el.slider("values")[0] + "/nt"), this.el.slider("values")[1] != f.max) i.html("<div class='sliderPrice Max'>$" + r + "<\/div>"), i.next(".Max").remove();
                    else {
                        if (i.next(".Max").hasClass("fixed")) {
                            i.next(".Max").text("$" + r);
                            return
                        }
                        i.after("<div class='sliderPrice fixed Max'>$" + r + "<\/div>");
                        i.html("")
                    }
                    return
                }
                t.after("<div class='sliderPrice fixed Min'>$" + this.el.slider("values")[0] + "/nt<\/div>");
                t.html("")
            }
            if (this.el.slider("values")[1] != f.max) i.html("<div class='sliderPrice Max'>$" + r + "<\/div>"), i.next(".Max").remove();
            else {
                if (i.next(".Max").hasClass("fixed")) {
                    if (i.next(".Max").text("$" + r), this.el.slider("values")[0] != f.min) t.html("<div class='sliderPrice Min'>$" + this.el.slider("values")[0] + "/nt<\/div>"), t.next(".Min").remove();
                    else {
                        if (t.next(".Min").hasClass("fixed")) {
                            t.next(".Min").text("$" + this.el.slider("values")[0] + "/nt");
                            return
                        }
                        t.after("<div class='sliderPrice fixed Min'>$" + this.el.slider("values")[0] + "/nt<\/div>");
                        t.html("")
                    }
                    return
                }
                i.after("<div class='sliderPrice fixed Max'>$" + r + "<\/div>");
                i.html("")
            }
        };
        r.clear = function() {
            this.config.lowerPrice = this.config.min;
            this.config.upperPrice = this.config.max;
            t = !0;
            this.update(this.config)
        };
        r.init = function() {
            n.el.slider({
                range: !0,
                min: n.config.min,
                max: n.config.max,
                step: 100,
                values: [n.config.lowerPrice, n.config.upperPrice],
                slide: function(i, r) {
                    var e = n.config.max,
                        s = e === r.values[1] ? "+" : "";
                    if ($("#searchSubMenu").find(".price .filter .title").html("$" + r.values[0] + " USD - $" + r.values[1] + " USD" + s), r.values[1] - r.values[0] < 100) return !1;
                    var u = $(r.handle),
                        f = e === r.value ? r.value + "+/nt" : r.value + "/nt",
                        o = $(this).children(".ui-state-active").index() === 1 ? "Min" : "Max";
                    if (o == "Min")
                        if (r.values[0] > n.config.min) u.html("<div class='sliderPrice Min'>$" + f + "<\/div>"), u.next(".Min").remove();
                        else {
                            if (u.next(".Min").hasClass("fixed")) {
                                u.next(".Min").text("$" + f);
                                return
                            }
                            u.after("<div class='sliderPrice fixed Min'>$" + f + "<\/div>");
                            u.html("")
                        }
                    if (o == "Max")
                        if (r.values[1] < n.config.max) u.html("<div class='sliderPrice Max'>$" + f + "<\/div>"), u.next(".Max").remove();
                        else {
                            if (u.next(".Max").hasClass("fixed")) {
                                u.next(".Max").text("$" + f);
                                return
                            }
                            u.after("<div class='sliderPrice fixed Max'>$" + f + "<\/div>");
                            u.html("")
                        }
                    t = !1
                },
                change: function(i, r) {
                    n.config.lowerPrice = r.values[0];
                    n.config.upperPrice = r.values[1];
                    t || u(n.config)
                },
                stop: function(n, t) {
                    t.value == t.values[0] ? app.dataLayer.event("region_filter_price", "set_min", t.values.join(";")) : app.dataLayer.event("region_filter_price", "set_max", t.values.join(";"))
                }
            })
        }
    })(r.prototype);
    var u = function(n) {
            n.min === n.lowerPrice && (n.lowerPrice = null);
            n.max === n.upperPrice && (n.upperPrice = null);
            $.each(i, function(t, i) {
                i(n)
            })
        },
        e = function(i) {
            n.config.lowerPrice = i.lowerPrice || n.config.min;
            n.config.upperPrice = i.upperPrice || n.config.max;
            t = !0;
            n.update(n.config)
        },
        o = function(n, t) {
            return new r(n, t)
        };
    return {
        init: o,
        setValue: e
    }
}();
app.regionSelectors = function(n) {
    var h = $.Deferred(),
        s = [],
        u = {},
        r = {},
        i = {},
        c = [],
        l = "0|0",
        t = {},
        a = function() {
            u.dropdownClose();
            r.dropdownClose();
            i.dropdownClose()
        },
        v = function(n) {
            l = n;
            u = $("#region2");
            r = $("#region3");
            i = $("#region4");
            y();
            f(l)
        },
        y = function() {
            var n = _.sortBy(_.uniq(_.where(s, {
                RegionLevel: 1,
                RecordType: "region"
            }), !1, "RegionId"), function(n) {
                return n.PropertyCount
            }).reverse();
            u.dropdown({
                val: {
                    RegionId: "0|0",
                    Name: "All Destinations"
                },
                enableTabletNative: !0,
                list: n,
                children: "subRegions",
                template: "<span data-Id='{{Id}}'>{{Name}}<\/span><ul class='dropdown'>{{#with defaultVal}}<li class='universalDropdownItem' data-Id='{{Id}}'>{{Name}}<\/li>{{/with}}{{#each items}}<li class='universalDropdownItem groupTitle' data-Id='{{Id}}'>{{Name}}<\/li>{{#each subRegions}}<li class='universalDropdownItem itemChild' data-Id='{{Id}}'>{{Name}}<\/li>{{/each}}{{/each}}<\/ul><select class='dropdownSelect'>{{#with defaultVal}}<option value='{{Id}}'>{{Name}}<\/option>{{/with}}{{#each items}}<optgroup label='{{Name}}'>{{#each subRegions}}<option value='{{Id}}'>{{Name}}<\/option>{{/each}}<\/optgroup>{{/each}}<\/select>",
                defaultVal: {
                    Id: "0|0",
                    Name: "All Destinations"
                },
                onChange: function(n) {
                    t.region2 = this.val.Id;
                    f([n.Id]);
                    n.Id == "0|0" ? o([]) : o([n.Id]);
                    var i = [];
                    n.RegionPath && (i = n.RegionPath.split("|"));
                    mix.click({
                        Id: "316271",
                        Label: "Region 2",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        "Results Count": $body.attr("data-resultscount"),
                        Value: n.Name,
                        "Region 1 Name": i[0],
                        "Region 2 Name": i[1],
                        "Region 3 Name": i[2],
                        "Region 4 Name": i[3],
                        Result: "Successful"
                    })
                },
                onOpen: function() {
                    mix.click({
                        Id: "316271",
                        Label: "Region 2",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        Result: "Original"
                    })
                }
            });
            r.dropdown({
                enableTabletNative: !0,
                val: {
                    Id: "0|0|0",
                    Name: "All Regions"
                },
                defaultVal: {
                    Id: "0|0|0",
                    Name: "All Regions"
                },
                template: "<span data-Id='{{Id}}'>{{Name}}<\/span><ul class='dropdown'>{{#with defaultVal}}<li class='universalDropdownItem' data-Id='{{Id}}'>{{Name}}{{/with}}<\/li>{{#each items}}<li class='universalDropdownItem' data-Id='{{Id}}'>{{Name}}<\/li>{{/each}}<\/ul><select class='dropdownSelect'>{{#with defaultVal}}<option value='{{Id}}'>{{Name}}<\/option>{{/with}}{{#each items}}<option value='{{Id}}'>{{Name}}<\/option>{{/each}}<\/select>",
                onChange: function(n) {
                    t.region3 = this.val.Id;
                    f([n.Id]);
                    o([n.Id]);
                    var i = [];
                    n.RegionName && (i = n.RegionName.split("|"));
                    mix.click({
                        Id: "842231",
                        Label: "Region 3",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        "Results Count": $body.attr("data-resultscount"),
                        Value: n.Name,
                        "Region 1 Name": i[0],
                        "Region 2 Name": i[1],
                        "Region 3 Name": i[2],
                        "Region 4 Name": i[3],
                        Result: "Successful"
                    })
                },
                onOpen: function() {
                    mix.click({
                        Id: "842231",
                        Label: "Region 3",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        Result: "Original"
                    })
                }
            });
            i.dropdown({
                enableTabletNative: !0,
                val: {
                    Id: "0|0|0|0",
                    Name: "All Areas"
                },
                defaultVal: {
                    Id: "0|0|0|0",
                    Name: "All Areas"
                },
                template: "<span data-Id='{{Id}}'>{{Name}}<\/span><ul class='dropdown'>{{#with defaultVal}}<li class='universalDropdownItem' data-Id='{{Id}}'>{{Name}}{{/with}}<\/li>{{#each items}}<li class='universalDropdownItem' data-Id='{{Id}}'>{{Name}}<\/li>{{/each}}<\/ul><select class='dropdownSelect'>{{#with defaultVal}}<option value='{{Id}}'>{{Name}}<\/option>{{/with}}{{#each items}}<option value='{{Id}}'>{{Name}}<\/option>{{/each}}<\/select>",
                onChange: function(n) {
                    t.region4 = this.val.Id;
                    f([n.Id]);
                    o([n.Id]);
                    var i = [];
                    n.RegionName && (i = n.RegionName.split("|"));
                    mix.click({
                        Id: "658088",
                        Label: "Region 4",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        "Results Count": $body.attr("data-resultscount"),
                        Value: n.Name,
                        "Region 1 Name": i[0],
                        "Region 2 Name": i[1],
                        "Region 3 Name": i[2],
                        "Region 4 Name": i[3],
                        Result: "Successful"
                    })
                },
                onOpen: function() {
                    mix.click({
                        Id: "658088",
                        Label: "Region 4",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        Result: "Original"
                    })
                }
            })
        },
        f = function(n) {
            var t = [],
                r, f = $("#regionIds"),
                i = n || [],
                u;
            typeof t != "undefined" && i.length === 1 && (u = i[0], typeof u != "undefined" && (i = u.split(",")));
            f.val(i);
            i.length === 1 ? (r = i[0], typeof r != "undefined" && (t = r.split("|"))) : $.each(i, function(n, i) {
                if (t === undefined) t = i.split("|");
                else {
                    var r = i.split("|");
                    $.each(t, function(n, i) {
                        i !== r[n] && (t[n] = "0")
                    })
                }
            });
            p(t)
        },
        p = function(f) {
            var h = $("#regionName"),
                a = $("#continentName"),
                o, c, l;
            f.length < 1 || f[1] === "0" ? (u.dropdownClear(), r.dropdownDisable().dropdownClear(), i.dropdownDisable().dropdownClear()) : (o = f.slice(0, 2).join("|"), c = _.find(s, {
                RegionId: o
            }), u.dropdownUpdate({
                val: c
            }), l = c.RegionPath.split("|"), h.val(l[1]), a.val(l[0]), t.region2 = o, e(), n.getSubRegions(o).then(function(u) {
                if (u = _.sortBy(_.where(_.uniq(u, !1, "RegionId"), {
                        RecordType: "region"
                    }), "Name"), f[2] === "Num0" || f[2] === undefined) r.dropdownClear().dropdownUpdate({
                    list: u,
                    defaultVal: {
                        Id: f[0] + "|" + f[1],
                        Name: "All Regions"
                    }
                }), i.dropdownClear().dropdownUpdate({
                    list: []
                }).dropdownDisable();
                else {
                    var o = f.slice(0, 3).join("|");
                    n.getRegion(o).then(function(s) {
                        r.dropdownUpdate({
                            val: s,
                            list: u,
                            defaultVal: {
                                Id: f[0] + "|" + f[1],
                                Name: "All Regions"
                            }
                        });
                        var l = s.RegionPath.split("|"),
                            c = l.reverse().slice(0, 2).join(", ");
                        h.val(c);
                        t.region3 = o;
                        e();
                        n.getSubRegions(o).then(function(r) {
                            if (r = _.sortBy(_.where(_.uniq(r, !1, "RegionId"), {
                                    RecordType: "region"
                                }), "Name"), f[3] === "0" || f[3] === undefined) c.toLowerCase() == "paris" && r.sort(function(n, t) {
                                var i = n.RegionName.match(/(\d+)/g),
                                    r = t.RegionName.match(/(\d+)/g);
                                if (i && r && i.length > 0 && r.length > 0) return Number(i[0]) - Number(r[0])
                            }), i.dropdownClear().dropdownUpdate({
                                list: r,
                                defaultVal: {
                                    Id: f[0] + "|" + f[1] + "|" + f[2],
                                    Name: "All Areas"
                                }
                            });
                            else {
                                var u = f.join("|");
                                n.getRegion(u).then(function(n) {
                                    i.dropdownUpdate({
                                        val: n,
                                        list: r,
                                        defaultVal: {
                                            Id: f[0] + "|" + f[1] + "|" + f[2],
                                            Name: "All Areas"
                                        }
                                    });
                                    var o = n.RegionPath.split("4"),
                                        s = o.reverse().slice(0, 3).join(", ");
                                    h.val(s);
                                    t.region4 = u;
                                    e()
                                })
                            }
                        })
                    })
                }
            }))
        },
        w = function(n) {
            c.push(n)
        },
        e = function() {
            $("#region2 .dropdownSelect option").each(function() {
                $(this).val() == t.region2 && (this.selected = !0)
            });
            $("#region3 .dropdownSelect option").each(function() {
                $(this).val() == t.region3 && (this.selected = !0)
            });
            $("#region4 .dropdownSelect option").each(function() {
                $(this).val() == t.region4 && (this.selected = !0)
            })
        },
        o = function(n) {
            $.each(c, function(t, i) {
                i(n)
            });
            e()
        },
        b = function() {
            return $("#region4").dropdownGetValue() != undefined && $("#region4").dropdownGetValue().NormalizedPath ? $("#region4").dropdownGetValue() : $("#region3").dropdownGetValue() != undefined && $("#region3").dropdownGetValue().NormalizedPath ? $("#region3").dropdownGetValue() : $("#region2").dropdownGetValue() != undefined && $("#region2").dropdownGetValue().NormalizedPath ? $("#region2").dropdownGetValue() : void 0
        };
    return $.when(n.getRegionsList(4)).done(function(n) {
        s = n;
        h.resolve({
            init: v,
            update: f,
            onChange: w,
            close: a,
            getSelectedRegion: b
        })
    }), h.promise()
}(searchService);
app.mapResults = function() {
    var k = $.Deferred(),
        n, d, e = [],
        t, h = !1,
        r = undefined,
        y = !1,
        c = !1,
        p = !1,
        l = {
            villas: []
        },
        i = {
            clickDelay: 200,
            maxAmountOfVillasOnPopUp: 10,
            maxZoomLevel: 20,
            clusterMinGrouping: {
                zoomLevel: 13,
                minGridSize: 1,
                maxGridSize: 25
            },
            markerClusterOptions: {
                gridSize: 25,
                calculator: function(n) {
                    for (var t = 0, i = n.length; t < i; t++)
                        if (!n[t].ShowExactLocation) return {
                            text: n.length + '<span style="pointer-events: none; font-family: Roboto, Arial, sans-serif; font-size: 11px; font-weight: normal; color: #111 !important; position: absolute; top: 30px; left: -32px;  width: 100px;">Approx.<\/span>',
                            index: 0
                        };
                    return {
                        text: n.length,
                        index: 0
                    }
                },
                styles: [{
                    url: "/Images/Desktop/mapBlank_black.png",
                    height: 45,
                    width: 45,
                    textSize: 16,
                    textColor: "#ffffff"
                }],
                zoomOnClick: !1
            },
            default_image: {
                url: "/Images/Desktop/mapVilla_black.png",
                size: new google.maps.Size(45, 45),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 45)
            },
            highlighted_image: {
                url: "/Images/Desktop/mapVilla_aqua.png",
                size: new google.maps.Size(45, 45),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 45)
            },
            markerClusterHighlightedIcon: "/Images/Desktop/mapBlank_aqua.png",
            markerClusterNormalIconUrl: "/Images/Desktop/mapBlank_black.png"
        },
        s, o, u = !1,
        g = [],
        nt = [],
        tt = [],
        ki = {
            self: this,
            currentBounds: {},
            contains: function(n) {
                var t = !0;
                return this.currentBounds.contains(n.getNorthEast()) && this.currentBounds.contains(n.getSouthWest()) || (t = !1, this.currentBounds = n), t
            },
            startTracking: function(n) {
                this.currentBounds = n.getBounds()
            },
            getMarkersOnBounds: function(n) {
                var t = [];
                return _.each(n, function(n) {
                    self.currentBounds.contains(n.getPosition()) && t.push(n)
                }), t
            }
        },
        ct = function(n) {
            n instanceof Function && nt.push(n)
        },
        lt = function(t) {
            var i = new google.maps.LatLng(t[0].Latitude, t[0].Longitude),
                r = new google.maps.LatLng(t[2].Latitude, t[2].Longitude),
                u = new google.maps.LatLngBounds(r, i);
            n.fitBounds(u)
        },
        w = function() {
            if (!n) throw new Exception("the google maps needs to be initialized.");
            o = ot(n.getBounds());
            var i = o.getNorthEast(),
                r = o.getSouthWest(),
                t = [];
            return t.push({
                Longitude: i.lng(),
                Latitude: i.lat()
            }), t.push({
                Longitude: i.lng(),
                Latitude: r.lat()
            }), t.push({
                Longitude: r.lng(),
                Latitude: r.lat()
            }), t.push({
                Longitude: r.lng(),
                Latitude: i.lat()
            }), t
        },
        at = function() {
            if (v() && !c && p && s.addClass("map-moved"), t && a.buildDictionary(t), h || f(), h = !1, u && (!u || !c)) {
                var n = w();
                _.each(nt, function(t) {
                    t(n)
                })
            }
        },
        vt = _.debounce(at, 500),
        yt = function() {
            t = new MarkerClusterer(n, e, i.markerClusterOptions);
            t.hasAlreadyOneClick = !1;
            t.isLoading = !1;
            t.hasDoubleClick = !1;
            google.maps.event.addListener(t, "clusterclick", function(n) {
                f();
                dt(n)
            });
            setTimeout(function() {
                a.buildDictionary(t)
            }, 500)
        },
        pt = function() {
            return e
        },
        wt = function() {
            return t
        },
        bt = function() {
            var n = null;
            _.each(e, function(t) {
                ti(t);
                t.setMap(n)
            })
        },
        kt = function(n, t) {
            var r = {
                coords: [1, 1, 1, 45, 45, 45, 45, 1],
                type: "poly"
            };
            _.each(t, function(t) {
                if (t.Latitude && t.Longitude) {
                    if (t.Latitude > 90 || t.Latitude < -90 || t.Longitude > 180 || t.Longitude < -180) return;
                    var s = new google.maps.LatLng(t.Latitude, t.Longitude),
                        u = new MarkerWithLabel({
                            position: s,
                            icon: i.default_image,
                            shape: r,
                            PropertyId: t.PropertyId,
                            NormalizedUrl: t.NormalizedUrl,
                            title: t.PropertyName,
                            PropertyName: t.PropertyName,
                            RegionName: t.RegionName,
                            ThumbnailFileName: t.ThumbnailFileName,
                            Maxbedrooms: t.Maxbedrooms,
                            Price: t.Price,
                            ShowExactLocation: t.ShowExactLocation,
                            ReservationTotal: t.ReservationTotal,
                            NumberNights: t.NumberNights,
                            MaxRate: t.MaxRate,
                            MinRate: t.MinRate,
                            PricePerWhat: t.PricePerWhat
                        });
                    t.ShowExactLocation || (u.labelContent = "Approx.", u.labelAnchor = new google.maps.Point(0, 5), u.labelClass = "marker-label");
                    o.extend(s);
                    google.maps.event.addListener(u, "click", function() {
                        setTimeout(function() {
                            y || (f(), ni(u))
                        }, i.clickDelay);
                        mix.click({
                            Id: "737015",
                            Label: "House Icon",
                            "Page Section": "Main",
                            "Action Type": "Search",
                            "Search Sub Category": "Villa Info",
                            "Villa ID": u.PropertyId,
                            Value: u.PropertyName
                        })
                    });
                    google.maps.event.addListener(u, "dblclick", function() {
                        var t = parseInt(n.getZoom());
                        y = !0;
                        f();
                        n.setZoom(t + 1);
                        n.setCenter(u.getPosition());
                        setTimeout(function() {
                            y = !1
                        }, 200)
                    });
                    e.push(u)
                }
            })
        },
        dt = function(r) {
            if (t.isLoading) return !1;
            t.hasAlreadyOneClick;
            setTimeout(function() {
                t.hasDoubleClick || t.isLoading || (!r.getMarkers || r.getMarkers() instanceof Array ? r.getMarkers && r.getMarkers().length > i.maxAmountOfVillasOnPopUp && n.getZoom() < i.maxZoomLevel ? it(r) : (gt(r), mix.click({
                    Id: "449697",
                    Label: "Grouped Villa Icon",
                    "Page Section": "Main",
                    "Action Type": "Search",
                    "Search Sub Category": "Villa Info",
                    "Results Count": r.markers_.length
                })) : it(r), b())
            }, i.clickDelay)
        },
        it = function(r) {
            var u, f;
            t.isLoading = !0;
            u = r.getBounds();
            r.clusterIcon_ && (r.clusterIcon_.styles_[0].url = i.markerClusterNormalIconUrl, r.updateIcon_());
            u ? n.fitBounds(u) : (f = n.getZoom() + 1, n.setCenter(r.getCenter()), n.setZoom(f < i.maxZoomLevel ? f : i.maxZoomLevel));
            b()
        },
        gt = function(n) {
            t.isLoading = !0;
            h = !0;
            r = n;
            rt(n);
            app.mapInformationBox.open(n);
            b()
        },
        b = function() {
            t.isLoading = !1;
            t.hasAlreadyOneClick = !1;
            t.hasDoubleClick = !1
        },
        f = function() {
            if (r) {
                if (app.mapInformationBox.close(), r.isCluster) {
                    r.clusterIcon_ && r.clusterIcon_.styles_[0].url != i.markerClusterNormalIconUrl && (r.clusterIcon_.styles_[0].url = i.markerClusterNormalIconUrl, r.updateIcon_());
                    r = undefined;
                    return
                }
                r.setIcon && r.setIcon(i.default_image);
                r = undefined
            }
        },
        ni = function(n) {
            if (r) {
                f();
                return
            }
            ut(n);
            r = n;
            ii(n);
            h = !0;
            app.mapInformationBox.open(n)
        },
        ti = function(n) {
            google.maps.event.clearInstanceListeners(n)
        },
        rt = function(n) {
            n.clusterIcon_ && (n.clusterIcon_.styles_[0].url = i.markerClusterHighlightedIcon, n.updateIcon_());
            n.isCluster = !0;
            r = n
        },
        ut = function(n) {
            n.setIcon(i.highlighted_image);
            r = n
        },
        a = {
            markersMapDictionary: {},
            buildDictionary: function(n) {
                var r = this,
                    t;
                n && n.getClusters && (t = n.getClusters(), this.markersMapDictionary = {}, _.each(t, function(n) {
                    var t = n.getMarkers().length > 1;
                    _.each(n.markers_, function(u) {
                        r.markersMapDictionary[u.PropertyId] = t ? n : u;
                        t || u.setIcon(i.default_image)
                    })
                }))
            },
            getMarkerByPropertyId: function(n) {
                return this.markersMapDictionary[n]
            }
        },
        ii = function() {
            _.each(g, function(n) {
                n()
            })
        },
        ri = function(n) {
            n instanceof Function && g.push(n)
        },
        ui = function(n) {
            if (!n || v() || c) {
                f();
                var t = a.getMarkerByPropertyId(n);
                t && (t.getPosition ? ut(t) : rt(t))
            }
        },
        fi = function() {
            v() && f()
        },
        ei = function(n) {
            l.villas = n.data;
            l.query = n.query;
            v() && ft()
        },
        oi = function() {
            t && t.clearMarkers();
            e = []
        },
        ft = function() {
            c = !0;
            o = new google.maps.LatLngBounds;
            ht();
            f();
            t && t.clearMarkers();
            e = [];
            kt(n, l.villas, o);
            var i = ot(o);
            yt();
            (!u || u && l.query && !l.query.Polygon) && e.length > 0 && setTimeout(function() {
                n.fitBounds(i);
                var t = n.getCenter();
                n.setCenter(new google.maps.LatLng(t.lat() + 1e-7, t.lng()))
            }, 100);
            n.getZoom() < 3 && n.setZoom(3);
            s.removeClass("map-moved");
            setTimeout(function() {
                c = !1;
                n.getCenter().G > 84 && n.panTo(new google.maps.LatLng(14, -75))
            }, 1500)
        },
        si = function(n) {
            n instanceof Function && tt.push(n)
        },
        di = function() {},
        hi = function() {
            var n = {
                filterMapMode: u,
                bounds: w()
            };
            _.each(tt, function(t) {
                t(n)
            })
        },
        ci = function(n) {
            u = n
        },
        li = function() {
            var n = s.find("input")[0];
            n.checked = !0;
            et(n);
            mix.click({
                Id: "996366",
                Label: "Map - Update Results",
                "Page Section": "Main",
                "Action Type": "Search",
                "Results Count": $body.attr("data-resultscount")
            })
        },
        et = function(n) {
            var t = n.target || n;
            u = t.checked;
            mix.click({
                Id: "162266",
                Label: "Map - Use to Filter",
                "Page Section": "Main",
                "Action Type": "Search",
                "Search Sub Category": "Villa Info",
                Value: u == !0 ? "Selected" : "Unselected"
            });
            u ? (s.addClass("map-filtering").removeClass("map-moved"), mix.click({
                Id: "162265",
                Label: "Map - Show Nearby Villas",
                "Page Section": "Main",
                "Action Type": "Search",
                Value: "Selected",
                "Results Count": $body.attr("data-resultscount")
            })) : (s.removeClass("map-filtering").removeClass("map-moved"), mix.click({
                Id: "162265",
                Label: "Map - Show Nearby Villas",
                "Page Section": "Main",
                "Action Type": "Search",
                Value: "Unselected"
            }));
            hi(u)
        },
        v = function() {
            return $body.hasClass("mapResults")
        },
        ot = function(n) {
            var t = n.getNorthEast(),
                i = n.getSouthWest(),
                r = .01,
                u = Math.abs(Math.abs(i.lng()) - Math.abs(t.lng())),
                f = Math.abs(Math.abs(i.lat()) - Math.abs(t.lat()));
            if (u == 0 || f == 0) {
                var e = i.lat() - r,
                    o = t.lat() + r,
                    s = i.lng() - r,
                    h = t.lng() + r,
                    c = new google.maps.LatLng(e, s),
                    l = new google.maps.LatLng(o, h);
                return new google.maps.LatLngBounds(c, l)
            }
            return n
        },
        ai = function() {
            var e = n.getBounds(),
                t = e.getNorthEast(),
                i = e.getSouthWest(),
                r;
            if (i.lng() > t.lng()) {
                if (Math.abs(i.lng()) > Math.abs(t.lng())) {
                    var u = new google.maps.LatLng(i.lat(), -175),
                        f = new google.maps.LatLng(t.lat(), t.lng() + (185 - i.lng())),
                        o = n.getZoom();
                    r = new google.maps.LatLngBounds(u, f)
                } else {
                    var f = new google.maps.LatLng(t.lat(), 175),
                        u = new google.maps.LatLng(i.lat(), i.lng() - (185 + t.lng())),
                        o = n.getZoom();
                    r = new google.maps.LatLngBounds(u, f)
                }
                n.setCenter(r.getCenter())
            }
        },
        st = _.throttle(ai, 150),
        vi = function() {
            app.mapInformationBox.init(n)
        },
        yi = function() {
            google.maps.event.addListener(n, "bounds_changed", vt);
            google.maps.event.addListener(n, "zoom_changed", function() {
                n.getZoom() > i.clusterMinGrouping.zoomLevel ? (t.setGridSize(i.clusterMinGrouping.minGridSize), u ? mix.click({
                    Id: "967408",
                    Label: "Map Zoom In",
                    "Page Section": "Main",
                    "Action Type": "Search",
                    Value: n.getZoom(),
                    "Results Count": $body.attr("data-resultscount")
                }) : mix.click({
                    Id: "967408",
                    Label: "Map Zoom In",
                    "Page Section": "Main",
                    "Action Type": "Search",
                    Value: n.getZoom()
                })) : (t.setGridSize(i.clusterMinGrouping.maxGridSize), u ? mix.click({
                    Id: "478637",
                    Label: "Map Zoom Out",
                    "Page Section": "Main",
                    "Action Type": "Search",
                    Value: n.getZoom(),
                    "Results Count": $body.attr("data-resultscount")
                }) : mix.click({
                    Id: "478637",
                    Label: "Map Zoom Out",
                    "Page Section": "Main",
                    "Action Type": "Search",
                    Value: n.getZoom()
                }))
            });
            google.maps.event.addListener(n, "idle", function() {
                st()
            });
            google.maps.event.addListener(n, "drag", function() {
                st()
            });
            google.maps.event.addListener(n, "bounds_changed", function() {
                h || f()
            });
            google.maps.event.addListener(n, "click", function() {
                f();
                p = !0
            });
            google.maps.event.addListener(n, "dragstart", function() {
                f();
                p = !0
            })
        },
        ht = function() {
            google.maps.event.trigger(n, "resize")
        },
        pi = function() {
            var n = google.maps.InfoWindow.prototype.set;
            google.maps.InfoWindow.prototype.set = function(t) {
                (t !== "map" || this.get("noSupress")) && n.apply(this, arguments)
            }
        },
        wi = function(t, i) {
            var r = {
                navigationControl: !1,
                mapTypeControl: !1,
                center: new google.maps.LatLng(14, -75),
                zoom: 3,
                minZoom: 3,
                maxZoom: 19,
                zoomControl: !0,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                panControl: !1,
                streetViewControl: !1,
                scaleControl: !1
            };
            d = t;
            n = new google.maps.Map(i[0], r);
            yi();
            google.maps.event.trigger(n, "resize");
            vi();
            s = d.find("#mapControlBar");
            $("#useMapFilter").on("change", et);
            $(".moved-map-filter-option").on("click", li);
            pi()
        },
        bi = {
            init: wi,
            update: ei,
            loadVillas: ft,
            unloadVillas: oi,
            onBoundsChanged: ct,
            getBounds: w,
            setBounds: lt,
            setFilterMode: ci,
            onFilterModeChanged: si,
            selectVilla: ui,
            unselectVilla: fi,
            onVillasSelected: ri,
            getMarkers: pt,
            clearMarkers: bt,
            getCluster: wt,
            getMap: function() {
                return n
            },
            draw: ht,
            buildDictionary: function() {
                return a.buildDictionary(t), a
            }
        };
    return k.resolve(bi), k.promise()
}();
app.mapInformationBox = function() {
    var n = {
            $element: {},
            $blockOverlay: {},
            noImageUrl: "//resources.luxuryretreats.com/www/images/vr5/placeholderVillaImage.png",
            template: "<div class='map-villa-box'> <div class='map-villa-image-wrapper'><a target='_blank' href='{{NormalizedUrl}}' data-id='{{PropertyId}}'><img src={{optimizedimageUrl PropertyId ThumbnailFileName 'medium' 'high' }} class='map-villa-image not-loaded'/><\/a><\/div><div class='map-villa-text-wrapper'><a target='_blank' href='{{NormalizedUrl}}' data-id='{{PropertyId}}'><span class='map-villa-title {{LongTextClass}}'>{{title}}<\/span><span class='map-villa-prices'>{{Maxbedrooms}} BR, {{{Price}}}<\/span><\/a><\/div><\/div>",
            templateMultipleVillas: "<div class='map-multiple-vllas-box'><div id='slider' class='swipe'><div class='swipe-wrap'>{{#each markers}}<div class='map-villa-box'> <div class='map-villa-image-wrapper'><a target='_blank' href='{{NormalizedUrl}}' data-id='{{PropertyId}}'><img src={{optimizedimageUrl PropertyId ThumbnailFileName 'medium' 'high' }} class='map-villa-image not-loaded'/><\/a><\/div><div class='map-villa-text-wrapper'><a target='_blank' href='{{NormalizedUrl}}' data-id='{{PropertyId}}'><span class='map-villa-title {{LongTextClass}}'>{{title}}<\/span><span class='map-villa-prices'>{{Maxbedrooms}} BR, {{{Price}}}<\/span><\/a><\/div><\/div>{{/each}}<\/div><\/div><div class='slider-controls'><div class='slide-control slide-left-control'><\/div><div id='slider-position'><\/div><div class='slide-control slide-right-control'><\/div><\/div><\/div>",
            compiledTemplate: {},
            compiledTemplateMultipleVillas: {},
            maxLenghtOfCharsForTitle: 30,
            infoBoxOptions: {
                disableAutoPan: !1,
                maxWidth: 300,
                pixelOffset: new google.maps.Size(-120, -160),
                zIndex: 10,
                boxStyle: {
                    background: "#fff"
                },
                infoBoxClearance: new google.maps.Size(2, 2),
                isHidden: !1,
                pane: "floatPane",
                enableEventPropagation: !1
            },
            SliderinfoBoxOptions: {
                disableAutoPan: !1,
                maxWidth: 300,
                pixelOffset: new google.maps.Size(-140, -180),
                zIndex: 10,
                boxStyle: {
                    background: "#fff"
                },
                infoBoxClearance: new google.maps.Size(2, 2),
                isHidden: !1,
                pane: "floatPane",
                enableEventPropagation: !1
            }
        },
        r, t, i, u = !1,
        o = function(i) {
            n.compiledTemplate = Handlebars.compile(n.template);
            n.compiledTemplateMultipleVillas = Handlebars.compile(n.templateMultipleVillas);
            t = new InfoBox(n.infoBoxOptions);
            r = i;
            google.maps.event.addListener(t, "domready", a);
            r.getDiv().addEventListener("load", s, !0);
            Handlebars.registerHelper("LongTextClass", function() {
                return this.title.length > n.maxLenghtOfCharsForTitle ? "multiline" : ""
            })
        },
        s = function(n) {
            n.target.tagName == "IMG" && n.target.className.indexOf("map-villa-image") >= 0 && $(n.target).removeClass("not-loaded")
        },
        h = function(i) {
            var f = n.compiledTemplate(i);
            u = !1;
            t.setContent(f);
            t.setOptions(n.infoBoxOptions);
            t.open(r, i)
        },
        c = function(n) {
            n.getMarkers ? (l(n), app.dataLayer.event("region_map_view", "villa_icon_group_click")) : (h(n), app.dataLayer.event("region_map_view", "villa_icon_click", n.PropertyId))
        },
        l = function(i) {
            var f = i.getMarkers(),
                e = n.compiledTemplateMultipleVillas({
                    markers: f
                });
            u = !0;
            t.setContent(e);
            t.setOptions(n.SliderinfoBoxOptions);
            t.setPosition(i.getCenter());
            t.open(r)
        },
        a = function() {
            u && v()
        },
        v = function() {
            villaSliderElement = document.getElementById("slider");
            $rangePositionElement = $("#slider-position");
            i = Swipe(villaSliderElement, {
                callback: w
            });
            var n = {
                min: 1,
                max: i.getNumSlides(),
                slide: b,
                change: k
            };
            $rangePositionElement.slider(n);
            $(".slide-left-control").on("click", f);
            $(".slide-right-control").on("click", e)
        },
        y = function() {
            villaSliderElement = document.getElementById("slider");
            villaSliderElement && (i.destroy(), $(".slide-left-control").off("click", f), $(".slide-right-control").off("click", e));
            $rangePositionElement && $rangePositionElement.slider("destroy");
            i = undefined;
            $rangePositionElement = undefined
        },
        p = function() {
            t.close();
            u && y()
        },
        d = function() {
            var n = $("#map"),
                t = {};
            t.height = n.height();
            t.width = n.width()
        },
        w = function(n) {
            $rangePositionElement.slider("value", n + 1)
        },
        f = function(n) {
            i.prev();
            n.preventDefault();
            mix.click({
                Id: "983591",
                Label: "Grouped Villa Popup Prev",
                "Page Section": "Main",
                "Search Sub Category": "Villa Info",
                "Action Type": "Search"
            })
        },
        e = function(n) {
            i.next();
            n.preventDefault();
            mix.click({
                Id: "998123",
                Label: "Grouped Villa Popup Next",
                "Page Section": "Main",
                "Search Sub Category": "Villa Info",
                "Action Type": "Search"
            })
        },
        b = function(n, t) {
            i.slide(t.value)
        },
        k = function() {};
    return {
        init: o,
        open: c,
        close: p
    }
}();
app.lister = function(n) {
    var s = $.Deferred(),
        d = [],
        u = !1,
        i = !0,
        r = "",
        wt = document.title,
        f = null,
        t = {
            pageIndices: [0, 0],
            lastScrollTop: 0,
            pageSize: 15,
            numberColumns: 3,
            data: null,
            favouriteData: [],
            format: "grid",
            regionIds: "",
            villaTemplate: "",
            handlebarHelpers: {
                optimizedimageUrl: function(n, t, i) {
                    var r = i == "standard" ? "400x266" : "600x352",
                        u = Math.floor(n / 1e6 + 1) + "/" + Math.floor(n % 1e6 / 1e3 + 1) + "/";
                    return IMAGE_PATH + "/med/" + r + "/" + u + n + "_" + t
                },
                isFavourite: function() {
                    if (t.favouriteData.indexOf(this.PropertyId) >= 0) return "active"
                },
                isInPromo: function() {
                    return this.IsUnderPromotion || this.IsNewProperty ? "active" : ""
                },
                Promo: function() {
                    if (this.IsUnderPromotion) {
                        var n = $($.parseXML(this.PromotionData)).find("PublicName").first().text();
                        return n.trim() || "PROMO"
                    }
                    if (this.IsNewProperty) return "NEW ADDITION"
                },
                ReversedRegionName: function() {
                    var n = this.RegionName.split(", ");
                    return n.length === 3 ? n.splice(1, 2).reverse().join(", ") : n.length === 4 ? n.splice(2, 3).reverse().join(", ") : n.length > 0 ? n.reverse().join(", ") : void 0
                },
                villaUrl: function(n, t, i) {
                    for (var f = i.split(", "), r = "", u = 0; u < f.length; u++) r += f[u].replace(/ /g, "-").replace(/#/g, "-").replace(/&/g, "-").replace(/[/]/g, "-"), r += "/";
                    return r += t.replace(/ /g, "-").replace(/#/g, "-").replace(/&/g, "-"), r += "-" + n, LRI_VILLA_URL + r
                },
                sleepNumber: function() {
                    return this.MaxGuests
                },
                ReviewScore: function() {
                    return this.ReviewScore.toFixed(1)
                },
                ReviewPercent: function() {
                    return this.ReviewScore * 20
                },
                Price: function() {
                    function t(n) {
                        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    var n = "",
                        i = !0;
                    return this.PricePerWhat || (this.PricePerWhat = "perNight"), this.PricePerWhat == "perNight" ? this.ReservationTotal && parseInt(this.ReservationTotal) && this.NumberNights > 0 ? n += "<sub>$<\/sub><span class='biggerText'>" + t((parseInt(this.ReservationTotal) / this.NumberNights).toFixed()) + "<\/span> /NT" : this.MinRate && parseInt(this.MinRate) && this.MaxRate && parseInt(this.MaxRate) ? n += this.MinRate == this.MaxRate ? "<sub>$<\/sub><span class='biggerText'>" + t(parseInt(this.MinRate)) + "<\/span> /NT" : "FROM <sub>$<\/sub><span class='biggerText'>" + t(parseInt(this.MinRate)) + "<\/span> /NT" : (i = !1, n += "Price Upon Request") : this.PricePerWhat == "perBedroom" && (this.ReservationTotal && parseInt(this.ReservationTotal) && this.NumberNights > 0 && this.Maxbedrooms > 0 ? n += "$<span class='biggerText'>" + t((this.ReservationTotal / this.NumberNights / this.Maxbedrooms).toFixed()) + "<\/span> / nt / bedroom" : this.MinRate && parseInt(this.MinRate) && this.MaxRate && parseInt(this.MaxRate) && this.Maxbedrooms > 0 ? n += this.MinRate == this.MaxRate ? "$<span class='biggerText'>" + t((parseInt(this.MinRate) / this.Maxbedrooms).toFixed()) + "<\/span> / nt / bedroom" : "$<span class='biggerText'>" + t((parseInt(this.MinRate) / this.Minbedrooms).toFixed()) + "<\/span> - $<span class='biggerText'>" + t((parseInt(this.MaxRate) / this.Maxbedrooms).toFixed()) + "<\/span> / nt / bedroom" : (i = !1, n += "Price Upon Request")), n
                }
            }
        },
        g = function(n) {
            function i() {
                var n = window.innerWidth,
                    t = $("#mapContainer");
                n >= 1340 ? t.addClass("resized") : n < 1340 && t.removeClass("resized")
            }
            n && (t = $.extend({}, t, n));
            var r = document.location.pathname + document.location.search,
                u = sessionStorage.searchURL;
            $.each(t.handlebarHelpers, function(n, t) {
                Handlebars.registerHelper(n, t)
            });
            i();
            $(window).resize(function() {
                var n = window.innerWidth;
                t.format != "map" && (n >= 1645 && t.numberColumns == 2 && t.format == "grid" ? ($("#resultsList .col-sm-1").css("width", "33.3%"), t.numberColumns = 3) : n < 1645 && t.numberColumns == 3 && t.format == "grid" ? ($("#resultsList .col-sm-1").css("width", "50%"), t.numberColumns = 2) : t.format == "map" && ($("#resultsList .col-sm-1").css("width", "50%"), t.numberColumns = 1));
                i()
            })
        },
        h = function(n) {
            var t, i;
            return n == null || isNaN(n) ? window.location.href : (t = window.location.search, t.length == 0) ? n > 1 ? window.location.href + "?page=" + n : window.location.href : (i = deparam(location.search.replace("?", "")).page, t = i == null && n > 1 ? t.replace("?", "?page=" + n + "&") : n == 1 ? t.replace("&page=" + i, "").replace("page=" + i + "&", "").replace("page=" + i, "") : t.replace("page=" + i, "page=" + n), t == "?" && (t = ""), window.location.href.replace(window.location.search, t))
        },
        nt = function(n) {
            var t = n.attr("data-scrolltracking");
            t == undefined && n.attr("data-scrolltracking", "queued")
        },
        c = function() {
            for (var f = $(window).scrollTop() + $(window).height(), i = $(".col-sm-1"), o = i.length, r, e, u, n = 0; n < o; n = n + t.numberColumns) {
                if (villaCard = $(i[n]), r = villaCard.offset().top, e = villaCard.offset().top + villaCard.height(), r > 0 && e < f)
                    for (u = n; u < n + t.numberColumns; villaCard = $(i[++u])) nt(villaCard);
                if (r >= f) return parseInt($(i[n - t.numberColumns]).attr("data-page")) + 1
            }
            return parseInt($(i[i.length - 1]).attr("data-page")) + 1
        },
        tt = function() {
            return parseInt(deparam(location.search.replace("?", "")).page) - 1 || 0
        },
        l = function() {
            var n = y();
            (y() || ut()) && (u || e(n).then(function() {
                sessionStorage.searchResults.length > 2 && l(n);
                o()
            }))
        },
        a = function(n) {
            var i = $(".col-sm-1[data-scrolltracking='queued']"),
                r, u;
            (n === !0 || i.length > t.numberColumns || parseInt($(i[i.length - 1]).attr("data-index")) == t.dataCount) && (r = "", i.each(function() {
                var t = $(this),
                    n = t.children(".villa"),
                    i;
                if (n && t) {
                    i = "";
                    const u = t.find(".biggerText")[0] ? t.find(".biggerText") : t.find(".price");
                    u && (i = u.text().replace(/[,]/g, ""));
                    const f = n.attr("data-reviewscore") && n.attr("data-reviewscore") !== "0.0" ? n.attr("data-reviewscore") : null;
                    r += "po" + t.attr("data-index") + "^vi" + n.attr("data-villaid") + "^gs" + n.attr("data-sleepNumber") + "^br" + n.attr("data-maxbedrooms") + "^ba" + n.attr("data-bathrooms") + "^ar" + f + "^nr" + n.attr("data-reviewcount") + "^pr" + i + "/nt^ib" + n.attr("data-instantbook") + ";"
                }
                t.attr("data-scrolltracking", "tracked")
            }), u = $.sessionStorage.get("vfImpressionCount"), u = u ? u + i.length : i.length, $.sessionStorage.set("vfImpressionCount", u), r = r.slice(0, -1), app.dataLayer.event("region_villa", "impression", r))
        },
        it = function(n) {
            var u = !0,
                f = 0,
                i;
            n && (t = $.extend({}, t, n));
            t.lastScrollTop = $("section").scrollTop();
            $("section").on("scroll", function() {
                var i = $(this).scrollTop(),
                    r = i > t.lastScrollTop,
                    n = c();
                a();
                n != f && (u = !0);
                f = n;
                u && (r & n > 0 ? history.replaceState(null, null, h(n)) : r || history.replaceState(null, null, h(n)), u = !1);
                t.lastScrollTop = i;
                l()
            });
            i = tt();
            window.location.href.toLowerCase() == (sessionStorage.lastSearchPage || "").toLowerCase() && (r = sessionStorage.lastClickedVilla, delete sessionStorage.lastSearchPage, delete sessionStorage.lastPage, delete sessionStorage.lastClickedVilla);
            t.pageIndices = [i, i];
            e(!0).then(function() {
                i > 0 ? e(!1).then(function() {
                    v()
                }) : v()
            }).then(function() {
                c();
                a(!0)
            });
            app.transparentHeader.isDefined() || $("#headerSearchWrapper").removeClass("hidden")
        },
        v = function() {
            var n, t;
            $("body").hasClass("loading") || dataLayer.push({
                pagePath: window.location.pathname + window.location.search,
                event: "sendPageView"
            });
            o();
            $("body").removeClass("loading");
            st();
            $(document).trigger("doneLoading");
            r && (n = $(".villa[data-villaid=" + r + "]"), r = "", n.length > 0 && (t = $("section").offset().top + $("#searchFilters").outerHeight(), $("section").scrollTop($("section").scrollTop() + n.offset().top - t)))
        },
        rt = function(n) {
            var t = $(window).scrollTop() + $(window).height();
            return n.offset().top <= t
        },
        y = function() {
            var n = $($(".loadMoreResults")[1]);
            return n.hasClass("thereIsMore") && rt(n)
        },
        ut = function() {
            var n = $($(".loadMoreResults")[0]);
            return n.hasClass("thereIsMore") && n.offset().top > -200
        },
        e = function(n) {
            return ft(n).then(function(r) {
                r.length > 0 && (et(r, n), o(), i ? i = !1 : n ? t.pageIndices[1]++ : t.pageIndices[0]--)
            })
        },
        ft = function(n) {
            var r;
            return (r = i ? t.pageIndices[0] : n ? t.pageIndices[1] + 1 : t.pageIndices[0] - 1, r >= 0) ? t.format == "map" ? t.data ? p(r) : k(0).then(function(n) {
                return t.data = n.Data, t.dataCount = n.DataCount, p(r)
            }) : k(r).then(function(n) {
                t.dataCount = n.DataCount;
                for (var i = 0; i < n.Data.length; i++) n.Data[i].index = r * t.pageSize + i + 1;
                return _.map(n.Data, function(n) {
                    return b(n, r)
                })
            }) : $.Deferred().resolve([])
        },
        p = function(n) {
            var i = n * t.pageSize,
                r = t.data.slice(i, i + t.pageSize),
                u = _.map(r, function(t) {
                    return b(t, n)
                });
            return $.Deferred().resolve(u)
        },
        et = function(n, t) {
            var r = t ? "append" : "prepend",
                f, e;
            if (n.length > 0) {
                var i = $("#resultsList").children()[0],
                    o = i ? $(i).offset().top : null,
                    u = $('.villaImageContainer img:not(".fade")');
                $("#resultsList")[r](n);
                $.each(n, function() {
                    var n = 0;
                    n = u.length != 0 ? u.height() : Math.ceil(parseInt(352 * this.width() / 600) / 10) * 10;
                    this.find(".villaImageContainer").css("min-height", n)
                });
                r == "prepend" && i && (navigator.userAgent.match(/Trident\/7\./) && (w(!1), setTimeout(function() {
                    w(!0)
                }, 400)), f = $(i).offset().top, e = $("section").scrollTop() + (f - o), $("section").scrollTop(e))
            }
        },
        w = function(n) {
            if (n) $("section").off("mousewheel");
            else $("section").on("mousewheel", function(n) {
                n.preventDefault()
            })
        },
        o = function() {
            var n = $(".loadMoreResults"),
                i = $(n[0]),
                r = $(n[1]),
                u;
            t.pageIndices[0] > 0 && sessionStorage.searchResults.length > 2 ? i.addClass("thereIsMore") : i.removeClass("thereIsMore");
            u = t.pageIndices[1] * t.pageSize + t.pageSize;
            t.dataCount == undefined || u < t.dataCount ? r.addClass("thereIsMore") : (r.removeClass("thereIsMore"), $("#noMoreResults").show())
        },
        b = function(n, i) {
            var u = Handlebars.compile(t.villaTemplate),
                r = $(u(n));
            r.css("width", 100 / t.numberColumns + "%");
            r.attr("data-page", i);
            r.attr("data-index", n.index);
            r.find(".villa img").each(function() {
                $(this).one("load", function() {
                    $(this).removeClass("fade");
                    $(this).parent().attr("style", null)
                })
            });
            r.find("a").on("click", function() {
                sessionStorage.lastPage = i;
                sessionStorage.lastSearchPage = window.location.href;
                sessionStorage.lastClickedVilla = $(this).parents(".villa").attr("data-villaid")
            });
            return r
        },
        ot = function() {
            $("#resultsTextContainer").addClass("updating");
            $("#searchResults").addClass("loading")
        },
        st = function() {
            ht().then(function(i) {
                var f = $("#resultsTextContainer"),
                    u = "",
                    r = "",
                    o = [],
                    e;
                i ? (e = n.getFullName(i), u = " in " + (e ? e : i.Name), r = i.Name, o = i.RegionName, sessionStorage.searchQuery = e || i.Name) : t.regionIds.length === 0 ? (u = " for all destinations", r = "All", sessionStorage.searchQuery = "All Destinations") : t.format == "map" && (u = " (based on Map View)", sessionStorage.searchQuery = u);
                f.removeClass("updating");
                $("#searchResults").removeClass("loading");
                f.find(".resultsNumber").html(t.dataCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                f.find(".resultText").html(u);
                $UpdateableTitleText = f.find(".UpdateableTitleText");
                $UpdateableTitleText.hasClass("server-rendered") ? $UpdateableTitleText.removeClass("server-rendered") : $UpdateableTitleText.html(r + " Villas and Vacation Rentals");
                $("#resetFilterRegion").html(u.replace("for", "in"));
                r = typeof o == "string" ? o.split("|") : [];
                mix.page({
                    Id: "439605",
                    Label: "Search",
                    "Results Count": t.dataCount,
                    "Region 1 Name": typeof r[0] == "undefined" ? "All" : r[0],
                    "Region 2 Name": typeof r[1] == "undefined" ? "All" : r[1],
                    "Region 3 Name": typeof r[2] == "undefined" ? "All" : r[2],
                    "Region 4 Name": typeof r[3] == "undefined" ? "All" : r[3],
                    "Region ID": t.regionIds.toString(),
                    "Previous Page": routingService.getPreviousPage()
                })
            })
        },
        ht = function() {
            return t.regionIds && t.regionIds[0] ? n.getRegion(t.regionIds.join(",")) : $.Deferred().resolve(null)
        },
        ct = function() {
            if (t.format = "map", t.numberColumns = 1, !$body.hasClass("mapResults")) {
                $(this).addClass("active").siblings().removeClass("active");
                $body.removeClass("gridResults").addClass("mapResults");
                $("#thingsToDo").hide();
                var n = $(".villaImage img");
                n.each(function() {
                    var n = this.src.replace("narrow", "wide");
                    $(this).attr("src", n)
                });
                $("#resultsList").empty();
                mix.click({
                    Id: "971794",
                    Label: "Map View",
                    "Page Section": "Main",
                    "Action Type": "Search"
                })
            }
        },
        lt = function() {
            var i, n;
            ($("#mapContainer").css("opacity", ""), $body.hasClass("gridResults")) || ($(this).addClass("active").siblings().removeClass("active"), $body.removeClass("mapResults").addClass("gridResults"), $("#thingsToDo").show(), i = $(".villaImage img"), i.each(function() {
                var n = this.src.replace("wide", "narrow");
                $(this).attr("src", n)
            }), n = 3, window.innerWidth < 1645 && (n = 2), t.format = "grid", t.numberColumns = n, $("#resultsList").empty(), mix.click({
                Id: "280873",
                Label: "List View",
                "Page Section": "Main",
                "Action Type": "Search"
            }))
        },
        at = function(n) {
            t.pageIndices = [0, 0];
            $("section").scrollTop(0);
            i = !0;
            $("#resultsList").empty();
            n.regionIds === undefined && (n.regionIds = "");
            it(n)
        },
        vt = function() {
            return t.format == "grid" ? t.pageSize : null
        },
        yt = function(n) {
            f = n
        },
        k = function(n) {
            return f ? (u = !0, f.requestNextPage(n).then(function(n) {
                return u = !1, n
            })) : $.Deferred().resolve([])
        },
        pt = function() {
            return t.format == "grid" ? !0 : !1
        };
    return $.when(n.getRegionsList(2)).done(function(n) {
        d = n;
        s.resolve({
            update: at,
            init: g,
            showLoading: ot,
            showMap: ct,
            showGrid: lt,
            getPageSize: vt,
            attachSearchController: yt,
            willPullResults: pt
        })
    }), s.promise()
}(searchService);
app.tagManager = function() {
    var r = 0,
        n = {},
        f = function(t) {
            n = $.extend(n, t);
            $(".tagCollection").on("click", o);
            i()
        },
        i = function() {
            var t = [],
                u, f, e, i;
            (n.upperPrice != null || n.lowerPrice != null) && t.push({
                id: "priceSelector",
                html: "$" + (n.lowerPrice ? n.lowerPrice : "0") + "/nt - $" + (n.upperPrice ? n.upperPrice : "5000+") + "/nt"
            });
            n.CheckIn !== null && n.CheckOut !== null && (u = n.CheckIn.YYYYMMDDtoDate(), f = n.CheckOut.YYYYMMDDtoDate(), t.push({
                id: "dateSelector",
                html: moment(u).format("MMM DD") + " - " + moment(f).format("MMM DD")
            }));
            isNaN(+n.guests) || n.guests === 0 || n.guests === 1 || t.push({
                id: "Guests",
                html: n.guests + " Guests"
            });
            n.collections.HasBeach === !0 && t.push({
                id: "HasBeach",
                html: "Beachfront"
            });
            n.collections.CityLife === !0 && t.push({
                id: "CityLife",
                html: "City Breaks"
            });
            n.collections.Honeymoon === !0 && t.push({
                id: "Honeymoon",
                html: "Honeymoon"
            });
            n.collections.LargeGroups === !0 && t.push({
                id: "LargeGroups",
                html: "Large Groups"
            });
            n.collections.HasSki === !0 && t.push({
                id: "HasSki",
                html: "Ski Chalets"
            });
            n.collections.IsUnderPromotion === !0 && t.push({
                id: "IsUnderPromotion",
                html: "Promotion"
            });
            n.collections.InstantBook === !0 && t.push({
                id: "InstantBook",
                html: "Instabook"
            });
            r = t.length;
            e = $(".tagCollection");
            i = "";
            t.length === 0 ? (i = "<span class='noFiltersText'>No filters have been applied yet<span>", $("#resetFiltersFooter").hide()) : $("#resetFiltersFooter").show();
            $.each(t, function(n, t) {
                i += "<li class='tagItem' data-id='" + t.id + "'>" + t.html + "<span class='clearFilter'>✕<\/span><\/li>"
            });
            e.html(i)
        },
        e = function(t) {
            n = $.extend(n, t);
            i(n)
        },
        o = function(n) {
            var r = $(n.target).hasClass("tagItem") ? $(n.target) : $(n.target).parent(),
                u = r.attr("data-id");
            if (r.hasClass("tagItem")) {
                switch (u) {
                    case "priceSelector":
                        t("priceSelector");
                        i("Rates");
                        break;
                    case "dateSelector":
                        t("dateSelector");
                        app.searchbarDateSelector.clear();
                        i("Check-In & Check-Out Dates");
                        break;
                    case "Guests":
                        t("Guests");
                        app.searchbarGuest.clear();
                        i("Number of Guests");
                        break;
                    case "HasSki":
                        app.amenitySelector.clear("HasSki");
                        t("HasSki");
                        i("Ski");
                        break;
                    case "HasBeach":
                        app.amenitySelector.clear("HasBeach");
                        t("HasBeach");
                        i("Beachfront");
                        break;
                    case "CityLife":
                        app.amenitySelector.clear("CityLife");
                        t("CityLife");
                        i("City");
                        break;
                    case "LargeGroups":
                        app.amenitySelector.clear("LargeGroups");
                        t("LargeGroups");
                        i("Groups");
                        break;
                    case "Honeymoon":
                        app.amenitySelector.clear("Honeymoon");
                        t("Honeymoon");
                        i("Honeymoon");
                        break;
                    case "IsUnderPromotion":
                        app.amenitySelector.clear("IsUnderPromotion");
                        t("IsUnderPromotion");
                        i("Promo");
                        break;
                    case "InstantBook":
                        app.amenitySelector.clear("InstantBook");
                        t("InstantBook");
                        i("InstantBook")
                }
                $(".tagCollection").children().length < 1 ? ($("#resetFiltersFooter").hide(), $(".tagCollection").html("<span class='noFiltersText'>No filters have been applied yet<span>")) : $("#resetFiltersFooter").show();
                r.remove();
                $("section").scrollTop(0);

                function i(n) {
                    mix.click({
                        Id: "775932",
                        Label: "Clear Filter with Tag",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        Value: n
                    })
                }
            }
        },
        s = function(t) {
            n = t;
            i()
        },
        u = [],
        h = function(n) {
            u.push(n)
        },
        t = function(n) {
            $.each(u, function(t, i) {
                var u = i(n, r)
            })
        };
    return {
        init: f,
        update: e,
        onChange: h,
        clear: s
    }
}();
app.emailAlert = function() {
    var r = $.Deferred(),
        n = {},
        t = {},
        u = {
            data: {
                frequency: "",
                email: ""
            },
            query: {},
            template: "",
            templateVariables: {
                alertEmail: "alertEmail",
                emailAlertForm: "emailAlertForm"
            }
        },
        f = function(i) {
            i && (n = $.extend({}, u, i));
            var r = $.extend({}, n.templateVariables, n.data);
            t = $(Handlebars.compile(n.template)(r));
            t.on("click", s).on("keyup", o);
            t.find(".alertFrequencyContainer input").on("click", function() {
                if ($(this).prop("checked")) $(this).siblings().prop("checked", !1), n.data.frequency = $(this).attr("id"), mix.click({
                    Id: "292532",
                    Label: "Marketing Subscription Opt In",
                    "Page Section": "Main",
                    "Action Type": "Form",
                    "Form Sub Category": "Other",
                    "Form Type": "Email Alert",
                    Value: "Unselected"
                });
                else return mix.click({
                    Id: "292532",
                    Label: "Marketing Subscription Opt In",
                    "Page Section": "Main",
                    "Action Type": "Form",
                    "Form Sub Category": "Other",
                    "Form Type": "Email Alert",
                    Value: "Selected"
                }), !1
            });
            t.find("#alertEmail").on("focus", h).on("blur", c)
        },
        e = function() {
            var r = [],
                i = n.query,
                f, s, u;
            if (i.RegionIds !== null && typeof i.RegionIds == "object" && (f = t.find(dataList, function(n) {
                    return n.Id == i.RegionIds[0]
                }), r.push(f.Name)), i.upperPrice != null && i.lowerPrice != null && r.push("$" + i.lowerPrice + " - $" + i.upperPrice), i.CheckIn !== null && i.CheckOut !== null) {
                var e = i.CheckIn.YYYYMMDDtoDate(),
                    h = e.getDate() + "/" + (e.getMonth() + 1),
                    o = i.CheckOut.YYYYMMDDtoDate(),
                    c = o.getDate() + "/" + (o.getMonth() + 1);
                r.push(h + " - " + c)
            }
            i.guests !== 0 && r.push(i.guests + " Guests");
            i.collections.HasBeach === !0 && r.push("Beachfront");
            i.collections.HasSki === !0 && r.push("Ski");
            i.collections.LargeGroups === !0 && r.push("LargeGroups");
            i.collections.CityLife === !0 && r.push("CityLife");
            i.collections.Honeymoon === !0 && r.push("Honeymoon");
            i.collections.IsUnderPromotion === !0 && r.push("Promotion");
            i.collections.InstantBook === !0 && r.push("InstantBook");
            s = t.find(".alertSummary p");
            u = r.join(", ");
            u == "" && (u = "None specified");
            s.html(u)
        },
        o = function() {
            var t = $(event.target),
                i = t.attr("id"),
                r = t.val();
            i == n.templateVariables.alertEmail && (n.data.email = r)
        },
        s = function(n) {
            var t = $(n.target);
            t.hasClass("alertSignUp") && l()
        },
        h = function(n) {
            var t = $(n.target);
            t.is("#alertEmail") && mix.focus({
                Id: "501495",
                Label: "Email Contact",
                "Page Section": "Main",
                "Action Type": "Form",
                "Form Sub Category": "Other",
                "Form Type": "Email Alert"
            })
        },
        c = function(n) {
            var t = $(n.target);
            t.is("#alertEmail") && mix.blur({
                Id: "525619",
                Label: "Email Contact",
                "Page Section": "Main",
                "Action Type": "Form",
                "Form Sub Category": "Other",
                "Form Type": "Email Alert",
                Value: t.val()
            })
        },
        l = function() {
            var f = t.find("#" + n.templateVariables.emailAlertForm),
                r, e, o, s, u;
            y();
            f.parsley().validate() ? ($("#" + n.templateVariables.emailAlertForm).find(".alertError").hide(), r = {}, r.SearchDetails = t.find(".alertSummary p").html(), r.Frequency = "", r.Email = t.find("#alertEmail").val(), e = "args=" + JSON.stringify(r), o = SERVICECONNNECTION + "/DeviceServiceEngine.svc/SendExactTargetGeneralSubscriber_GET?", $.ajax({
                type: "GET",
                dataType: "jsonp",
                jsonp: "jsonp",
                contentType: "application/json",
                url: o + e + "&callback=?",
                timeout: 2e4,
                success: function(t) {
                    if (t.Error) {
                        var r = t.Error.Message ? t.Error.Message : "error";
                        $("#" + n.templateVariables.emailAlertForm).find(".alertError").show();
                        mix.click({
                            Id: "797472",
                            Label: "Submit Button",
                            "Page Section": "Main",
                            "Action Type": "Form",
                            "Form Sub Category": "Other",
                            "Form Type": "Email Alert",
                            "Validation Error": !1,
                            "Error Message": r
                        });
                        mix.page({
                            Id: "723886",
                            Label: "Form Error ",
                            "Page Section": "Main",
                            "Action Type": "Form",
                            "Form Sub Category": "Other",
                            "Form Type": "Email Alert"
                        });
                        i()
                    } else mix.click({
                        Id: "797472",
                        Label: "Submit Button",
                        "Page Section": "Main",
                        "Action Type": "Form",
                        "Form Sub Category": "Other",
                        "Form Type": "Email Alert",
                        "Validation Error": !1
                    }), mix.page({
                        Id: "329032",
                        Label: "Success Message",
                        "Page Section": "Main",
                        "Action Type": "Form",
                        "Form Sub Category": "Other",
                        "Form Type": "Email Alert",
                        "CRM Request ID": ""
                    }), $("#" + n.templateVariables.emailAlertForm).fadeOut(function() {
                        $(".emailAlertThanks").fadeIn()
                    }), i()
                },
                error: function(t) {
                    mix.click({
                        Id: "797472",
                        Label: "Submit Button",
                        "Page Section": "Main",
                        "Action Type": "Form",
                        "Form Sub Category": "Other",
                        "Form Type": "Email Alert",
                        "Validation Error": !1,
                        "Error Message": t
                    });
                    mix.page({
                        Id: "723886",
                        Label: "Form Error ",
                        "Page Section": "Main",
                        "Action Type": "Form",
                        "Form Sub Category": "Other",
                        "Form Type": "Email Alert"
                    });
                    $("#" + n.templateVariables.emailAlertForm).find(".alertError").show();
                    i()
                }
            })) : (i(), s = f.find(".parsley-errors-list li"), u = [], $.each(s, function(n, t) {
                u.push($(t).text())
            }), mix.click({
                Id: "797472",
                Label: "Submit Button",
                "Page Section": "Main",
                "Action Type": "Form",
                "Form Sub Category": "Other",
                "Form Type": "Email Alert",
                "Validation Error": !0,
                "Error Message": u
            }))
        },
        a = function(i) {
            n.query = i;
            e();
            t.appendTo("body").modal({
                fadeDuration: 250,
                fadeDelay: .75,
                zIndex: 2e3
            });
            mix.page({
                Id: "183521",
                Label: "Form Pop up",
                "Page Section": "Main",
                "Action Type": "Form",
                "Form Sub Category": "Other",
                "Form Type": "Email Alert"
            });
            mix.click({
                Id: "403491",
                Label: "Save As Email Alert",
                "Page Section": "Main",
                "Action Type": "Form",
                "Form Sub Category": "Other",
                "Form Type": "Email Alert",
                Value: JSON.stringify(i)
            });
            t.one($.modal.CLOSE, v)
        },
        v = function() {
            mix.click({
                Id: "661587",
                Label: "Close Form",
                "Page Section": "Main",
                "Action Type": "Form",
                "Form Sub Category": "Other",
                "Form Type": "Email Alert"
            });
            $("#" + n.templateVariables.emailAlertForm).show().find(".alertError").hide();
            $(".emailAlertThanks").hide()
        },
        y = function() {
            t.find(".alertSignUp").addClass("loading")
        },
        i = function() {
            t.find(".alertSignUp").removeClass("loading")
        };
    return r.resolve({
        init: f,
        show: a
    })
}();
app.thingsToSeeAndDo = function() {
        var n, t = {
                elem: null,
                regionIds: [$("#regionIds").val()],
                magTemplates: "<div class='row-spc-16'>{{#each articles}}<div class='{{../colClass}} col-md-12'><a class='magazineAnchor' href='{{Url}}' target='_blank'><div class='thingsToDoArticle'><img src='{{ImgUrl}}' /><div class='articleContent'><span class='articleLead'>MAGAZINE FEATURE<\/span><h4>{{Title}}<\/h4><p>{{decodeDescription}}<\/p><span class='articleReadMore'>READ ARTICLE<\/span><\/div><\/div><\/a><\/div>{{/each}}<\/div>",
                handlebarHelpers: {
                    decodeDescription: function() {
                        var n = new RegExp("&rsquo;", "g"),
                            t = new RegExp("&#39;", "g");
                        return this.Description.replace(n, "'").replace(t, "'")
                    }
                }
            },
            i = function(i) {
                n = $.extend({}, t, i);
                $.each(n.handlebarHelpers, function(n, t) {
                    Handlebars.registerHelper(n, t)
                });
                $(document).on("click", ".magazineAnchor", function() {
                    mix.click({
                        Id: "543359",
                        Label: "Magazine Link",
                        "Page Section": "Main",
                        "Action Type": "Search",
                        "Search Sub Category": "LR Info",
                        Value: $(this).find("h4").text()
                    }, !0)
                })
            },
            r = function() {
                Array.isArray(n.regionIds) && n.regionIds[0] && $.when(f()).done(function(t, i) {
                    if (i === !0) $.trim(n.elem.find(".leftCol").html()).length === 0 && n.elem.hide();
                    else if (t != null)
                        if (window.has_server_rendered_title === !0 ? delete window.has_server_rendered_title : t.SeoRegionTitle != null ? $("head title", window.parent.document).text(t.SeoRegionTitle) : t.Name != null ? $("head title", window.parent.document).text(t.Name + " Villas & Vacation Rentals | Luxury Retreats") : $("head title", window.parent.document).text("Villas & Vacation Rentals | Luxury Retreats"), t.RegionContext) {
                            var u = $("h2, p", t.RegionContext),
                                r = "";
                            u.each(function() {
                                switch (this.tagName) {
                                    case "H2":
                                        r += "<h2>" + this.innerText + "<\/h2>";
                                        break;
                                    case "P":
                                        r += "<p>" + this.innerText + "<\/p>"
                                }
                            });
                            n.elem.show().find(".leftCol").html(r)
                        } else n.elem.hide();
                    else n.elem.hide()
                })
            },
            u = function(t) {
                n = $.extend(n, t);
                r()
            },
            f = function() {
                var t = $.Deferred(),
                    i = n.regionIds[0];
                return window.has_server_rendered_title === !0 ? (delete window.has_server_rendered_title, t.resolve(null, !0)) : i ? $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    contentType: "application/json",
                    url: SERVICECONNNECTION + "/SearchEngine.svc/GetRegionDataInfo_GET?args=" + i,
                    success: function(n) {
                        n.Error || t.resolve(n.Data[0])
                    },
                    error: function() {}
                }) : t.resolve(null), t.promise()
            },
            e = function() {
                return $.ajax({
                    type: "GET",
                    url: SERVICECONNNECTION + "/SearchEngine.svc/GetRssFeed_GET?args=" + JSON.stringify({
                        RegionId: n.regionIds[0]
                    }),
                    dataType: "jsonp",
                    contentType: "application/json"
                }).then(function(n) {
                    var t = n.Data.length > 3 ? 3 : n.Data.length;
                    return n.Data.splice(0, t)
                })
            };
        return {
            init: i,
            update: u
        }
    }(),
    function() {
        for (var i = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(n) {
            var t = (new Date).getTime(),
                r = Math.max(0, 16 - (t - i)),
                u = window.setTimeout(function() {
                    n(t + r)
                }, r);
            return i = t + r, u
        });
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function(n) {
            clearTimeout(n)
        })
    }();
app.searchFilter = function() {
    var f, e, o = {
            page: "search",
            section: "header"
        },
        h = [],
        c = [],
        l = [],
        a = [],
        t = $("#searchFilterOverlay"),
        n = $("#searchSubMenu"),
        s = $("#searchFilters"),
        v = $(".showFilters"),
        st = $("#slider-range"),
        d = $(".amenitySelector"),
        y = function() {
            i();
            t.removeClass("hidden");
            n.find(".moreFilters .filter").removeClass("hidden");
            n.find(".moreFilters .item").addClass("active");
            s.removeClass("hidden");
            v.addClass("active");
            $header.addClass("itemOpen")
        },
        p = function() {
            t.addClass("hidden");
            n.find(".moreFilters .filter").addClass("hidden");
            n.find(".moreFilters .item").removeClass("active");
            s.addClass("hidden");
            v.removeClass("active");
            $header.removeClass("itemOpen");
            $html.removeClass("noScroll");
            var i = $.sessionStorage.get("queryParameters.collections");
            app.amenitySelector.setValue(i);
            r()
        },
        g = function() {
            i();
            t.removeClass("hidden");
            n.find(".guests .filter").removeClass("hidden");
            n.find(".guests .item").addClass("active");
            $header.addClass("itemOpen")
        },
        w = function() {
            if (t.addClass("hidden"), n.find(".guests .filter").addClass("hidden"), n.find(".guests .item").removeClass("active"), $header.removeClass("itemOpen"), $html.removeClass("noScroll"), !$.sessionStorage.isEmpty("queryParameters.guests")) {
                var i = $.sessionStorage.get("queryParameters.guests");
                app.searchbarGuest.update(i)
            }
            r()
        },
        nt = function() {
            i();
            t.removeClass("hidden");
            n.find(".price .filter").removeClass("hidden");
            n.find(".price .item").addClass("active");
            $header.addClass("itemOpen")
        },
        b = function() {
            t.addClass("hidden");
            n.find(".price .filter").addClass("hidden");
            n.find(".price .item").removeClass("active");
            $header.removeClass("itemOpen");
            $html.removeClass("noScroll");
            f.update({
                lowerPrice: $.sessionStorage.get("queryParameters.lowerPrice"),
                upperPrice: $.sessionStorage.get("queryParameters.upperPrice")
            });
            r()
        },
        tt = function() {
            i();
            t.removeClass("hidden");
            n.find(".calendar .filter").removeClass("hidden");
            n.find(".calendar .item").addClass("active");
            $header.addClass("itemOpen");
            app.searchbarDateSelector.open(o);
            document.addEventListener("mousedown", function() {
                n.find(".calendar .calendar").trigger("click")
            })
        },
        k = function() {
            t.addClass("hidden");
            n.find(".calendar .filter").addClass("hidden");
            n.find(".calendar .item").removeClass("active");
            $header.removeClass("itemOpen");
            $html.removeClass("noScroll");
            app.searchbarDateSelector.update(n.find(".wrapper .calendar"));
            r()
        },
        i = function() {
            p();
            w();
            b();
            k();
            app.header.closeAllMenu();
            r()
        },
        it = function(t) {
            t ? n.removeClass("hiddenVisibility") : n.addClass("hiddenVisibility")
        },
        rt = function(n) {
            h.push(n)
        },
        ut = function(n) {
            c.push(n)
        },
        ft = function(n) {
            l.push(n)
        },
        et = function(n) {
            a.push(n)
        },
        u = function(n, t) {
            $.each(n, function(n, i) {
                i(t)
            })
        },
        r = function(t) {
            var t = t,
                i = [];
            $.when(app.searchController).done(function(r) {
                if (t = $.extend(r.getQuery(), t), t && t.CheckIn || t && t.CheckOut ? (n.find(".calendar .item").addClass("selected"), n.find(".calendar .item .title").addClass("hidden"), n.find(".calendar .item .statusLabel").removeClass("hidden"), t.CheckIn == t.CheckOut ? n.find(".calendar .item .statusLabel").text(moment(t.CheckIn.YYYYMMDDtoDate()).format("MMM DD") + " - Check Out") : n.find(".calendar .item .statusLabel").text(moment(t.CheckIn.YYYYMMDDtoDate()).format("MMM DD") + " - " + moment(t.CheckOut.YYYYMMDDtoDate()).format("MMM DD"))) : (n.find(".calendar .item").removeClass("selected"), n.find(".calendar .item .title").removeClass("hidden"), n.find(".calendar .item .statusLabel").addClass("hidden")), t && t.lowerPrice || t && t.upperPrice ? (n.find(".price .item").addClass("selected"), n.find(".price .item .title").addClass("hidden"), n.find(".price .item .statusLabel").removeClass("hidden"), n.find(".price .item .statusLabel").text("$" + t.lowerPrice + " - $" + t.upperPrice), t.lowerPrice == null ? n.find(".price .item .statusLabel").text("Up to $" + t.upperPrice) : t.upperPrice == null ? n.find(".price .item .statusLabel").text("$" + t.lowerPrice + "+") : n.find(".price .item .statusLabel").text("$" + t.lowerPrice + " - $" + t.upperPrice)) : (n.find(".price .item").removeClass("selected"), n.find(".price .item .title").removeClass("hidden"), n.find(".price .item .statusLabel").addClass("hidden")), t && t.guests != 1) {
                    var u = t.guests,
                        f = u > 1 ? "Guests" : "Guest";
                    n.find(".guests .item").addClass("selected");
                    n.find(".guests .item .title").addClass("hidden");
                    n.find(".guests .item .statusLabel").removeClass("hidden");
                    n.find(".guests .item .statusLabel").text(u + " " + f)
                } else n.find(".guests .item").removeClass("selected"), n.find(".guests .item .title").removeClass("hidden"), n.find(".guests .item .statusLabel").addClass("hidden");
                t && t.collections && ($.each(t.collections, function(n, t) {
                    t == !0 && i.push(n)
                }), i.length != 0 ? (n.find(".moreFilters .item").addClass("selected"), n.find(".moreFilters .item .title").addClass("hidden"), n.find(".moreFilters .item .statusLabel").removeClass("hidden"), n.find(".moreFilters .item .statusLabel").text("More Filters · " + i.length)) : (n.find(".moreFilters .item").removeClass("selected"), n.find(".moreFilters .item .title").removeClass("hidden"), n.find(".moreFilters .item .statusLabel").addClass("hidden")))
            })
        },
        ot = function(v, it, rt, ut, ft, et, ot) {
            rt.init($(".calendar"), $("#searchSubMenu").find(".calendar .wrapper"), o);
            f = ft.init(n.find("#slider-range"));
            it.init($(".guests .filter"), $("#searchSubMenu"), o);
            ut.init(v.getQuery().RegionIds);
            ut.onChange(function(n) {
                u(h, n)
            });
            e = ft.init(s.find("#slider-range"));
            v.attachFilter(e);
            e.onChange(function(n) {
                u(c, n)
            });
            et.init(d);
            v.attachFilter(et);
            et.onChange(function(n) {
                u(l, n)
            });
            app.tagManager.init(v.getQuery());
            ot.onChange(function(n) {
                u(a, n)
            });
            r();
            t.on("click", function() {
                i()
            });
            t.get(0).addEventListener("mousewheel", i, !1);
            t.get(0).addEventListener("DOMMouseScroll", i, !1);
            t.get(0).addEventListener("touchmove", i, !1);
            n.find(".calendar .item").on("click", function() {
                $(this).hasClass("active") ? k() : tt()
            });
            n.find(".calendar .clear").on("click", function() {
                $("#searchSubMenu").find(".calendar").DatePickerSetDate(new Date, !0);
                $("#searchSubMenu").find(".calendar").DatePickerClear();
                rt.clear()
            });
            n.find(".price .item").on("click", function() {
                $(this).hasClass("active") ? b() : nt()
            });
            n.find(".price .clear").on("click", function() {
                f.clear()
            });
            n.find(".guests .item").on("click", function() {
                $(this).hasClass("active") ? w() : g()
            });
            n.find(".guests .clear").on("click", function() {
                it.clear()
            });
            n.find(".moreFilters .item").on("click", function() {
                $(this).hasClass("active") ? p() : y()
            });
            n.find(".moreFilters .clear").on("click", function() {
                et.clear()
            })
        };
    return {
        init: ot,
        openFilter: y,
        closeAllFilters: i,
        visible: it,
        updateStates: r,
        regionOnChange: rt,
        priceOnChange: ut,
        amenityOnChange: ft,
        tagOnChange: et
    }
}();
app.searchPage = function() {
    var h = $("header"),
        c = $("#searchSubMenu"),
        r = $("#regionIds").val() || "",
        l = r.split(","),
        t = "small",
        o, i = !1,
        u = 0,
        f = function() {
            $.when(app.searchController).done(function(n) {
                var t = n.getQuery(),
                    i, r;
                t && (i = ".", r = {
                    Price: t.upperPrice ? t.upperPrice : t.lowerPrice,
                    RegionId: $("#regionIds").val() || ""
                }, regionPhoneService.getPhoneNumber(r).then(function(n) {
                    return n && ($('[id="numberUsaDot"]').html(n.PhoneNumber.split("-").join(i)), $("#numberIntDot").html(n.IntPhoneNumber.split("-").join(i)), $("#findVillaInquiry .callUs span").html(n.PhoneNumber.split("-").join(i))), n
                }))
            })
        },
        n = function() {
            $.when(app.searchController, app.regionSelectors, app.searchbar, app.priceSlider, app.amenitySelector, app.mapResults, app.sort, app.lister).done(function(n, t, i, r, u, f, e, o) {
                var l = !0,
                    s = n.getQuery();
                if (l ? s.RegionIds.length > 1 ? app.dataLayer.event("GDN-Search", "Search", s.RegionIds) : app.dataLayer.event("GDN-Destination", "Destination", s.RegionIds[0]) : $(document).off("searchResults"), s) {
                    var c = $("#counterFilter"),
                        s = n.getQuery(),
                        h = 0;
                    s.guests != 0 && s.guests != 1 && (h += 1);
                    s.CheckIn != null && s.CheckOut != null && (h += 1);
                    (s.lowerPrice != null || s.upperPrice != null) && (h += 1);
                    s.collections != null && $.each(s.collections, function(n, t) {
                        t == !0 && h++
                    });
                    c.text(h);
                    h == 0 ? c.addClass("hidden") : c.removeClass("hidden")
                }
                u.setValue(s.collections);
                r.setValue(s);
                e.update(s.sortBy);
                s.RegionIds && s.RegionIds.length > 0 && (t.update(s.RegionIds), i.update(s.RegionIds));
                s.Polygon && s.Polygon.coordinates && f.setBounds(s.Polygon.coordinates);
                s.displayMode === "list" ? (o.showMap(), f.loadVillas()) : (o.showGrid(), f.unloadVillas());
                l = !1
            })
        },
        s = function() {
            var n = window.innerWidth;
            t === "small" && n >= 1100 ? t = "big" : t === "big" && n < 1100 && (t = "small")
        },
        a = function() {
            var n = $("#headerOverlay").is(":visible");
            localStorage.walkthroughSeen != undefined || n || ($("#searchResults").offset().top < 65 || $("#searchContainer").hasClass("mapResults") ? e() : ($("#pageWalkthrough").fadeIn(), $(document).off("click", e), $("#section").off("scroll", e), $("section").addClass("hideScrollBar"), $(document).off("doneLoading"), localStorage.walkthroughSeen = "true", app.dataLayer.event("region_search_tutorial", "pop")))
        },
        e = function() {
            clearTimeout(o);
            o = setTimeout(a, 5e3)
        };
    app.header.init({
        dontInitSearch: !0
    });
    $.when(app.transparentHeader, app.searchController, app.regionSelectors, app.searchbar, app.searchbarDateSelector, app.searchbarGuest, app.searbarButton, app.priceSlider, app.amenitySelector, app.mapResults, app.sort, app.lister, app.tagManager, app.emailAlert, app.searchNavigation).done(function(t, e, o, h, a, v, y, p, w, b, k, d, g, nt) {
        var tt = {},
            ct, rt = {
                page: "search",
                section: "header"
            },
            it = $("#headerSearchWrapper"),
            lt = $("#searchInput"),
            at = $("#searchCheckInOut"),
            vt = $("#searchGuest"),
            yt = $("#searchBtn"),
            pt = $(".showFilters"),
            wt = $("#closeFilters"),
            bt = $("#heroImageGetHelp"),
            ut = $("#findVillaOverlay"),
            ft = $("#findVillaInquiry"),
            kt = $("#sortBySelector"),
            ot = $("#resultsList"),
            dt = $("#map"),
            gt = $("#mapContainer"),
            ni = $(window).width() >= 1645 ? 3 : 2,
            et = document.location.search.toLowerCase().indexOf("displaymode") > 0 ? "list" : "grid",
            st, ht;
        pageName = "searchPage";
        c.removeClass("hidden");
        t.init({
            offsetTopHeader: $(".heroImage").innerHeight() - $(".confidenceMessage").innerHeight() - $("header").innerHeight(),
            offsetTopSearchBox: undefined
        });
        e.init({
            querySchema: {
                RegionIds: {
                    type: "Array",
                    initValue: r === "" || r === undefined ? [] : l,
                    defaultValue: [],
                    requestParameter: !0,
                    includeDefaultInRequest: !1
                },
                CheckIn: {
                    type: "Number",
                    defaultValue: null,
                    requestParameter: !0,
                    includeDefaultInRequest: !1
                },
                CheckOut: {
                    type: "Number",
                    defaultValue: null,
                    requestParameter: !0,
                    includeDefaultInRequest: !1
                },
                Polygon: {
                    type: "Object",
                    defaultValue: null,
                    requestParameter: !0,
                    includeDefaultInRequest: !1
                },
                guests: {
                    type: "Number",
                    defaultValue: 1,
                    requestParameter: !0,
                    includeDefaultInRequest: !1
                },
                Currencyid: {
                    type: "Number",
                    defaultValue: 1,
                    requestParameter: !0,
                    includeDefaultInRequest: !1
                },
                lowerPrice: {
                    type: "Number",
                    defaultValue: null
                },
                upperPrice: {
                    type: "Number",
                    defaultValue: null
                },
                sortBy: {
                    type: "Number",
                    defaultValue: "5"
                },
                collections: {
                    type: "Object",
                    defaultValue: {}
                },
                displayMode: {
                    type: "String",
                    defaultValue: null
                },
                groupId: {
                    type: "String",
                    defaultValue: null,
                    requestParameter: !0,
                    includeDefaultInRequest: !1
                },
                RegionName: {
                    type: "String",
                    requestParameter: !1
                }
            }
        });
        e.updateResults(undefined, "replace");
        f();
        st = $(".regionSelect");
        $("section").on("scroll", function() {
            st.hasClass("active") && o.close()
        });
        h.init(lt, it, "headerDdStyle", null, rt);
        a.init(at, it, rt);
        v.init(vt, it, rt);
        y.init(yt, it, !0, rt);
        it.removeClass("hidden");
        h.onChange(function(n, t) {
            tt = {
                RegionIds: t,
                Polygon: null
            };
            o.update(t);
            n.dataset.target != "multiple-bar" && (e.updateResults(tt), tt = {});
            t.length > 1 ? app.dataLayer.event("GDN-Search", "Destination", t) : app.dataLayer.event("GDN-Destination", "Destination", t[0]);
            f();
            app.searchFilter.closeAllFilters()
        });
        a.onChange(function(n) {
            tt.CheckIn = n.CheckIn;
            tt.CheckOut = n.CheckOut;
            app.searchFilter.updateStates(tt);
            $("#searchSubMenu .calendar .calendar").DatePickerShow()
        });
        v.onChange(function(n) {
            tt.guests = n;
            app.searchFilter.updateStates(tt);
            $("#searchSubMenu").find("#label").text(n + " +");
            $("#searchSubMenu").find("#labelInput").val(n)
        });
        y.onClick(function(t) {
            o.update(t.RegionIds);
            e.updateResults(t);
            g.update(t);
            app.regionBanner.update();
            app.findVillaInquiry.reset();
            n();
            t.CheckIn == null && t.CheckOut == null && a.clear();
            app.searchbarGuest.update(t.guests);
            app.searchFilter.closeAllFilters();
            t = {}
        });
        app.searchFilter.init(e, v, a, o, p, w, g);
        app.searchFilter.regionOnChange(function(n) {
            tt.RegionIds = n;
            tt.Polygon = null;
            n.length > 1 ? app.dataLayer.event("GDN-Search", "Search", n) : app.dataLayer.event("GDN-Destination", "Destination", n[0]);
            h.update(n)
        });
        app.searchFilter.priceOnChange(function(n) {
            tt.upperPrice = n.upperPrice;
            tt.lowerPrice = n.lowerPrice;
            app.searchFilter.updateStates(tt)
        });
        app.searchFilter.amenityOnChange(function(n) {
            tt.collections = $.extend({}, n);
            app.searchFilter.updateStates(tt)
        });
        app.searchFilter.tagOnChange(function(t) {
            var r = e.getQuery().collections,
                u = !1,
                i;
            switch (t) {
                case "HasSki":
                    r.HasSki = !1;
                    u = !0;
                    break;
                case "CityLife":
                    r.CityLife = !1;
                    u = !0;
                    break;
                case "LargeGroups":
                    r.LargeGroups = !1;
                    u = !0;
                    break;
                case "Honeymoon":
                    r.Honeymoon = !1;
                    u = !0;
                    break;
                case "HasBeach":
                    r.HasBeach = !1;
                    u = !0;
                    break;
                case "IsUnderPromotion":
                    r.IsUnderPromotion = !1;
                    u = !0;
                    break;
                case "InstantBook":
                    r.InstantBook = !1;
                    u = !0;
                    break;
                case "priceSelector":
                    i = {
                        upperPrice: null,
                        lowerPrice: null
                    };
                    e.updateResults(i);
                    g.update(i);
                    break;
                case "dateSelector":
                    i = {
                        CheckIn: null,
                        CheckOut: null
                    };
                    e.updateResults(i);
                    g.update(i);
                    break;
                case "Guests":
                    i = {
                        guests: 1
                    };
                    e.updateResults(i);
                    g.update(i)
            }
            u && (e.updateResults({
                collections: r
            }), g.update({
                collections: r
            }));
            n()
        });
        k.init(kt, {
            Id: "1",
            Name: "Featured"
        });
        e.attachSorter(k);
        k.onChange(function(n) {
            tt.sortBy = n.Id;
            e.updateResults(tt);
            tt.hasOwnProperty("CheckIn") && tt.CheckIn == null && tt.hasOwnProperty("CheckOut") && tt.CheckOut == null && a.clear();
            tt = {}
        });
        app.regionBanner.init(e);
        app.findVillaInquiry.init();
        window.sessionStorage && window.sessionStorage.getItem("searchURL") && (et = sessionStorage.searchURL.toLowerCase().indexOf("displaymode") > 0 ? "list" : et);
        d.init({
            numberColumns: ni,
            format: et,
            favouriteData: favoriteService.favorites(),
            villaTemplate: $("#villaBlockTemplate").detach().html()
        });
        e.attachDisplay(d);
        b.init(gt, dt);
        e.attachDisplay(b);
        b.onBoundsChanged(function(n) {
            var t = {
                RegionIds: [],
                Polygon: {
                    coordinates: n
                }
            };
            e.updateResults(t)
        });
        b.onFilterModeChanged(function(n) {
            var t = {};
            n.filterMapMode ? (ct = e.getQuery().RegionIds, t.RegionIds = [], t.Polygon = {
                coordinates: n.bounds
            }, o.update(), e.updateResults(t)) : t.Polygon = null
        });
        app.mapResults = b;
        app.resetFilter.init({
            el: $("#resetFiltersFooter a")
        });
        app.resetFilter.onReset(function() {
            w.clear();
            p.clear();
            var t = {
                CheckIn: null,
                CheckOut: null,
                lowerPrice: null,
                upperPrice: null,
                guests: 1,
                collections: {
                    HasBeach: !1,
                    HasSki: !1,
                    CityLife: !1,
                    LargeGroups: !1,
                    Honeymoon: !1,
                    IsUnderPromotion: !1,
                    InstantBook: !1
                }
            };
            e.updateResults(t);
            app.tagManager.clear(t);
            v.clear();
            a.clear();
            n()
        });
        app.thingsToSeeAndDo.init({
            elem: $("#thingsToDo")
        });
        ht = app.inquire.init({
            template: $("#inquireTemplate").detach().html(),
            modal: !1,
            container: $("#searchInquireContainer"),
            inquireType: "Search General",
            defaultTrackingSettings: "form_request_region_bottom",
            onSuccess: function() {
                app.dataLayer.virtualPage("Search Inquiry Form Success", "/virtual/form/success/inquiry/search");
                app.dataLayer.event("inquirySuccess", "search", 0);
                app.dataLayer.event("GDN - InquireSuccess", "search", 0)
            }
        });
        ht.show();
        nt.init({
            template: $("#emailAlertTemplate").html()
        });
        s();
        n();
        e.attachDisplay(app.thingsToSeeAndDo);
        e.onPreviousUrl(function(n) {
            return window.location = "/", !1
        });
        app.footer.init();
        $(window).on("resize", s);
        $(document).on("mouseenter", ".instantBook-btn", function() {
            var n = $(this).parents(".villa");
            n.find(".hasInstantBook").addClass("show");
            n.find(".villaPromo").text() != "" && n.find(".villaPromo").removeClass("active")
        });
        $(document).on("mouseleave", ".instantBook-btn", function() {
            var n = $(this).parents(".villa");
            n.find(".hasInstantBook").removeClass("show");
            n.find(".villaPromo").text() != "" && n.find(".villaPromo").addClass("active")
        });
        $(document).on("doneLoading", function() {});
        $("section").on("scroll", function() {
            $(".regionSelect").hasClass("active") && o.close()
        });
        $("section").on("scroll", function() {
            u = $("section").scrollTop();
            i === !1 && u > 600 ? ($("#backToTop").fadeIn(), i = !0) : i === !0 && u <= 600 && ($("#backToTop").fadeOut(), i = !1)
        });
        $("#pageWalkthrough").on("click", function() {
            $(this).fadeOut();
            localStorage.walkthroughSeen = "false";
            $("section").removeClass("hideScrollBar")
        });
        pt.on("click", function() {
            $(this).hasClass("active") ? (app.searchFilter.closeAllFilters(), tt = {}) : app.searchFilter.openFilter()
        });
        wt.on("click", function() {
            app.searchFilter.closeAllFilters();
            tt = {}
        });
        $(".js-updateSearchButton").on("click", function() {
            e.updateResults(tt);
            g.update(tt);
            tt.RegionIds && (h.update(tt.RegionIds), app.findVillaInquiry.reset());
            app.regionBanner.update();
            tt.hasOwnProperty("CheckIn") && tt.CheckIn == null && tt.hasOwnProperty("CheckOut") && tt.CheckOut == null && a.clear();
            tt.guests != null && v.update(tt.guests);
            tt = {};
            n();
            app.searchFilter.closeAllFilters();
            f()
        });
        bt.on("click", function() {
            ut.removeClass("hidden");
            ft.removeClass("hidden");
            $html.addClass("noScroll");
            searchService.getRegion($("#searchInput").select2("val")).then(function(n) {
                var t;
                t = $.isEmptyObject(n) ? $("#region2").dropdownGetValue() : n;
                $("#findVillaInquireRegion").dropdownUpdate({
                    val: t
                })
            })
        });
        ut.on("click", function() {
            ut.addClass("hidden");
            ft.addClass("hidden");
            $html.removeClass("noScroll")
        });
        ft.find(".close").on("click", function() {
            ut.addClass("hidden");
            ft.addClass("hidden");
            $html.removeClass("noScroll")
        });
        $("#mapModeSelector").click(function() {
            d.showMap();
            b.loadVillas();
            e.updateResults({
                displayMode: "list"
            })
        });
        $("#gridModeSelector").click(function() {
            d.showGrid();
            b.unloadVillas();
            e.updateResults({
                displayMode: null
            })
        });
        ot.on("mouseover", ".villa", function() {
            $body.hasClass("mapResults") && b.selectVilla($(this).find("[data-villaid]").attr("data-villaId"))
        });
        ot.on("mouseout", ".villa", function() {
            $body.hasClass("mapResults") && b.unselectVilla($(this).find("[data-villaid]").attr("data-villaId"))
        });
        $(document).on("click", ".villaFavourite", function() {
            var n = $(this),
                t = parseInt(n.attr("data-villaId"));
            return (n.toggleClass("active"), n.hasClass("active")) ? favoriteService.add(t).then(function() {
                var t = n.closest(".villa").find("img").attr("src");
                app.header.animateFavBubble(t)
            }.bind(this)) : favoriteService.remove(t).then(app.header.updateHeaderWishlist.bind(app.header))
        });
        $(document).on("click", ".alternateRegion", function() {
            var t = $(this).attr("data-id");
            o.update([t]);
            e.updateResults({
                RegionIds: [t]
            });
            app.regionBanner.update();
            n()
        });
        $("#backToTop").on("click", function() {
            $("section").animate({
                scrollTop: 0
            }, 800)
        });
        $(".emailAlertButton").on("click", function() {
            nt.show(e.getQuery())
        })
    }).fail(function(n) {
        throw n;
    });
    $("section").on("touchmove", function(n) {
        n.stopPropagation()
    });
    h.on("touchmove", function(n) {
        n.stopPropagation()
    });
    $("#searchFilters").on("touchmove", function(n) {
        n.stopPropagation()
    })
}();
app.tracking.desktop.search = function() {
    return function() {
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_display_type",
                action: "select"
            },
            elements: [{
                selector: "#gridModeSelector",
                data: {
                    label: "list"
                }
            }, {
                selector: "#mapModeSelector",
                data: {
                    label: "map"
                }
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_filter"
            },
            elements: [{
                selector: "#filterWrapper",
                data: {
                    action: function(n) {
                        return $(n.target).find("button").hasClass("active") ? "open" : "close"
                    },
                    label: function(n) {
                        return $(n.target).find("button").hasClass("active") ? "" : "filters_button"
                    }
                }
            }, {
                selector: "#closeFilters",
                data: {
                    action: "close",
                    label: '"x"'
                }
            }, {
                selector: "#searchFilterOverlay",
                data: {
                    action: "close",
                    label: "overlay_click"
                }
            }, {
                selector: "#updateSearchButton",
                data: {
                    action: "submit"
                }
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_filter_collection",
                label: "collectionname"
            },
            elements: [{
                selector: "#searchFilters .amenitySelector.active",
                data: {
                    action: "add"
                }
            }, {
                selector: "#searchFilters .amenitySelector:not(.active)",
                data: {
                    action: "remove"
                }
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_filter_pills"
            },
            elements: [{
                selector: ".tagItem",
                data: {
                    action: "remove",
                    label: "filtername"
                }
            }]
        });
        app.tracking.manager.init({
            data: {
                category: "region_filter_region"
            },
            byElements: [{
                selector: "#searchFilters .regionSelect",
                events: [{
                    eventType: "click",
                    data: {
                        action: "focus",
                        label: function(n) {
                            return $(n.target).dropdownGetValue().RegionName
                        }
                    }
                }, {
                    eventType: "blur",
                    data: {
                        action: "blur",
                        label: function(n) {
                            return $(n.target).dropdownGetValue().RegionName
                        }
                    }
                }, {
                    eventType: "change",
                    data: {
                        action: "select",
                        label: function(n) {
                            return $(n.target).dropdownGetValue().RegionName + "; " + $(n.target).dropdownGetValue().Name
                        }
                    }
                }]
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_bottom_havent_found"
            },
            elements: [{
                selector: "#resetFiltersFooter a",
                data: {
                    action: "clear_filters"
                }
            }, {
                selector: "#searchRegionSuggestion .alternateRegion",
                data: {
                    action: "click",
                    label: function(n) {
                        return $(n.target).data("path") + "; " + $(n.target).find("h4").text()
                    }
                }
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_page"
            },
            elements: [{
                selector: "#backToTop",
                data: {
                    action: "to_top"
                }
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_map_view"
            },
            elements: [{
                selector: "#useMapFilter",
                data: {
                    action: "use_map_to_filter",
                    label: function(n) {
                        return $(n.target).is(":checked") ? "activate" : "deactivate"
                    }
                }
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_search_tutorial"
            },
            elements: [{
                selector: "#pageWalkthrough",
                data: {
                    action: "close"
                }
            }]
        });
        app.tracking.manager.init({
            data: {
                category: "region_sort"
            },
            byElements: [{
                selector: "#sortBySelector",
                events: [{
                    eventType: "click",
                    data: {
                        action: "focus",
                        label: function(n) {
                            return $(n.target).dropdownGetValue().RegionName
                        }
                    }
                }, {
                    eventType: "blur",
                    data: {
                        action: "blur",
                        label: function(n) {
                            return $(n.target).dropdownGetValue().RegionName
                        }
                    }
                }, {
                    eventType: "change",
                    data: {
                        action: "select",
                        label: function(n) {
                            return $(n.target).dropdownGetValue().Name
                        }
                    }
                }]
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "region_villa"
            },
            elements: [{
                selector: ".villaFavourite:not(.active)",
                data: {
                    action: "add_to_favourites",
                    label: function(n) {
                        return $(n.target).attr("data-villaid") + "; " + $(n.target).closest(".col-sm-1").index()
                    }
                }
            }, {
                selector: ".villaFavourite.active",
                data: {
                    action: "remove_from_favourites",
                    label: function(n) {
                        return $(n.target).attr("data-villaid") + "; " + $(n.target).closest(".col-sm-1").index()
                    }
                }
            }, {
                selector: "#resultsList .instantBook",
                data: {
                    action: "online_book_hover"
                }
            }]
        });
        app.tracking.manager.initByEvent({
            eventType: "click",
            data: {
                category: "link_track"
            },
            elements: [{
                selector: "#resultsList .villa",
                data: {
                    action: function(n) {
                        return $.sessionStorage.set("vfItemsCount", $.sessionStorage.get("vfImpressionCount")), $.sessionStorage.set("vfVillaIndex", $(n.target).closest(".col-sm-1").attr("data-index")), $.sessionStorage.set("vfTotalVillas", $(".searchResultsText.optimizely #resultsNumber").text()), "villa_card_click"
                    },
                    label: function(n) {
                        return $(n.target).closest(".col-sm-1").attr("data-index") + "^" + $(n.target).attr("data-normalizedurl")
                    }
                }
            }]
        });
        app.tracking.manager.init({
            data: {
                category: "start_planning_form"
            },
            byElements: [{
                selector: "section",
                events: [{
                    eventType: "scroll",
                    validate: function() {
                        var n = $("#heroImage"),
                            t = app.tracking.manager.helpers.isInViewport(n);
                        if (!t || n.hasClass("isInViewport") || n.hasClass("alreadyTracked")) t || n.removeClass("isInViewport");
                        else return n.addClass("isInViewport"), n.addClass("alreadyTracked"), !0
                    },
                    data: {
                        action: "impression"
                    }
                }]
            }, {
                selector: "#heroImageGetHelp",
                data: {
                    action: "get_help_button",
                    label: ""
                },
                events: [{
                    eventType: "click"
                }]
            }, {
                selector: "#findVillaInquiry .close",
                data: {
                    action: "close",
                    label: '"x"'
                },
                events: [{
                    eventType: "click"
                }]
            }, {
                selector: "#findVillaOverlay",
                data: {
                    action: "close",
                    label: "overlay"
                },
                events: [{
                    eventType: "click"
                }]
            }]
        })
    }
}()