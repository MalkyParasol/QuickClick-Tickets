const callActivities = (drawActivities = () =>{}) =>{

    $.ajax({
        url:"../../data/activities.json",
        success: ( result ) => {
            drawActivities(result);
        }
    })
}

