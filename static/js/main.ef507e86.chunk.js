(this["webpackJsonplittle-sis-api"]=this["webpackJsonplittle-sis-api"]||[]).push([[0],{1:function(e,t,a){},10:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),n=a(4),i=a.n(n),l=(a(1),a(2));class c extends s.Component{constructor(e){super(e),this.handleInput=e=>{this.setState({query:e.target.value})},this.handleKeypress=e=>{var t=this.state.query,a=this.props.updateTerm;13===e.charCode&&a(t)},this.state={query:"Trump",suggestions:[{id:"bush",text:"Bush"},{id:"boeing",text:"Boeing"},{id:"mcconnell",text:"McConnell"},{id:"rnc",text:"RNC"},{id:"clinton",text:"Clinton"},{id:"feinstein",text:"Feinstein"},{id:"pfizer",text:"Pfizer"}]},this.handleInput=this.handleInput.bind(this),this.handleKeypress=this.handleKeypress.bind(this)}componentDidMount(){var e=this.state.query;(0,this.props.updateTerm)(e)}render(){var e,t=this.state,a=t.suggestions,s=t.query,n=this.props.updateTerm,i=[],c=Object(l.a)(a);try{var o=function(){var t=e.value;i.push(r.a.createElement("button",{className:"search-suggestions__button",type:"button",key:t.id,onClick:()=>n(t.text)},t.text))};for(c.s();!(e=c.n()).done;)o()}catch(d){c.e(d)}finally{c.f()}return r.a.createElement("div",null,r.a.createElement("div",{className:"search"},r.a.createElement("div",{className:"search-field"},r.a.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"search",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",className:"svg-inline--fa fa-search fa-w-16 fa-3x"},r.a.createElement("path",{fill:"currentColor",d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z",className:""})),r.a.createElement("input",{onChange:this.handleInput,onKeyPress:this.handleKeypress,placeholder:"Enter a search term"})," ",r.a.createElement("button",{type:"button",onClick:()=>n(s)},"Search")),r.a.createElement("div",{className:"search-suggestions"},"Suggestions: ",i)))}}function o(e){this.setState(t=>({page:t.page+e}))}function d(e,t){return e.filter((e,a,s)=>a===s.findIndex(a=>a[t]===e[t]))}class h extends s.Component{constructor(e){super(e),this.objToQueryString=e=>{var t=[];return Object.keys(e).forEach(a=>{e&&e.hasOwnProperty(a)&&t.push(encodeURIComponent(e[a]))}),t.join("&")},this.state={page:0,returnError:!1},this.data={},this.paginate=o.bind(this)}componentDidMount(){this.fetchSearchData()}componentDidUpdate(e){this.props.term!==e.term&&this.setState({page:0},this.fetchSearchData())}queryString(){var e=this.props.term;return this.objToQueryString({term:e})}fetchSearchData(){var e=this.props.setId;fetch("https://littlesis.org/api/entities/search?q=".concat(this.queryString()),{method:"GET"}).then(e=>e.json()).then(t=>{if(this.data=t.data,0===this.data.length)return this.setState({returnError:!0});this.setState({page:0,returnError:!1},e(this.data[0].id))}).catch(e=>{this.setState({returnError:!0}),console.log(e)})}render(){var e=this.state,t=e.page,a=e.returnError,s=e.term,n=this.props.setId;return this.data[t]&&!a?r.a.createElement("div",null,r.a.createElement("div",{className:"entity"},r.a.createElement("div",null,r.a.createElement("div",{className:"entity-name"},this.data[t].attributes.name)," ",r.a.createElement("div",{className:"entity-blurb"}," ",this.data[t].attributes.blurb," "),r.a.createElement("div",null," ",this.data[t].attributes.summary," ")," ")," ",r.a.createElement("div",{className:"entity-paging paging"}," ",r.a.createElement("div",null,"More Results"),r.a.createElement("div",null,t+1," of ",this.data.length),r.a.createElement("div",{className:"entity-paging-buttons paging-buttons"},0===t?null:r.a.createElement("button",{type:"button",className:"prev entity-paging-buttons__button",onClick:()=>{this.paginate(-1),n(this.data[t-1].id)}},r.a.createElement("span",null,"<<","\xa0"),r.a.createElement("span",{className:"entity-paging-button__text"},this.data[t-1].attributes.name)),t===this.data.length-1?null:r.a.createElement("button",{type:"button",className:"next entity-paging__button",onClick:()=>{this.paginate(1),n(this.data[t+1].id)}},r.a.createElement("span",{className:"entity-paging__button__text"}," ",this.data[t+1].attributes.name," ")," ",r.a.createElement("span",null,"\xa0",">>"," "))))," ")):r.a.createElement("div",null," ",a?r.a.createElement("div",{className:"search-error"},"ERROR : ",s,"did not return any results"," "):r.a.createElement("div",{className:"flx-ctr"},r.a.createElement("svg",{className:"loading",viewBox:"25 25 50 50"},r.a.createElement("circle",{cx:"50",cy:"50",r:"20"}," ")," ")," ")," ")}}class m extends s.PureComponent{constructor(e){super(e),this.state={included:{},returnError:!1}}componentDidMount(){var e=this.props,t=e.did,a=e.eid;this.getRelationData(a,t,!0)}componentDidUpdate(e){var t=this.props,a=t.did,s=t.eid,r=s!==e.eid;a!==e.did&&this.getRelationData(s,a,r)}getRelationData(e,t,a){var s=this.props.relatedOwner;fetch("https://littlesis.org/api/relationships/".concat(t),{method:"GET"}).then(e=>e.json()).then(t=>{if(0===t.included.length)return this.setState({returnError:!0});this.setState({included:e===t.included[0].id?t.included[1]:t.included[0],returnError:!1});var r=e===t.included[0].id?t.included[0].attributes.name:t.included[1].attributes.name;a&&s(r)}).catch(e=>{this.setState({returnError:!0}),console.log(e)})}render(){var e=this.state,t=e.included,a=e.returnError,s=this.props.did;return t.attributes&&!a?r.a.createElement("div",{className:"details-window"},r.a.createElement("p",{className:"details-window__name"},t.attributes.name),r.a.createElement("div",{className:"details-window-summary"},r.a.createElement("p",{className:"window-summary__blurb"},t.attributes.blurb),r.a.createElement("p",null,t.attributes.summary))):r.a.createElement("div",null,a?r.a.createElement("div",{className:"search-error"},"ERROR : ",s," \xa0 did not return any results "):r.a.createElement("div",{className:"flx-ctr"},r.a.createElement("svg",{className:"loading",viewBox:"25 25 50 50"},r.a.createElement("circle",{cx:"50",cy:"50",r:"20"}," ")," ")," ")," ")}}class u extends s.Component{constructor(e){super(e),this.state={relationships:{},page:1,relationsId:0,detailsId:0,localEntityId:0,active:{},relatedOwner:"",returnError:!1},this.meta={},this.paginate=o.bind(this),this.removeDuplicates=d.bind(this),this.relatedOwner=this.relatedOwner.bind(this)}componentDidMount(){var e=this.props.entityId;this.getRelationshipData(e)}componentDidUpdate(e,t){var a=this.props.entityId,s=this.state,r=s.page,n=s.relationsId,i=s.localEntityId;a!==e.entityId&&this.getRelationshipData(a,1),n!==t.relationsId?this.getRelationshipData(n):r!==t.page&&this.getRelationshipData(i)}getRelationshipData(e,t){var a=this.state.page,s=t?1:a;fetch("https://littlesis.org/api/entities/".concat(e,"/relationships?page=").concat(s),{method:"GET"}).then(e=>e.json()).then(t=>{if(0===t.data.length)return this.setState({returnError:!0});this.meta=t.meta,this.setState({relationships:t.data,detailsId:t.data[0].attributes.id,localEntityId:e,active:t.data[0],returnError:!1,page:s})}).catch(e=>{this.setState({returnError:!0}),console.error(e)})}myRelations(e){this.setState({relationsId:e,page:1})}myDetails(e){this.setState({detailsId:e.id,active:e})}relatedOwner(e){this.setState({relatedOwner:e})}render(){var e=this,t=this.state,a=t.returnError,s=t.relationships,n=t.page,i=t.detailsId,c=t.localEntityId,o=t.active,d=t.relatedOwner;if(s[0]&&!a){var h,u=[],p=this.removeDuplicates(s,"id"),v=Object(l.a)(p);try{var g=function(){var t=h.value,a=t.attributes.description,s=c===t.attributes.entity1_id?t.attributes.entity2_id:t.attributes.entity1_id;u.push(r.a.createElement("li",{key:t.id,className:o===t?"arrow active":"arrow"},r.a.createElement("div",{className:"related-description"},a),r.a.createElement("div",{className:"related-buttons"},r.a.createElement("button",{type:"button",className:"buttons-relationships__button",onClick:()=>e.myRelations(s)},r.a.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"far","data-icon":"address-book",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",className:"svg-inline--fa fa-address-book fa-w-14 fa-3x"},r.a.createElement("path",{fill:"currentColor",d:"M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-68 304H48V48h320v416zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2z",className:""}))),r.a.createElement("button",{className:"buttons-details__button",type:"button",onClick:()=>e.myDetails(t)},"Details",r.a.createElement("span",{className:o===t?"arrow active":"arrow"},">")))))};for(v.s();!(h=v.n()).done;)g()}catch(E){v.e(E)}finally{v.f()}return r.a.createElement("div",{className:"flx-ctr related"},r.a.createElement("div",{className:"relationships"},r.a.createElement("div",{className:"relationships-results"},r.a.createElement("div",{className:"results-header"},r.a.createElement("div",{className:"results-header-top"},r.a.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"far","data-icon":"address-book",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",className:"svg-inline--fa fa-address-book fa-w-14 fa-3x"},r.a.createElement("path",{fill:"currentColor",d:"M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-68 304H48V48h320v416zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2z",className:""})),r.a.createElement("div",{className:"results-header-top__text"},"Relationships of ",d)),r.a.createElement("div",{className:"results-header-bottom"},r.a.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"far","data-icon":"hand-point-down",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",className:"svg-inline--fa fa-hand-point-down fa-w-14 fa-3x"},r.a.createElement("path",{fill:"currentColor",d:"M188.8 512c45.616 0 83.2-37.765 83.2-83.2v-35.647a93.148 93.148 0 0 0 22.064-7.929c22.006 2.507 44.978-3.503 62.791-15.985C409.342 368.1 448 331.841 448 269.299V248c0-60.063-40-98.512-40-127.2v-2.679c4.952-5.747 8-13.536 8-22.12V32c0-17.673-12.894-32-28.8-32H156.8C140.894 0 128 14.327 128 32v64c0 8.584 3.048 16.373 8 22.12v2.679c0 6.964-6.193 14.862-23.668 30.183l-.148.129-.146.131c-9.937 8.856-20.841 18.116-33.253 25.851C48.537 195.798 0 207.486 0 252.8c0 56.928 35.286 92 83.2 92 8.026 0 15.489-.814 22.4-2.176V428.8c0 45.099 38.101 83.2 83.2 83.2zm0-48c-18.7 0-35.2-16.775-35.2-35.2V270.4c-17.325 0-35.2 26.4-70.4 26.4-26.4 0-35.2-20.625-35.2-44 0-8.794 32.712-20.445 56.1-34.926 14.575-9.074 27.225-19.524 39.875-30.799 18.374-16.109 36.633-33.836 39.596-59.075h176.752C364.087 170.79 400 202.509 400 248v21.299c0 40.524-22.197 57.124-61.325 50.601-8.001 14.612-33.979 24.151-53.625 12.925-18.225 19.365-46.381 17.787-61.05 4.95V428.8c0 18.975-16.225 35.2-35.2 35.2zM328 64c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24z",className:""})))),r.a.createElement("ul",null,u)),r.a.createElement("div",{className:"relationships-paging"},r.a.createElement("div",null,"Page ",n," of ",this.meta.pageCount),r.a.createElement("div",{className:"paging-buttons"},r.a.createElement("button",{type:"button",className:"prev",onClick:()=>this.paginate(-1),disabled:1===n},"previous")," ",r.a.createElement("button",{type:"button",className:"next",onClick:()=>this.paginate(1),disabled:n===this.meta.pageCount},"next")))),r.a.createElement("div",{className:"details"},r.a.createElement(m,{did:i,eid:c,relatedOwner:this.relatedOwner})))}return r.a.createElement("div",null," ",a?r.a.createElement("div",{className:"search-error"},"ERROR : ",c,"\xa0 did not return any results "):r.a.createElement("div",{className:"flx-ctr"},r.a.createElement("svg",{className:"loading",viewBox:"25 25 50 50"},r.a.createElement("circle",{cx:"50",cy:"50",r:"20"}," ")," ")," ")," ")}}class p extends s.PureComponent{constructor(e){super(e),this.state={term:"Trump",id:15108},this.updateTerm=this.updateTerm.bind(this),this.setId=this.setId.bind(this)}setId(e){this.setState({id:e})}updateTerm(e){this.setState({term:e})}render(){var e=this.state,t=e.term,a=e.id;return r.a.createElement("div",{id:"App",className:"App"},r.a.createElement("div",{className:"accent"}),r.a.createElement("div",{className:"wrap"},r.a.createElement("header",null,r.a.createElement("h1",null,"Interlinked profiles of powerful individuals and organizations in the public and private sectors."),r.a.createElement("h2",null,"-powered by ",r.a.createElement("a",{href:"https://littlesis.org"},"LittleSis"))),r.a.createElement(c,{updateTerm:this.updateTerm}),r.a.createElement(h,{term:t,setId:this.setId}),r.a.createElement(u,{entityId:a})," "))}}var v=p;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})},5:function(e,t,a){e.exports=a(10)}},[[5,1,2]]]);
//# sourceMappingURL=main.ef507e86.chunk.js.map