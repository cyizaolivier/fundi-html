<?php
// Public list of fundis: demo fundis + everyone who registered as a fundi,
// with any profile edits (rate, availability, bio) applied on top.
require __DIR__ . '/_store.php';
$profiles = read_json('profiles.json');
$list = read_json('fundis.json');
$have = array_map(function ($f) { return strtolower($f['username']); }, $list);

foreach (read_json('registered-users.json') as $u) {
  if ($u['role'] !== 'fundi' || in_array(strtolower($u['username']), $have, true)) continue;
  $list[] = ['id' => 'r-' . $u['username'], 'username' => $u['username'], 'name' => $u['name'],
             'trade' => $u['trade'] ?? 'Other', 'location' => $u['location'] ?? '',
             'rate' => null, 'rateUnit' => 'per hour', 'rating' => null, 'bio' => ''];
}
foreach ($list as &$f) {
  if (isset($profiles[$f['username']])) $f = array_merge($f, $profiles[$f['username']]);
}
respond(true, ['fundis' => $list]);
