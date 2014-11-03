//global var
var data = [[]];
var amtOfGpas = 0;
var avgGpa = 0;
var navBarVal = 1;
var navSelected = 0;

function appendNBI() {
    var $toadd = $('<li id = "bar' + (navBarVal) + '" role="presentation" class="active"><a href="#">Class ' + (navBarVal) + '</a></li>');
    $("#list").append($toadd);
    $("#bar" + navBarVal).val(navBarVal);
    navSelected = $("#bar" + navBarVal).val() - 1;
    resetSettingOfInputs();
    $("#classNum").text("Class " + (navSelected + 1));
    $("#bar" + navBarVal).click(function () {

        resetSettingOfInputs();
        navSelected = $(this).val() - 1;
        $("#classNum").text("Class " + (navSelected + 1));
        $("#inputbox").val(data[navSelected][0]);
        $("#scale").val(data[navSelected][1]);
        updateProgressBar(getGpa(data[navSelected][0], data[navSelected][1]))
    });
}

function updateAverage() {
    var tot = 0;
    for (var i = 0; i < data.length; i++) {
        tot += getGpa(data[i][0], data[i][1]);
    }
    avgGpa = tot / data.length;
    updateMasterProgressBar(avgGpa);
}
function resetSettingOfInputs() {
    $("#inputbox").attr("placeholder", "Ex: 91");
    $("#scale").attr("placeholder", "Ex: 6.0");
    $("#inputbox").val("");
    $("#scale").val("");
    updateProgressBar(0, 0.0);
}

$(document).ready(function () {
    appendNBI();

    $("#buttonWrapper").click(function () {
        changeGpaElement(navSelected);
        updateAverage();
    });

    $("#addbar").click(function () {
        navBarVal++;

        appendNBI();
    });

    $("#restart").click(function () {
        amtOfGpas = 0;
        avgGpa = 0;
        $("#progbar").animate({width: 0 + "%"}, 450);
        $("#textwrapper span").text(0.0);

    });
});



function changeGpaElement(navBarIndex) {

    var grade = $("#inputbox").val();
    var scale = $("#scale").val();
    data[navBarIndex] = [grade, scale];
    console.log(data);
    var gpa = getGpa(grade, scale);
    if (gpa > 6.0) {
        gpa = 6.0;
    }
    amtOfGpas++;
    avgGpa = ((avgGpa * (amtOfGpas - 1)) + gpa) / amtOfGpas;
    console.log(avgGpa);
    avgGpa = Math.round(avgGpa * 10000) / 10000;
    updateProgressBar(gpa);
}


function updateProgressBar(gpa) {
    var gpaPercentage = (gpa / 6) * 100;
    $("#progbar").animate({width: gpaPercentage + "%"}, 450);
    $("#textwrapper span").text(gpa);
}


function getGpa(grade, scale) {
    var finalGpa = scale;
    grade = 100 - grade;
    grade /= 10;
    finalGpa = finalGpa - grade;
    return finalGpa;
}
function changeBarColor(gpaPercentage) {
    $("#masterprogbar").removeClass("progress-bar-warning");
    $("#masterprogbar").removeClass("progress-bar-info");
    $("#masterprogbar").removeClass("progress-bar-danger");
    $("#masterprogbar").removeClass("progress-bar-success");
    if (gpaPercentage < 58.33) {
        $("#masterprogbar").addClass("progress-bar-danger");
    } else if (gpaPercentage >= 58.33 && gpaPercentage <= 75) {
        $("#masterprogbar").addClass("progress-bar-warning");
    } else if (gpaPercentage > 75 && gpaPercentage <= 83.33) {
        $("#masterprogbar").addClass("progress-bar-success");
    } else if (gpaPercentage > 83.33) {
        $("#masterprogbar").addClass("progress-bar-info");
    }


}

function updateMasterProgressBar(gpa) {
    var gpaPercentage = (gpa / 6) * 100;
    $("#masterprogbar").animate({width: gpaPercentage + "%"}, 450);
    changeBarColor(gpaPercentage);
    $("#masterprogbar").text(gpa);

}