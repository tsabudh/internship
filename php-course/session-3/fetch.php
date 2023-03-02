<?php

include_once 'database.php';

//GET
$sql = "SELECT * FROM employee ORDER BY id DESC";

if ($conn) {
    $result = mysqli_query($conn, $sql);
    echo ("
		<table>
		<thead>
		<tr>
			<th>Id </th>
			<th>Name </th>
			<th>Email </th>
			<th>Designation </th>
			<th>Actions </th>
		</tr>
		</thead>
		<tbody>

		");
    if ($result->num_rows > 0) {
        // output data of each row

        while ($row = $result->fetch_assoc()) {

            echo ("
			<tr>
<td>" . $row["id"] . "</td>
<td>" . $row["name"] . "</td>
<td>" . $row["email"] . "</td>
<td>" . $row["designation"] . "</td>");

            echo ("
            <td>
            <a href='update.php?id=" . $row['id'] . "'>Update</a>
                    <a href='delete.php?id=" . $row['id'] . "'>Delete</a>
            </td>
			</tr>
			");
        }
    } else {
        echo "0 results";
    }

    echo ("
	</tbody>
	</table>");
}
