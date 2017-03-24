/* mediamanager - 2.0.16 | 24 March 2016 | http://www.joomlacontenteditor.net | Copyright (C) 2006 - 2016 Ryan Demmer. All rights reserved | GNU/GPL Version 2 - http://www.gnu.org/licenses/gpl-2.0.html */
var MediaManagerDialog={settings:{},mimes:{},mediatypes:null,preInit:function(){tinyMCEPopup.requireLangPack();(function(data){var items=data.split(/,/),i,y,ext;for(i=0;i<items.length;i+=2){ext=items[i+1].split(/ /);for(y=0;y<ext.length;y++){MediaManagerDialog.mimes[ext[y]]=items[i];}}})("application/x-mplayer2,avi wmv wm asf asx wmx wvx,"+"application/x-director,dcr"+"video/divx,divx"+"application/pdf,pdf,"+"application/x-shockwave-flash,swf swfl,"+"audio/mpeg,mpga mpega mp2 mp3,"+"audio/ogg,ogg spx oga,"+"audio/x-wav,wav,"+"video/mpeg,mpeg mpg mpe,"+"video/mp4,mp4 m4v,"+"video/ogg,ogg ogv,"+"video/webm,webm,"+"video/quicktime,qt mov,"+"video/x-flv,flv f4v,"+"video/vnd.rn-realvideo,rv"+"video/3gpp,3gp"+"video/x-matroska,mkv");},ucfirst:function(s){s=s.charAt(0).toUpperCase()+s.substring(1);return s;},convertURL:function(url){var self=this,ed=tinyMCEPopup.editor;if(!url){return url;}
var parts,query='',n=url.indexOf('?');if(n===-1){url=url.replace(/&amp;/g,'&');n=url.indexOf('&');}
if(n>0){query=url.substring(n+1,url.length),url=url.substr(0,n);}
url=ed.convertURL(url);return url+(query?'?'+query:'');},removeQuery:function(s){if(!s){return s;}
if(s.indexOf('?')!==-1){s=s.substr(0,s.indexOf('?'));}else if(s.indexOf('&')!==-1){s=s.replace(/&amp;/g,'&');s=s.substr(0,s.indexOf('&'));}
return s;},getMimeType:function(s){s=this.removeQuery(s);var ext=$.String.getExt(s);return this.mimes[ext]||false;},getCodecs:function(s){var codecs={'video/mp4':['avc1.42E01E, mp4a.40.2','avc1.58A01E, mp4a.40.2','avc1.4D401E, mp4a.40.2','avc1.64001E, mp4a.40.2','mp4v.20.8, mp4a.40.2','mp4v.20.240, mp4a.40.2'],'video/3gpp':['mp4v.20.8, samr'],'video/ogg':['theora, vorbis','theora, speex','dirac, vorbis'],'video/x-matroska':['theora, vorbis'],'audio/ogg':['vorbis','speex','flac']};},getNodeName:function(s){s=/(Audio|Embed|Object|Video|Iframe)/.exec(s);if(s){return s[1].toLowerCase();}
return'object';},setMediaAttributes:function(data,type,prefix){var self=this,ed=tinyMCEPopup.editor;prefix=prefix||'';$.each(data,function(k,v){switch(k){case'flashvars':$('#'+prefix+type+'_'+k).val(decodeURIComponent(v)).change();break;case'param':$.each(v,function(at,val){switch(at){case'movie':case'src':case'url':case'source':if($('#src').val()===''){$('#src').val(self.convertURL(val)).change();}
break;case'flashvars':$('#'+prefix+type+'_flashvars').val(decodeURIComponent(val)).change();break;default:var $na=$('#'+prefix+type+'_'+at);if($na.is(':checkbox')){if(val=='false'||val=='0'){val=false;}
$na.prop('checked',!!val).change();}else{$na.val(val).change();}
break;}});break;case'source':$.each(v,function(i,at){var src=self.convertURL(at.src);var n=$('input[name="'+prefix+type+'_source[]"]','fieldset.media_option').get(i);if(n){$(n).val(src).change();}});break;case'object':if((v.src||v.data)&&v.param){var fv,p=v.param;if(p.flashvars){fv=decodeURIComponent(p.flashvars);if(fv){if(WFMediaPlayer.isSupported({src:(v.src||v.data),flashvars:fv})){var at=WFMediaPlayer.parseValues(fv);$('#'+prefix+type+'_fallback').val(self.convertURL(at.src)).change();}}}}
break;default:var $na=$('#'+prefix+type+'_'+k);if($na.is(':checkbox')){if(v=='false'||v=='0'){v=false;}
$na.prop('checked',!!v).change();}else{$na.val(v).change();}
break;}});},init:function(){tinyMCEPopup.restoreSelection();var self=this,ed=tinyMCEPopup.editor,s=ed.selection,n=s.getNode(),val,args,type='flash',i,mt,data,popup;$('button#insert').click(function(e){self.insert();e.preventDefault();});tinyMCEPopup.resizeToInnerSize();this.mediatypes=this.mapTypes();TinyMCE_Utils.fillClassList('classlist');$.Plugin.init({selectChange:function(){self.updateStyles();}});var node=this.getNodeName(n.className);if(this.isMedia(n)){data=ed.dom.getAttrib(n,'data-mce-json');var cl=/mceItem(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia|DivX|PDF|Silverlight|Audio|Video|Iframe)/.exec(n.className);if(cl){type=cl[1].toLowerCase();}
data=$.parseJSON(data);$('#insert').button('option','label',tinyMCEPopup.getLang('update','Update',true));$('#popup_list').prop('disabled',true);}else{if(popup=WFPopups.getPopup(n)){var data={'width':popup.width||'','height':popup.height||'','popup':{}};delete popup.width;delete popup.height;if(popup.type){type=this.getMediaName(popup.type);}
data.popup=popup;node='popup';}}
if(data){tinymce.each(['width','height'],function(s){var v=data[s]||parseFloat(ed.dom.getAttrib(n,s)||ed.dom.getStyle(n,s))||'';$('#'+s).val(v);$('#tmp_'+s).val(v);});data=data[node];if(WFMediaPlayer.isSupported(data)&&type==WFMediaPlayer.getType()){if(data.video){if(data.video.src){if(!data.video.source){data.video.source=[];}
data.video.source.push({src:data.video.src,type:data.video.type});}
this.setMediaAttributes(data.video,'video','mediaplayer_html5_');delete data.video;}
data=WFMediaPlayer.setValues(data);type='mediaplayer';}
if(mt=WFAggregator.isSupported(data)){data=WFAggregator.setValues(mt,data);type=mt;}
var src=data.src||data.data||data.url;if(data.source&&$.isArray(data.source)){if(!src){src=data.source.shift();}else{$.each(data.source,function(i,v){if(v&&v.src===src){data.source.splice(i,1);}});}}
if(data.html){$('#html').val(data.html);}
$('#src').val(self.convertURL(src));if(type=='audio'||type=='video'){$(':input, select','#'+type+'_options').each(function(){if($(this).is(':checkbox')){$(this).prop('checked',false);}else{$(this).val('');}});}
this.setMediaAttributes(data,type);tinymce.each(['top','right','bottom','left'],function(o){$('#margin_'+o).val(self.getAttrib(n,'margin-'+o));});$('#border_width').val(this.getAttrib(n,'border-width'));$('#border_style').val(this.getAttrib(n,'border-style'));$('#border_color').val(this.getAttrib(n,'border-color'));$('#style').val(ed.dom.getAttrib(n,'style'));var cls=ed.dom.getAttrib(n,'class');cls=cls.replace(/mceItem(\w+)/gi,'').replace(/\s+/g,' ');$('#classes').val($.trim(cls));$('#id').val(ed.dom.getAttrib(n,'id'));$('#align').val(this.getAttrib(n,'align'));$('#title').val(ed.dom.getAttrib(n,'title'));}else{$.Plugin.setDefaults(this.settings.defaults);}
WFPopups.setup();WFMediaPlayer.setup();WFAggregator.setup();$('#media_type').val(type).change();this.setBorder();this.setMargins(true);this.updateStyles();src=this.removeQuery($('#src').val());WFFileBrowser.init($('<input type="text" />').val(src),{onFileClick:function(e,file){self.selectFile(file);},onFileInsert:function(e,file){self.selectFile(file);},onFileDetails:function(e,file){self.getFileDetails(file);}});$('#src').change(function(){if(this.value){self.selectType(this.value);}});$('#width, #height').change(function(){var n=$(this).attr('id'),v=this.value;if($('#media_type').val()==="audio"){self.addStyle(n,v);}});},getSiteRoot:function(){var s=tinyMCEPopup.getParam('document_base_url');return s.match(/.*:\/\/([^\/]+)(.*)/)[2];},setControllerHeight:function(t){var v=0;switch(t){case'quicktime':v=16;break;case'windowsmedia':v=16;break;case'divx':switch($('#divx_mode').val()){default:v=0;break;case'mini':v=20;break;case'large':v=65;break;case'full':v=90;break;}
break;}
$('#controller_height').val(v);},isMedia:function(n){if(n.nodeName=='IMG'){return/mceItem(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia|DivX|Video|Audio|Iframe)/.test(tinyMCEPopup.editor.dom.getAttrib(n,'class'));}
return false;},getMediaType:function(type){var mt={'flash':'application/x-shockwave-flash','director':'application/x-director','shockwave':'application/x-director','quicktime':'video/quicktime','mplayer':'application/x-mplayer2','windowsmedia':'application/x-mplayer2','realaudio':'audio/x-pn-realaudio-plugin','real':'audio/x-pn-realaudio-plugin','divx':'video/divx','silverlight':'application/x-silverlight-2'};return mt[type]||null;},getMediaName:function(type){var mt={'application/x-shockwave-flash':'flash','application/x-director':'shockwave','video/quicktime':'quicktime','application/x-mplayer2':'windowsmedia','audio/x-pn-realaudio-plugin':'real','video/divx':'divx','video/mp4':'video','video/ogg':'video','video/webm':'video','audio/mpeg':'audio','audio/mp3':'audio','audio/x-wav':'audio','audio/ogg':'audio','audio/webm':'audio','application/x-silverlight-2':'silverlight','video/x-flv':'mediaplayer'};return mt[type]||null;},addStyle:function(style,value){var styles=$('<div />').attr('style',$('#style').val()).css(style,value).get(0).style.cssText;$('#style').val(styles);},insert:function(){var src=$('#src').val(),type=$('#media_type').val();AutoValidator.validate(document);if(src==''){$.Dialog.alert(tinyMCEPopup.getLang('mediamanager_dlg.no_src','Please select a file or enter in a link to a file'));return false;}
tinymce.each(['width','height'],function(k){if($('#'+k).val()==''){if(type!='audio'||!WFPopups.isEnabled()){$.Dialog.alert(tinyMCEPopup.getLang('mediamanager_dlg.no_'+k,'A '+k+' value is required.'));return false;}}});if(/(windowsmedia|mplayer|quicktime|divx)$/.test(type)||WFMediaPlayer.isSupported(src)){$.Dialog.confirm(tinyMCEPopup.getLang('mediamanager_dlg.add_controls_height','Add additional height for player controls?'),function(state){if(state){var h=$('#height').val();var ch=$('#controller_height').val();if(ch){$('#height').val(parseInt(h)+parseInt(ch));}}
MediaManagerDialog.insertAndClose();});}else{this.insertAndClose();}},insertAndClose:function(){tinyMCEPopup.restoreSelection();var n,s,src,params,cls,ed=tinyMCEPopup.editor;var type=$('#media_type').val();n=ed.selection.getNode();tinyMCEPopup.execCommand("mceBeginUndoLevel");if(type=='mediaplayer'){type=WFMediaPlayer.getType();WFMediaPlayer.onInsert();}
if(type==WFAggregator.isSupported($('#src').val())){WFAggregator.onInsert(type);type=WFAggregator.getType(type);}
var args={width:$('#width').val(),height:$('#height').val(),title:$('#title').val(),style:$('#style').val(),id:$('#id').val()};var node='object';switch(type){case"flash":cls="mceItemObject mceItemFlash";break;case"director":cls="mceItemObject mceItemShockWave";break;case"quicktime":cls="mceItemObject mceItemQuickTime";break;case"mplayer":case"windowsmedia":cls="mceItemObject mceItemWindowsMedia";break;case"realaudio":case"real":cls="mceItemObject mceItemRealMedia";break;case"divx":cls="mceItemObject mceItemDivX";break;case'iframe':cls='mceItemIframe';node='iframe';break;case'video':cls='mceItemVideo';node='video';break;case'audio':delete args.width;delete args.height;cls='mceItemAudio';node='audio';var agent=navigator.userAgent.match(/(Opera|Chrome|Safari|Gecko)/);if(agent){cls='mceItemAudio mceItemAgent'+this.ucfirst(agent[0]);}
break;default:if(type){cls='mceItemObject mceItemGeneric mceItem'+this.ucfirst(type);}
break;}
cls+=' '+$('#classes').val();var data=this.serializeParameters();if(n&&this.isMedia(n)){n.className=$.trim(cls);ed.dom.setAttribs(n,$.extend(args,{'data-mce-json':data}));}else{if(WFPopups.isEnabled()&&($('#popup_text').is(':disabled')||$('#popup_text').val()!='')){data=$.parseJSON(data);data=data[node];src=data.src;delete data.src;$.extend(args,{type:this.getMediaType(type),src:src,data:{}});delete data.type;$.each(data,function(k,v){if($.type(v)==='string'){args.data[k]=v;}else{if(k=='param'){$.each(v,function(at,val){args.data[at]=val;});}
if(k=='source'){$.each(v,function(i,p){$.each(p,function(at,val){args.data[at]=val;});});}}});WFPopups.createPopup(n,args);}else{$.extend(args,{src:tinyMCEPopup.getWindowArg('plugin_url')+'/img/trans.gif','data-mce-json':data});ed.execCommand('mceInsertContent',false,'<img id="__mce_tmp" src="javascript:;" class="'+$.trim(cls)+'" />',{skip_undo:1});var n=ed.dom.get('__mce_tmp');ed.dom.setAttrib(n,'id','');ed.dom.setAttribs(n,args);ed.undoManager.add();}}
tinyMCEPopup.execCommand("mceEndUndoLevel");tinyMCEPopup.close();},mapTypes:function(){var types={},mt=this.settings.media_types;tinymce.each(tinymce.explode(mt,';'),function(v,k){if(v){v=v.replace(/([a-z0-9]+)=([a-z0-9,]+)/,function(a,b,c){types[b]=c.split(',');});}});return types;},checkType:function(s){var mime=this.getMimeType(s);if(mime){return this.getMediaName(mime)||false;}
return false;},getType:function(v){var type,n,data={width:'',height:''};if(!v)
return false;if(!type){if(WFMediaPlayer.isSupported({src:v})){type='mediaplayer';}}
if(/\.([a-z0-9]{3,4}$)/i.test(v)){type=this.checkType(v);}else{var s=/(flash|real|divx|quicktime|director|mplayer|windowsmedia|video|audio)/i.exec(v);if(s){type=s[0].toLowerCase();}}
if(!type){var s;if(s=WFAggregator.isSupported(v)){data=WFAggregator.getAttributes(s,v);type=s;}}
for(n in data){var v=data[n];if(v){if(n==='width'||n==='height'){$('#'+n).add('#tmp_'+n).val(v);}else{var $el=$('#'+n);if($el.is(':checkbox')){$el.attr('checked',!!parseFloat(v)).prop('checked',!!parseFloat(v));}else{$el.val(v);}}}}
return type;},selectType:function(v){var type=this.getType(v);if(type){$('#media_type').val(type).change();}},changeType:function(type){var n,s,type=type||$('#media_type').val();this.setControllerHeight(type);$('fieldset.media_option','#media_tab').hide().filter('.'+type).show();},checkPrefix:function(n){if(/^\s*www./i.test(n.value)&&confirm(tinyMCEPopup.getLang('mediamanager_dlg_is_external',false,'The URL you entered seems to be an external link, do you want to add the required http:// prefix?')))
n.value='http://'+n.value;},getMediaAttributes:function(o,type,prefix){var params,v;prefix=prefix||'';var media={'flash':['play','loop','menu','swliveconnect','quality','scale','salign','wmode','base','flashvars','allowfullscreen'],'quicktime':['loop','autoplay','cache','controller','correction','enablejavascript','kioskmode','autohref','playeveryframe','targetcache','scale','starttime','endtime','target','qtsrcchokespeed','volume','qtsrc'],'director':['sound','progress','autostart','swliveconnect','swvolume','swstretchstyle','swstretchhalign','swstretchvalign'],'windowsmedia':['autostart','enabled','enablecontextmenu','fullscreen','invokeurls','mute','stretchtofit','windowlessvideo','balance','baseurl','captioningid','currentmarker','currentposition','defaultframe','playcount','rate','uimode','volume'],'real':['autostart','loop','autogotourl','center','imagestatus','maintainaspect','nojava','prefetch','shuffle','console','controls','numloop','scriptcallbacks'],'divx':['mode','minversion','bufferingmode','previewimage','previewmessage','previewmessagefontsize','movietitle','allowcontextmenu','autoplay','loop','bannerenabled'],'video':['poster','autoplay','loop','preload','controls'],'audio':['autoplay','loop','preload','controls'],'silverlight':[],'iframe':['frameborder','marginwidth','marginheight','scrolling','longdesc','allowtransparency']};if(typeof media[type]==='undefined'){return o;}
var states={quicktime:{autoplay:true,controller:true},flash:{play:true,loop:true,menu:true},windowsmedia:{autostart:true,enablecontextmenu:true,invokeurls:true},real:{autogotourl:true,imagestatus:true}};function setParam(k,v){if(!params){params={};}
params[k]=v;}
$.each(media[type],function(i,k){var n=$('#'+prefix+type+'_'+k).get(0);if(!n)
return;var v=$(n).val(),state;if(states[type]){state=states[type][k];}
if(n&&n.type=='checkbox'){v=n.checked;if(type=='audio'||type=='video'){if(v){o[k]=(k=='audio')?'muted':k;}}else{if(typeof state=='undefined'){if(v){setParam(k,v);}}else{if(v!=state){setParam(k,!state);}}}}else{if(v!=''){if(type=='audio'||type=='video'||type=='iframe'){o[k]=v;}else{setParam(k,v);}}}});if(params){o.param=params;}
return o;},serializeParameters:function(){var self=this,mp,ag,ed=tinyMCEPopup.editor,type=$('#media_type').val(),node='object',data={},fb;var src=$('#src').val();$.each(['name'],function(i,k){v=$('#'+k).val();if(v){data[k]=v;}});$.extend(data,this.getMediaAttributes(data,type));if(type=='mediaplayer'&&WFMediaPlayer.isSupported({src:src})){mp=true;type=WFMediaPlayer.getType();}
if(type==WFAggregator.isSupported(src)){ag=true;type=WFAggregator.getType(type);}
if(type=='audio'||type=='video'){var sources=[],v,mime;$('input[name="'+type+'_source[]"]','fieldset.media_option.'+type).each(function(){v=$(this).val();if(v){mime=self.getMimeType(v);mime=mime.replace(/(audio|video)/,type);var at={src:v,type:mime};sources.push(at);}});mime=self.getMimeType(src);mime=mime.replace(/(audio|video)/,type);if(sources.length){sources.unshift({src:src,type:mime});}else{sources.push({src:src,type:mime});}
$.extend(data,{src:src,source:sources});if(fb=$('#'+type+'_fallback').val()){if(WFMediaPlayer.isSupported({src:fb})){data.object=WFMediaPlayer.getValues(fb,this.getMediaAttributes({},type));$.extend(true,data.object,{data:data.object.src,param:{movie:data.object.src}});delete data.object.src;if(type=='audio'){var dimensions=WFMediaPlayer.getParam('dimensions');if(dimensions.audio){$.extend(data.object,dimensions.audio);}}}}}else{if(!data.src){data['src']=src;}
if(mp){$.extend(true,data,WFMediaPlayer.getValues(src));var sources=[],v,mime;$('input[name="mediaplayer_html5_video_source[]"]','fieldset.media_option.mediaplayer').each(function(){v=$(this).val();if(v){mime=self.getMimeType(v);mime=mime.replace('audio','video');var at={src:v,type:mime};sources.push(at);}});if(sources.length){var source=sources.shift();data.video={src:source.src,type:source.type};if(sources.length){data.video.source=sources;}
$.extend(true,data.video,this.getMediaAttributes(data.video,'video','mediaplayer_html5_'));}}
if(ag){$.extend(true,data,WFAggregator.getValues($('#media_type').val(),src));}}
if($('#html').val()){data.html=$('#html').val();}
if(type=='audio'||type=='video'||type=='iframe'){node=type;}
var o={};o[node]=data;return $.JSON.serialize(o);},getAttrib:function(e,at){var ed=tinyMCEPopup.editor,v,v2;switch(at){case'width':case'height':return ed.dom.getAttrib(e,at)||ed.dom.getStyle(n,at)||'';break;case'align':if(v=ed.dom.getAttrib(e,'align')){return v;}
if(v=ed.dom.getStyle(e,'float')){return v;}
if(e.style.display==="block"&&ed.dom.getStyle(e,'margin-left')==="auto"&&ed.dom.getStyle(e,'margin-right')==="auto"){return'center';}
break;case'margin-top':case'margin-bottom':if(v=ed.dom.getStyle(e,at)){if(v=='auto'){return v;}
return parseInt(v.replace(/[^0-9-]/g,''));}
if(v=ed.dom.getAttrib(e,'vspace')){return parseInt(v.replace(/[^0-9]/g,''));}
break;case'margin-left':case'margin-right':if(v=ed.dom.getStyle(e,at)){if(v=='auto'){return v;}
return parseInt(v.replace(/[^0-9-]/g,''));}
if(v=ed.dom.getAttrib(e,'hspace')){return parseInt(v.replace(/[^0-9]/g,''));}
break;case'border-width':case'border-style':case'border-color':v='';tinymce.each(['top','right','bottom','left'],function(n){s=at.replace(/-/,'-'+n+'-');sv=ed.dom.getStyle(e,s);if(sv!==''||(sv!=v&&v!=='')){v='';}
if(sv){v=sv;}});if(at=='border-color'){v=$.String.toHex(v);}
if(at=='border-width'&&v!==''){$('#border').attr('checked',true);return parseInt(v.replace(/[^0-9]/g,''));}
return v;break;}},setBorder:function(){var s=$('#border').is(':checked');$('#border~:input, #border~span').attr('disabled',!s).toggleClass('disabled',!s);this.updateStyles();},setClasses:function(v){$.Plugin.setClasses(v);},setDimensions:function(a,b){$.Plugin.setDimensions(a,b);},setMargins:function(e){var x=0,s=false;var v=$('#margin_top').val();var $elms=$('#margin_right, #margin_bottom, #margin_left');if(e){$elms.each(function(){if($(this).val()===v){x++;}});s=(x==$elms.length);$elms.prop('disabled',s).prev('label').toggleClass('disabled',s);$('#margin_check').prop('checked',s).prop('disabled',false).prev('label').removeClass('disabled');}else{s=$('#margin_check').is(':checked');$elms.each(function(){if(s){$(this).val(v);}
$(this).prop('disabled',s).prev('label').toggleClass('disabled',s);});$('#margin_top').val(v);this.updateStyles();}},setStyles:function(){var self=this,ed=tinyMCEPopup,$img=$('#sample');$img.attr('style',$('#style').val());$.each(['top','right','bottom','left'],function(i,k){var v=ed.dom.getStyle($img.get(0),'margin-'+k);if(v.indexOf('px')!=-1){v=parseInt(v);}
$('#margin_'+k).val(v);});this.setMargins(true);var border=false;$.each(['width','color','style'],function(i,k){var v=ed.dom.getStyle($img.get(0),'border-'+k);if(v==''){$.each(['top','right','bottom','left'],function(i,n){var sv=ed.dom.getStyle($img.get(0),'border-'+n+'-'+k);if(sv!==''||(sv!=v&&v!=='')){v='';}
if(sv){v=sv;}});}
if(v!==''){border=true;}
if(k=='width'){v=/[0-9][a-z]/.test(v)?parseInt(v):v;}
if(k=='color'){v=$.String.toHex(v);}
if(border){$('#border').attr('checked','checked');$('#border_'+k).val(v);$('#border~:input, #border~span, #border~label').attr('disabled',false).toggleClass('disabled',false);if(k=='color'){$('#border_'+k).trigger('pick');}}});$('#align').val(function(){var v=$img.css("float");if(v){return v;}
if($img.css('margin-left')==="auto"&&$img.css('margin-right')==="auto"&&$img.css('display')==="block"){return"center";}
return"";});},updateStyles:function(){var ed=tinyMCEPopup,st,v,br,img=$('#sample'),k;$(img).attr('style',$('#style').val());$(img).attr('dir',$('#dir').val());$(img).css('float','');v=$('#align').val();if(v=='center'){$(img).css({'display':'block','margin-left':'auto','margin-right':'auto'});$('#clear').attr('disabled',true);$('#margin_left, #margin_right').val('auto');}else{$(img).css('float',v).css('display',function(){if(this.style.display==="block"&&this.style.marginLeft==="auto"&&this.style.marginRight==="auto"){return"";}
return this.style.display;});$('#margin_left, #margin_right').val(function(){if(this.value==="auto"){return"";}
return this.value;});if($('#margin_check').is(':checked')){$('#margin_top').siblings('input[type="text"]').val($('#margin_top').val());}
$('#clear').attr('disabled',!v);}
v=$('#clear:enabled').val();if(v){if(!$('#sample-br').get(0)){$(img).after('<br id="sample-br" />');}
$('#sample-br').css('clear',v);}else{$('#sample-br').remove();}
$.each(['width','color','style'],function(i,k){if($('#border').is(':checked')){v=$('#border_'+k).val();}else{v='';}
if(v=='inherit'){v='';}
if(k=='width'&&/[^a-z]/i.test(v)){v+='px';}
$(img).css('border-'+k,v);});$.each(['top','right','bottom','left'],function(i,k){v=$('#margin_'+k).val();$(img).css('margin-'+k,/[^a-z]/i.test(v)?v+'px':v);});var styles=ed.dom.parseStyle($(img).attr('style'));function compressBorder(n){var s=[];$.each(n,function(i,k){k='border-'+k,v=styles[k];if(v=='none'){delete styles[k];return;}
if(v){s.push(styles[k]);delete styles[k];}});if(s.length){styles.border=s.join(' ');}}
compressBorder(['width','style','color','image']);for(k in styles){if(k.indexOf('-moz-')>=0||k.indexOf('-webkit-')>=0){delete styles[k];}}
$('#style').val(ed.dom.serializeStyle(styles));},setSourceFocus:function(n){$('input.active').removeClass('active');$(n).addClass('active');},selectFile:function(file){var self=this;var name=$(file).attr('title');var src=$(file).data('url');src=src.charAt(0)=='/'?src.substring(1):src;if(!$('#media_tab').hasClass('ui-tabs-hide')){$('input.active','#media_tab').val(src);}else{$('#src').val(src);MediaManagerDialog.selectType(name);$('#width, #tmp_width').val($(file).data('width'));$('#height, #tmp_height').val($(file).data('height'));var w=$(file).data('width'),h=$(file).data('height');if(w&&h){$('#width, #tmp_width').val(w);$('#height, #tmp_height').val(h);}else{$('#width~span.loader').remove();$('#width').parent().append('<span class="loader"/>');$.JSON.request('getDimensions',$(file).attr('id'),function(o){if(o&&!o.error){$('#width, #tmp_width').val(o.width);$('#height, #tmp_height').val(o.height);}
$('#width~span.loader').remove();});}
if(WFMediaPlayer.isSupported({src:name})){WFMediaPlayer.onSelectFile(name);}
if(WFAggregator.isSupported(src)){WFAggregator.onSelectFile(name);}}},getFileDetails:function(file){var w=$(file).data('width'),h=$(file).data('height'),time=$(file).data('duration');if(!w&&!h&&!time){$('dd.loader').remove();$('#info-properties dl').append('<dd class="loader"/>');$.JSON.request('getFileDetails',$(file).attr('id'),function(o){if(o&&!o.error){$('#info-dimensions, #info-duration').remove();if(o.width&&o.height){$(file).data('width',o.width).data('height',o.height);$('#info-properties dl').append('<dd id="info-dimensions">'+tinyMCEPopup.getLang('dlg.dimensions','Dimensions')+': '+o.width+' x '+o.height+'</dd>');}
if(o.duration){$(file).data('duration',o.duration);$('#info-properties dl').append('<dd id="info-duration">'+tinyMCEPopup.getLang('dlg.duration','Duration')+': '+o.duration+'</dd>');}}
$('dd.loader').remove();});}}};MediaManagerDialog.preInit();tinyMCEPopup.onInit.add(MediaManagerDialog.init,MediaManagerDialog);