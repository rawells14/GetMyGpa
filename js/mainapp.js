$(document).ready(function () {
    $("#buttonWrapper").click(function () {

        clearElements();
        changeGpaElement();

    });
});
var amtOfGpas = 0;
var avgGpa = 0;
function clearElements() {


}
function changeGpaElement() {
    var grade = $("#input1").val();
    var scale = $("#scale").val();
    var gpa = getGpa(grade, scale);

    amtOfGpas++;
    avgGpa = ((avgGpa * (amtOfGpas - 1)) + gpa) / amtOfGpas;
    console.log(avgGpa);

    $("#progbar").animate({width: (avgGpa / 6) * 100 + "%"}, 450);
    $("#hi").val("Testing");
}
function getGpa(grade, scale) {
    var finalGpa = scale;
    grade = 100 - grade;
    grade /= 10;
    finalGpa = finalGpa - grade;
    return finalGpa;
}