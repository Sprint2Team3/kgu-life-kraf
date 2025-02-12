var map;
let polylines = [];
let markers = [];
let library_place = [];


// 페이지가 로딩이 된 후 호출하는 함수입니다.
function initTmap(){
    // map 생성
    // Tmapv3.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
    map = new Tmapv3.Map("map_div", { // 지도가 생성될 div
        httpsMode : true,
        center : new Tmapv3.LatLng(37.300597081698065, 127.0369839632937),
        width : "75%",	// 지도의 넓이
        height : "500px",	// 지도의 높이
        zoom : 16	// 지도 줌레벨
    });

    map.on("ConfigLoad", function() {
        passage1_addPolyline()
        passage2_addPolyline()
        passage3_addPolyline()
        passage4_addPolyline()
    });
} ;

//강의실 마커 추가
function add_lecture_building_marker() {
    var lecture_building1_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.300612898904195, 127.03385972198471), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building1.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building1_marker);

    var lecture_building2_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.29951594487681, 127.03365621021219), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building2.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building2_marker);

    var lecture_building3_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.29930179186571, 127.03420313942672), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building3.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building3_marker);

    var lecture_building4_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.300598596245454, 127.03650747305215), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building4.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building4_marker);

    var lecture_building5_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.29985965729514, 127.03679472890683), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building5.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building5_marker);

    var lecture_building6_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.30089084528123, 127.03836584532169), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building6.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building6_marker);

    var lecture_building7_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.301190295513404, 127.03880870368948), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building7.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building7_marker);

    var lecture_building8_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.30071708955118, 127.03929910007619), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building8.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building8_marker);

    var lecture_building9_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.30404355605258, 127.03399379496476), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building9.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building9_marker);

    var lecture_building10_marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.30011313037993, 127.04008831439516), //Marker의 중심좌표 설정.
        icon: "/static/img/lecture_building10.png", //Marker의 아이콘.
        map: map //Marker가 표시될 Map 설정.
    });
    markers.push(lecture_building10_marker);
}

//공부장소 마커 추가
function add_library_marker() {
    var library_marker1 = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.30280487060318, 127.03617574985566), //Marker의 중심좌표 설정.
        icon: "/static/img/library.png", 
        draggable : true,
        map: map, //Marker가 표시될 Map 설정.
    });
    //Marker에 클릭이벤트 등록.
    library_marker1.on("Click", function(evt) {
        hide_study_place_div();
        $('#agora').show();
    });
    library_place.push(library_marker1);

    var library_marker2 = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.30115276671149,127.03917520441672), //Marker의 중심좌표 설정.
        icon: "/static/img/library.png", 
        draggable : true,
        map: map, //Marker가 표시될 Map 설정.
    });
    //Marker에 클릭이벤트 등록.
    library_marker2.on("Click", function(evt) {
        hide_study_place_div();
        $('#seventh_lecture_building').show();
    });
    library_place.push(library_marker2);

    var library_marker3 = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.30112912871873, 127.03556305515662), //Marker의 중심좌표 설정.
        icon: "/static/img/library.png", 
        draggable : true,
        map: map, //Marker가 표시될 Map 설정.
    });
    //Marker에 클릭이벤트 등록.
    library_marker3.on("Click", function(evt) {
        hide_study_place_div();
        $('#central_library').show();
    });
    library_place.push(library_marker3);

    var library_marker4 = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(37.29945958991451, 127.0337971711272), //Marker의 중심좌표 설정.
        icon: "/static/img/library.png", 
        draggable : true,
        map: map, //Marker가 표시될 Map 설정.
    });
    //Marker에 클릭이벤트 등록.
    library_marker4.on("Click", function(evt) {
        hide_study_place_div();
        $('#second_lecture_building').show();
    });
    library_place.push(library_marker4);
}

// //지도 타입 변경.
// function MapType(type){
//     if("HYBRID" == type){
//         map.setMapType("HYBRID")
//     }else if("ROAD" == type){
//         map.setMapType("ROAD")
//     } 
// }


