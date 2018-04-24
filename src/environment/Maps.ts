import { Utilies } from "../system/Utilies";
import { AssetManager } from "../system/AssetManager";

export class GameMap
{
    private mapDef;
    private currentSpawn;

    constructor (mapDef)
    {
        this.mapDef = mapDef;
        this.currentSpawn = 0;
    }

    getNextSpawnPoint()
    {
        return Utilies.pickUnqine(this.mapDef.spawnPionts, "spanwPionts");
    }

    getBackgroundCss()
    {
        return this.mapDef.backgroundGraidentCss;
    }

    getTerrainImg()
    {
        return AssetManager.getImage(this.mapDef.terrainImage);
    }

    getName()
    {
        return this.mapDef.name;
    }
}

export module Maps
{
    export var priates = {
        smallImage: "smalllevel2",
        name: "priates",
        terrainImage: "level2",
        spawnPionts: [{"x":2354.354715233633,"y":2618.472692554285},{"x":2464.354715233633,"y":2167.472692554285},{"x":2569.354715233633,"y":1700.472692554285},{"x":2991.354715233633,"y":1523.472692554285},{"x":3472.354715233633,"y":1446.472692554285},{"x":3350.354715233633,"y":1563.472692554285},{"x":3838.354715233633,"y":1737.472692554285},{"x":3708.354715233633,"y":1635.472692554285},{"x":4212.354715233633,"y":1812.472692554285},{"x":4041.354715233633,"y":2140.472692554285},{"x":3735.354715233633,"y":2289.472692554285},{"x":3474.354715233633,"y":2115.472692554285},{"x":3411.354715233633,"y":1877.472692554285},{"x":2830.354715233633,"y":2699.472692554285},{"x":3160.354715233633,"y":2814.472692554285},{"x":3334.354715233633,"y":2499.472692554285},{"x":3617.354715233633,"y":2728.472692554285},{"x":3846.354715233633,"y":2826.472692554285},{"x":4346.354715233633,"y":2542.472692554285},{"x":4494.354715233633,"y":2577.472692554285},{"x":4666.354715233633,"y":2275.472692554285},{"x":4837.354715233633,"y":2650.472692554285},{"x":4977.354715233633,"y":2916.472692554285},{"x":5096.354715233633,"y":2320.472692554285},{"x":4571.354715233633,"y":1886.472692554285},{"x":4741.354715233633,"y":1670.472692554285},{"x":4392.354715233633,"y":1478.472692554285},{"x":4183.354715233633,"y":1824.472692554285}],
        info: " Pritaes and shit "
    }

    export var smallCastle = {
        smallImage: "smalllevel3",
        name: "smallCastle",
        terrainImage: "level3",
        spawnPionts: [{"x":4546.690106970014,"y":2074.3098930299857},{"x":3117.8659123194716,"y":1458.5519380287974},{"x":3413.8659123194716,"y":1431.5519380287974},{"x":3620.8659123194716,"y":1523.5519380287974},{"x":3592.8659123194716,"y":2120.5519380287974},{"x":3299.8659123194716,"y":1969.5519380287974},{"x":3954.8659123194716,"y":2063.5519380287974},{"x":4225.865912319472,"y":2055.5519380287974},{"x":4435.865912319472,"y":1788.5519380287974},{"x":4717.865912319472,"y":1756.5519380287974},{"x":5013.865912319472,"y":2288.5519380287974},{"x":2677.8659123194716,"y":2078.5519380287974},{"x":2907.8659123194716,"y":2054.5519380287974},{"x":2494.8659123194716,"y":2243.5519380287974},{"x":3458.3488516009033,"y":2071.095649019126},{"x":3711.3488516009033,"y":2038.095649019126},{"x":2560.3488516009033,"y":2174.095649019126},{"x":4829.348851600904,"y":2103.095649019126},{"x":5081.348851600904,"y":1837.095649019126},{"x":4950.348851600904,"y":1825.095649019126},{"x":3838.0478527182613,"y":2085.391330583362}],
        info: " Pritaes and shit "
    }

