// Iban generate functions
function t(t) { return null === t ? "null" : Array.isArray(t) ? "array" : typeof t } class e extends Error { constructor(e) { super(`Alphabets requires a string(able), got (${t(e)}) ${e}`); const { constructor: r, constructor: { name: n } } = this; this.name = n, Error.captureStackTrace(this, r) } } class r extends Error { constructor(t, e) { super(`Alphabets cannot contain duplicate characters, found "${e}" in "${t}"`); const { constructor: r, constructor: { name: n } } = this; this.name = n, Error.captureStackTrace(this, r) } } const n = new WeakMap; class a { constructor(a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") { const s = /string|object/.test(t(a)) ? String(a) : ""; const o = Array.from(s), i = o.filter(((t, e, r) => r.indexOf(t) !== e)).join(""); if (!s.length) throw new e(a); if (i.length) throw new r(s, i); n.set(this, { characters: s, alphabet: o }) } get characters() { const { characters: t } = n.get(this); return t } get byteLength() { return this.characters.length } get length() { const { alphabet: { length: t } } = n.get(this); return t } slice(t, e) { const { alphabet: r } = n.get(this), { constructor: a } = Object.getPrototypeOf(this); return a.from(r.slice(t, e).join("")) } charAt(t) { const { alphabet: e } = n.get(this); return e[t] } charCodeAt(t) { const { characters: e, length: r } = this; return t >= 0 && t < r ? e.charCodeAt(t) : void 0 } codePointAt(t) { const e = this.charAt(t); return e ? e.codePointAt(0) : void 0 } indexOf(t) { const { alphabet: e } = n.get(this); return e.indexOf(t) } map(...t) { const { length: e } = this, r = t => t < 0 ? r(e + t) : t; return t.map((t => this.charAt(r(t) % e))) } toString() { return this.characters } toJSON() { return String(this) } static from(t) { n.has(this) || n.set(this, new Map); const e = n.get(this); return e.has(t) || e.set(t, new this(t)), e.get(t) } } const s = new WeakMap; class o { constructor(t = {}) { s.set(this, t) } get algorithm() { const { algorithm: t } = s.get(this); return t || "Custom" } get specification() { const { algorithm: t } = this; return `ISO 7064, ${t}` } get designation() { const { designation: t } = s.get(this); return t || 0 } get indices() { const { indices: t, alphabet: e } = s.get(this); return t || e } get alphabet() { const { alphabet: t } = s.get(this); return t } get modulus() { const { modulus: t, alphabet: e } = s.get(this); return t || e && e.length } get radix() { const { radix: t } = s.get(this); return t } get double() { const { double: t } = s.get(this); return t || !1 } normalize(t) { const { indices: e = "a-zA-Z0-9" } = this, r = new RegExp(`[^${e}]+`, "g"); return String(t).toUpperCase().replace(r, "") } checksum(t) { throw new Error("Checksum method not implemented") } validate(t) { const { indices: e, alphabet: r, double: n } = this, a = new RegExp(`([${e}]+)([${r}]{${Number(n) + 1}})`), s = this.normalize(t).match(a); if (s) { const [, t, e] = s; return this.checksum(t) === e } return !1 } generate(t) { return `${this.normalize(t)}${this.checksum(t)}` } factory(t = {}) { const { indices: e, alphabet: r, modulus: n, radix: a, double: s } = this, { constructor: o } = Object.getPrototypeOf(this); return new o(Object.assign({ indices: e, alphabet: r, modulus: n, radix: a, double: s }, t)) } } class i extends o { constructor(t = {}) { const { alphabet: e, radix: r = 2, indices: n = (null == e ? void 0 : e.slice(0, -1)) } = t, a = function (t, e) { var r = {}; for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]); if (null != t && "function" == typeof Object.getOwnPropertySymbols) { var a = 0; for (n = Object.getOwnPropertySymbols(t); a < n.length; a++)e.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (r[n[a]] = t[n[a]]) } return r }(t, ["alphabet", "radix", "indices"]); super(Object.assign({ alphabet: e, indices: n, radix: r }, a)) } checksum(t) { const { modulus: e, radix: r, double: n, indices: a, alphabet: s } = this, o = s.charAt(0).repeat(Number(n) + 1), i = this.normalize(t) + o, c = Array.from(i).map((t => a.indexOf(t))).reduce(((t, n) => (t * r + n) % e), 0), h = (e + 1 - c % e) % e; return (n ? [h / r | 0, h % r] : [h]).map((t => s.charAt(t))).join("") } } class c extends o { checksum(t) { const { modulus: e, indices: r, alphabet: n } = this, a = Array.from(this.normalize(t)).map((t => r.indexOf(t))).reduce(((t, r) => 2 * ((t % (e + 1) + r) % e || e)), e) % (e + 1); return n.charAt((e + 1 - a) % e) } } const h = { num: a.from("0123456789"), numX: a.from("0123456789X"), alpha: a.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), alphanum: a.from("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), alphanumA: a.from("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*") }; new i({ algorithm: "MOD 11-2", designation: 1, alphabet: h.numX }), new i({ algorithm: "MOD 37-2", designation: 2, alphabet: h.alphanumA }); const u = new i({ algorithm: "MOD 97-10", designation: 3, modulus: 97, radix: 10, alphabet: h.num, indices: h.num, double: !0 }); new i({ algorithm: "MOD 661-26", designation: 4, modulus: 661, radix: 26, alphabet: h.alpha, indices: h.alpha, double: !0 }), new i({ algorithm: "MOD 1271-36", designation: 5, modulus: 1271, radix: 36, alphabet: h.alphanumA, double: !0 }), new c({ algorithm: "MOD 11,10", designation: 6, alphabet: h.num }), new c({ algorithm: "MOD 27,26", designation: 7, alphabet: h.alpha }), new c({ algorithm: "MOD 37,36", designation: 8, alphabet: h.alphanum }); const l = u.factory({ algorithm: "MOD 97-10 (Custom)", designation: 3, indices: a.from("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ") }); function m(t) { const { country: e, checksum: r, account: n } = b(String(t)); return d(n, e) === r } function d(t, e) { const { modulus: r, indices: n } = l, a = Array.from(`${t}${e}`).map((t => n.indexOf(t))).filter((t => t >= 0)).join(""), s = l.checksum(a), o = Number(s); return o <= 98 - r ? String(o + r) : s } function g(t, e, r = !1) { const n = `${e}${d(t, e)}${t}`; return r ? p(n) : l.normalize(n) } function p(t) { const e = l.normalize(String(t)); return Array.from(e).reduce(((t, e, r) => t + (r && r % 4 == 0 ? " " : "") + e), "") } function b(t) { const [, e, r, n] = l.normalize(t).match(/^([A-Z]{2})([0-9]{2})(\w{1,30})$/) || []; return { country: e, checksum: r, account: n } };

