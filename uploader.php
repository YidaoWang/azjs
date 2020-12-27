<html>
<head>
    <title>uploader.php</title>
</head>
<body>
<input type="button" onclick="history.back()" value="戻る">
<?php
$basedir =  "./models/parker_base/";
$updir = sprintf("./upload/updir%d/", time());

exec(sprintf("cp -r %s %s", $basedir, $updir));

$modelpath= $updir."parker_base.gltf";
$filename1 = "胸.png";
$filename2 = "背中.png";
$filename3 = "袖L.png";
$filename4 = "袖R.png";

if (move_uploaded_file($_FILES['upfile1']['tmp_name'], $updir.$filename1) == FALSE){
    print("Upload failed １");
}
if (move_uploaded_file($_FILES['upfile2']['tmp_name'], $updir.$filename2) == FALSE){
    print("Upload failed 2");
}
if (move_uploaded_file($_FILES['upfile3']['tmp_name'], $updir.$filename3) == FALSE){
    print("Upload failed 3");
}
if (move_uploaded_file($_FILES['upfile4']['tmp_name'], $updir.$filename4) == FALSE){
    print("Upload failed 4");
}
?>
<script src="./node_modules/three/build/three.min.js"></script>
<script>
     var modelpath = '<?php echo $modelpath; ?>'
</script>
<script type="module" src="./upload.js"></script>
</body>
</html>