//폴리라인 생성
function shortCut1_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.30290191574161, 127.03556952960479),	// 선의 꼭짓점 좌표
            new Tmapv3.LatLng(37.30278904543859, 127.03636185178554)],
        strokeColor: "#dd00dd",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function longCut1_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.302372578197286, 127.03549878466886),	// 선의 꼭짓점 좌표
            new Tmapv3.LatLng(37.30226423427395, 127.03622342786275)],
        strokeColor: "#0067A3",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function shortCut2_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.30040186702331, 127.04148419175641),	// 선의 꼭짓점 좌표
            new Tmapv3.LatLng(37.30033176941375, 127.04223984606087),
            new Tmapv3.LatLng(37.30086767627892, 127.04282383800242),
            new Tmapv3.LatLng(37.300443882184624, 127.04366388424813),
            new Tmapv3.LatLng(37.30073435260895, 127.0439714064746),
            new Tmapv3.LatLng(37.300536005810926, 127.04428992353016),
        ],
        strokeColor: "#dd00dd",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function longCut2_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.2996814873113, 127.04018108315526),
            new Tmapv3.LatLng(37.29857791608742, 127.03959118219053),
            new Tmapv3.LatLng(37.29754336789013, 127.0413698360773),
            new Tmapv3.LatLng(37.300536005810926, 127.04428992353016),
        ],
        strokeColor: "#0067A3",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function shortCut3_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.29957671677084, 127.03679454236335),	// 선의 꼭짓점 좌표
            new Tmapv3.LatLng(37.299979936750994, 127.03677500063247),
            new Tmapv3.LatLng(37.300400985822876, 127.03736735353266),
        ],
        strokeColor: "#dd00dd",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function longCut3_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.29957671677084, 127.03679454236335),
            new Tmapv3.LatLng(37.29985848019346, 127.03617997812002),
            new Tmapv3.LatLng(37.30056797810363, 127.03640307886718),
        ],
        strokeColor: "#0067A3",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function shortCut4_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.298990579896014, 127.03825486104999),	// 선의 꼭짓점 좌표
            new Tmapv3.LatLng(37.30051107263399, 127.0382753694281),
        ],
        strokeColor: "#dd00dd",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function longCut4_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.298990579896014, 127.03825486104999),
            new Tmapv3.LatLng(37.29857791608742, 127.03959118219053),
            new Tmapv3.LatLng(37.2996814873113, 127.04018108315526),
        ],
        strokeColor: "#0067A3",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function passage1_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.30118653969557, 127.03922315821453),
            new Tmapv3.LatLng(37.301170696585764, 127.03944873243606)
        ],
        strokeColor: "#000000",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function passage2_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.30118653969557, 127.03922315821453),
            new Tmapv3.LatLng(37.3009702619815, 127.03931045886637)
        ],
        strokeColor: "#000000",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function passage3_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.30047245250004, 127.03927072321366),
            new Tmapv3.LatLng(37.300425003207884, 127.03970494047041)
        ],
        strokeColor: "#000000",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}

function passage4_addPolyline(){
    const polyline = new Tmapv3.Polyline({
        path: [new Tmapv3.LatLng(37.29951676891172, 127.0338732843778),
            new Tmapv3.LatLng(37.2994311056593, 127.03409882321915)
        ],
        strokeColor: "#000000",
        strokeWeight: 15,
            map: map
    });
    polylines.push(polyline);
}


//폴리라인 삭제
function clearPolylines() {
    polylines.forEach(function (polyline) {
        polyline.setMap(null); 
    });
    polylines = [];  

    passage1_addPolyline()
    passage2_addPolyline()
    passage3_addPolyline()
    passage4_addPolyline()
}

//강의동 마커 삭제
function clear_lecture_building_markers() {
    markers.forEach(marker => {
        marker.setMap(null);  
    });
    markers = [];  
}

//공부장소 마커 삭제
function clear_library_markers() {
    library_place.forEach(marker => {
        marker.setMap(null);  
    });
    library_place = [];  
}