     export var ship = {
        smallImage: "smalllevel5",
        name: "ships",
        terrainImage: "level5",
        spawnPionts: [{"x":3917.7393193496255,"y":1794.696499546532},{"x":4070.7393193496255,"y":1544.696499546532},{"x":4109.7393193496255,"y":1870.696499546532},{"x":4000.7393193496255,"y":1924.696499546532},{"x":4337.7393193496255,"y":1836.696499546532},{"x":4753.7393193496255,"y":1830.696499546532},{"x":4681.7393193496255,"y":1931.696499546532},{"x":4856.7393193496255,"y":1925.696499546532},{"x":4652.7393193496255,"y":1402.696499546532},{"x":4166.7393193496255,"y":1376.696499546532},{"x":5047.7393193496255,"y":1802.696499546532},{"x":5095.7393193496255,"y":2291.6964995465323},{"x":4890.7393193496255,"y":2286.6964995465323},{"x":4133.7393193496255,"y":1527.696499546532},{"x":3794.7393193496255,"y":1309.696499546532},{"x":3655.7393193496255,"y":1324.696499546532},{"x":3387.7393193496255,"y":1770.696499546532},{"x":3576.7393193496255,"y":1788.696499546532},{"x":3283.7393193496255,"y":1311.696499546532},{"x":3118.7393193496255,"y":1321.696499546532},{"x":2957.7393193496255,"y":1531.696499546532},{"x":2900.7393193496255,"y":1625.696499546532},{"x":2627.7393193496255,"y":1544.696499546532},{"x":2649.7393193496255,"y":1882.696499546532},{"x":2553.7393193496255,"y":1761.696499546532},{"x":2328.7393193496255,"y":1747.696499546532}],
        info: " Pritaes and shit "
    }

   export var titanic = {
        smallImage: "smalllevel20",
        name: "titanic",
        terrainImage: "level20",
        spawnPionts: [{"x":2837.874947626356,"y":2603.847317090144},{"x":2836.874947626356,"y":2298.847317090144},{"x":3167.874947626356,"y":2439.847317090144},{"x":4065.874947626356,"y":2845.847317090144},{"x":4391.8749476263565,"y":2906.847317090144},{"x":3995.874947626356,"y":2215.847317090144},{"x":3078.874947626356,"y":2136.847317090144},{"x":2541.874947626356,"y":1475.8473170901439},{"x":3068.874947626356,"y":1629.8473170901439},{"x":3435.874947626356,"y":1802.8473170901439},{"x":3134.874947626356,"y":2025.8473170901439},{"x":3983.874947626356,"y":1586.8473170901439},{"x":4202.8749476263565,"y":2070.847317090144},{"x":4517.8749476263565,"y":1824.8473170901439},{"x":4625.8749476263565,"y":2115.847317090144},{"x":5037.8749476263565,"y":2054.847317090144},{"x":4446.8749476263565,"y":2716.847317090144},{"x":5607.8749476263565,"y":2310.847317090144},{"x":6161.8749476263565,"y":2180.847317090144},{"x":3439.8749476263565,"y":2440.847317090144},{"x":4275.8749476263565,"y":1939.8473170901439},{"x":4759.8749476263565,"y":2079.847317090144},{"x":5342.8749476263565,"y":2402.847317090144},{"x":3627.8749476263565,"y":2906.847317090144},{"x":3402.8749476263565,"y":2547.847317090144}],
        info: " Pritaes and shit "
    }

    export var castle = {
        smallImage: "smallcastles",
        name: "castles",
        terrainImage: "castles",
        spawnPionts: [{"x":4283.071330850913,"y":1770.856404391271},{"x":4414.071330850911,"y":1886.856404391271},{"x":4649.071330850913,"y":2048.856404391271},{"x":4896.071330850913,"y":1333.856404391271},{"x":4657.071330850913,"y":1442.856404391271},{"x":4588.071330850913,"y":1624.856404391271},{"x":4838.071330850913,"y":1768.856404391271},{"x":4749.071330850913,"y":2221.856404391271},{"x":5046.071330850913,"y":2215.856404391271},{"x":4920.071330850913,"y":1672.856404391271},{"x":3925.0713308509135,"y":1431.856404391271},{"x":4018.0713308509135,"y":1286.856404391271},{"x":3763.0713308509135,"y":1676.856404391271},{"x":3681.0713308509135,"y":2073.856404391271},{"x":3877.0713308509135,"y":2055.856404391271},{"x":3309.0713308509135,"y":2044.856404391271},{"x":3502.0713308509135,"y":2177.856404391271},{"x":4167.071330850913,"y":1958.856404391271},{"x":2938.0713308509135,"y":1663.856404391271},{"x":2852.0713308509135,"y":2095.856404391271},{"x":2660.0713308509135,"y":2106.856404391271},{"x":2428.0713308509135,"y":2063.856404391271},{"x":2517.0713308509135,"y":1522.856404391271},{"x":2793.0713308509135,"y":1345.856404391271},{"x":2914.0713308509135,"y":1442.856404391271},{"x":3357.0713308509135,"y":1310.856404391271},{"x":3112.0713308509135,"y":1286.856404391271}] ,
        info: " castle "
    }
}