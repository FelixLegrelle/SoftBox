const {remote} = require('electron')
const mainWindow = remote.getCurrentWindow()

mainWindow.on('blur', () => {
    mainWindow.close();
});

let json = require('./soft_infos.json');
let exeArray = []
let table = document.getElementById("table")
let tbody = document.createElement("tbody")
table.appendChild(tbody)

//ajoute le lien vers le .exe
json.forEach(function (value) {
    const {getPath} = require('windows-shortcuts-ps')
    getPath(value.path).then(function (actualPath) {
        //création des images
        let iconExtractor = require('icon-extractor');
        let fs = require('fs');

        exeArray.push({
            name: value.name,
            link:  actualPath
        });
        iconExtractor.emitter.on('icon', function (data) {
            let icon = data.Base64ImageData;
            fs.writeFile('./assets/icons/application/'+value.name+'_ico.png', icon, 'base64', (err) => {
                console.log(err);

            });
        });

        iconExtractor.getIcon('SomeContextLikeAName', actualPath);
    })
})

// console.log(exeArray)


// exeArray.forEach(function (img_value) {
//     iconExtractor.emitter.on('icon', function (data) {
//         let icon = data.Base64ImageData;
//         fs.writeFile('./assets/icons/application/'+img_value.name+'_ico.png', icon, 'base64', (err) => {
//             console.log(err);
//
//         });
//     });
//
//     iconExtractor.getIcon('SomeContextLikeAName', img_value.path);
// })

let compt=0
for (let i = 0; i < 2; i++) {
    let tr = document.createElement("tr")
    tbody.appendChild(tr)
    for (let y = 0; y < 4; y++) {
        console.log(json[compt].name)

        let td = document.createElement("td")
        tr.appendChild(td)

        let div = document.createElement("div")
        div.setAttribute("class", "content")
        div.setAttribute("id", json[compt].name)
        td.appendChild(div)

        let img = document.createElement("img")
        img.setAttribute("src", "./assets/icons/application/"+json[compt].name+"_ico.png")
        img.setAttribute("width", "80px")
        img.setAttribute("height", "auto")
        img.setAttribute("alt", "alt")
        div.appendChild(img)

        compt++
    }
}

document.getElementById("Return").onclick = function () {
    mainWindow.close();
}


const child = require('child_process').execFile;
const executablePath = "C:\\Users\\legre\\Desktop\\Trello.lnk";

//pour chaque tableau de donnée :
//  check si l'image existe
//      Non la crée avec le nom de l'application
//      Oui continue
//  création des boutons cliquable


document.getElementById("Postman").onclick = function () {
    const {getPath} = require('windows-shortcuts-ps')

    getPath(executablePath).then(function (actualPath) {

        let iconExtractor = require('icon-extractor');
        let fs = require('fs');

        iconExtractor.emitter.on('icon', function (data) {
            let icon = data.Base64ImageData;
            fs.writeFile('img.png', icon, 'base64', (err) => {
                console.log(err);

            });
        });

        iconExtractor.getIcon('SomeContextLikeAName', actualPath);

    })


    // child(executablePath, function(err, data) {
    //     if(err){
    //         console.error(err);
    //         return;
    //     }
    //     console.log(data.toString());
    // });
}
