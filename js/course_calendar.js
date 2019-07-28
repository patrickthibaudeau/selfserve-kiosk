$(document).ready(function () {
    $('#kiosk-course-calendar-table').DataTable({
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            },
        ]
    });
});