<html>
<head>
    <title>uploader.php</title>
</head>
<body>
<?php
$updir = "./models/St.パーカー/";
$filename = "SEVEN OF CUPS.jpg";
if (move_uploaded_file($_FILES['upfile']['tmp_name'], $updir.$filename) == FALSE){
    print("Upload failed");
}
?>
<form method="post" enctype="multipart/form-data" action="uploader.php">
    <input type="file" name="upfile">
    <input type="submit" value="アップロードする">
</form>
<script src="./node_modules/three/build/three.min.js"></script>
<script type="module" src="./app.js"></script>
</body>
</html>