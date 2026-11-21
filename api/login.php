<?php
require __DIR__ . '/_store.php';
$in = body();
$username = trim($in['username'] ?? '');
$password = $in['password'] ?? '';
$role = $in['role'] ?? '';

// Seed demo accounts store plain passwords; real sign-ups store a hash.
foreach (read_json('users.json') as $u) {
  if ($u['username'] === $username && $u['role'] === $role && $u['password'] === $password) {
    unset($u['password']); respond(true, ['user' => $u]);
  }
}
foreach (read_json('registered-users.json') as $u) {
  if (strtolower($u['username']) === strtolower($username) && $u['role'] === $role && password_verify($password, $u['password'])) {
    unset($u['password']); respond(true, ['user' => $u]);
  }
}
respond(false, ['message' => 'Incorrect username, password, or account type.']);
