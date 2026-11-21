<?php
require __DIR__ . '/_store.php';
$in = body();
$username = trim($in['username'] ?? '');
$rate = (int)($in['rate'] ?? 0);
$availability = trim($in['availability'] ?? '');
$bio = trim($in['bio'] ?? '');
if ($username === '' || $rate < 500 || $availability === '' || strlen($bio) < 10) respond(false, ['message' => 'Invalid profile details.']);
update_json('profiles.json', function ($all) use ($username, $rate, $availability, $bio) {
  $all[$username] = ['rate' => $rate, 'availability' => $availability, 'bio' => $bio];
  return $all;
});
respond(true);
