$(function () {

    'use strict';

    var nodes = {
         "1": [2, 7, 8],
         "2": [1, 3, 6],
         "3": [2, 4, 5],
         "4": [3],
         "5": [3],
         "6": [2],
         "7": [1],
         "8": [1, 9, 12],
         "9": [8, 10, 11],
        "10": [9],
        "11": [9],
        "12": [8]
    };

    var visited = [];
    dfs(1, nodes, function (n) {
        visited.push(n);
    });

    console.log(visited.join(', '));

});

function dfs(start, nodes, fn) {
    //console.log(start,nodes,fn);
    (function dfs_recur(node, visited) {//node = 1 visited = []
        //console.log(node); // 1 2 3 4 5 6 7 8 9...
        //console.log(visited);//[] [1] [1,2] [1,2,3] ...
       
        var adj = nodes[node];//adj = [2,7,8] [1,3,6] [2,4,5]...
        visited.push(node);
        //fn(node);
        for (var i in adj) {
            var node = adj[i];
            //console.log("node",node);
            if (0 > visited.indexOf(node)) {  //如果visited数组中已经存在node
                dfs_recur(node, visited);
            }
        }
    })(start, []);
}