//공부장소 div 숨기기
function hide_study_place_div() {
    $('#agora').hide();
    $('#central_library').hide();
    $('#second_lecture_building').hide();
    $('#seventh_lecture_building').hide();
}


//지도 컨텐츠 선택 버튼
window.select_shortCut = function() {
    $('#lecture_building').hide();
    $('#library').hide();
    $('#shortCut').show();
    clear_lecture_building_markers()
    clear_library_markers()
    hide_study_place_div()
}

window.select_lecture_building = function() {
    $('#shortCut').hide();
    $('#library').hide();
    $('#lecture_building').show();
    clearPolylines()
    clear_library_markers()
    add_lecture_building_marker()
    hide_study_place_div()
}

window.select_library = function() {
    $('#shortCut').hide();
    $('#lecture_building').hide();
    $('#library').show();
    clearPolylines()
    clear_lecture_building_markers()
    add_library_marker()
}

//지름길 세부 선택 버튼
window.shortCut1 = function() {
    clearPolylines()
    shortCut1_addPolyline()
    longCut1_addPolyline()
    map.setCenter(new Tmapv3.LatLng(37.30257292254887, 127.03595005211517));
}

window.shortCut2 = function() {
    clearPolylines()
    shortCut2_addPolyline()
    longCut2_addPolyline()
    map.setCenter(new Tmapv3.LatLng(37.299122179180586, 127.0420953647245));
}

window.shortCut3 = function() {
    clearPolylines()
    shortCut3_addPolyline()
    longCut3_addPolyline()
    map.setCenter(new Tmapv3.LatLng(37.300196258865846, 127.03653824743785));
}

window.shortCut4 = function() {
    clearPolylines()
    shortCut4_addPolyline()
    longCut4_addPolyline()
    map.setCenter(new Tmapv3.LatLng(37.2993822357316, 127.03915736783951));
}

//강의동 선택 버튼
window.lecture_building1 = function() {
    map.setCenter(new Tmapv3.LatLng(37.300612898904195, 127.03385972198471));
}

window.lecture_building2 = function() {
    map.setCenter(new Tmapv3.LatLng(37.29951594487681, 127.03365621021219));
}

window.lecture_building3 = function() {
    map.setCenter(new Tmapv3.LatLng(37.29930179186571, 127.03420313942672));
}

window.lecture_building4 = function() {
    map.setCenter(new Tmapv3.LatLng(37.300598596245454, 127.03650747305215));
}

window.lecture_building5 = function() {
    map.setCenter(new Tmapv3.LatLng(37.29985965729514, 127.03679472890683));
}

window.lecture_building6 = function() {
    map.setCenter(new Tmapv3.LatLng(37.30089084528123, 127.03836584532169));
}

window.lecture_building7 = function() {
    map.setCenter(new Tmapv3.LatLng(37.301190295513404, 127.03880870368948));
}

window.lecture_building8 = function() {
    map.setCenter(new Tmapv3.LatLng(37.30071708955118, 127.03929910007619));
}

window.lecture_building9 = function() {
    map.setCenter(new Tmapv3.LatLng(37.30404355605258, 127.03399379496476));
}

window.lecture_building10 = function() {
    map.setCenter(new Tmapv3.LatLng(37.30011313037993, 127.04008831439516));
}

//도서관 선택 버튼
window.library1 = function() {
    map.setCenter(new Tmapv3.LatLng(37.30280487060318, 127.03617574985566));
}

window.library2 = function() {
    map.setCenter(new Tmapv3.LatLng(37.30112912871873, 127.03556305515662));
}

window.library3 = function() {
    map.setCenter(new Tmapv3.LatLng(37.29945958991451, 127.0337971711272));
}

window.library4 = function() {
    map.setCenter(new Tmapv3.LatLng(37.30115276671149, 127.03917520441672));
}

//컨텐츠 로드 후 실행
document.addEventListener("DOMContentLoaded", function () {
    $('#shortCut').hide();
    $('#lecture_building').hide();
    $('#library').hide();
    hide_study_place_div()
    initTmap();
});