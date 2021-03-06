<?php
/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2015 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
defined('_WF_EXT') or die('RESTRICTED');
?>
<table border="0" cellpadding="3" cellspacing="0">
    <tr>
        <td><label for="widgetkit_lightbox_title" class="hastip" title="<?php echo WFText::_('WF_POPUPS_WIDGETKIT_BOXTITLE_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_BOXTITLE'); ?></label></td>
        <td colspan="3"><input id="widgetkit_lightbox_title" type="text" class="text" value="" /></td>
    </tr>
    <tr>
        <td><label for="widgetkit_lightbox_group" class="hastip" title="<?php echo WFText::_('WF_POPUPS_WIDGETKIT_GROUP_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_GROUP'); ?></label></td>
        <td colspan="3"><input id="widgetkit_lightbox_group" type="text" class="text" value="" /></td>
    </tr>
    <tr>
        <td>
            <label for="widgetkit_lightbox_titlePosition" class="hastip" title="<?php echo WFText::_('WF_POPUPS_WIDGETKIT_TITLEPOSITION_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_TITLEPOSITION'); ?></label>
        </td>
        <td colspan="3">	
            <select id="widgetkit_lightbox_titlePosition">
                <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                <option value="float"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_FLOAT'); ?></option>
                <option value="outside"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_OUTSIDE'); ?></option>
                <option value="inside"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_INSIDE'); ?></option>
                <option value="over"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_OVER'); ?></option>                                        
            </select>
        </td>
    </tr>
    <tr>
        <td>
            <label for="widgetkit_lightbox_overlayShow" class="hastip" title="<?php echo WFText::_('WF_POPUPS_WIDGETKIT_OVERLAYSHOW_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_OVERLAYSHOW'); ?></label>
        </td>
        <td colspan="3">
            <select id="widgetkit_lightbox_overlayShow">
                <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                <option value="true"><?php echo WFText::_('WF_OPTION_YES'); ?></option>
                <option value="false"><?php echo WFText::_('WF_OPTION_NO'); ?></option>                                      
            </select>
        </td>
    </tr>
    <tr>
        <td><label for="width" class="hastip" title="<?php echo WFText::_('WF_LABEL_DIMENSIONS_DESC'); ?>"><?php echo WFText::_('WF_LABEL_DIMENSIONS'); ?></label></td>
        <td colspan="3">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td>
                        <input type="text" id="widgetkit_lightbox_width" value="" /> x <input type="text" id="widgetkit_lightbox_height" value="" />
                    </td>
                    <td><input id="widgetkit_lightbox_constrain" type="checkbox" class="checkbox" checked="checked" /><label for="widgetkit_lightbox_constrain"><?php echo WFText::_('WF_LABEL_PROPORTIONAL'); ?></label></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td><label for="widgetkit_lightbox_padding" class="hastip" title="<?php echo WFText::_('WF_POPUPS_WIDGETKIT_PADDING_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_PADDING'); ?></label></td>
        <td colspan="3">
            <input type="text" size="5" id="widgetkit_lightbox_padding" />
        </td>
    </tr>
    <tr>
        <td><label for="widgetkit_lightbox_transitionIn" class="hastip" title="<?php echo WFText::_('WF_POPUPS_WIDGETKIT_TRANSITIONIN_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_TRANSITIONIN'); ?></label></td>
        <td>
            <select id="widgetkit_lightbox_transitionIn">
                <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                <option value="fade"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_FADE'); ?></option>
                <option value="elastic"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_ELASTIC'); ?></option>
                <option value="none"><?php echo WFText::_('WF_OPTION_NONE'); ?></option>
            </select>
        </td>

        <td><label for="widgetkit_lightbox_transitionOut" class="hastip" title="<?php echo WFText::_('WF_POPUPS_WIDGETKIT_TRANSITIONOUT_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_TRANSITIONOUT'); ?></label></td>
        <td>
            <select id="widgetkit_lightbox_transitionOut">
                <option value=""><?php echo WFText::_('WF_OPTION_NOT_SET'); ?></option>
                <option value="fade"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_FADE'); ?></option>
                <option value="elastic"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_ELASTIC'); ?></option>
                <option value="none"><?php echo WFText::_('WF_OPTION_NONE'); ?></option>
            </select>
        </td>
    </tr>
    <tr>
        <td><label for="widgetkit_lightbox_type" class="hastip" title="<?php echo WFText::_('WF_POPUPS_WIDGETKIT_TYPE_DESC'); ?>"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_TYPE'); ?></label></td>
        <td>
            <select id="widgetkit_lightbox_type">
                <option value=""><?php echo WFText::_('WF_POPUPS_WIDGETKIT_DETECT'); ?></option>
                <option value="image"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_IMAGE'); ?></option>
                <option value="ajax"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_AJAX'); ?></option>
                <option value="iframe"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_IFRAME'); ?></option>
                <option value="inline"><?php echo WFText::_('WF_POPUPS_WIDGETKIT_INLINE'); ?></option>
            </select>
        </td>
    </tr>
</table>