var fs = require('fs');
const path = require('path');
const sigmoid = require('sigmoid');
var configFile = undefined;
var passedConfigFile = undefined;
process.argv.forEach(function (val, index, array) {
    if (index == array.length - 1) {
        passedConfigFile = val;
    }
});
try {
    try {
        try {
            configFile = require(passedConfigFile);
            if ((configFile["connectionsFile"] == undefined) || (configFile["connectionsFile"] == "")) {
                console.log("[ WARNING  ] No connections file in config file passed from cli [" + passedConfigFile + "]")
                throw "No connections file in passed config file";
            }
            if ((configFile["nodesFile"] == undefined) || (configFile["nodesFile"] == "")) {
                console.log("[ WARNING  ] No nodes file in config file from local directory")
                throw "No nodes file in passed config file";
            }
            console.log("[   INFO   ] Applying config file passed from cli [" + passedConfigFile + "]")
        } catch(ex) {
            configFile = require("./"+passedConfigFile);
            if ((configFile["connectionsFile"] == undefined) || (configFile["connectionsFile"] == "")) {
                console.log("[ WARNING  ] No connections file in config file passed from cli [" + passedConfigFile + "]")
                throw "No connections file in passed config file";
            }
            if ((configFile["nodesFile"] == undefined) || (configFile["nodesFile"] == "")) {
                console.log("[ WARNING  ] No nodes file in config file from local directory")
                throw "No nodes file in passed config file";
            }
            console.log("[   INFO   ] Applying config file passed from cli [./"+passedConfigFile + "]")
        }
    } catch(ex) {
        configFile = require('./config');
        if ((configFile["connectionsFile"] == undefined) || (configFile["connectionsFile"] == "")) {
            console.log("[ WARNING  ] No connections file in config file from local directory")
            throw "No connections file in passed config file";
        }
        if ((configFile["nodesFile"] == undefined) || (configFile["nodesFile"] == "")) {
            console.log("[ WARNING  ] No nodes file in config file from local directory")
            throw "No nodes file in passed config file";
        }
        console.log("[   INFO   ] Applying config file from local directory")
    }
} catch(ex) {
    console.log("[*CRITICAL*] NO VALID CONFIG FILE")
}
var nodes = [];
var connections = [];
var targets = [];
var mood = 0;
var output = "";
console.log("[   INFO   ] Initialising bot");
try{nodesFile = configFile["nodesFile"];if(nodesFile == undefined || connectionsFile == ""){throw "notFound";};}catch(ex){console.log("[   INFO   ] No user playlists file set, defaulting to nodes.json");nodesFile = "nodes.json";}
try{connectionsFile = configFile["connectionsFile"];if(connectionsFile == undefined || connectionsFile == ""){throw "notFound";};}catch(ex){console.log("[   INFO   ] No user playlists file set, defaulting to connections.json");connectionsFile = "connections.json";}
if (!connectionsFile.startsWith("/")) {
    connectionsFile = path.join(__dirname,connectionsFile);
}
if (!nodesFile.startsWith("/")) {
    nodesFile = path.join(__dirname,nodesFile);
}
console.log("[   INFO   ] nodesFile = "+nodesFile);
console.log("[   INFO   ] connectionsFile = "+connectionsFile);
try {
fs.readFileSync(nodesFile, function (err, data) {
    if (err) {
        console.log("[ WARNING  ] Could not find nodes file");
        console.log("[ WARNING  ] Are permissions for the file set correctly?");
        for (i=0;i<53;i++) {
            newNode(8);
        }
    } else {
        nodes = JSON.parse(data.toString());
    }
});
fs.readFileSync(connectionsFile, function (err, data) {
    if (err) {
        console.log("[ WARNING  ] Could not find connections file");
        console.log("[ WARNING  ] Are permissions for the file set correctly?");
        connections = [];
    } else {
        connections = JSON.parse(data.toString());
    }
});
} catch (ex) {
    console.log("[ WARNING  ] Could not find connections/nodes file");
    console.log("[ WARNING  ] Using defaults");
    for (i=0;i<53;i++) {
        newNode(8);
    }
    connections = [];
}

