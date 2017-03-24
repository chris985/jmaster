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

class WFPopupsExtension_Widgetkit {

    /**
     * Constructor activating the default information of the class
     *
     * @access	protected
     */
    public function __construct() {
        if (self::isEnabled()) {
            $scripts = array();

            $document = WFDocument::getInstance();

            $document->addScript('widgetkit', 'extensions/popups/widgetkit/js');
            $document->addStyleSheet('widgetkit', 'extensions/popups/widgetkit/css');
        }
    }

    public function getParams() {
        $wf = WFEditorPlugin::getInstance();

        return array(
            'lightbox_padding'          => $wf->getParam('popups.widgetkit.lightbox_padding', ''),
            'lightbox_overlayShow'      => $wf->getParam('popups.widgetkit.lightbox_overlayShow', ''),
            'lightbox_transitionIn'     => $wf->getParam('popups.widgetkit.lightbox_transitionIn', ''),
            'lightbox_transitionOut'    => $wf->getParam('popups.widgetkit.lightbox_transitionOut', ''),
            'lightbox_titlePosition'    => $wf->getParam('popups.widgetkit.lightbox_titlePosition', '')
        );
    }

    public function isEnabled() {
        $wf = WFEditorPlugin::getInstance();
        
        if (JPluginHelper::isEnabled('content', 'widgetkit')) {
        	return false;
        }

        if (JPluginHelper::isEnabled('system', 'widgetkit_system') && $wf->getParam('popups.widgetkit.enable', 1) == 1) {
            return true;
        }

        return false;
    }
}

?>