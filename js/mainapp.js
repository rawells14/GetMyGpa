$(document).ready(function () {


    $("#buttonWrapper").click(function () {
        changeGpaElement();

    });
    $("#restart").click(function () {
        amtOfGpas = 0;
        avgGpa = 0;
        $("#progbar").animate({width: 0 + "%"}, 450);
        $("#textwrapper span").text(0.0);

        $("body").append(wang);
    });
});

//global var
var amtOfGpas = 0;
var avgGpa = 0;
var inputAndProgressOf = '';


function clearElements() {

}
function changeGpaElement() {

    var grade = $("#input1").val();
    var scale = $("#scale").val();
    var gpa = getGpa(grade, scale);
    if (gpa > 6.0) {
        gpa = 6.0;
    }
    amtOfGpas++;
    avgGpa = ((avgGpa * (amtOfGpas - 1)) + gpa) / amtOfGpas;
    console.log(avgGpa);
    var gpaPercentage = (avgGpa / 6) * 100;
    avgGpa = Math.round(avgGpa * 10000) / 10000;
    $("#progbar").animate({width: gpaPercentage + "%"}, 450);
    $("#textwrapper span").text(avgGpa);

}
function getGpa(grade, scale) {
    var finalGpa = scale;
    grade = 100 - grade;
    grade /= 10;
    finalGpa = finalGpa - grade;
    return finalGpa;
}