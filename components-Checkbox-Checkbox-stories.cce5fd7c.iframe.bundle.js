/*! For license information please see components-Checkbox-Checkbox-stories.cce5fd7c.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_silverchip_labs_phosphorm=self.webpackChunk_silverchip_labs_phosphorm||[]).push([[612],{"./src/components/Checkbox/Checkbox.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Password:()=>Password,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Password$parameters,_Password$parameters2,_Password$parameters3,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_Checkbox__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Checkbox/Checkbox.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}const __WEBPACK_DEFAULT_EXPORT__={title:"Phosphorm/Components/Checkbox",component:_Checkbox__WEBPACK_IMPORTED_MODULE_1__.Z};var Template=function Template(args){var _React$useState2=_slicedToArray(react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),2),value=_React$useState2[0],setValue=_React$useState2[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Checkbox__WEBPACK_IMPORTED_MODULE_1__.Z,_objectSpread(_objectSpread({},args),{},{value,onChange:function onChange(_,value){return setValue(value)}}))};Template.displayName="Template";var Password=Template.bind({});Password.args={name:"Checkbox",label:"Checkbox"},Password.parameters=_objectSpread(_objectSpread({},Password.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Password$parameters=Password.parameters)||void 0===_Password$parameters?void 0:_Password$parameters.docs),{},{source:_objectSpread({originalSource:"args => {\n  const [value, setValue] = React.useState(false);\n  return <Checkbox {...args} value={value} onChange={(_, value) => setValue(value)} />;\n}"},null===(_Password$parameters2=Password.parameters)||void 0===_Password$parameters2||null===(_Password$parameters3=_Password$parameters2.docs)||void 0===_Password$parameters3?void 0:_Password$parameters3.source)})});var __namedExportsOrder=["Password"]},"./src/components/Checkbox/Checkbox.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _hooks_useFieldValidation__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useFieldValidation.ts"),_FormField_FormField__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/FormField/FormField.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react/jsx-runtime.js"));function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var Checkbox=function Checkbox(_ref){var name=_ref.name,value=_ref.value,onChange=_ref.onChange,_ref$label=_ref.label,label=void 0===_ref$label?"":_ref$label,_ref$placeholder=_ref.placeholder,placeholder=void 0===_ref$placeholder?"":_ref$placeholder,_ref$required=_ref.required,required=void 0!==_ref$required&&_ref$required,_ref$disabled=_ref.disabled,disabled=void 0!==_ref$disabled&&_ref$disabled,customValidate=_ref.customValidate,_ref$ariaLabel=_ref.ariaLabel,ariaLabel=void 0===_ref$ariaLabel?"Yes":_ref$ariaLabel,_useFieldValidation2=_slicedToArray((0,_hooks_useFieldValidation__WEBPACK_IMPORTED_MODULE_0__.Z)({name,required,value,customValidate}),2),error=_useFieldValidation2[0],showError=_useFieldValidation2[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_FormField_FormField__WEBPACK_IMPORTED_MODULE_1__.Z,{name,label,required,error,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{className:"form-checkbox",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input",{type:"checkbox",name,id:name,checked:value,onChange:function handleChange(){onChange(name,!value),showError()},disabled,"aria-checked":value?"true":"false","aria-required":required?"true":"false"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label",{className:"content ".concat(disabled?"disabled":""),htmlFor:name,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:"outer-box","aria-hidden":!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i",{className:"inner-box far fa-check ".concat(value?"active":"")})}),placeholder?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:placeholder}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{display:"none"},children:ariaLabel})]})]})})};const __WEBPACK_DEFAULT_EXPORT__=Checkbox;try{Checkbox.displayName="Checkbox",Checkbox.__docgenInfo={description:"",displayName:"Checkbox",props:{placeholder:{defaultValue:{value:""},description:"Placeholder text to show when no label is provided",name:"placeholder",required:!1,type:{name:"string"}},label:{defaultValue:{value:""},description:"",name:"label",required:!1,type:{name:"ReactNode"}},name:{defaultValue:null,description:"The name of the input. This is used as the key in the form's state object.",name:"name",required:!0,type:{name:"string"}},value:{defaultValue:null,description:"The value of the input. This is used as the value in the form's state object.",name:"value",required:!0,type:{name:"boolean"}},onChange:{defaultValue:null,description:"The function called to update the form's state object.",name:"onChange",required:!0,type:{name:"onChangeFunction<boolean>"}},disabled:{defaultValue:{value:"false"},description:"Whether to disable the input.",name:"disabled",required:!1,type:{name:"boolean"}},required:{defaultValue:{value:"false"},description:"Whether the input is required to be filled in to submit the form",name:"required",required:!1,type:{name:"boolean"}},customValidate:{defaultValue:null,description:"A custom function to call when validating this form input.",name:"customValidate",required:!1,type:{name:"CustomValidateFunction<boolean>"}},overrideClass:{defaultValue:null,description:"a classname to apply to the input for styling",name:"overrideClass",required:!1,type:{name:"string"}},ariaLabel:{defaultValue:{value:"Yes"},description:"Aria label for the input",name:"ariaLabel",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Checkbox/Checkbox.tsx#Checkbox"]={docgenInfo:Checkbox.__docgenInfo,name:"Checkbox",path:"src/components/Checkbox/Checkbox.tsx#Checkbox"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);