// SEPA XML functions
(function(t){var a="http://www.w3.org/2001/XMLSchema-instance";var s="urn:iso:std:iso:20022:tech:xsd:";var n="1.0";var e="UTF-8";var r="pain.008.001.02";var i=".";function o(t){i=t}var c=true;function d(t){c=!!t}var u={"pain.001.001.02":"pain.001.001.02","pain.001.003.02":"pain.001.003.02","pain.001.001.03":"CstmrCdtTrfInitn","pain.001.003.03":"CstmrCdtTrfInitn","pain.008.001.01":"pain.008.001.01","pain.008.003.01":"pain.008.003.01","pain.008.001.02":"CstmrDrctDbtInitn","pain.008.003.02":"CstmrDrctDbtInitn"};function l(t){var n=t.indexOf("pain.008")===0?1:0;return parseInt(t.substr(-2),10)+n}function h(t){this._painFormat=t||r;this._type=u[this._painFormat];this._paymentInfo=[];this._xmlVersion=n;this._xmlEncoding=e;this.grpHdr=new m(this._painFormat)}h.Types=u;h.prototype={_painFormat:null,grpHdr:null,_paymentInfo:[],_type:null,_xmlVersion:null,_xmlEncoding:null,addPaymentInfo:function(t){if(!(t instanceof p)){throw new Error("Given payment is not member of the PaymentInfo class")}if(t.id){t.id=this.grpHdr.id+i+t.id}else{t.id=this.grpHdr.id+i+this._paymentInfo.length}this._paymentInfo.push(t)},createPaymentInfo:function(){return new p(this._painFormat)},normalize:function(){var t=0;var n=0;for(var e=0,r=this._paymentInfo.length;e<r;++e){this._paymentInfo[e].normalize();t+=this._paymentInfo[e].controlSum;n+=this._paymentInfo[e].transactionCount}this.grpHdr.controlSum=t;this.grpHdr.transactionCount=n},toXML:function(){this.normalize();var t=s+this._painFormat;var n=O(t,"Document");n.xmlVersion=this._xmlVersion;n.xmlEncoding=this._xmlEncoding;var e=n.documentElement;e.setAttribute("xmlns:xsi",a);e.setAttribute("xsi:schemaLocation",s+this._painFormat+" "+this._painFormat+".xsd");var r=n.createElementNS(t,this._type);r.appendChild(this.grpHdr.toXML(n));for(var i=0,o=this._paymentInfo.length;i<o;++i){r.appendChild(this._paymentInfo[i].toXML(n))}n.documentElement.appendChild(r);return n},toString:function(){var t=this.toXML();var n='<?xml version="'+t.xmlVersion+'" encoding="'+t.xmlEncoding+'"?>';return n+L(t)}};function m(t){this._painFormat=t}m.prototype={_painFormat:null,id:"",created:"",transactionCount:0,initiatorName:"",controlSum:0,batchBooking:false,grouping:"MIXD",toXML:function(t){var n=M(t,true,true);var e=t.createElementNS(t.documentElement.namespaceURI,"GrpHdr");var r=l(this._painFormat);n(e,"MsgId",this.id);n(e,"CreDtTm",this.created.toISOString());if(r===2){n(e,"BtchBookg",this.batchBooking.toString())}n(e,"NbOfTxs",this.transactionCount);n(e,"CtrlSum",this.controlSum.toFixed(2));if(r===2){n(e,"Grpg",this.grouping)}n(e,"InitgPty","Nm",this.initiatorName);return e},toString:function(){return L(this.toXML())}};var f={DirectDebit:"DD",Transfer:"TRF"};function p(t){this._painFormat=t;this.method=t.indexOf("pain.001")===0?f.Transfer:f.DirectDebit;this._payments=[]}p.PaymentInfoTypes=f;p.prototype={_painFormat:null,_payments:null,id:"",method:null,batchBooking:false,grouping:"MIXD",controlSum:0,localInstrumentation:"CORE",sequenceType:"FRST",collectionDate:null,requestedExecutionDate:null,creditorId:"",creditorName:"",creditorStreet:null,creditorCity:null,creditorCountry:null,creditorIBAN:"",creditorBIC:"",debtorId:"",debtorName:"",debtorStreet:null,debtorCity:null,debtorCountry:null,debtorIBAN:"",debtorBIC:"",instructionPriority:"NORM",get transactionCount(){return this._payments.length},normalize:function(){var t=0;for(var n=0,e=this._payments.length;n<e;++n){t+=this._payments[n].amount}this.controlSum=t},addTransaction:function(t){if(!(t instanceof y)){throw new Error("Given Transaction is not member of the SepaTransaction class")}if(t.id){t.id=this.id+i+t.id}else{t.id=this.id+i+this._payments.length}this._payments.push(t)},createTransaction:function(){return new y(this._painFormat)},validate:function(){var t=this.method===f.DirectDebit?"creditor":"debtor";B(this.localInstrumentation,["CORE","COR1","B2B"],"localInstrumentation");B(this.sequenceType,["FRST","RCUR","OOFF","FNAL"],"sequenceType");if(this.method===f.DirectDebit){T(this.collectionDate,"collectionDate")}else{T(this.requestedExecutionDate,"requestedExecutionDate")}x(this[t+"Id"],t+"Id");A(this[t+"Name"],null,70,t+"Name");A(this[t+"Street"],null,70,t+"Street");A(this[t+"City"],null,70,t+"City");A(this[t+"Country"],null,2,t+"Country");E(this[t+"IBAN"],t+"IBAN");A(this[t+"BIC"],[0,8,11],t+"BIC");var n=this[t+"BIC"].length===0||this[t+"BIC"].substr(4,2)===this[t+"IBAN"].substr(0,2);_(n,"country mismatch in BIC/IBAN");A(this._payments.length,1,null,"_payments")},toXML:function(t){if(c){this.validate()}var n=M(t,true,false);var e=M(t,true,true);var r=t.createElementNS(t.documentElement.namespaceURI,"PmtInf");e(r,"PmtInfId",this.id);e(r,"PmtMtd",this.method);if(l(this._painFormat)===3){e(r,"BtchBookg",this.batchBooking.toString());e(r,"NbOfTxs",this.transactionCount);e(r,"CtrlSum",this.controlSum.toFixed(2))}var i=n(r,"PmtTpInf");e(i,"SvcLvl","Cd","SEPA");if(this.method===f.DirectDebit){e(i,"LclInstrm","Cd",this.localInstrumentation);e(i,"SeqTp",this.sequenceType);e(r,"ReqdColltnDt",this.collectionDate.toISOString().substr(0,10))}else{e(r,"ReqdExctnDt",this.requestedExecutionDate.toISOString().substr(0,10))}var o=this.method===f.DirectDebit?"creditor":"debtor";var a=this.method===f.DirectDebit?"Cdtr":"Dbtr";var s=n(r,a);e(s,"Nm",this[o+"Name"]);if(this[o+"Street"]&&this[o+"City"]&&this[o+"Country"]){var d=n(s,"PstlAdr");e(d,"Ctry",this[o+"Country"]);e(d,"AdrLine",this[o+"Street"]);e(d,"AdrLine",this[o+"City"])}e(r,a+"Acct","Id","IBAN",this[o+"IBAN"]);if(this[o+"BIC"]){e(r,a+"Agt","FinInstnId","BIC",this[o+"BIC"])}else{e(r,a+"Agt","FinInstnId","Othr","Id","NOTPROVIDED")}e(r,"ChrgBr","SLEV");if(this.method===f.DirectDebit){var u=n(r,"CdtrSchmeId","Id","PrvtId","Othr");e(u,"Id",this.creditorId);e(u,"SchmeNm","Prtry","SEPA")}for(var h=0,m=this._payments.length;h<m;++h){r.appendChild(this._payments[h].toXML(t))}return r},toString:function(){return L(this.toXML())}};var I={DirectDebit:"DrctDbtTxInf",Transfer:"CdtTrfTxInf"};function y(t){this._painFormat=t;this._type=t.indexOf("pain.001")===0?I.Transfer:I.DirectDebit}y.TransactionTypes=I;y.prototype={_type:I.DirectDebit,id:"",end2endId:"",currency:"EUR",amount:0,purposeCode:null,mandateId:"",mandateSignatureDate:null,debtorName:"",debtorStreet:null,debtorCity:null,debtorCountry:null,debtorIBAN:"",debtorBIC:"",remittanceInfo:"",creditorName:"",creditorStreet:null,creditorCity:null,creditorCountry:null,creditorIBAN:"",creditorBIC:"",validate:function(){var t=this._type===I.Transfer?"creditor":"debtor";w(this.end2endId,"end2endId");N(this.amount,.01,999999999.99,"amount");_(this.amount==this.amount.toFixed(2),"amount has too many fractional digits");A(this.purposeCode,1,4,"purposeCode");F(this.mandateId,"mandateId");T(this.mandateSignatureDate,"mandateSignatureDate");A(this[t+"Name"],null,70,t+"Name");A(this[t+"Street"],null,70,t+"Street");A(this[t+"City"],null,70,t+"City");A(this[t+"Country"],null,2,t+"Country");E(this[t+"IBAN"],t+"IBAN");B(this[t+"BIC"].length,[0,8,11],t+"BIC");var n=this[t+"BIC"].length===0||this[t+"BIC"].substr(4,2)===this[t+"IBAN"].substr(0,2);_(n,"country mismatch in BIC/IBAN");A(this.remittanceInfo,null,140,"remittanceInfo")},toXML:function(t){if(c){this.validate()}var n=this._type===I.Transfer?"creditor":"debtor";var e=this._type===I.Transfer?"Cdtr":"Dbtr";var r=M(t,true,false);var i=M(t,false,true);var o=M(t,true,true);var a=t.createElementNS(t.documentElement.namespaceURI,this._type);var s=r(a,"PmtId");o(s,"InstrId",this.id);o(s,"EndToEndId",this.end2endId);if(this._type===I.DirectDebit){o(a,"InstdAmt",this.amount.toFixed(2)).setAttribute("Ccy",this.currency);var d=r(a,"DrctDbtTx","MndtRltdInf");o(d,"MndtId",this.mandateId);o(d,"DtOfSgntr",this.mandateSignatureDate.toISOString().substr(0,10));if(this.ammendment){o(d,"AmdmntInd","true");o(d,"AmdmnInfDtls",this.ammendment)}else{o(d,"AmdmntInd","false")}}else{o(a,"Amt","InstdAmt",this.amount.toFixed(2)).setAttribute("Ccy",this.currency)}if(this[n+"BIC"]){o(a,e+"Agt","FinInstnId","BIC",this[n+"BIC"])}else{o(a,e+"Agt","FinInstnId","Othr","Id","NOTPROVIDED")}var u=r(a,e);o(u,"Nm",this[n+"Name"]);if(this[n+"Street"]&&this[n+"City"]&&this[n+"Country"]){var h=r(u,"PstlAdr");o(h,"Ctry",this.debtorCountry);o(h,"AdrLine",this.debtorStreet);o(h,"AdrLine",this.debtorCity)}o(a,e+"Acct","Id","IBAN",this[n+"IBAN"]);o(a,"RmtInf","Ustrd",this.remittanceInfo);i(a,"Purp","Cd",this.purposeCode);return a}};function C(t){var n="";for(var e=0,r=t.length;e<r;++e){var i=t.charCodeAt(e);if(i>=65&&i<=90){n+=(i-55).toString()}else if(i>=97&&i<=122){n+=(i-87).toString()}else if(i>=48&&i<=57){n+=t[e]}}return n}function v(t){var n=0;for(var e=0,r=t.length;e<r;++e){n=(n*10+parseInt(t[e],10))%97}return n}function g(t){var n=t.substr(4)+t.substr(0,4);return v(C(n))===1}function b(t){var n=t.substr(4)+t.substr(0,2)+"00";var e=v(C(n));return t.substr(0,2)+("0"+(98-e)).substr(-2,2)+t.substr(4)}function D(t){var n=t.substr(7)+t.substr(0,4);return v(C(n))===1}function S(t){var n=t.substr(7)+t.substr(0,2)+"00";var e=v(C(n));return t.substr(0,2)+("0"+(98-e)).substr(-2,2)+t.substr(4)}function _(t,n){if(!t){throw new Error(n)}}function B(t,n,e){if(n.indexOf(t)<0){throw new Error(e+" must have any value of: "+n.join(" ")+"(found: "+t+")")}}function A(t,n,e,r){if(n!==null&&t&&t.length<n||e!==null&&t&&t.length>e){throw new Error(r+" has invalid string length, expected "+n+" < "+t+" < "+e)}}function N(t,n,e,r){if(t<n||t>e){throw new Error(r+" does not match range "+n+" < "+t+" < "+e)}}function E(t,n){if(!g(t)){throw new Error(n+' has invalid IBAN "'+t+'"')}}function x(t,n){if(!D(t)){throw new Error(n+' is invalid "'+t+'"')}}function T(t,n){if(!t||isNaN(t.getTime())){throw new Error(n+" has invalid date "+t)}}function w(t,n){if(t&&!t.match(/([A-Za-z0-9]|[+|?|/|\-|:|(|)|.|,|'| ]){1,35}/)){throw new Error(n+" doesn't match sepa id charset type 1 (found: "+'"'+t+'")')}}function F(t,n){if(t&&!t.match(/([A-Za-z0-9]|[+|?|/|\-|:|(|)|.|,|']){1,35}/)){throw new Error(n+" doesn't match sepa id charset type 2 (found: "+'"'+t+'")')}}function O(t,n){if(typeof document!=="undefined"&&typeof document.implementation!=="undefined"){return document.implementation.createDocument(t,n)}else{var e=require("@xmldom/xmldom").DOMImplementation;return(new e).createDocument(t,n)}}function L(t){var n;if(typeof window==="undefined"){var e=require("@xmldom/xmldom").XMLSerializer;n=new e}else{n=new window.XMLSerializer}return n.serializeToString(t)}function M(i,o,a){return function(){var t=arguments[0];var n=a&&arguments[arguments.length-1];var e=a?arguments.length-1:arguments.length;if(o||n||n===0){for(var r=1;r<e;++r){t=t.appendChild(i.createElementNS(i.documentElement.namespaceURI,arguments[r]))}if(a){t.textContent=n}return t}else{return null}}}t.Document=h;t.validateIBAN=g;t.checksumIBAN=b;t.validateCreditorID=D;t.checksumCreditorID=S;t.setIDSeparator=o;t.enableValidations=d})(typeof exports==="undefined"?this.SEPA={}:exports);

// BICs arrays
//let codes = ["30003", "10278", "30004", "10096", "20041", "20041", "20041", "20041", "15589", "16275", "10011", "17515", "16706", "17806", "20041", "13825", "20041", "18706", "19106", "14445", "20041", "18206", "13506", "15135", "13335", "20041", "13306", "10206", "11315", "16806", "20041", "11425", "14706", "16606", "13135", "17906", "13485", "11306", "16807", "20041", "14806", "12135", "10807", "11006", "18106", "20041", "13906", "18306", "10907", "14505", "10107", "20041", "14707", "16906", "20041", "11206", "13807", "17807", "20041", "20041", "20041", "18315", "10207", "12506", "14506", "20041", "18715", "13106", "14265", "16106", "13606", "11706", "19406", "16607", "19870", "18707", "12906", "12406", "14607", "17106", "12206", "14406", "17206", "13507", "19506", "16006", "20041", "12548", "20041", "42559", "12280", "16707", "20041", "18370", "20041", "21833", "14690", "14518", "20041", "16705", "15589"];
//let bics = ["SOGEFRPP", "CMCIFR2AXXX", "BNPAFRPPXXX", "CMCIFRPPXXX", "PSSTFRPPPAR", "PSSTFRPPLIL", "PSSTFRPPSCE", "PSSTFRPPMAR", "CMBRFR2BXXX", "CEPAFRPP627", "PSSTFRPPCNE", "CEPAFRPP751", "AGRIFRPP867", "AGRIFRPP878", "PSSTFRPPBOR", "CEPAFRPP382", "PSSTFRPPLYO", "AGRIFRPP887", "AGRIFRPP891", "CEPAFRPP444", "PSSTFRPPMON", "AGRIFRPP882", "AGRIFRPP835", "CEPAFRPP513", "CEPAFRPP333", "PSSTFRPPTOU", "AGRIFRPP833", "AGRIFRPP802", "CEPAFRPP131", "AGRIFRPP868", "PSSTFRPPROU", "CEPAFRPP142", "AGRIFRPP847", "AGRIFRPP866", "CEPAFRPP313", "AGRIFRPP879", "CEPAFRPP348", "AGRIFRPP813", "CCBPFRPPGRE", "PSSTFRPPNTE", "AGRIFRPP848", "CEPAFRPP213", "CCBPFRPPDJN", "AGRIFRPP810", "AGRIFRPP881", "PSSTFRPPDIJ", "AGRIFRPP839", "AGRIFRPP883", "CCBPFRPPBDX", "CEPAFRPP450", "BREDFRPPXXX", "PSSTFRPPLIM", "CCBPFRPPMTZ", "AGRIFRPP869", "PSSTFRPPCLE", "AGRIFRPP812", "CCBPFRPPNAN", "CCBPFRPPTLS", "PSSTFRPPCHA", "PSSTFRPPNCY", "PSSTFRPPGRE", "CEPAFRPP831", "CCBPFRPPMTG", "AGRIFRPP825", "AGRIFRPP845", "PSSTFRPPREN", "CEPAFRPP871", "AGRIFRPP831", "CEPAFRPP426", "AGRIFRPP861", "AGRIFRPP836", "AGRIFRPP817", "AGRIFRPP894", "CCBPFRPPPPG", "SOAPFR22XXX", "CCBPFRPPVER", "AGRIFRPP829", "AGRIFRPP824", "CCBPFRPPMAR", "AGRIFRPP871", "AGRIFRPP822", "AGRIFRPP844", "AGRIFRPP872", "CCBPFRPPLIL", "AGRIFRPP895", "AGRIFRPP860", "PSSTFRPPSDR", "AXABFRPPXXX", "PSSTFRPPSTR", "CCOPFRPPXXX", "SORMFR2NXXX", "CCBPFRPPREN", "PSSTFRPPBTE", "GPBAFRPPXXX", "PSSTFRPPCAY", "PRNSFRP1XXX", "CMCIFRP1MON", "FTNOFRP1XXX", "PSSTFRPPFDF", "CEPAFRPP670", "CMBRFR2BARK"];

// Date
let gcollectionDate = new Date();
let gfinalDate = gcollectionDate.toISOString().replace('Z', '');
let gwithoutTime = gcollectionDate.toISOString().replace(/T.*$/, '');

function finalToShow(fileContent) {
    // Parsing
    console.log(fileContent);
    let code_banque = fileContent.match(/(?<=.{149})([0-9]{5})/)[0];
    console.log('code banque : ' + code_banque);
    let code_guichet = fileContent.match(/(?<=^.{86})([0-9]{5})/)[0];
    console.log('code guichet : ' + code_guichet);
    let numero_compte = fileContent.match(/(?<=^.{91})(.{11})/)[0];
    console.log('numero compte : ' + numero_compte);
    let bic = fileContent.match(/(?<=^.{54})(.{11})/)[0];
    console.log('bic : ' + bic);
    let rib;
    let parsedAmount = fileContent.match(/(?<=^.{102})([0-9]{16})/)[0];
    let amount = parsedAmount.replace(/(?<=.{14})(?=.{2})/, '.').replace(/^0*/, '');
    console.log('montant : ' + amount);
    let id = fileContent.match(/(?<=^.{118})(.{31})/)[0];
    id = id.replace(/\s*$/, '');
    console.log('libellé : ' + id);
    let name = fileContent.match(/(?<=^.{30})(.{24})/)[0];
    name = name.replace(/\s*$/, '');
    console.log('nom : ' + name);
  
  
    // Date
    let collectionDate = new Date();
    let finalDate = collectionDate.toISOString().replace('Z', '');
    let withoutTime = collectionDate.toISOString().replace(/T.*$/, '');
  
    // RIB key calculation
    function getKey(banque, guichet, compte) {
      if (5 != banque.length || 5 != guichet.length || 11 != compte.length)
        return;
      function replaceAlpha(alpha) { return '12345678912345678923456789'.charAt(alpha.charCodeAt(0) - 65); }
      compte = parseInt(compte.toUpperCase().replace(/[A-Z]/g, replaceAlpha), 10);
      return 97 - (((parseInt(banque, 10) % 97 * 100000 + parseFloat(guichet)) % 97 * 100000000000 + compte) % 97) * 100 % 97;
    }
    
    // BIC find
    // function findBic(code_banque) {
    //   index = codes.indexOf(code_banque);
    //   if (index != -1) {
    //     bic = bics[index];
    //     return bic;
    //   }
    //   else {alert("Le BIC n'a pas été trouvé !");}
    // }
    
    // Debug
    let cle = getKey(code_banque, code_guichet, numero_compte);
    var cleformat = ("0" + cle).slice(-2);
    rib = code_banque;
    rib += code_guichet;
    rib += numero_compte;
    rib += cleformat;
    console.log(rib);
  
    iban = g(rib, 'FR');
    console.log(iban);
    //bic = findBic(code_banque);
    //console.log('BIC : ' + bic);
  
  
    // final = finalXML();
    // document.getElementById("output").innerHTML = final;
    // document.getElementById("downloadlink").href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(final);
    // document.getElementById("downloadlink").download = `SEPA-${name.toLowerCase()}.xml`;
    return [finalDate, id, amount, bic, name, iban, withoutTime];
  }

  function showAndDl(final,name) {
    document.getElementById("output").innerHTML = final;
    document.getElementById("downloadlink").href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(final);
    document.getElementById("downloadlink").download = `SEPA-${name.toLowerCase()}.xml`;
  }

  function partXML(finalDate, id, amount, bic, name, iban) {
    let part = '\t\t\t<CdtTrfTxInf>';
    part += '\n';
    part += '\t\t\t\t<PmtId>';
    part += '\n';
    part += '\t\t\t\t\t<InstrId>VIR/' + finalDate + '/1/1</InstrId>';
    part += '\n';
    part += '\t\t\t\t\t<EndToEndId>' + id + '</EndToEndId>';
    part += '\n';
    part += '\t\t\t\t</PmtId>';
    part += '\n';
    part += '\t\t\t\t<Amt>';
    part += '\n';
    part += '\t\t\t\t\t<InstdAmt Ccy="EUR">' + amount + '</InstdAmt>';
    part += '\n';
    part += '\t\t\t\t</Amt>';
    part += '\n';
    part += '\t\t\t\t<CdtrAgt>';
    part += '\n';
    part += '\t\t\t\t\t<FinInstnId>';
    part += '\n';
    part += '\t\t\t\t\t\t<BIC>' + bic + '</BIC>';
    part += '\n';
    part += '\t\t\t\t\t</FinInstnId>';
    part += '\n';
    part += '\t\t\t\t</CdtrAgt>';
    part += '\n';
    part += '\t\t\t\t<Cdtr>';
    part += '\n';
    part += '\t\t\t\t\t<Nm>' + name + '</Nm>';
    part += '\n';
    part += '\t\t\t\t</Cdtr>';
    part += '\n';
    part += '\t\t\t\t<CdtrAcct>';
    part += '\n';
    part += '\t\t\t\t\t<Id>';
    part += '\n';
    part += '\t\t\t\t\t\t<IBAN>' + iban + '</IBAN>';
    part += '\n';
    part += '\t\t\t\t\t</Id>';
    part += '\n';
    part += '\t\t\t\t</CdtrAcct>';
    part += '\n';
    part += '\t\t\t\t<RmtInf>';
    part += '\n';
    part += '\t\t\t\t\t<Ustrd>' + id + '</Ustrd>';
    part += '\n';
    part += '\t\t\t\t</RmtInf>';
    part += '\n';
    part += '\t\t\t</CdtTrfTxInf>';
    return part;
  }

//XML creation
function startXML(finalDate, amount, withoutTime) {
    let final = '<?xml version="1.0" encoding="Utf-8" standalone="no"?>';
    final += '\n';
    final += '<Document xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03 pain.001.001.03.xsd" xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
    final += '\n';
    final +='\t<CstmrCdtTrfInitn>';
    final += '\n';
    final +='\t\t<GrpHdr>';
    final += '\n';
    final += '\t\t\t<MsgId>MESS' + finalDate + '</MsgId>';
    final += '\n';
    final += '\t\t\t<CreDtTm>' + finalDate + '</CreDtTm>';
    final += '\n';
    final += '\t\t\t<NbOfTxs>1</NbOfTxs>';
    final += '\n';
    final += '\t\t\t<CtrlSum>' + amount + '</CtrlSum>';
    final += '\n';
    final += '\t\t\t<InitgPty>';
    final += '\n';
    final += '\t\t\t\t<Nm>PAIE</Nm>';
    final += '\n';
    final += '\t\t\t</InitgPty>';
    final += '\n';
    final += '\t\t</GrpHdr>';
    final += '\n';
    final += '\t\t<PmtInf>';
    final += '\n';
    final += '\t\t\t<PmtInfId>VIR/' + finalDate + '/1</PmtInfId>'
    final += '\n';
    final += '\t\t\t<PmtMtd>TRF</PmtMtd>'
    final += '\n';
    final += '\t\t\t<BtchBookg>true</BtchBookg>'
    final += '\n';
    final += '\t\t\t<NbOfTxs>1</NbOfTxs>'
    final += '\n';
    final += '\t\t\t<CtrlSum>' + amount + '</CtrlSum>';
    final += '\n';
    final += '\t\t\t<PmtTpInf>';
    final += '\n';
    final += '\t\t\t\t<SvcLvl>';
    final += '\n';
    final += '\t\t\t\t\t<Cd>SEPA</Cd>';
    final += '\n';
    final += '\t\t\t\t</SvcLvl>';
    final += '\n';
    final += '\t\t\t</PmtTpInf>';
    final += '\n';
    final += '\t\t\t<ReqdExctnDt>' + withoutTime + '</ReqdExctnDt>';
    final += '\n';
    final += '\t\t\t<Dbtr>';
    final += '\n';
    final += '\t\t\t\t<Nm>PAIE</Nm>';
    final += '\n';
    final += '\t\t\t</Dbtr>';
    final += '\n';
    final += '\t\t\t<DbtrAcct>';
    final += '\n';
    final += '\t\t\t\t<Id>';
    final += '\n';
    final += '\t\t\t\t\t<IBAN>' + 'FR7611315000010800119918639' + '</IBAN>';
    final += '\n';
    final += '\t\t\t\t</Id>';
    final += '\n';
    final += '\t\t\t\t<Ccy>EUR</Ccy>';
    final += '\n';
    final += '\t\t\t</DbtrAcct>';
    final += '\n';
    final += '\t\t\t<DbtrAgt>';
    final += '\n';
    final += '\t\t\t\t<FinInstnId>';
    final += '\n';
    final += '\t\t\t\t\t<BIC>' + 'CEPAFRPP131' + '</BIC>';
    final += '\n';
    final += '\t\t\t\t</FinInstnId>';
    final += '\n';
    final += '\t\t\t</DbtrAgt>';
    final += '\n';
    final += '\t\t\t<ChrgBr>SLEV</ChrgBr>';
    final += '\n';
    return final;
  }

function endXML(){
  let final = '\n';
  final += '\t\t</PmtInf>';
  final += '\n';
  final += '\t</CstmrCdtTrfInitn>';
  final += '\n';
  final += '</Document>';
  return final;
}

// onChange (file input)
const contentInit = function(){
    function readFile(entireFile){
        return new Promise((resolve, reject) => {
          var entireFile = document.getElementById("input").files[0];
          var fr = new FileReader();  
          fr.onload = () => {
            resolve(fr.result)
          };
          fr.onerror = reject;
          fr.readAsText(entireFile);
        });
      }
      // after file input
    (async() => {
        const contents = await readFile();
        let content = contents.toString();
        console.log(typeof content);
        numberOfLines = (content.split("\n")).length;
        console.log('lignes : ' + numberOfLines);
        let final,name;

        //simple file
        if (numberOfLines == 4) {
          let secondLine = content.match(/(?<=\r\n?|\n)(.{160})/)[0];
          console.log('ligne : ' + secondLine);
          let returnData = finalToShow(secondLine);
          console.log(returnData);
          let finalDate = returnData[0];
          let id = returnData[1];
          let amount = returnData[2];
          let bic = returnData[3];
          let name = returnData[4];
          let iban = returnData[5];
          console.log('partiban ' + iban);
          let withoutTime = returnData[6];
          final = startXML(finalDate,amount,withoutTime);
          final += partXML(finalDate, id, amount, bic, name, iban);
          final += endXML();
        }

        //multiple
        else {
          let partfinal = '';
          var sum = 0;
          let lines = content.split('\n');
          for (var i=1; i < (numberOfLines - 2); i++) {
            let line = lines[i];
            console.log(i + ' ' + line);
            let returnData = finalToShow(line);
            let finalDate = returnData[0];
            let id = returnData[1];
            let amount = returnData[2];
            let bic = returnData[3];
            let name = returnData[4];
            let iban = returnData[5];
            let withoutTime = returnData[6];
            partfinal += partXML(finalDate, id, amount, bic, name, iban);
            sum += amount;
          }
          final = startXML(gfinalDate,sum,gwithoutTime);
          final += partfinal;
          final += endXML();
        }

        document.getElementById("output").innerHTML = final;
        document.getElementById("downloadlink").href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(final);
        document.getElementById("downloadlink").download = 'VIR_' + gfinalDate + '.xml';
    })();

}

