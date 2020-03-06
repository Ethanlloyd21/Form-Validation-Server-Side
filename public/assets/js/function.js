$(function () {
    $('.devour').on('click', function (event) {
        var id = $(this).data('id');
        var newDevoured = $(this).data('newDevoured');

        var newDevouredState = {
            devoured: newDevoured
        };
        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: newDevouredState
        }).then(
            function () {
                console.log('Get into my tummy!', newDevoured);
                location.reload();
            }
        );
    });

    $('.log-in').on('submit', function (event) {
        event.preventDefault();
        var user = {
            name: $('.btnSubmit').val().trim(),
        };
        $.ajax('/login', {
            type: 'POST',
            data: user
        }).then(
            function () {
                console.log('User entered the homepage!');

                location.reload();
            }
        );
    });

    $('.create-form').on('submit', function (event) {
        event.preventDefault();
        var newBurger = {
            name: $('#newBurger').val().trim(),
        };
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(
            function () {
                console.log('Burger added!');

                location.reload();
            }
        );
    });

    $('.delete').on('click', function (event) {
        var id = $(this).data('id');
        $.ajax('/api/burgers/' + id, {
            type: 'DELETE'
        }).then(
            function () {
                console.log('Deleted Burger: ', id);
                location.reload();
            }
        );
    });
});