targets = ["the","of","to","and","a","in","is","it","you","that","he","was","for","on","are","with","as","I","his","they","be","at","one","have","this","from","or","had","by","hot","word","but","what","some","we","can","out","other","were","all","there","when","up","use","your","how","said","an","each","she","which","do","their","time","if","will","way","about","many","then","them","write","would","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","number","sound","no","most","people","my","over","know","water","than","call","first","who","may","down","side","been","now","find","any","new","work","part","take","get","place","made","live","where","after","back","little","only","round","man","year","came","show","every","good","me","give","our","under","name","very","through","just","form","sentence","great","think","say","help","low","line","differ","turn","cause","much","mean","before","move","right","boy","old","too","same","tell","does","set","three","want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add","even","land","here","must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","picture","try","us","again","animal","point","mother","world","near","build","self","earth","father","head","stand","own","page","should","country","found","answer","school","grow","study","still","learn","plant","cover","food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree","cross","farm","hard","start","might","story","saw","far","sea","draw","left","late","run","don't","while","press","close","night","real","life","few","north","open","seem","together","next","white","children","begin","got","walk","example","ease","paper","group","always","music","those","both","mark","often","letter","until","mile","river","car","feet","care","second","book","carry","took","science","eat","room","friend","began","idea","fish","mountain","stop","once","base","hear","horse","cut","sure","watch","color","face","wood","main","enough","plain","girl","usual","young","ready","above","ever","red","list","though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure","door","product","black","short","numeral","class","wind","question","happen","complete","ship","area","half","rock","order","fire","south","problem","piece","told","knew","pass","since","top","whole","king","space","heard","best","hour","better","true","during","hundred","five","remember","step","early","hold","west","ground","interest","reach","fast","verb","sing","listen","six","table","travel","less","morning","ten","simple","several","vowel","toward","war","lay","against","pattern","slow","center","love","person","money","serve","appear","road","map","rain","rule","govern","pull","cold","notice","voice","unit","power","town","fine","certain","fly","fall","lead","cry","dark","machine","note","wait","plan","figure","star","box","noun","field","rest","correct","able","pound","done","beauty","drive","stood","contain","front","teach","week","final","gave","green","oh","quick","develop","ocean","warm","free","minute","strong","special","mind","behind","clear","tail","produce","fact","street","inch","multiply","nothing","course","stay","wheel","full","force","blue","object","decide","surface","deep","moon","island","foot","system","busy","test","record","boat","common","gold","possible","plane","stead","dry","wonder","laugh","thousand","ago","ran","check","game","shape","equate","hot","miss","brought","heat","snow","tire","bring","yes","distant","fill","east","paint","language","among","grand","ball","yet","wave","drop","heart","am","present","heavy","dance","engine","position","arm","wide","sail","material","size","vary","settle","speak","weight","general","ice","matter","circle","pair","include","divide","syllable","felt","perhaps","pick","sudden","count","square","reason","length","represent","art","subject","region","energy","hunt","probable","bed","brother","egg","ride","cell","believe","fraction","forest","sit","race","window","store","summer","train","sleep","prove","lone","leg","exercise","wall","catch","mount","wish","sky","board","joy","winter","sat","written","wild","instrument","kept","glass","grass","cow","job","edge","sign","visit","past","soft","fun","bright","gas","weather","month","million","bear","finish","happy","hope","flower","clothe","strange","gone","jump","baby","eight","village","meet","root","buy","raise","solve","metal","whether","push","seven","paragraph","third","shall","held","hair","describe","cook","floor","either","result","burn","hill","safe","cat","century","consider","type","law","bit","coast","copy","phrase","silent","tall","sand","soil","roll","temperature","finger","industry","value","fight","lie","beat","excite","natural","view","sense","ear","else","quite","broke","case","middle","kill","son","lake","moment","scale","loud","spring","observe","child","straight","consonant","nation","dictionary","milk","speed","method","organ","pay","age","section","dress","cloud","surprise","quiet","stone","tiny","climb","cool","design","poor","lot","experiment","bottom","key","iron","single","stick","flat","twenty","skin","smile","crease","hole","trade","melody","trip","office","receive","row","mouth","exact","symbol","die","least","trouble","shout","except","wrote","seed","tone","join","suggest","clean","break","lady","yard","rise","bad","blow","oil","blood","touch","grew","cent","mix","team","wire","cost","lost","brown","wear","garden","equal","sent","choose","fell","fit","flow","fair","bank","collect","save","control","decimal","gentle","woman","captain","practice","separate","difficult","doctor","please","protect","noon","whose","locate","ring","character","insect","caught","period","indicate","radio","spoke","atom","human","history","effect","electric","expect","crop","modern","element","hit","student","corner","party","supply","bone","rail","imagine","provide","agree","thus","capital","won't","chair","danger","fruit","rich","thick","soldier","process","operate","guess","necessary","sharp","wing","create","neighbor","wash","bat","rather","crowd","corn","compare","poem","string","bell","depend","meat","rub","tube","famous","dollar","stream","fear","sight","thin","triangle","planet","hurry","chief","colony","clock","mine","tie","enter","major","fresh","search","send","yellow","gun","allow","print","dead","spot","desert","suit","current","lift","rose","continue","block","chart","hat","sell","success","company","subtract","event","particular","deal","swim","term","opposite","wife","shoe","shoulder","spread","arrange","camp","invent","cotton","born","determine","quart","nine","truck","noise","level","chance","gather","shop","stretch","throw","shine","property","column","molecule","select","wrong","gray","repeat","require","broad","prepare","salt","nose","plural","anger","claim","continent","oxygen","sugar","death","pretty","skill","women","season","solution","magnet","silver","thank","branch","match","suffix","especially","fig","afraid","huge","sister","steel","discuss","forward","similar","guide","experience","score","apple","bought","led","pitch","coat","mass","card","band","rope","slip","win","dream","evening","condition","feed","tool","total","basic","smell","valley","nor","double","seat","arrive","master","track","parent","shore","division","sheet","substance","favor","connect","post","spend","chord","fat","glad","original","share","station","dad","bread","charge","proper","bar","offer","segment","slave","duck","instant","market","degree","populate","chick","dear","enemy","reply","drink","occur","support","speech","nature","range","steam","motion","path","liquid","log","meant","quotient","teeth","shell","neck"];

