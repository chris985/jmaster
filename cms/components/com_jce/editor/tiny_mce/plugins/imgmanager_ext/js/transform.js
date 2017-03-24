/* imgmanager_ext - 2.1.0 | 21 June 2016 | http://www.joomlacontenteditor.net | Copyright (C) 2006 - 2016 Ryan Demmer. All rights reserved | GNU/GPL Version 2 - http://www.gnu.org/licenses/gpl-2.0.html */
(function($){var oldSetOption=$.ui.resizable.prototype._setOption;$.ui.resizable.prototype._setOption=function(key,value){oldSetOption.apply(this,arguments);if(key==="aspectRatio"){this._aspectRatio=!!value;}};function getRatio(o){return o.width/o.height;}
$.widget("ui.resize",{options:{ratio:4/3,width:800,height:600},_init:function(){var self=this;this.width=$(this.element).width()||$(this.element).attr('width');this.height=$(this.element).height()||$(this.element).attr('height');var pos={'left':$(this.element).parent().innerWidth()/2-this.width/2,'top':$(this.element).parent().innerHeight()/2-this.height/2};var ratio=this.getRatio();var el=this.element;$('<div id="resize-container" class="transform-widget"/>').appendTo($(this.element).parent()).append(this.element).css(pos).resizable({'handles':'all','aspectRatio':this.options.ratio,containment:'parent','start':function(){self._trigger('start',null);},'resize':function(event,ui){var n=ui.element[0],w=Math.round(n.clientWidth),h=Math.round(n.clientHeight);$(self.element).css({width:w,height:h});self._trigger('resize',null,{width:Math.round(ratio.x*w,1),height:Math.round(ratio.x*h,1)});},stop:function(event,ui){self._trigger('stop',null,ui.size);}}).draggable({containment:'parent'});$(this.element).css({top:'',left:''});if(!$.support.cssFloat){$('#resize-container').attr('unselectable','on');}
$('div.ui-resizable-handle.ui-resizable-se','#resize-container').removeClass('ui-icon ui-icon-gripsmall-diagonal-se');},_getPosition:function(width,height){var $parent=$('#resize-container').parent();var width=width||this.width;var height=height||this.height;return{left:($parent.outerWidth()-width)/2,top:($parent.outerHeight()-height)/2};},setSize:function(w,h){var self=this,$parent=$('#resize-container').parent(),pos=this._getPosition(w,h);var pw=$parent.outerWidth(),ph=$parent.outerHeight();var ratio=this.getRatio();w=Math.round(w/ratio.x,1);h=Math.round(h/ratio.y,1);$(this.element).animate({width:w,height:h},{step:function(now,fx){if(fx.prop=='width'){$('#resize-container').css('left',(pw-now)/2);}
if(fx.prop=='height'){$('#resize-container').css('top',(ph-now)/2);}},complete:function(){self._trigger('stop',null);}});},setConstrain:function(s){var ratio=s;if(s){ratio=getRatio(s);}
this.setRatio(ratio);},getRatio:function(){return{x:this.options.width/$(this.element).width(),y:this.options.height/$(this.element).height()};},setRatio:function(ratio){if($.type(ratio)=='undefined'){var r=this.getRatio();ratio=r.x/r.y;}
if($('#resize-container').data('uiResizable')){$('#resize-container').resizable("option","aspectRatio",ratio);}else{this.options.ratio=ratio;}},reset:function(){var pos=this._getPosition();$('#resize-container').css({top:pos.top,left:pos.left,width:'',height:''});$(this.element).css({top:''});this.setRatio(getRatio(this.options));},remove:function(){$('#resize-container').parent().append(this.element);$('#resize-container').remove();this.destroy();},destroy:function(){$.Widget.prototype.destroy.apply(this,arguments);}});$.widget("ui.rotate",{options:{},_init:function(){var self=this;var $parent=$(this.element).parent();$(this.element).wrap('<div id="rotate-container"/>');$('#rotate-container').css({'top':($parent.height()-$(this.element).height())/2,'left':($parent.width()-$(this.element).width())/2});if(!$.support.cssFloat){$('#rotate-container').attr('unselectable','on');}},rotate:function(angle){var s;switch(angle){default:s='scaleY(1) scaleX(1)';break;case'0':case'90':case'-90':case'180':s='rotate('+angle+'deg)';break;case'vertical':s='scaleY(-1)';break;case'horizontal':s='scaleX(-1)';break;case'vertical|horizontal':s='scaleX(-1) scaleY(-1)';break;}
$(this.element).animate({'transform':s});},remove:function(){$(this.element).unwrap();this.destroy();},destroy:function(){$.Widget.prototype.destroy.apply(this,arguments);}});$.widget("ui.crop",{options:{ratio:4/3,width:800,height:600,selection:'',clone:null,handles:'all'},_init:function(){var self=this;this.width=$(this.element).width()||$(this.element).attr('width');this.height=$(this.element).height()||$(this.element).attr('height');var $parent=$(this.element).parent();var top=$(this.element).css('top')||($parent.outerHeight()-this.height)/2;$(this.element).css({top:'',left:''});var $clone=this.options.clone?$(this.options.clone):$(this.element).clone();$clone.css('top','');$('<div id="crop-container"></div>').appendTo($parent).append(this.element).append('<div id="crop-mask"/>').append('<div id="crop-window"/><div id="crop-widget" class="transform-widget"/>');var $crop=$('#crop-window');var $widget=$('#crop-widget');$crop.append($clone).css({'width':this.width,'height':this.height});var grid;if($.support.canvas){grid=document.createElement('canvas');$(grid).attr({width:$crop.width(),height:$crop.height()});var ctx=grid.getContext('2d');for(var x=0;x<grid.width;x+=grid.width/3){ctx.moveTo(x,0);ctx.lineTo(x,grid.height);}
for(var y=0;y<grid.height;y+=grid.height/3){ctx.moveTo(0,y);ctx.lineTo(grid.width,y);}
ctx.strokeStyle="#ffffff";ctx.stroke();}
$widget.css({'width':this.width,'height':this.height}).resizable({'handles':this.options.handles,'aspectRatio':this.options.ratio,'containment':'#crop-container','start':function(event,ui){$(grid).css({width:$crop.width(),height:$crop.height()}).show().appendTo($crop);self._trigger('start',null);},'resize':function(event,ui){var n=ui.element[0],w=Math.round(n.clientWidth),h=Math.round(n.clientHeight);$clone.css({top:-n.offsetTop,left:-n.offsetLeft});$crop.css({width:w,height:h,top:n.offsetTop,left:n.offsetLeft});$(grid).css({width:w,height:h});self._trigger('change',null,self.getArea());},stop:function(){self._trigger('stop',null,self.getArea());$(grid).hide('slow').remove();}}).append('<div class="ui-resizable-handle ui-border-top"></div>'+'<div class="ui-resizable-handle ui-border-right"></div>'+'<div class="ui-resizable-handle ui-border-bottom"></div>'+'<div class="ui-resizable-handle ui-border-left"></div>');$('#crop-window, #crop-widget').draggable({'containment':'#crop-container','start':function(event,ui){$(grid).css({width:$crop.width(),height:$crop.height()}).show().appendTo($crop);},'drag':function(event,ui){var top=ui.position.top,left=ui.position.left;$widget.css({top:top,left:left});$crop.css({top:top,left:left});$clone.css({top:-top,left:-left});self._trigger('change',null,self.getArea());},stop:function(){self._trigger('stop',null,self.getArea());$(grid).hide('slow').remove();}});if(!$.support.cssFloat){$widget.attr('unselectable','on');}
$('div.ui-resizable-handle.ui-resizable-se',$widget).removeClass('ui-icon ui-icon-gripsmall-diagonal-se');$('<div id="crop-box"/>').css({width:this.width,height:this.height,top:top}).appendTo($parent).append($('#crop-container'));if(this.options.selection){this.setArea(this.options.selection);}},setConstrain:function(s){var ratio=s;if(s){ratio=getRatio(s);this.setArea(s);}
this.setRatio(ratio);},getRatio:function(){return{x:this.width/this.options.width,y:this.height/this.options.height};},setRatio:function(ratio){$('#crop-widget').resizable("option","aspectRatio",ratio);},setArea:function(o){var self=this;var r=this.getRatio();var v={left:Math.round(o.x*r.x,1),top:Math.round(o.y*r.y,1),width:Math.round(o.width*r.x,1),height:Math.round(o.height*r.y,1)};var s=this._calculateSelection(v,{width:this.width,height:this.height});$('#crop-widget, #crop-window').animate(s,{step:function(now,fx){if(fx.elem.id=='crop-window'){if(fx.prop=='left'||fx.prop=='top'){$(fx.elem).children('img, canvas').css(fx.prop,0-now);}}
self._trigger('change',null,{x:Math.round(s.left/r.x,1),y:Math.round(s.top/r.y,1),width:Math.round(s.width/r.x,1),height:Math.round(s.height/r.y,1)});},complete:function(){self._trigger('stop',null,o);}});},getDimensions:function(){return{width:$('#crop-container').width(),height:$('#crop-container').height()};},_calculateSelection:function(dim,img){var x=parseInt(dim.x)||0,y=parseInt(dim.y)||0,w=parseInt(dim.width),h=parseInt(dim.height);w=Math.min(w,this.options.width);h=Math.min(h,this.options.height);if(x==0){if(w<img.width){x=Math.floor((img.width-w)/2);}}else if(x+w>img.width){w=img.width-x;}
if(y==0){if(h<img.height){y=Math.floor((img.height-h)/2);}}else if(y+h>img.height){h=img.height-y;}
return{left:x,top:y,width:w,height:h};},getArea:function(){var n=$('#crop-window').get(0),c=$('#crop-container').get(0),r=this.getRatio();return{x:Math.round(n.offsetLeft/r.x,1),y:Math.round(n.offsetTop/r.y,1),width:Math.round(n.clientWidth/r.x,1),height:Math.round(n.clientHeight/r.y,1)};},reset:function(){$('#crop-widget, #crop-window').css({width:this.width,height:this.height,left:0,top:0});$('#crop-window').children().css({left:0,top:0});},remove:function(){var $parent=$('#crop-container').parent();$(this.element).css('top',$parent.css('top')).appendTo($parent.parent());$parent.remove();this.destroy();},destroy:function(){$.Widget.prototype.destroy.apply(this,arguments);}});$.widget("ui.thumbnail",{options:{src:'',values:{},width:400,height:300,toDataURL:true},_init:function(){var self=this,values=this.options.values;$(this.element).append('<div id="transform">'+'<div class="form-left">'+' <div id="thumbnail-create-crop"></div>'+'</div>'+'<div class="form-right">'+' <fieldset>'+' <legend>'+tinyMCEPopup.getLang('imgmanager_ext_dlg.properties','Properties')+'</legend>'+' <div class="row">'+'  <label for="thumbnail_width">'+tinyMCEPopup.getLang('imgmanager_ext_dlg.width','Width')+'</label>'+'  <input type="text" id="thumbnail_width" value="" class="width"  /> px'+'  <div id="thumbnail_constrain" class="constrain"><span class="checkbox checked" aria-checked="true" role="checkbox"></span></div>'+' </div>'+' <div class="row">'+'  <label for="thumbnail_height">'+tinyMCEPopup.getLang('imgmanager_ext_dlg.height','Height')+'</label>'+'  <input type="text" id="thumbnail_height" value="" class="height" /> px'+' </div>'+' <div class="row">'+'  <label for="thumbnail_quality">'+tinyMCEPopup.getLang('imgmanager_ext_dlg.quality','Quality')+'</label>'+'  <div id="thumbnail_quality_slider" class="slider"></div>'+'  <input type="text" id="thumbnail_quality" value="" class="quality" /> %'+' </div>'+' </fieldset>'+' <fieldset>'+' <legend>'+tinyMCEPopup.getLang('dlg.preview','Preview')+'</legend>'+' <div id="thumbnail-create-preview"></div>'+' </fieldset>'+'</div>'+'</div>');self._createSlider();$.each(['width','height','width_type','height_type','quality','mode'],function(i,v){v='thumbnail_'+v;$('#'+v).val(values[v]);});if($('#thumbnail_width').val()===''&&$('#thumbnail_height').val()===''){$('#thumbnail_width').val(120);$('#thumbnail_height').val(90);}
var $preview=$('#thumbnail-create-preview');var img=new Image();var thumb={width:parseFloat($('#thumbnail_width').val()),height:parseFloat($('#thumbnail_height').val())};this.image=img;img.onload=function(){var $crop=$('#thumbnail-create-crop');if(img.width>400||img.height>300){$('legend',$crop.parents('fieldset')).html(function(i,html){return html+' ('+tinyMCEPopup.getLang('imgmanager_ext_dlg.resized','Resized to fit window')+')';});}
var size={width:img.width,height:img.height};if(img.width>self.options.width||img.height>self.options.height){size=$.Plugin.sizeToFit(img,{width:self.options.width,height:self.options.height});}
var s={x:0,y:0,width:size.width,height:size.height};$.extend(s,$.Plugin.sizeToFit(thumb,size));self.cropImage=$(img).clone().attr(size).appendTo('#thumbnail-create-crop').crop({ratio:getRatio(thumb),width:size.width,height:size.height,selection:s,change:function(e,s){self._updatePreview(s);},handles:'nw,ne,sw,se'});$('#thumbnail-create-crop').children().css('top',((self.options.height-size.height))/2);self._createPreview(s);self._setConstrain();$preview.removeClass('loading');};$preview.addClass('loading');img.onerror=function(){$preview.removeClass('loading').addClass('error');};img.src=this.options.src;},_createSlider:function(){var values=this.options.values;$('#thumbnail_quality_slider').slider({min:10,step:10,slide:function(event,ui){$('#thumbnail_quality').val(ui.value);},value:values.thumbnail_quality||80});},_setConstrain:function(){var self=this;var img=this.image;$('#thumbnail_constrain span.checkbox').click(function(){$(this).toggleClass('checked');});$('#thumbnail_width, #thumbnail_height').each(function(){$(this).data('tmp',$(this).val());});$('#thumbnail_width').change(function(){var w=$(this).val(),$height=$('#thumbnail_height');if(w>img.width){w=img.width;$(this).val(w);}
if(w&&$('span.checkbox','#thumbnail_constrain').hasClass('checked')){var tw=$(this).data('tmp'),h=$height.val();if(tw&&h!==''){var temp=((h/tw)*w).toFixed(0);$height.val(temp).data('tmp',temp);}}
$(this).data('tmp',w);self._resizeMarquee(w,$height.val());});$('#thumbnail_height').change(function(){var h=$(this).val(),$width=$('#thumbnail_width');if(h>img.height){h=img.height;$(this).val(h);}
if(h&&$('#thumbnail_constrain span.checkbox').hasClass('checked')){var th=$(this).data('tmp'),w=$width.val();if(th&&w!==''){var temp=((w/th)*h).toFixed(0);$width.val(temp).data('tmp',temp);}}
$(this).data('tmp',h);self._resizeMarquee($width.val(),h);});},_createPreview:function(s){var img=this.image;var thumb={width:parseFloat($('#thumbnail_width').val()),height:parseFloat($('#thumbnail_height').val())};var $parent=$('#thumbnail-create-preview').parent();var ph=$parent.height()-($parent.outerHeight()-$parent.height());$('#thumbnail-create-preview').css({width:thumb.width,height:thumb.height}).append($(img).clone()).css({top:(ph-thumb.height)/2});this._updatePreview(s);},_resizeMarquee:function(width,height){var ow=this.width;var oh=this.height;if(!width&&!height){return;}
width=parseInt(width);height=parseInt(height);var r=ow>oh?ow/oh:oh/ow;if(!width){width=Math.round(height*r);}
if(!height){height=Math.round(width*r);}
var s={x:0,y:0,width:this.options.width,height:this.options.height};$.extend(s,$.Plugin.sizeToFit({width:width,height:height},{width:this.options.width,height:this.options.height}));var ratio=getRatio({width:width,height:height});$(this.cropImage).crop('setRatio',ratio);$(this.cropImage).crop('setArea',s);},_updatePreview:function(s){var w,h,$preview=$('#thumbnail-create-preview'),tw=$('#thumbnail_width').val(),th=$('#thumbnail_height').val();var $parent=$preview.parent();var ph=$parent.height()-($parent.outerHeight()-$parent.height());var img=this.image;var iw=img.width;var ih=img.height;if(!tw&&!th){return;}
if(!tw){tw=Math.round(th/ih*iw);}
if(!th){th=Math.round(tw/iw*ih);}
var r=Math.min(s.width/this.options.width,s.height/this.options.height);if(iw>ih){w=Math.round(tw/r);h='auto';}else{w='auto';h=Math.round(th/r);}
if(tw>200||th>150){$preview.css($.Plugin.sizeToFit({width:tw,height:th},{width:200,height:150}));}else{$preview.css({width:tw,height:th});}
$('img','#thumbnail-create-preview').css({width:w,height:h,marginLeft:0-Math.round(s.x*tw/s.width),marginTop:0-Math.round(s.y*th/s.height)});$preview.css({top:(ph-$preview.height())/2});},getMime:function(s){var mime='image/jpeg';var ext=$.String.getExt(s);switch(ext){case'jpg':case'jpeg':mime='image/jpeg';break;case'png':mime='image/png';break;case'bmp':mime='image/bmp';break;}
return mime;},save:function(){var area=$(this.cropImage).crop('getArea',true);var ow=$('#crop-container').width();var oh=$('#crop-container').height();var iw=this.image.width;var ih=this.image.height;var w=$('#thumbnail_width').val(),h=$('#thumbnail_height').val();w=parseFloat(w);h=parseFloat(h);if(!w&&!h){return;}
var ar=ow>oh?ow/oh:oh/ow;if(!w){w=Math.round(h*ar,1);}
if(!h){h=Math.round(w*ar,1);}
var r={x:iw/ow,y:ih/oh};var s={width:iw,height:ih,x:0,y:0};if(iw>ih){s.width=Math.round(area.width*r.x,1);if(area.height!==oh){s.height=Math.round(area.height*r.y,1);}}else{s.height=Math.round(area.height*r.y,1);if(area.width!==ow){s.width=Math.round(area.width*r.x,1);}}
s.x=Math.round(area.x*r.x,1);s.y=Math.round(area.y*r.y,1);var quality=parseFloat($('#thumbnail_quality').val());quality=Math.max(Math.min(quality,100),10);if($.support.canvas&&this.options.toDataURL){var canvas=document.createElement('canvas'),data;$(canvas).attr({width:w,height:h}).appendTo('body').hide();canvas.getContext('2d').drawImage(this.image,s.x,s.y,s.width,s.height,0,0,w,h);var mime=this.getMime(this.image.src);quality=quality/100;try{data=canvas.toDataURL(mime,quality);}catch(e){data=canvas.toDataURL(mime);}
$(canvas).remove();return data;}else{return{'sx':s.x,'sy':s.y,'sw':s.width,'sh':s.height,'width':w,'height':h,'quality':quality};}},destroy:function(){$.Widget.prototype.destroy.apply(this,arguments);}});$.extend($.ui.thumbnail,{version:"2.1.0"});})(jQuery);