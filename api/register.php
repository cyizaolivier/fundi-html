<?php
require __DIR__ . '/_store.php';
$in = body();
$username = trim($in['username'] ?? '');
$password = $in['password'] ?? '';
$role = $in['role'] ?? '';
$name = trim($in['name'] ?? '');
$phone = trim($in['phone'] ?? '');

if (strlen($username) < 3 || strlen($password) < 6 || !in_array($role, ['client', 'fundi'], true) || $name === '' || $phone === '') {
  respond(false, ['message' => 'Please fill in all required fields correctly.']);
}

foreach (array_merge(read_json('users.json'), read_json('registered-users.json')) as $u) {
  if (strtolower($u['username']) === strtolower($username)) respond(false, ['message' => 'That username is already taken.']);
}

$user = ['username' => $username, 'password' => password_hash($password, PASSWORD_DEFAULT), 'role' => $role, 'name' => $name, 'phone' => $phone];
if ($role === 'fundi') {
  $user['trade'] = trim($in['trade'] ?? 'Other');
  $user['location'] = trim($in['location'] ?? '');
}
update_json('registered-users.json', function ($all) use ($user) { $all[] = $user; return $all; });

unset($user['password']);
respond(true, ['user' => $user]);
