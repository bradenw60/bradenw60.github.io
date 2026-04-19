<?php
// filepath: /C:/Users/Scutie/Documents/GitHub/bradenw60.github.io/api/restaurants.php
header('Content-Type: application/json');

try {
    // Connect to the SQLite database
    $db = new PDO('sqlite:../restaurants.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch all restaurants
    $stmt = $db->query('SELECT * FROM restaurants');
    $restaurants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the data as JSON
    echo json_encode($restaurants);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>