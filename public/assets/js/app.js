webpackJsonp([0],{197:function(e,t,n){"use strict";function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function i(r,a){try{var o=t[r](a),u=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(u).then(function(e){i("next",e)},function(e){i("throw",e)});e(u)}return i("next")})}}function r(){m=p.slice(0),a(),v.splice(0,v.length)}function a(){m.sort(function(){return Math.random()-.5})}function o(){var e=v.pop();return e||(e=m.pop()),e?(console.log("total: "+(m.length+v.length)+", movieList: "+m.length+", recommendationList: "+v.length),e):(r(),o())}function u(e){if(c(e,1),0===v.length||v[0].clusterIndex!==e.clusterIndex){var t=[];m.forEach(function(n){n.clusterIndex===e.clusterIndex&&(n.recommendedBy=e.title,v.push(n),t.push(n.id))}),t.length>0&&(m=m.filter(function(e){return-1===t.indexOf(e.id)}))}}function l(e){c(e,-1),setTimeout(function(){v.length>0&&(v.forEach(function(e){e.recommendedBy=null,m.push(e)}),a(),v.splice(0,v.length))})}function s(e){c(e,0)}function c(e,t){y&&(clearTimeout(y),y=null),h.push({movieId:e.id,value:t}),h.length>=5?f():y=setTimeout(function(){f()},2e3)}function f(){y&&(clearTimeout(y),y=null);var e=h.splice(0);e.length&&((0,d.post)("/api/rate",e),h.splice(0,h.length))}Object.defineProperty(t,"__esModule",{value:!0}),t.getMovieDetails=t.loadMovies=void 0;t.loadMovies=function(){var e=i(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.get)("/api/movie/index");case 2:p=e.sent,r();case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.getMovieDetails=function(){var e=i(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.get)("/api/movie/"+t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}();t.getNextMovie=o,t.likeMovie=u,t.dislikeMovie=l,t.skipMovie=s;var d=n(205),p=[],m=[],v=[],h=[],y=null;window.onbeforeunload=f},198:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(72),l=function(e){return e&&e.__esModule?e:{default:e}}(u);n(388);var s=function(e){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),o(t,[{key:"handleClick",value:function(){"function"==typeof this.props.onClick&&this.props.onClick()}},{key:"renderDetails",value:function(e){return this.props.displayDetails?e.directors?l.default.createElement("div",{className:"details",style:{width:window.innerWidth}},l.default.createElement("div",{className:"row"},l.default.createElement("span",{className:"caption"},"导演:")," ",l.default.createElement("span",null,e.directors.join(", "))),l.default.createElement("div",{className:"row"},l.default.createElement("span",{className:"caption"},"主演:")," ",l.default.createElement("span",null,e.casts.join(", "))),l.default.createElement("div",{className:"row"},l.default.createElement("span",{className:"caption"},"国家:")," ",l.default.createElement("span",null,e.countries.join(", "))),l.default.createElement("div",{className:"row summary"},l.default.createElement("article",null,e.summary))):l.default.createElement("div",{className:"loading"},"正在加载..."):null}},{key:"render",value:function(){var e=this,t=this.props.data;t||(t={title:"正在加载，请稍后...",img:""});var n=this.renderDetails(t);return l.default.createElement("div",{className:"cnm-movie-card",onClick:function(){return e.handleClick()}},l.default.createElement("div",{className:"cover",style:{backgroundImage:"url("+t.img+")"}}),l.default.createElement("div",{className:"bottom-bar"},l.default.createElement("div",{className:"title"},t.title),t.recommendedBy?l.default.createElement("div",{className:"recommendation"},"根据《",t.recommendedBy,"》推荐"):null),n)}}]),t}(l.default.Component);t.default=s},200:function(e,t){},201:function(e,t){},203:function(e,t,n){e.exports=n.p+"index.html"},204:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function i(r,a){try{var o=t[r](a),u=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(u).then(function(e){i("next",e)},function(e){i("throw",e)});e(u)}return i("next")})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(72),c=i(s),f=n(91),d=n(90),p=i(d),m=n(197),v=n(198),h=i(v);n(203),n(201),n(200);var y=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={movie:null,displayDetails:!1},n}return u(t,e),l(t,[{key:"componentDidMount",value:function(){this.initialLoad()}},{key:"initialLoad",value:function(){function e(){return t.apply(this,arguments)}var t=r(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,m.loadMovies)();case 2:this.nextMovie();case 3:case"end":return e.stop()}},e,this)}));return e}()},{key:"nextMovie",value:function(){var e=(0,m.getNextMovie)();this.setState({movie:e,displayDetails:!1})}},{key:"handleLikeMovie",value:function(){this.state.movie&&((0,m.likeMovie)(this.state.movie),this.nextMovie())}},{key:"handleDislikeMovie",value:function(){this.state.movie&&((0,m.dislikeMovie)(this.state.movie),this.nextMovie())}},{key:"handleSkipMovie",value:function(){this.state.movie&&((0,m.skipMovie)(this.state.movie),this.nextMovie())}},{key:"handleMovieCardClick",value:function(){function e(){return t.apply(this,arguments)}var t=r(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.state.displayDetails){e.next=9;break}if(this.setState({displayDetails:!0}),!this.state.movie){e.next=7;break}return e.next=5,(0,m.getMovieDetails)(this.state.movie.id);case 5:t=e.sent,this.setState({movie:t});case 7:e.next=10;break;case 9:this.setState({displayDetails:!1});case 10:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){var e=this,t=[];this.state.movie&&t.push(this.state.movie);var n=t.map(function(t){return c.default.createElement(h.default,{key:t.id,data:t,displayDetails:e.state.displayDetails,onClick:function(){return e.handleMovieCardClick()}})});return c.default.createElement("div",{className:"cnm-app"},c.default.createElement("main",{className:this.state.displayDetails?"detailed":null},c.default.createElement("div",{className:"hint"},"点击封面查看详情"),c.default.createElement(p.default,{transitionName:"transition",transitionEnterTimeout:300,transitionLeaveTimeout:300},n)),c.default.createElement("footer",null,c.default.createElement("div",{className:"button-bar"},c.default.createElement("div",{className:"buttons"},c.default.createElement("button",{className:"skip",onClick:function(){return e.handleSkipMovie()}},"没看过"),c.default.createElement("button",{className:"dislike",onClick:function(){return e.handleDislikeMovie()}},"一般般"),c.default.createElement("button",{className:"like",onClick:function(){return e.handleLikeMovie()}},"喜欢")))))}}]),t}(c.default.Component);t.default=y,(0,f.render)(c.default.createElement(y,null),document.getElementById("cnm-root"))},205:function(e,t,n){"use strict";function i(e){return new Promise(function(t,n){var i=new XMLHttpRequest;i.open("GET",e),i.onload=function(){200===i.status?t(JSON.parse(i.responseText)):n("Request failed.  Returned status of "+i.status)},i.send(null)})}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return new Promise(function(n,i){var r=new XMLHttpRequest;r.open("POST",e),r.onload=function(){200===r.status?n("application/json"===r.getResponseHeader("Content-Type").toLocaleLowerCase()?JSON.parse(r.responseText):r.responseText):i("Request failed.  Returned status of "+r.status)},t?(r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(t))):r.send(null)})}Object.defineProperty(t,"__esModule",{value:!0}),t.get=i,t.post=r},388:function(e,t){}},[204]);