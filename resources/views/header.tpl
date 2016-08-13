<!DOCTYPE html>
<html lang="{$lang_info.code}" dir="{$lang_info.direction}">
<head>
<meta charset="{$CONTENT_ENCODING}">
<base href="{$ROOT_URL}">

{if isset($meta_ref)} 
{if isset($INFO_AUTHOR)}
<meta name="author" content="{$INFO_AUTHOR|strip_tags:false|replace:'"':' '}">
{/if}
{if isset($related_tags)}
<meta name="keywords" content="{foreach from=$related_tags item=tag name=tag_loop}{if !$smarty.foreach.tag_loop.first}, {/if}{$tag.name}{/foreach}">
{/if}
{if isset($COMMENT_IMG)}
<meta name="description" content="{$COMMENT_IMG|strip_tags:false|replace:'"':' '}{if isset($INFO_FILE)} - {$INFO_FILE}{/if}">
{else}
<meta name="description" content="{$PAGE_TITLE}{if isset($INFO_FILE)} - {$INFO_FILE}{/if}">
{/if}
{/if}

<title>{if $PAGE_TITLE!=lang('Home') && $PAGE_TITLE!=$GALLERY_TITLE}{$PAGE_TITLE} | {/if}{$GALLERY_TITLE}</title>
<link rel="shortcut icon" type="image/x-icon" href="{$ROOT_URL}{$themeconf.icon_dir}/favicon.ico">

<link rel="start" title="{'Home'|translate}" href="{$U_HOME}" >
<link rel="search" title="{'Search'|translate}" href="{$ROOT_URL}search" >

{if not empty($page_refresh)}<meta http-equiv="refresh" content="{$page_refresh.TIME};url={$page_refresh.U_REFRESH}">{/if}

{strip}
{foreach from=$themes item=theme}
  {if $theme.load_css}
  {combine_css path="application/views/`$theme.id`/theme.css" order=-10}
  {/if}
  {if !empty($theme.local_head)}
  {include file=$theme.local_head load_css=$theme.load_css}
  {/if}
{/foreach}

{combine_script id="jquery" load="header" }
{combine_script id="underscore" load="header" require="jquery" path="./application/views/default/js/underscore-min.js" }
{combine_script id="backbone" load="header" require="underscore" path="./application/views/default/js/backbone-min.js" }
{combine_script id="rpgtjs" load="header" require="backbone" path="./application/views/default/js/rpgt.js" }
{/strip}

<!-- BEGIN get_combined -->
{get_combined_css}

{get_combined_scripts load='header'}
<!-- END get_combined -->

<!--[if lt IE 7]>
<script type="text/javascript" src="{$ROOT_URL}application/views/default/js/pngfix.js"></script>
<![endif]-->

{if not empty($head_elements)}
{foreach from=$head_elements item=elt}
  {$elt}
{/foreach}
{/if}
</head>

<body id="{$BODY_ID}">

{if not empty($header_msgs)}
<div class="header_msgs">
  {foreach from=$header_msgs item=elt}
  {$elt}<br>
  {/foreach}
</div>
{/if}

<div id="theHeader">{$PAGE_BANNER}</div>

{if not empty($header_notes)}
<div class="header_notes">
  {foreach from=$header_notes item=elt}
  <p>{$elt}</p>
  {/foreach}
</div>
{/if}
<div id="page">