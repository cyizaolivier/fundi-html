<?php
require __DIR__ . '/_store.php';
$in = body();
$action = $in['action'] ?? 'list';

if ($action === 'add') {
  $b = $in['booking'] ?? [];
  foreach (['clientUsername', 'fundiUsername', 'category', 'date', 'description'] as $k) {
    if (empty($b[$k])) respond(false, ['message' => 'Missing booking details.']);
  }
  $b = ['id' => 'b' . round(microtime(true) * 1000), 'clientUsername' => $b['clientUsername'], 'fundiUsername' => $b['fundiUsername'],
        'category' => $b['category'], 'date' => $b['date'], 'description' => $b['description'], 'status' => 'pending'];
  update_json('bookings.json', function ($all) use ($b) { $all[] = $b; return $all; });
  respond(true, ['booking' => $b]);
}
if ($action === 'status') {
  $id = $in['id'] ?? ''; $status = $in['status'] ?? '';
  if (!in_array($status, ['accepted', 'declined', 'pending'], true)) respond(false, ['message' => 'Bad status.']);
  update_json('bookings.json', function ($all) use ($id, $status) {
    foreach ($all as &$x) if ($x['id'] === $id) $x['status'] = $status;
    return $all;
  });
  respond(true);
}
respond(true, ['bookings' => read_json('bookings.json')]);
