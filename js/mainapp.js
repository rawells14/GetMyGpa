//global vars
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
};
//updates the average of the master progress bar each time it is called
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
    appendNBI();
    initCircle();
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
    $("#delete-bar").click(function () {
        if (navBarVal > 1) {
            $("#bar" + navBarVal).remove();
            navBarVal--;
            amtOfGpas--;
            $("#classNum").text("Class " + navBarVal);
            var temp = [[]];
            for (var i = 0; i < data.length - 1; i++) {
                temp[i] = data[i];
            }
            data = temp;
            changeGpaElement();
            updateAverage();
            $("#inputbox").focus();
            $("#inputbox").val(data[navBarVal - 1][0]);
            $("#scale").val(data[navBarVal - 1][1]);
            console.log("Current Grades: " + data);
        }
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
function saveGpa(){
    
}

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
    if (gpa <= 1) {
        gpa = 1;
    }
    if (gpa >= 6.0) {
        gpa = 6.0;
    }
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
function getBarColor(gpaPercentage) {
    if (gpaPercentage < .5833) {
        return "#A23645";
    }
    if (gpaPercentage >= .5833 && gpaPercentage <= .75) {
        return "#AA6639";
    }
    if (gpaPercentage > .75 && gpaPercentage <= .8333) {
        return "#479030";
    }
    if (gpaPercentage > .8333) {
        return "#246D5F";
    }
}

function updateMasterProgressBar(gpa) {
    if (isNaN(gpa)) {
        gpa = 1.0;
    }
    if (gpa <= 1) {
        gpa = 1.0;
    }

    if (gpa > 6.0) {
        gpa = 6.0;
    }

    var gpaPercentage = (gpa / 6);
    var colorOfGraph = getBarColor(gpaPercentage);
    $("#overall-gpa").text(Math.round(gpa * 10000) / 10000);
    $('#circle').circleProgress({
        value: gpaPercentage,
        size: 500,
        thickness: 70,
        fill: {
            color: colorOfGraph
        }
    });
}
function initCircle() {
    $('#circle').circleProgress({
        size: 500,
        thickness: 70
    });
}