//targets = ["watashi","desu","onii","chan","wa","san","kun"];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newConnection(mmax) {
    var inputNode = getRandomInt(0, nodes.length - 1);
    var outputNode = getRandomInt(0, nodes.length - 1);
    var weight = (Math.random() * mmax * 2) - mmax;
    if (nodes[outputNode][1] != 1) {
        connections.push([inputNode,outputNode,weight])
    }
}

function newNode(mmax,type = 0) {
    var val = sigmoid((Math.random() * mmax * 2) - mmax);
    nodes.push([val,type]) // 0 for normal, 1 for read only, 2 for memory cell, 3 for long term memory cell
}

function modifyConnections(mmax) {
    for (i=0;i<connections.length;i++) {
        var prop1 = 4; // CONTROLS RANDOMNESS
        connections[i][2] = ((connections[i][2] * (prop1 - 1)) + getRandomInt(-mmax, mmax)) / prop1;
    }
    for (i=0;i<connections.length;i++) {
        connections[i][2] = connections[i][2] * (sigmoid(mood) * 2);
    }
    for (i=0;i<connections.length;i++) {
        if (Math.abs(connections[i][2]) < 0.01) {
            connections.splice(i, 1);
        }
    }
    for (i=53;i<nodes.length;i++) {
        var validConnection = false;
        for (j=0;j<connections.length;j++) {
            if ((connections[j][0] == i) || (connections[j][1] == i)) {
                validConnection = true;
            }
        }
        if (isNaN(nodes[i][0])) {
            try {
                nodes[i][0] = sigmoid((Math.random() * 8 * 2) - 8);
            } catch (ex) {
                nodes[i] = [sigmoid((Math.random() * 8 * 2) - 8), 0];
            }
        }
        if (!validConnection) {
            nodes.splice(i, 1);
            for (j=0;j<connections.length;j++) {
                if ((connections[j][0] == i) || (connections[j][1] == i)) {
                    connections.splice(j, 1);
                }
                if (connections[j][0] > i){
                    connections[j][0] = connections[j][0] - 1;
                } else if (connections[j][1] > i) {
                    connections[j][1] = connections[j][1] - 1;
                }
            }
        }
    }
}

