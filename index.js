import fs from 'node:fs';
import JSZip from 'jszip';

const folderPath = '.';

const aFolders = await fs.promises.readdir(folderPath);

for(const sFolder of aFolders){
    const oStats = await fs.promises.lstat(sFolder);
    if(sFolder != 'node_modules' && oStats.isDirectory()){
        const oZip = new JSZip();
        oZip.file("imsmanifest.xml",
`<?xml version="1.0" standalone="no" ?>
<manifest identifier="io.github.rhildred.INFO8985" version="1"
            xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
            xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                                http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                                http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

    <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
    </metadata>
    <organizations default="rhildred_github_io">
        <organization identifier="rhildred_github_io">
            <title>INFO8985</title>
            <item identifier="rhildred/INFO8985/${sFolder}" identifierref="resource_1">
                <title>INFO8985</title>
            </item>
        </organization>
    </organizations>
    <resources>
        <resource identifier="resource_1" type="webcontent" adlcp:scormtype="sco" href="scorm.html">
        </resource>
    </resources>
</manifest>
`);
        oZip.file("scorm.html",
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INFO8985</title>
</head>
<body>
    <x-scorm></x-scorm>
    <script src="https://rhildred.github.io/custom-element/custom-element.js"></script>
</body>
</html>
`);
        oZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(`${sFolder}.zip`))
        .on('finish', function () {
            console.log(`${sFolder}.zip written`);
        });
    
    }
}

