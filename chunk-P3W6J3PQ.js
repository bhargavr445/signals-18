import{a as i,b as l,d as n}from"./chunk-WMLE4Y63.js";import"./chunk-JS3ZFT6L.js";function d(a,t,e){return(a||"")+(t?` ${t}`:"")+(e?` ${e}`:"")}var c=":host{display:block}.drop-down-container{font-family:Arial, sans-serif;}.custom-select-container{position:relative;width:200px}select{width:100%;padding:10px;font-size:16px;border:1px solid #ddd;border-radius:4px;appearance:none;-webkit-appearance:none;-moz-appearance:none;background-color:white;background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M287%2069.4c-3.9-3.9-10.2-3.9-14.1%200L146.2%20196%2019.5%2069.4C17.6%2067.5%2015.2%2066.5%2012.7%2066.5c-2.5%200-4.9%201-6.8%202.9-3.9%203.9-3.9%2010.2%200%2014.1l133.5%20133.5c3.9%203.9%2010.2%203.9%2014.1%200L287%2083.5c3.9-3.9%203.9-10.2%200-14.1z%22/%3E%3C/svg%3E');background-repeat:no-repeat;background-position:right 10px center;background-size:10px}select::-ms-expand{display:none}select option{padding:10px}",p=c,C=(()=>{let a=class{constructor(t){n(this,t),this.selectedOptionEvent=l(this,"selectedOptionEvent",7),this.id="fepocId",this.options=void 0,this.displayprops=[],this.placeholder="Select"}onOptionChange(t){this.selectedOptionEvent.emit(this.getSelectedValue(t.target.value))}getSelectedValue(t){let e=JSON.parse(t),s=Object.keys(e);return s.length===1&&s.includes(this.id)?e[this.id]:e}getValuesString(t,e=""){return this.displayprops.map(s=>t[s]!==void 0?t[s]:e).join("-")}render(){var t;return i("div",{key:"f0d78834605fb232ff546445c8a0b2c981cba816",class:"drop-down-container"},i("div",{key:"87423c2ecc7cb923fe294de98f06af6d45ee49c7",class:"custom-select-container"},i("select",{key:"a11bba7c091f468bd89cc8d093c9b31431791546",id:"customSelect",onChange:e=>this.onOptionChange(e)},(t=this.options)===null||t===void 0?void 0:t.map(e=>i("option",{value:this.displayprops.length>0?JSON.stringify(e):JSON.stringify({[this.id]:e})},this.displayprops.length>0?this.getValuesString(e):e)))))}};return a.style=p,a})(),h='.tooltip.sc-fepoc-tooltip{position:relative;display:inline-block;border-bottom:1px dotted blue;cursor:pointer}.tooltip.sc-fepoc-tooltip .tooltiptext.sc-fepoc-tooltip{visibility:hidden;width:120px;background-color:#555;color:#fff;text-align:center;border-radius:6px;padding:5px 0;position:absolute;z-index:1;bottom:125%;left:50%;margin-left:-60px;opacity:0;transition:opacity 0.3s}.tooltip.sc-fepoc-tooltip .tooltiptext.sc-fepoc-tooltip::after{content:"";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent transparent}.tooltip.sc-fepoc-tooltip:hover .tooltiptext.sc-fepoc-tooltip{visibility:visible;opacity:1}',b=h,P=(()=>{let a=class{constructor(t){n(this,t),this.displayText="Bhargav Reddy Guntaka",this.HoverText=void 0,this.hoverLength=6}render(){return i("div",{key:"b2a2d09f9e3f2bb551f6ee6c8f767b8a7960b3b1"},i("span",{key:"d5c1710dd8489e80fdee52a44e553e843d6ab996",class:"tooltip"},this.displayText,i("span",{key:"45fae29347479f5b0021aa01e8243b18782adbbe",class:"tooltiptext"},"Tooltip text")))}};return a.style=b,a})(),g=`:host {
  display: block;
}
.table-btn {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.table-btn[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

.paging-info {
  margin: 0 10px;
}

.table-btn {
  background-color: #007bff;
  border: 2px solid #007bff;
  color: #fff;
  padding: 7px 12px;
  border-radius: 5px;
}
.paging-input {
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 4px;
  border: 2px solid grey;
  &:focus {
    outline: none;
  }
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}`,u=g,D=(()=>{let a=class{constructor(t){n(this,t),this.paginatedlisthandler=l(this,"paginatedlisthandler",7),this.buttonLabels={first:"<<",previous:"<",last:">>",next:">"},this.datalist=[],this.pagesize=10,this.paginatedList=[],this.pageNumber=0,this.disableFirstPage=!1,this.disableLastPage=!1,this.displayRecordsRange=""}onDataListChange(){this.onFirstClick()}componentWillLoad(){this.onFirstClick()}componentDidUpdate(){this.sendDataToTableComponent()}onFirstClick(){let t=this.checkIfDataListIsGreaterThanRequiredSize(this.pagesize)?this.pagesize:this.datalist.length;this.setPaginatedRecords(0,t),this.setDisplayRangeText(0,t),this.pageNumber=1,t===this.datalist.length?this.disableLastPage=!0:this.disableLastPage=!1,this.disableFirstPage=!0,this.sendDataToTableComponent()}onPreviousClick(){let t=(this.pageNumber-1)*this.pagesize-this.pagesize,e=(this.pageNumber-1)*this.pagesize;this.setPaginatedRecords(t,e),this.setDisplayRangeText(t,e),this.pageNumber--,t===0&&(this.disableFirstPage=!0),this.disableLastPage=!1,this.sendDataToTableComponent()}onNextClick(){let t=this.pageNumber*this.pagesize,e=this.checkIfDataListIsGreaterThanRequiredSize(t+this.pagesize)?t+this.pagesize:this.datalist.length;this.setPaginatedRecords(t,e),this.setDisplayRangeText(t,e),this.pageNumber++,this.disableLastPage=!this.checkIfDataListIsGreaterThanRequiredSize(t+this.pagesize),this.disableFirstPage=!1,this.sendDataToTableComponent()}onLastClick(){let t=Math.ceil(this.datalist.length/this.pagesize),e=(t-1)*this.pagesize,s=this.datalist.length;this.setPaginatedRecords(e,s),this.setDisplayRangeText(e,s),this.pageNumber=t,this.disableFirstPage=!1,this.disableLastPage=!0,this.sendDataToTableComponent()}handleKeyPress(t){if(t.key==="Enter"){console.log("ENTER");let e=this.pageNumber,s=Number(t.target.value);if(s>0&&s<=Math.ceil(this.datalist.length/this.pagesize)){console.log("Proceed");let o=(s-1)*this.pagesize,r=o+this.pagesize;this.setPaginatedRecords(o,r),this.setDisplayRangeText(o,r),this.pageNumber=s,this.disableLastPage=!this.checkIfDataListIsGreaterThanRequiredSize(r),this.disableFirstPage=s===1,this.sendDataToTableComponent()}else console.log("Dont Proceed"),console.log(e),t.preventDefault(),t.target.value=e,this.pageNumber=e,console.log(this.pageNumber)}else console.log("Not Enter")}setDisplayRangeText(t,e){this.displayRecordsRange=`${t+1} - ${e}`}setPaginatedRecords(t,e){this.paginatedList=JSON.parse(JSON.stringify(this.datalist)).slice(t,e)}checkIfDataListIsGreaterThanRequiredSize(t){return this.datalist.length>t}sendDataToTableComponent(){this.paginatedlisthandler.emit(this.paginatedList)}render(){let t=this.datalist.length/this.pagesize,e=Math.ceil(t);return i("div",{key:"e00e018a392fd8fd00c4029c1a52a60855a0ccfd"},i("button",{key:"f21283852cb05250ea791490440725e0a9c65a0c",id:"firstButton",class:"table-btn mat-h-20",disabled:this.disableFirstPage,onClick:()=>this.onFirstClick()},this.buttonLabels.first),i("button",{key:"bf5ba95ca8abfd2a082337a62c28cec9b065e00c",id:"previousButton",class:"table-btn mat-h-20",disabled:this.disableFirstPage,onClick:()=>this.onPreviousClick()},this.buttonLabels.previous),i("span",{key:"c5e80f3f2a363d0192cbbcd182e0ac9fa0fe7070"},"\xA0Page\xA0"),i("input",{key:"25426ea9a3f44bc2ce63de853865a38347560ead",type:"number",class:"paging-input",value:this.pageNumber,onKeyPress:s=>this.handleKeyPress(s)})," \xA0 of ",e,i("button",{key:"4b591a1e91c0c541e1b7b96a509b0a9f3e395358",id:"nextButton",class:"table-btn mat-h-20",disabled:this.disableLastPage,onClick:()=>this.onNextClick()},this.buttonLabels.next," "),i("button",{key:"928f60345fc1a49e6827c18f3b827cdbcff3d769",id:"lastButton",class:"table-btn mat-h-20",disabled:this.disableLastPage,onClick:()=>this.onLastClick()},this.buttonLabels.last))}static get watchers(){return{datalist:["onDataListChange"]}}};return a.style=u,a})(),f=":host{display:block}",m=f,N=(()=>{let a=class{constructor(t){n(this,t),this.first=void 0,this.middle=void 0,this.last=void 0}getText(){return d(this.first,this.middle,this.last)}render(){return i("div",{key:"ac0ed36b219c628b52d2d1243aee5e9ef7f31e3f"},"Hello, World! I'm ",this.getText()," this is updated")}};return a.style=m,a})();export{C as fepoc_drop_down_component,P as fepoc_tooltip,D as gbr_pagination,N as my_component};