function nodeStep() {
    var newNodes = [];
    for (i=0;i<nodes.length;i++) {
        if (nodes[i][1] == 0) {
            newNodes.push([0,0]);
        }
        if (nodes[i][1] == 1) {
            newNodes.push([0,1]);
        }
        if (nodes[i][1] == 2) {
            newNodes.push([sigmoid(nodes[i][0]),2]);
        }
        if (nodes[i][1] == 3) {
            newNodes.push([nodes[i][0],3]);
        }
    }
    //console.log(newNodes)
    for (i=0;i<connections.length;i++) {
        try {
            newNodes[connections[i][1]][0] = newNodes[connections[i][1]][0] + (nodes[connections[i][0]][0] * connections[i][2]);
        } catch (ex) {
            console.log("[   INFO   ] Invalid Node " + i);
            nodes.splice(i, 1);
            for (j=0;j<connections.length;j++) {
                if ((connections[j][0] == i) || (connections[j][1] == i)) {
                    connections.splice(j, 1);
                }
                if (connections[j][0] > i){
                    connections[j][0] = connections[j][0] - 1;
                } else if (connections[j][1] > i) {
                    connections[j][1] = connections[j][1] - 1;
                }
            }
        }
    }
    for (i=0;i<newNodes.length;i++) {
        try {
            nodes[i][0] = sigmoid(newNodes[i][0]);
        } catch (ex) {
            nodes[i] = [sigmoid((Math.random() * 8 * 2) - 8), 0];
        }
    }

    //console.log(nodes)
    //console.log("YEET")
    var highestId = 0;
    var highestValue = 0; //BARRIER TO ENTRY
    for (i=26;i<53;i++) {
        try {
            if (nodes[i][0] > highestValue) {
                highestId = i-26;
                highestValue = nodes[i][0];
            }
        } catch (ex) {

        }
    }
    output = output + " ABCDEFGHIJKLMNOPQRSTUVWXYZ\n".charAt(highestId);
    //console.log(output);
    if (highestId == 26) {
        output = output.substr(0, output.length-1);
        //console.log(output);
        //console.log(targets);
        for (i=0;i<targets.length;i++) {
            //console.log(output.toUpperCase() + " == " + targets[i].toUpperCase());
            if (output.toUpperCase().includes(" " + targets[i].toUpperCase() + " ")) {
                console.log(output);
                console.log("[   INFO   ] WORD HIT");
                mood = mood + (8 * ((64 * Math.pow(targets[i].length,3)) / Math.pow(output.length,2)));
                console.log(mood)
            }
        }
        output = "";
    }

    return null;
}

function saveNetwork() {
    var nodesText = JSON.stringify(nodes);
    //console.log(nodes)
    //console.log(nodesText)
    var connectionsText = JSON.stringify(connections);
    //console.log(nodesText);
    fs.writeFileSync(nodesFile, nodesText, function(err) {
        if (err) {
            console.log("[  ERROR   ] Could not save the nodes file");
            console.log(nodesFile);
        } else {
            //console.log("[   INFO   ] Saved Nodes");
        }
    });
    //console.log(connectionsText);
    fs.writeFileSync(connectionsFile, connectionsText, function(err) {
        if (err) {
            console.log("[  ERROR   ] Could not save the connections file");
            console.log(connectionsFile);
        } else {
            //console.log("[   INFO   ] Saved Connections");
        }
    });
}

var loops = 0
var nodeStepAsync = function (filePath) {
    return new Promise(function (resolve, reject) {
        nodeStep();
        resolve();
    }).then(function () {
        networkStep();
    }).catch(function (error) {
        console.log("[  ERROR   ] " + error);
    });
};

function networkStep() {
    //nodeStepAsync();
    nodeStep();
    modifyConnections(8);
    for (i=0;i<2;i++) {
        newNode(8);
    }
    for (i=0;i<1;i++) {
        newConnection(8);
    }

    //mood = mood - 0.01
    mood = mood * (1- Math.pow(2,-8)); // Mood decay

    loops = loops + 1;
    if (loops > Math.pow(2,13)) {
        saveNetwork();
        console.log("[   INFO   ] Network Saved");
        loops = 0;
    }
}
//networkStep();

//function loop(){
    //networkStep();
//}

while (true) {
    networkStep();
}

//setInterval(loop,1);
