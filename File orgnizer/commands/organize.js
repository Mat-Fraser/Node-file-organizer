function organizeFn(dirPath) {
    let destPath;
    if(dirPath == undefined){
        destPath = process.cwd();
        return;
    }
    else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
             destPath = path.join(dirPath,"Organised_files");
            if(fs.existsSync(destPath) == false){ 
            fs.mkdirSync(destPath);
            }

        }else{
            console.log("enter the correct path");
            return;
        }
    }
    organizeHelper(dirPath, destPath);
}
function organizeHelper(src, dest){
    let childName = fs.readdirSync(src);
    console.log(childName);
    for(let i=0; i<childName.length; i++){
        let childAddress = path.join(src, childName[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            console.log(childName[i]);
            let category = getCategory(childName[i]);
            console.log(childName[i],"belongs to -->",category);
            sendFiles(childName,dest,category);
        }
    }
}
function sendFiles(srcFile, dest, category){
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to",category);
}
function getCategory(name){
    let ext = path.extname(name);
    ext= ext.slice(1);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext ==cTypeArray[i]){
            return type;
            }
        }
    }
    return "others";
}

module.exports = {
    organizeKey:organizeFn
}