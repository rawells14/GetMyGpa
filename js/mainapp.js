//global var
var data = [[]];
var amtOfGpas = 0;
var avgGpa = 0;
var navBarVal = 1;
var navSelected = 0;
function appendNBI() {
    amtOfGpas++;
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
        updateProgressBar(getGpa(data[navSelected][0], data[navSelected][1]));
    });
}
;
function updateAverage() {
    var tot = 0;
    for (var i = 0; i < data.length; i++) {
        tot += parseFloat(getGpa(data[i][0], data[i][1]));
    }
    console.log("total" + tot);
    avgGpa = tot / amtOfGpas;

    updateMasterProgressBar(avgGpa);
}
function resetSettingOfInputs() {
    $("#inputbox").attr("placeholder", "Ex: 91");
    $("#scale").attr("placeholder", "Ex: 6.0");
    $("#inputbox").val("");
    $("#scale").val("");
    updateProgressBar(0, 0);
}

$(document).ready(function () {
    createCookie("username", "fjjfjfj", 34);
    

    appendNBI();

    ($("#inputbox")).keyup(function () {
        changeGpaElement();
        console.log("Current Grades: " + data);
        updateAverage();
    });

    ($("#scale")).keyup(function () {
        changeGpaElement();
        console.log("Current Grades: " + data);
        updateAverage();
    });





    $("#buttonWrapper").click(function () {
        changeGpaElement(navSelected);
        updateAverage();
    });

    $("#addbar").click(function () {
        navBarVal++;
        appendNBI();
    });

    $("#restart").click(function () {
        location.reload();
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 13) {
            changeGpaElement(navSelected);
            updateAverage();
            navBarVal++;
            appendNBI();
            $("#inputbox").focus();
            $("#scale").val(data[data.length - 1][1]);
        }
    });
});



function changeGpaElement() {

    var grade = $("#inputbox").val();
    var scale = $("#scale").val();
    console.log(navSelected);
    data[navSelected] = [grade, scale];
    var gpa = getGpa(grade, scale);
    updateProgressBar(gpa);
    console.log("gpa: " + gpa);
}


function updateProgressBar(gpa) {
    var gpaPercentage = (gpa / 6) * 100;
    $("#progbar").animate({width: gpaPercentage + "%"}, 100);
    $("#textwrapper span").text(gpa);
}


function getGpa(grade, scale) {
    if (grade <= 70 || grade === null || isNaN(grade)) {
        return 1.0;
    }
    if (grade >= 100) {
        return scale;
    }
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
    if (isNaN(gpa)) {
        gpa = 1.0;

    }
    var gpaPercentage = (gpa / 6) * 100;
    $("#masterprogbar").animate({width: gpaPercentage + "%"}, 100);
    changeBarColor(gpaPercentage);
    $("#masterprogbar").text(Math.round(gpa * 10000) / 10000);

}
