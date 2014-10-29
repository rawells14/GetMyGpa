$(document).ready(function () {
    $("#buttonWrapper").click(function () {
        
        $("#progbar").animate({width: (getGpa(70, 6.0) / 6.0)*100 + "%"}, 300);
        
    });
});


function changeGpaElement(input) {

    if (input >= 5.0) {

    }
}



function getGpa(grade, scale) {
    var finalGpa = scale;
    grade = 100-grade;
    grade /= 10;
    finalGpa = finalGpa-grade;
    return finalGpa;
}