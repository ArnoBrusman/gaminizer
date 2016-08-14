<?php

namespace Gaminizer\ViewComposers;

use Log;

class TwigComposer
{
  
  var $styles = [];
  var $scripts = [];
  var $data = [];
  
  
  
  public function getData()
  {
    
    $twig_data = array_merge(
            $this->data,
            ['page' => $this]
            );
    
    return $twig_data;
  }
  
  //-----------------------------------------------------
  // Twig functions
  //-----------------------------------------------------
  
  function get_scripts()
  {
    $script_return = [];
    
   
    
    Log::info($this->scripts);
      // set script load order
    $this->set_load_order();
    foreach ($this->scripts as $script_name => $script_options) {
      
      $script_return[$script_name] = $script_options['file'];
    }
    
    return $script_return;
  }
  
  function add_script($script_name, $file_name, $options = array())
  {
    $this->scripts[$script_name] = array_merge(
        ['file' => $file_name],
        $options
    );
  }
  
  function add_style($style_name)
  {
    $this->styles[] = $style_name;
  }
  
  /**
   * TODO: throw a recognizable exception for when requirements fail
   * 
   */
  function set_load_order()
  {
    $edges = [];
    
    foreach ($this->scripts as $script_id => $script_options) {
      if (isset($script_options['require'])) {
        
//         check if array
        if(is_array($script_options['require'])) {
          foreach ($script_options['require'] as $r_script_id)
          {
            $edges[] = [$r_script_id, $script_id];
          }
        } else {
          
          $edges[] = [$script_options['require'], $script_id];
        }
        
        
      }
    }
    $scripts = array_keys($this->scripts);
    $this->sorted_scripts = $this->topological_sort($scripts, $edges);
    
    $key_compare_func = function($a, $b) {
        $ia = array_search($a, $this->sorted_scripts);
        $ib = array_search($b, $this->sorted_scripts);

        if ($ia > $ib) {
          return TRUE;
        } else {
          return FALSE;
        }
      
    };
    
    uksort($this->scripts, $key_compare_func);
  }
  
  
  // PHP topological sort function
  // Author: Dan (http://www.calcatraz.com)
  // Licensing: None - use it as you see fit
  // Updates: http://blog.calcatraz.com/php-topological-sort-function-384
  // 
  // Args: 
  //		$nodeids - an array of node ids, 
  //					e.g. array('paris', 'milan', 'vienna', ...);
  // 		$edges - an array of directed edges, 
  //					e.g. array(array('paris','milan'), 
  //							   array('milan', 'vienna'), 
  //							   ...)
  // Returns: 
  // 		topologically sorted array of node ids, or NULL if graph is 
  //		unsortable (i.e. contains cycles)

  function topological_sort($nodeids, $edges) {

    // initialize variables
    $L = $S = $nodes = array(); 

    // remove duplicate nodes
    $nodeids = array_unique($nodeids); 	

    // remove duplicate edges
    $hashes = array();
    foreach($edges as $k=>$e) {
      $hash = md5(serialize($e));
      if (in_array($hash, $hashes)) { unset($edges[$k]); }
      else { $hashes[] = $hash; }; 
    }

    // Build a lookup table of each node's edges
    foreach($nodeids as $id) {
      $nodes[$id] = array('in'=>array(), 'out'=>array());
      foreach($edges as $e) {
        if ($id==$e[0]) { $nodes[$id]['out'][]=$e[1]; }
        if ($id==$e[1]) { $nodes[$id]['in'][]=$e[0]; }
      }
    }

    // While we have nodes left, we pick a node with no inbound edges, 
    // remove it and its edges from the graph, and add it to the end 
    // of the sorted list.
    foreach ($nodes as $id=>$n) { if (empty($n['in'])) $S[]=$id; }
    while (!empty($S)) {
      $L[] = $id = array_shift($S);
      foreach($nodes[$id]['out'] as $m) {
        $nodes[$m]['in'] = array_diff($nodes[$m]['in'], array($id));
        if (empty($nodes[$m]['in'])) { $S[] = $m; }
      }
      $nodes[$id]['out'] = array();
    }

    // Check if we have any edges left unprocessed
    foreach($nodes as $n) {
      if (!empty($n['in']) or !empty($n['out'])) {
        return null; // not sortable as graph is cyclic
      }
    }
    return $L;
  }
  
}