<?php


/*
 * Example description
 */

$config['hr_stats'] =  array(
    'STR' => 'strength',
    'DEX' => 'dexterity',
    'CON' => 'constitution',
    'INT' => 'intelligence',
    'WIS' => 'wisdom',
    'CHA' => 'charisma',
    'GRND' => 'ground',
    'FLY' => 'flying',
    'HVR' => 'hover',
    'CLM' => 'climb',
    'VSN' => 'vision',
    'DRK' => 'dark',
    'BLN' => 'blind',
    'TRM' => 'tremmor',
    'TRU' => 'true',
    'SAV' => 'save',
    'ATH' => 'athletics',
    'RID' => 'riding',
    'ACR' => 'acrobatics',
    'PAR' => 'paraphernalia',
    'STE' => 'stealth',
    'CIV' => 'civilization' ,
    'MTH' => 'myth',
    'OCC' => 'occult',
    'WIL' => 'wilderness',
    'CMM' => 'commune',
    'INSI' => 'insight',
    'PER' => 'perception',
    'TRA' => 'travel',
    'INSP' => 'inspire',
    'MAN' => 'manipulation' ,
    'OBS' => 'obscuration',
    'AC' => 'armor class',
    'INI' => 'initiative',
    'DMG' => 'damage',
    'TMP' => 'temporary',
    'HTD' => 'hit dice',
    'USD' => 'used',
    'DTH' => 'death',
    'SCS' => 'success',
    'INSPN' => 'inspiration',
    'EXH' => 'exhaustion',
    'SPL' => 'spell',
    'SPSL' => 'spell slot',
    'LVL' => 'level',
    'BARB' => 'barbarian',
    'BARD' => 'bard',
    'CLER' => 'cleric',
    'DRUI' => 'druid',
    'FIGH' => 'fighter',
    'MONK' => 'monk',
    'PALA' => 'paladin',
    'RANG' => 'ranger',
    'ROGU' => 'rogue',
    'SORC' => 'sorcere',
    'WARL' => 'warlock',
    'WIZA' => 'wizard',
    'ACT' => 'action',
    // ability modifiers (not to be confused with ability score modifiers)
    'ML_DMG' => 'melee damage',
    'ML_ATT' => 'melee attack',
    'RN_DMG' => 'ranged damage',
    'RN_ATT' => 'ranged attack',
    'SP_DMG' => 'spell damage',
    'SP_ATT' => 'spell attack',
    
  );

$config['item_tags'] = [
    //items
    'MRTL' => 'martial',
    'SMPL' => 'simple',
];

$config['ability_scores'] = array(
  'strength' =>  'STR',
  'dexterity' =>  'DEX',
  'constitution' =>  'CON',
  'intelligence' =>  'INT',
  'wisdom' =>  'WIS',
  'charisma' =>  'CHA',
);

$config['core_skills'] = array(
    'athletics' => 'ATH',
    'riding' => 'RID',
    'acrobatics' => 'ACR',
    'paraphernalia' => 'PAR',
    'stealth' => 'STE',
    'civilization' => 'CIV',
    'myth' => 'MTH',
    'occult' => 'OCC',
    'wilderness' => 'WIL',
    'commune' => 'CMM',
    'insight' => 'INSI',
    'perception' => 'PER',
    'travel' => 'TRA',
    'inspire' => 'INSP',
    'manipulation' => 'MAN',
    'obscuration' => 'OBS'
);

$config['proficiency_types'] = [
    'CORE',
    'RBN' //ribbon proviciency
];

return $config;
