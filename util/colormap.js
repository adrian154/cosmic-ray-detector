// Simple script I made for use with heatmaps

// color palettes from viridis
const VIRIDIS = [[0.26700401,0.00487433,0.32941519],[0.26851048,0.00960483,0.33542652],[0.26994384,0.01462494,0.34137895],[0.27130489,0.01994186,0.34726862],[0.27259384,0.02556309,0.35309303],[0.27380934,0.03149748,0.35885256],[0.27495242,0.03775181,0.36454323],[0.27602238,0.04416723,0.37016418],[0.2770184,0.05034437,0.37571452],[0.27794143,0.05632444,0.38119074],[0.27879067,0.06214536,0.38659204],[0.2795655,0.06783587,0.39191723],[0.28026658,0.07341724,0.39716349],[0.28089358,0.07890703,0.40232944],[0.28144581,0.0843197,0.40741404],[0.28192358,0.08966622,0.41241521],[0.28232739,0.09495545,0.41733086],[0.28265633,0.10019576,0.42216032],[0.28291049,0.10539345,0.42690202],[0.28309095,0.11055307,0.43155375],[0.28319704,0.11567966,0.43611482],[0.28322882,0.12077701,0.44058404],[0.28318684,0.12584799,0.44496],[0.283072,0.13089477,0.44924127],[0.28288389,0.13592005,0.45342734],[0.28262297,0.14092556,0.45751726],[0.28229037,0.14591233,0.46150995],[0.28188676,0.15088147,0.46540474],[0.28141228,0.15583425,0.46920128],[0.28086773,0.16077132,0.47289909],[0.28025468,0.16569272,0.47649762],[0.27957399,0.17059884,0.47999675],[0.27882618,0.1754902,0.48339654],[0.27801236,0.18036684,0.48669702],[0.27713437,0.18522836,0.48989831],[0.27619376,0.19007447,0.49300074],[0.27519116,0.1949054,0.49600488],[0.27412802,0.19972086,0.49891131],[0.27300596,0.20452049,0.50172076],[0.27182812,0.20930306,0.50443413],[0.27059473,0.21406899,0.50705243],[0.26930756,0.21881782,0.50957678],[0.26796846,0.22354911,0.5120084],[0.26657984,0.2282621,0.5143487],[0.2651445,0.23295593,0.5165993],[0.2636632,0.23763078,0.51876163],[0.26213801,0.24228619,0.52083736],[0.26057103,0.2469217,0.52282822],[0.25896451,0.25153685,0.52473609],[0.25732244,0.2561304,0.52656332],[0.25564519,0.26070284,0.52831152],[0.25393498,0.26525384,0.52998273],[0.25219404,0.26978306,0.53157905],[0.25042462,0.27429024,0.53310261],[0.24862899,0.27877509,0.53455561],[0.2468114,0.28323662,0.53594093],[0.24497208,0.28767547,0.53726018],[0.24311324,0.29209154,0.53851561],[0.24123708,0.29648471,0.53970946],[0.23934575,0.30085494,0.54084398],[0.23744138,0.30520222,0.5419214],[0.23552606,0.30952657,0.54294396],[0.23360277,0.31382773,0.54391424],[0.2316735,0.3181058,0.54483444],[0.22973926,0.32236127,0.54570633],[0.22780192,0.32659432,0.546532],[0.2258633,0.33080515,0.54731353],[0.22392515,0.334994,0.54805291],[0.22198915,0.33916114,0.54875211],[0.22005691,0.34330688,0.54941304],[0.21812995,0.34743154,0.55003755],[0.21620971,0.35153548,0.55062743],[0.21429757,0.35561907,0.5511844],[0.21239477,0.35968273,0.55171011],[0.2105031,0.36372671,0.55220646],[0.20862342,0.36775151,0.55267486],[0.20675628,0.37175775,0.55311653],[0.20490257,0.37574589,0.55353282],[0.20306309,0.37971644,0.55392505],[0.20123854,0.38366989,0.55429441],[0.1994295,0.38760678,0.55464205],[0.1976365,0.39152762,0.55496905],[0.19585993,0.39543297,0.55527637],[0.19410009,0.39932336,0.55556494],[0.19235719,0.40319934,0.55583559],[0.19063135,0.40706148,0.55608907],[0.18892259,0.41091033,0.55632606],[0.18723083,0.41474645,0.55654717],[0.18555593,0.4185704,0.55675292],[0.18389763,0.42238275,0.55694377],[0.18225561,0.42618405,0.5571201],[0.18062949,0.42997486,0.55728221],[0.17901879,0.43375572,0.55743035],[0.17742298,0.4375272,0.55756466],[0.17584148,0.44128981,0.55768526],[0.17427363,0.4450441,0.55779216],[0.17271876,0.4487906,0.55788532],[0.17117615,0.4525298,0.55796464],[0.16964573,0.45626209,0.55803034],[0.16812641,0.45998802,0.55808199],[0.1666171,0.46370813,0.55811913],[0.16511703,0.4674229,0.55814141],[0.16362543,0.47113278,0.55814842],[0.16214155,0.47483821,0.55813967],[0.16066467,0.47853961,0.55811466],[0.15919413,0.4822374,0.5580728],[0.15772933,0.48593197,0.55801347],[0.15626973,0.4896237,0.557936],[0.15481488,0.49331293,0.55783967],[0.15336445,0.49700003,0.55772371],[0.1519182,0.50068529,0.55758733],[0.15047605,0.50436904,0.55742968],[0.14903918,0.50805136,0.5572505],[0.14760731,0.51173263,0.55704861],[0.14618026,0.51541316,0.55682271],[0.14475863,0.51909319,0.55657181],[0.14334327,0.52277292,0.55629491],[0.14193527,0.52645254,0.55599097],[0.14053599,0.53013219,0.55565893],[0.13914708,0.53381201,0.55529773],[0.13777048,0.53749213,0.55490625],[0.1364085,0.54117264,0.55448339],[0.13506561,0.54485335,0.55402906],[0.13374299,0.54853458,0.55354108],[0.13244401,0.55221637,0.55301828],[0.13117249,0.55589872,0.55245948],[0.1299327,0.55958162,0.55186354],[0.12872938,0.56326503,0.55122927],[0.12756771,0.56694891,0.55055551],[0.12645338,0.57063316,0.5498411],[0.12539383,0.57431754,0.54908564],[0.12439474,0.57800205,0.5482874],[0.12346281,0.58168661,0.54744498],[0.12260562,0.58537105,0.54655722],[0.12183122,0.58905521,0.54562298],[0.12114807,0.59273889,0.54464114],[0.12056501,0.59642187,0.54361058],[0.12009154,0.60010387,0.54253043],[0.11973756,0.60378459,0.54139999],[0.11951163,0.60746388,0.54021751],[0.11942341,0.61114146,0.53898192],[0.11948255,0.61481702,0.53769219],[0.11969858,0.61849025,0.53634733],[0.12008079,0.62216081,0.53494633],[0.12063824,0.62582833,0.53348834],[0.12137972,0.62949242,0.53197275],[0.12231244,0.63315277,0.53039808],[0.12344358,0.63680899,0.52876343],[0.12477953,0.64046069,0.52706792],[0.12632581,0.64410744,0.52531069],[0.12808703,0.64774881,0.52349092],[0.13006688,0.65138436,0.52160791],[0.13226797,0.65501363,0.51966086],[0.13469183,0.65863619,0.5176488],[0.13733921,0.66225157,0.51557101],[0.14020991,0.66585927,0.5134268],[0.14330291,0.66945881,0.51121549],[0.1466164,0.67304968,0.50893644],[0.15014782,0.67663139,0.5065889],[0.15389405,0.68020343,0.50417217],[0.15785146,0.68376525,0.50168574],[0.16201598,0.68731632,0.49912906],[0.1663832,0.69085611,0.49650163],[0.1709484,0.69438405,0.49380294],[0.17570671,0.6978996,0.49103252],[0.18065314,0.70140222,0.48818938],[0.18578266,0.70489133,0.48527326],[0.19109018,0.70836635,0.48228395],[0.19657063,0.71182668,0.47922108],[0.20221902,0.71527175,0.47608431],[0.20803045,0.71870095,0.4728733],[0.21400015,0.72211371,0.46958774],[0.22012381,0.72550945,0.46622638],[0.2263969,0.72888753,0.46278934],[0.23281498,0.73224735,0.45927675],[0.2393739,0.73558828,0.45568838],[0.24606968,0.73890972,0.45202405],[0.25289851,0.74221104,0.44828355],[0.25985676,0.74549162,0.44446673],[0.26694127,0.74875084,0.44057284],[0.27414922,0.75198807,0.4366009],[0.28147681,0.75520266,0.43255207],[0.28892102,0.75839399,0.42842626],[0.29647899,0.76156142,0.42422341],[0.30414796,0.76470433,0.41994346],[0.31192534,0.76782207,0.41558638],[0.3198086,0.77091403,0.41115215],[0.3277958,0.77397953,0.40664011],[0.33588539,0.7770179,0.40204917],[0.34407411,0.78002855,0.39738103],[0.35235985,0.78301086,0.39263579],[0.36074053,0.78596419,0.38781353],[0.3692142,0.78888793,0.38291438],[0.37777892,0.79178146,0.3779385],[0.38643282,0.79464415,0.37288606],[0.39517408,0.79747541,0.36775726],[0.40400101,0.80027461,0.36255223],[0.4129135,0.80304099,0.35726893],[0.42190813,0.80577412,0.35191009],[0.43098317,0.80847343,0.34647607],[0.44013691,0.81113836,0.3409673],[0.44936763,0.81376835,0.33538426],[0.45867362,0.81636288,0.32972749],[0.46805314,0.81892143,0.32399761],[0.47750446,0.82144351,0.31819529],[0.4870258,0.82392862,0.31232133],[0.49661536,0.82637633,0.30637661],[0.5062713,0.82878621,0.30036211],[0.51599182,0.83115784,0.29427888],[0.52577622,0.83349064,0.2881265],[0.5356211,0.83578452,0.28190832],[0.5455244,0.83803918,0.27562602],[0.55548397,0.84025437,0.26928147],[0.5654976,0.8424299,0.26287683],[0.57556297,0.84456561,0.25641457],[0.58567772,0.84666139,0.24989748],[0.59583934,0.84871722,0.24332878],[0.60604528,0.8507331,0.23671214],[0.61629283,0.85270912,0.23005179],[0.62657923,0.85464543,0.22335258],[0.63690157,0.85654226,0.21662012],[0.64725685,0.85839991,0.20986086],[0.65764197,0.86021878,0.20308229],[0.66805369,0.86199932,0.19629307],[0.67848868,0.86374211,0.18950326],[0.68894351,0.86544779,0.18272455],[0.69941463,0.86711711,0.17597055],[0.70989842,0.86875092,0.16925712],[0.72039115,0.87035015,0.16260273],[0.73088902,0.87191584,0.15602894],[0.74138803,0.87344918,0.14956101],[0.75188414,0.87495143,0.14322828],[0.76237342,0.87642392,0.13706449],[0.77285183,0.87786808,0.13110864],[0.78331535,0.87928545,0.12540538],[0.79375994,0.88067763,0.12000532],[0.80418159,0.88204632,0.11496505],[0.81457634,0.88339329,0.11034678],[0.82494028,0.88472036,0.10621724],[0.83526959,0.88602943,0.1026459],[0.84556056,0.88732243,0.09970219],[0.8558096,0.88860134,0.09745186],[0.86601325,0.88986815,0.09595277],[0.87616824,0.89112487,0.09525046],[0.88627146,0.89237353,0.09537439],[0.89632002,0.89361614,0.09633538],[0.90631121,0.89485467,0.09812496],[0.91624212,0.89609127,0.1007168],[0.92610579,0.89732977,0.10407067],[0.93590444,0.8985704,0.10813094],[0.94563626,0.899815,0.11283773],[0.95529972,0.90106534,0.11812832],[0.96489353,0.90232311,0.12394051],[0.97441665,0.90358991,0.13021494],[0.98386829,0.90486726,0.13689671],[0.99324789,0.90615657,0.1439362]];
const MAGMA = [[0.00146159096,0.000466127766,0.01386552],[0.00225764007,0.00129495431,0.0183311461],[0.00327943222,0.00230452991,0.0237083291],[0.00451230222,0.00349037666,0.0299647059],[0.00594976987,0.00484285,0.0371296695],[0.0075879855,0.00635613622,0.0449730774],[0.0094260439,0.00802185006,0.0528443561],[0.0114654337,0.00982831486,0.060749638],[0.0137075706,0.0117705913,0.0686665843],[0.0161557566,0.0138404966,0.076602666],[0.018815367,0.0160262753,0.0845844897],[0.021691934,0.0183201254,0.092610105],[0.0247917814,0.0207147875,0.100675555],[0.0281228154,0.0232009284,0.108786954],[0.0316955304,0.0257651161,0.116964722],[0.0355204468,0.028397457,0.125209396],[0.0396084872,0.0310895652,0.133515085],[0.043829535,0.0338299885,0.141886249],[0.0480616391,0.0366066101,0.150326989],[0.0523204388,0.039406602,0.158841025],[0.0566148978,0.0421598925,0.167445592],[0.060949393,0.0447944924,0.176128834],[0.0653301801,0.0473177796,0.184891506],[0.0697637296,0.0497264666,0.193735088],[0.0742565152,0.0520167766,0.202660374],[0.0788150034,0.0541844801,0.211667355],[0.0834456313,0.0562249365,0.220755099],[0.088154773,0.0581331465,0.229921611],[0.0929486914,0.0599038167,0.239163669],[0.097833477,0.0615314414,0.248476662],[0.102814972,0.0630104053,0.2578544],[0.107898679,0.0643351102,0.267288933],[0.113094451,0.0654920358,0.276783978],[0.118405035,0.0664791593,0.286320656],[0.123832651,0.0672946449,0.295879431],[0.129380192,0.0679349264,0.305442931],[0.135053322,0.0683912798,0.31499989],[0.140857952,0.068654071,0.32453764],[0.146785234,0.0687382323,0.334011109],[0.152839217,0.0686368599,0.34340445],[0.159017511,0.0683540225,0.352688028],[0.165308131,0.0679108689,0.361816426],[0.171713033,0.067305326,0.370770827],[0.17821173,0.0665758073,0.379497161],[0.184800877,0.0657324381,0.387972507],[0.191459745,0.0648183312,0.396151969],[0.198176877,0.0638624166,0.404008953],[0.204934882,0.0629066192,0.411514273],[0.211718061,0.0619917876,0.418646741],[0.21851159,0.0611584918,0.425391816],[0.225302032,0.0604451843,0.431741767],[0.232076515,0.0598886855,0.437694665],[0.238825991,0.0595170384,0.443255999],[0.245543175,0.0593524384,0.448435938],[0.252220252,0.0594147119,0.453247729],[0.258857304,0.0597055998,0.457709924],[0.265446744,0.0602368754,0.461840297],[0.271994089,0.0609935552,0.465660375],[0.2784933,0.0619778136,0.469190328],[0.284951097,0.0631676261,0.472450879],[0.291365817,0.0645534486,0.475462193],[0.297740413,0.0661170432,0.478243482],[0.304080941,0.0678353452,0.480811572],[0.310382027,0.0697024767,0.48318634],[0.316654235,0.0716895272,0.485380429],[0.322899126,0.0737819504,0.487408399],[0.329114038,0.0759715081,0.489286796],[0.335307503,0.0782361045,0.491024144],[0.341481725,0.0805635079,0.492631321],[0.347635742,0.0829463512,0.494120923],[0.353773161,0.0853726329,0.495501096],[0.359897941,0.0878311772,0.496778331],[0.366011928,0.0903143031,0.497959963],[0.372116205,0.0928159917,0.499053326],[0.378210547,0.0953322947,0.500066568],[0.384299445,0.0978549106,0.501001964],[0.390384361,0.100379466,0.501864236],[0.39646667,0.102902194,0.50265759],[0.402547663,0.105419865,0.503385761],[0.408628505,0.107929771,0.504052118],[0.414708664,0.110431177,0.504661843],[0.420791157,0.11292021,0.505214935],[0.426876965,0.115395258,0.505713602],[0.432967001,0.117854987,0.506159754],[0.439062114,0.120298314,0.506555026],[0.445163096,0.122724371,0.506900806],[0.451270678,0.125132484,0.507198258],[0.457385535,0.127522145,0.507448336],[0.463508291,0.129892998,0.507651812],[0.469639514,0.132244819,0.507809282],[0.475779723,0.1345775,0.507921193],[0.481928997,0.13689139,0.507988509],[0.488088169,0.139186217,0.508010737],[0.494257673,0.141462106,0.507987836],[0.500437834,0.143719323,0.507919772],[0.506628929,0.145958202,0.50780642],[0.512831195,0.148179144,0.50764757],[0.519044825,0.150382611,0.507442938],[0.525269968,0.152569121,0.507192172],[0.531506735,0.154739247,0.50689486],[0.537755194,0.156893613,0.506550538],[0.544015371,0.159032895,0.506158696],[0.550287252,0.161157816,0.505718782],[0.556570783,0.163269149,0.50523021],[0.562865867,0.165367714,0.504692365],[0.569172368,0.167454379,0.504104606],[0.575490107,0.169530062,0.503466273],[0.581818864,0.171595728,0.50277669],[0.588158375,0.173652392,0.502035167],[0.594508337,0.175701122,0.501241011],[0.600868399,0.177743036,0.500393522],[0.607238169,0.179779309,0.499491999],[0.613617209,0.18181117,0.498535746],[0.620005032,0.183839907,0.497524075],[0.626401108,0.185866869,0.496456304],[0.632804854,0.187893468,0.495331769],[0.639215638,0.189921182,0.494149821],[0.645632778,0.191951556,0.492909832],[0.652055535,0.19398621,0.491611196],[0.658483116,0.196026835,0.490253338],[0.664914668,0.198075202,0.488835712],[0.671349279,0.200133166,0.487357807],[0.677785975,0.202202663,0.485819154],[0.684223712,0.204285721,0.484219325],[0.69066138,0.206384461,0.482557941],[0.697097796,0.2085011,0.480834678],[0.7035317,0.210637956,0.47904927],[0.709961888,0.212797337,0.477201121],[0.716387038,0.214981693,0.47528978],[0.722805451,0.217193831,0.473315708],[0.729215521,0.219436516,0.471278924],[0.735615545,0.221712634,0.469179541],[0.742003713,0.224025196,0.467017774],[0.748378107,0.226377345,0.464793954],[0.754736692,0.228772352,0.462508534],[0.761077312,0.231213625,0.460162106],[0.767397681,0.233704708,0.457755411],[0.77369538,0.236249283,0.455289354],[0.779967847,0.23885117,0.452765022],[0.786212372,0.241514325,0.450183695],[0.792426972,0.24424225,0.447543155],[0.79860776,0.247039798,0.444848441],[0.804751511,0.24991135,0.442101615],[0.810854841,0.252861399,0.439304963],[0.816914186,0.25589455,0.436461074],[0.822925797,0.259015505,0.433572874],[0.82888574,0.262229049,0.430643647],[0.834790818,0.265539703,0.427671352],[0.84063568,0.268952874,0.42466562],[0.846415804,0.272473491,0.421631064],[0.85212649,0.276106469,0.418572767],[0.85776287,0.279856666,0.415496319],[0.863320397,0.283729003,0.412402889],[0.868793368,0.287728205,0.409303002],[0.874176342,0.291858679,0.406205397],[0.879463944,0.296124596,0.403118034],[0.884650824,0.30053009,0.40004706],[0.889731418,0.305078817,0.397001559],[0.894700194,0.309773445,0.393994634],[0.899551884,0.314616425,0.391036674],[0.904281297,0.319609981,0.388136889],[0.908883524,0.324755126,0.385308008],[0.913354091,0.330051947,0.382563414],[0.917688852,0.335500068,0.379915138],[0.921884187,0.341098112,0.377375977],[0.925937102,0.346843685,0.374959077],[0.92984509,0.352733817,0.372676513],[0.933606454,0.358764377,0.370540883],[0.937220874,0.364929312,0.368566525],[0.940687443,0.371224168,0.366761699],[0.944006448,0.377642889,0.365136328],[0.947179528,0.384177874,0.36370113],[0.95021015,0.390819546,0.362467694],[0.953099077,0.397562894,0.361438431],[0.955849237,0.404400213,0.360619076],[0.958464079,0.411323666,0.360014232],[0.960949221,0.418323245,0.359629789],[0.963310281,0.425389724,0.35946902],[0.965549351,0.432518707,0.359529151],[0.967671128,0.439702976,0.359810172],[0.969680441,0.446935635,0.36031112],[0.971582181,0.45421017,0.361030156],[0.973381238,0.461520484,0.361964652],[0.975082439,0.468860936,0.363111292],[0.976690494,0.47622635,0.364466162],[0.978209957,0.483612031,0.366024854],[0.979645181,0.491013764,0.367782559],[0.981000291,0.4984278,0.369734157],[0.982279159,0.505850848,0.371874301],[0.983485387,0.513280054,0.374197501],[0.984622298,0.520712972,0.376698186],[0.985692925,0.528147545,0.379370774],[0.986700017,0.53558207,0.382209724],[0.987646038,0.543015173,0.385209578],[0.988533173,0.550445778,0.388365009],[0.989363341,0.557873075,0.391670846],[0.990138201,0.565296495,0.395122099],[0.990871208,0.572706259,0.398713971],[0.991558165,0.580106828,0.402441058],[0.992195728,0.587501706,0.406298792],[0.992784669,0.594891088,0.410282976],[0.993325561,0.602275297,0.414389658],[0.993834412,0.60964354,0.418613221],[0.994308514,0.616998953,0.422949672],[0.994737698,0.624349657,0.427396771],[0.995121854,0.631696376,0.431951492],[0.995480469,0.639026596,0.436607159],[0.995809924,0.646343897,0.441360951],[0.996095703,0.653658756,0.446213021],[0.996341406,0.660969379,0.451160201],[0.996579803,0.668255621,0.456191814],[0.996774784,0.675541484,0.461314158],[0.996925427,0.682827953,0.466525689],[0.997077185,0.690087897,0.471811461],[0.997186253,0.697348991,0.477181727],[0.997253982,0.704610791,0.482634651],[0.99732518,0.711847714,0.488154375],[0.997350983,0.719089119,0.493754665],[0.997350583,0.726324415,0.499427972],[0.997341259,0.733544671,0.505166839],[0.997284689,0.740771893,0.510983331],[0.997228367,0.747980563,0.516859378],[0.99713848,0.755189852,0.522805996],[0.997019342,0.762397883,0.528820775],[0.996898254,0.769590975,0.534892341],[0.996726862,0.77679486,0.541038571],[0.996570645,0.783976508,0.547232992],[0.996369065,0.791167346,0.553498939],[0.996162309,0.798347709,0.559819643],[0.995932448,0.805527126,0.566201824],[0.995680107,0.812705773,0.572644795],[0.995423973,0.819875302,0.57914013],[0.995131288,0.827051773,0.585701463],[0.994851089,0.834212826,0.592307093],[0.994523666,0.841386618,0.598982818],[0.9942219,0.848540474,0.605695903],[0.993865767,0.855711038,0.612481798],[0.993545285,0.862858846,0.6192993],[0.993169558,0.870024467,0.626189463],[0.992830963,0.877168404,0.633109148],[0.992439881,0.884329694,0.640099465],[0.992089454,0.891469549,0.647116021],[0.991687744,0.89862705,0.654201544],[0.991331929,0.905762748,0.661308839],[0.990929685,0.91291501,0.668481201],[0.990569914,0.920048699,0.675674592],[0.990174637,0.927195612,0.682925602],[0.989814839,0.93432854,0.690198194],[0.989433736,0.941470354,0.697518628],[0.989077438,0.948604077,0.704862519],[0.988717064,0.95574152,0.712242232],[0.988367028,0.962878026,0.719648627],[0.988032885,0.970012413,0.727076773],[0.987690702,0.977154231,0.734536205],[0.987386827,0.984287561,0.742001547],[0.987052509,0.991437853,0.749504188]];

// t is some value in [0,1]
// colormap is one of the provided maps
// return is an [r,g,b] triplet where each component ranges from [0,1]
module.exports = {
    VIRIDIS,
    MAGMA,
    map: (t, map) => {
        t = Math.max(0, Math.min(t, 1));
        const pos = t * (map.length - 1);
        const A = map[Math.floor(pos)], B = map[Math.ceil(pos)];
        return [(A[0]+B[0])/2,(A[1]+B[1])/2,(A[2]+B[2])/2];
    }
};