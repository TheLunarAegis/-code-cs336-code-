$(document).ready(function () {

    $(function () {
        $(".widget button").button();
        $("button").click(function (event) {
            $("<em>", {
                html: "no data yet..."
            }).appendTo("body");
        });
    });


    $("button").click(
        function () {
            event.preventDefault();
            let jsPromise = Promise.resolve($.ajax({
                url: "/fetch",
                type: "GET",
                data: {
                    name: "lab07"
                }
            }));
            jsPromise.then(function (result) {
                console.log('AJAX request succeeded...');
                $("#fetch").next("div").html("<p>" + result.content + "</p>");
            }, function (xhr) {
                console.log('AJAX request failed...');
                $("#fetch").next("div").html("<p>  AJAX request failed: " + xhr.statusText + "</p>");
            });

        }

    );

});
